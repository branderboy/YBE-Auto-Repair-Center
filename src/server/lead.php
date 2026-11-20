<?php
/**
 * YBE lead capture (owner, 2026-11-14).
 *
 * Every website form posts here. Each lead is saved to a CSV outside the
 * public web root and emailed to the owner. Deployed to Hostinger as
 * /api/lead.php by scripts/build-hostinger.js, which fills in the
 * {{PLACEHOLDERS}} below from src/data/business.js.
 *
 * The browser falls back to the old text or email hand-off whenever this does
 * not answer with {"ok":true}, so a lead is never lost to a server problem.
 */
declare(strict_types=1);

date_default_timezone_set('America/New_York');

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const TO_EMAIL = '{{TO_EMAIL}}';
// A second address that receives a copy of every lead. Empty for none.
const COPY_EMAIL = '{{COPY_EMAIL}}';
// The address lead emails are sent from: this website's own domain.
const FROM_EMAIL = '{{FROM_EMAIL}}';
const DOMAIN = '{{DOMAIN}}';
const BUSINESS = '{{BUSINESS}}';
const FORMS = [
    'callback'    => 'Call back request',
    'commercial'  => 'Commercial service request',
    'emergency'   => 'EMERGENCY roadside request',
    'repair'      => 'Repair Assessment',
];
const MAX_PER_HOUR = 10;
// Repair assessments may carry photos (owner, 2026-11-20).
const MAX_PHOTOS = 2;
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;
const MAX_ATTACH_BYTES = 12 * 1024 * 1024;
const PHOTO_TYPES = [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/webp' => 'webp',
    'image/heic' => 'heic',
    'image/heif' => 'heif',
];

function reply(int $code, array $body): void
{
    http_response_code($code);
    echo json_encode($body);
    exit;
}

function clean(string $s, int $max): string
{
    $s = preg_replace('/[\x00-\x09\x0B-\x1F\x7F]/u', '', $s) ?? '';
    return mb_substr(trim($s), 0, $max);
}

/** Where leads are kept: outside the web root when the host allows it. */
/**
 * Mailbox login for sending, if the deploy supplied one (api/mail-config.php,
 * written at build time from a GitHub secret, never committed). Without it
 * the server's built-in mail() is used.
 */
function mail_config(): ?array
{
    $file = __DIR__ . '/mail-config.php';
    if (!is_file($file)) {
        return null;
    }
    if (!defined('YBE_LEAD')) {
        define('YBE_LEAD', true);
    }
    $cfg = include $file;
    return (is_array($cfg) && !empty($cfg['host']) && !empty($cfg['user']) && !empty($cfg['pass'])) ? $cfg : null;
}

/**
 * Send one message through the mailbox's own mail server with a login
 * (SMTP). Mail sent this way is signed for the domain, which is what keeps it
 * out of spam folders. Returns false on any problem so the caller can fall
 * back to mail().
 */
function smtp_send(array $cfg, string $from, array $rcpts, string $headers, string $body): bool
{
    $fp = @stream_socket_client($cfg['host'], $errno, $errstr, 15);
    if (!$fp) {
        return false;
    }
    stream_set_timeout($fp, 25);
    $read = function () use ($fp): string {
        $data = '';
        while (($line = fgets($fp, 1024)) !== false) {
            $data .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') {
                break;
            }
        }
        return $data;
    };
    $say = function (string $cmd, string $expect) use ($fp, $read): bool {
        fwrite($fp, $cmd . "\r\n");
        return strncmp($read(), $expect, strlen($expect)) === 0;
    };
    $helo = preg_replace('/[^a-z0-9.-]/i', '', DOMAIN) ?: 'localhost';
    $ok = strncmp($read(), '220', 3) === 0
        && $say('EHLO ' . $helo, '250')
        && $say('AUTH LOGIN', '334')
        && $say(base64_encode($cfg['user']), '334')
        && $say(base64_encode($cfg['pass']), '235')
        && $say('MAIL FROM:<' . $from . '>', '250');
    foreach ($rcpts as $r) {
        $ok = $ok && $say('RCPT TO:<' . $r . '>', '25');
    }
    if ($ok && $say('DATA', '354')) {
        // CRLF line endings, and a leading dot doubled, as SMTP requires.
        $data = preg_replace('/\r\n|\r|\n/', "\r\n", $headers . "\r\n\r\n" . $body);
        $data = preg_replace('/^\./m', '..', $data);
        fwrite($fp, rtrim($data, "\r\n") . "\r\n");
        $ok = $say('.', '250');
    } else {
        $ok = false;
    }
    @fwrite($fp, "QUIT\r\n");
    @fclose($fp);
    return $ok;
}

function storage_dir(): ?string
{
    $candidates = [];
    if (!empty($_SERVER['DOCUMENT_ROOT'])) {
        $candidates[] = dirname(rtrim($_SERVER['DOCUMENT_ROOT'], '/')) . '/ybe-leads';
    }
    $candidates[] = dirname(__DIR__) . '/.ybe-leads';
    foreach ($candidates as $dir) {
        if (!is_dir($dir)) {
            @mkdir($dir, 0700, true);
        }
        if (is_dir($dir) && is_writable($dir)) {
            // If it ended up inside the web root, refuse web access to it.
            if (!file_exists($dir . '/.htaccess')) {
                @file_put_contents($dir . '/.htaccess', "Require all denied\nDeny from all\n");
            }
            return $dir;
        }
    }
    return null;
}

/**
 * Photos sent with the form: real uploads only, checked by content rather
 * than by the name or type the browser claims. Anything else is dropped.
 */
function uploaded_photos(): array
{
    $out = [];
    $f = $_FILES['photos'] ?? null;
    if (!is_array($f) || !is_array($f['tmp_name'] ?? null)) {
        return $out;
    }
    $finfo = function_exists('finfo_open') ? finfo_open(FILEINFO_MIME_TYPE) : false;
    foreach ($f['tmp_name'] as $i => $tmp) {
        if (count($out) >= MAX_PHOTOS) {
            break;
        }
        if (($f['error'][$i] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK || !is_uploaded_file((string) $tmp)) {
            continue;
        }
        $size = (int) @filesize($tmp);
        if ($size <= 0 || $size > MAX_PHOTO_BYTES) {
            continue;
        }
        $mime = $finfo ? (string) finfo_file($finfo, $tmp) : (string) ((@getimagesize($tmp))['mime'] ?? '');
        if (!isset(PHOTO_TYPES[$mime])) {
            continue;
        }
        $bytes = @file_get_contents($tmp);
        if ($bytes === false) {
            continue;
        }
        $out[] = ['tmp' => $tmp, 'mime' => $mime, 'ext' => PHOTO_TYPES[$mime], 'bytes' => $bytes];
    }
    return $out;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    reply(405, ['ok' => false, 'error' => 'method']);
}

// Only this site's own pages may post.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !preg_match('#^https?://(www\.)?' . preg_quote(DOMAIN, '#') . '$#i', $origin)) {
    reply(403, ['ok' => false, 'error' => 'origin']);
}

// A form with photos arrives as a multipart upload with the same JSON in a
// "payload" field; every other form posts the JSON as the request body.
$raw = isset($_POST['payload']) && is_string($_POST['payload'])
    ? substr($_POST['payload'], 0, 20000)
    : file_get_contents('php://input', false, null, 0, 20000);
$data = json_decode((string) $raw, true);
if (!is_array($data)) {
    reply(400, ['ok' => false, 'error' => 'json']);
}

$form = (string) ($data['form'] ?? '');
if (!isset(FORMS[$form])) {
    reply(400, ['ok' => false, 'error' => 'form']);
}

// Bots: a filled honeypot or a form sent within two seconds of the page
// loading. Answer "ok" so they learn nothing, and keep nothing.
if (trim((string) ($data['website'] ?? '')) !== '' || (int) ($data['elapsed'] ?? 0) < 2000) {
    reply(200, ['ok' => true]);
}

$lines = [];
foreach (array_slice((array) ($data['lines'] ?? []), 0, 25) as $line) {
    $line = clean((string) $line, 2000);
    if ($line !== '') {
        $lines[] = $line;
    }
}
$field = function (string $prefix) use ($lines): string {
    foreach ($lines as $l) {
        if (stripos($l, $prefix) === 0) {
            return trim(substr($l, strpos($l, ':') + 1));
        }
    }
    return '';
};
$phone = $field('Phone');
if (strlen(preg_replace('/\D/', '', $phone)) < 7) {
    reply(422, ['ok' => false, 'error' => 'phone']);
}
$name = $field('Your Name') ?: $field('Name');
$email = $field('Email');
$page = clean((string) ($data['page'] ?? ''), 300);

$dir = storage_dir();
$ip = $_SERVER['REMOTE_ADDR'] ?? '';

// Rate limit per visitor.
if ($dir !== null && $ip !== '') {
    $rl = $dir . '/rate-' . sha1($ip . DOMAIN) . '.json';
    $now = time();
    $hits = array_values(array_filter(
        (array) json_decode((string) @file_get_contents($rl), true),
        fn ($t) => is_int($t) && $t > $now - 3600
    ));
    if (count($hits) >= MAX_PER_HOUR) {
        reply(429, ['ok' => false, 'error' => 'rate']);
    }
    $hits[] = $now;
    @file_put_contents($rl, json_encode($hits), LOCK_EX);
}

// Photos (repair assessment only): keep them beside the lead list and name
// them on the lead, so the CSV row points at its pictures.
$photos = $form === 'repair' ? uploaded_photos() : [];
if ($photos) {
    $stamp = date('Ymd-His') . '-' . bin2hex(random_bytes(4));
    $photoDir = $dir !== null ? $dir . '/photos' : null;
    if ($photoDir !== null && !is_dir($photoDir)) {
        @mkdir($photoDir, 0700, true);
    }
    $names = [];
    foreach ($photos as $i => &$ph) {
        $ph['name'] = $stamp . '-' . ($i + 1) . '.' . $ph['ext'];
        if ($photoDir !== null && is_dir($photoDir) && @move_uploaded_file($ph['tmp'], $photoDir . '/' . $ph['name'])) {
            @chmod($photoDir . '/' . $ph['name'], 0600);
        }
        $names[] = $ph['name'];
    }
    unset($ph);
    $lines[] = 'Photos: ' . implode(', ', $names);
}

// 1. Save it.
$stored = false;
if ($dir !== null) {
    $csv = $dir . '/leads.csv';
    $new = !file_exists($csv);
    $fh = @fopen($csv, 'ab');
    if ($fh) {
        flock($fh, LOCK_EX);
        if ($new) {
            fputcsv($fh, ['received', 'form', 'name', 'phone', 'email', 'page', 'details']);
        }
        $stored = fputcsv($fh, [date('c'), FORMS[$form], $name, $phone, $email, $page, implode(' | ', $lines)]) !== false;
        flock($fh, LOCK_UN);
        fclose($fh);
    }
}

// 2. Email it to the owner.
// A repair assessment marked as an emergency says so at the front of the subject.
$urgent = $form === 'repair' && stripos($field('Is This An Emergency'), 'yes') === 0;

// (202) 505-1212 rather than whatever was typed.
$digits = preg_replace('/\D/', '', $phone);
if (strlen($digits) === 11 && $digits[0] === '1') {
    $digits = substr($digits, 1);
}
$phoneNice = strlen($digits) === 10
    ? '(' . substr($digits, 0, 3) . ') ' . substr($digits, 3, 3) . '-' . substr($digits, 6)
    : $phone;

// Subject (owner, 2026-11-20): "New Lead From YBE Auto", then who and the
// number, so each lead stays its own conversation in the inbox.
$subject = ($urgent ? 'EMERGENCY: ' : '') . 'New Lead From YBE Auto: ' . ($name !== '' ? $name . ', ' : '') . $phoneNice;
$subject = clean(str_replace(["\r", "\n"], ' ', $subject), 200);
$received = date('l, F j, Y g:i A T');
$replyTo = ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) ? $email : '';

// Each "Label: value" line becomes a row. Lines with no label are headings
// the form adds for the text hand-off and are left out.
$rows = [];
foreach ($lines as $l) {
    $at = strpos($l, ': ');
    if ($at === false) {
        continue;
    }
    $label = rtrim(substr($l, 0, $at), '?');
    $value = substr($l, $at + 2);
    if (stripos($label, 'Your Name') === 0) {
        $label = 'Name';
    }
    if (stripos($label, 'Phone') === 0) {
        $value = $phoneNice;
    }
    $rows[] = [$label, $value];
}

// Plain-text version, for mail apps that do not show HTML.
$text = ($urgent ? "EMERGENCY\n" : '') . "New Lead From YBE Auto\n" . FORMS[$form] . ' from ' . DOMAIN . "\n\n";
foreach ($rows as [$label, $value]) {
    $text .= $label . ': ' . $value . "\n";
}
$text .= "\nReceived: " . $received . "\nPage: " . $page . "\n";

// HTML version.
$e = fn (string $v): string => htmlspecialchars($v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$html = '<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f3f4f6;">'
    . '<div style="max-width:600px;margin:0 auto;padding:16px;font-family:Arial,Helvetica,sans-serif;color:#111827;">'
    . '<div style="background:#111111;color:#ffffff;padding:18px 20px;border-top:5px solid #d90d0d;">'
    . '<div style="font-size:22px;font-weight:bold;">New Lead From YBE Auto</div>'
    . '<div style="font-size:14px;letter-spacing:1px;text-transform:uppercase;color:#d1d5db;margin-top:4px;">' . $e(FORMS[$form]) . '</div></div>';
if ($urgent) {
    $html .= '<div style="background:#d90d0d;color:#ffffff;padding:12px 20px;font-size:17px;font-weight:bold;">EMERGENCY. Call this customer now.</div>';
}
$html .= '<div style="background:#ffffff;padding:8px 20px 20px;border:1px solid #e5e7eb;border-top:0;">'
    . '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">';
foreach ($rows as [$label, $value]) {
    $html .= '<tr><td style="padding:10px 12px 10px 0;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;text-transform:uppercase;color:#6b7280;vertical-align:top;width:38%;">' . $e($label) . '</td>'
        . '<td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:16px;color:#111827;vertical-align:top;">' . nl2br($e($value)) . '</td></tr>';
}
$html .= '</table><div style="margin-top:20px;">'
    . '<a href="tel:+1' . $e($digits) . '" style="display:inline-block;background:#d90d0d;color:#ffffff;text-decoration:none;font-weight:bold;font-size:16px;padding:12px 20px;margin:0 8px 8px 0;">Call ' . $e($phoneNice) . '</a>';
if ($replyTo !== '') {
    $html .= '<a href="mailto:' . $e($replyTo) . '" style="display:inline-block;background:#111111;color:#ffffff;text-decoration:none;font-weight:bold;font-size:16px;padding:12px 20px;margin:0 8px 8px 0;">Email the customer</a>';
}
$html .= '</div>';
if ($photos) {
    $html .= '<p style="font-size:14px;color:#374151;margin:14px 0 0;">' . count($photos) . (count($photos) === 1 ? ' photo is' : ' photos are') . ' attached to this email.</p>';
}
$html .= '<p style="font-size:12px;color:#6b7280;margin:16px 0 0;">Received ' . $e($received) . ' from ' . $e(DOMAIN . $page) . '</p>'
    . '</div></div></body></html>';

// Sender: the business name and the website's own domain, so the inbox does
// not show the hosting account name. Replies go to the customer when they
// gave an email address.
$from = '=?UTF-8?B?' . base64_encode(BUSINESS . ' Website') . '?= <' . FROM_EMAIL . '>';
$alt = 'ybe-alt-' . bin2hex(random_bytes(12));
$altPart = '--' . $alt . "\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
    . chunk_split(base64_encode($text))
    . '--' . $alt . "\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
    . chunk_split(base64_encode($html))
    . '--' . $alt . "--\r\n";

$attachBytes = array_sum(array_map(fn ($ph) => strlen($ph['bytes']), $photos));
$withPhotos = $photos && $attachBytes <= MAX_ATTACH_BYTES;
if ($withPhotos) {
    $mixed = 'ybe-mix-' . bin2hex(random_bytes(12));
    $contentType = 'multipart/mixed; boundary="' . $mixed . '"';
    $message = '--' . $mixed . "\r\nContent-Type: multipart/alternative; boundary=\"" . $alt . "\"\r\n\r\n" . $altPart;
    foreach ($photos as $ph) {
        $message .= '--' . $mixed . "\r\n"
            . 'Content-Type: ' . $ph['mime'] . '; name="' . $ph['name'] . "\"\r\n"
            . "Content-Transfer-Encoding: base64\r\n"
            . 'Content-Disposition: attachment; filename="' . $ph['name'] . "\"\r\n\r\n"
            . chunk_split(base64_encode($ph['bytes']));
    }
    $message .= '--' . $mixed . "--\r\n";
} else {
    $contentType = 'multipart/alternative; boundary="' . $alt . '"';
    $message = $altPart;
}

$recipients = TO_EMAIL . (filter_var(COPY_EMAIL, FILTER_VALIDATE_EMAIL) ? ', ' . COPY_EMAIL : '');
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$headersFor = function (bool $named, string $type) use ($from, $replyTo): string {
    $h = ['MIME-Version: 1.0', 'Content-Type: ' . $type];
    if ($named) {
        $h[] = 'From: ' . $from;
    }
    if ($replyTo !== '') {
        $h[] = 'Reply-To: ' . $replyTo;
    }
    return implode("\r\n", $h);
};
// First choice: send through the leads mailbox with its login, when the
// deploy supplied one. That mail is signed for the domain.
$emailed = false;
$via = 'none';
$smtp = mail_config();
if ($smtp !== null) {
    $rcpts = array_map('trim', explode(',', $recipients));
    $smtpHeaders = implode("\r\n", [
        'Date: ' . date('r'),
        'From: ' . $from,
        'To: ' . $recipients,
        'Subject: ' . $encodedSubject,
        'Message-ID: <' . bin2hex(random_bytes(16)) . '@' . (preg_replace('/[^a-z0-9.-]/i', '', DOMAIN) ?: 'localhost') . '>',
    ]) . "\r\n" . $headersFor(false, $contentType);
    $emailed = smtp_send($smtp, FROM_EMAIL, $rcpts, $smtpHeaders, $message);
    if ($emailed) {
        $via = 'mailbox';
    }
}
// Otherwise the server's own mail(): the full email first, then step by step
// down to plain text with the server's sender, so the lead still arrives.
if (!$emailed) {
    $emailed = @mail($recipients, $encodedSubject, $message, $headersFor(true, $contentType));
}
if (!$emailed) {
    $emailed = @mail($recipients, $encodedSubject, $message, $headersFor(false, $contentType));
}
if (!$emailed) {
    $emailed = @mail($recipients, $encodedSubject, $text, $headersFor(false, 'text/plain; charset=UTF-8'));
}
if ($emailed && $via === 'none') {
    $via = 'server';
}

if (!$stored && !$emailed) {
    reply(500, ['ok' => false, 'error' => 'delivery']);
}
reply(200, ['ok' => true, 'stored' => $stored, 'emailed' => $emailed, 'via' => $via]);
