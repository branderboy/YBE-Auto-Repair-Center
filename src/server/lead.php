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
const DOMAIN = '{{DOMAIN}}';
const BUSINESS = '{{BUSINESS}}';
const FORMS = [
    'callback'    => 'Call back request',
    'commercial'  => 'Commercial service request',
    'emergency'   => 'EMERGENCY roadside request',
    'repair'      => 'Repair assessment',
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
$subject = ($urgent ? 'EMERGENCY: ' : '') . FORMS[$form] . ($name !== '' ? ': ' . $name : '') . ' (' . $phone . ')';
$subject = clean(str_replace(["\r", "\n"], ' ', $subject), 200);
$body = FORMS[$form] . " from " . DOMAIN . "\n\n" . implode("\n", $lines)
    . "\n\nPage: " . $page . "\nReceived: " . date('l, F j, Y g:i A T') . "\n";
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];
if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers[] = 'Reply-To: ' . $email;
}
$recipients = TO_EMAIL . (filter_var(COPY_EMAIL, FILTER_VALIDATE_EMAIL) ? ', ' . COPY_EMAIL : '');
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$emailed = false;

// With photos: one multipart email carrying them as attachments.
$attachBytes = array_sum(array_map(fn ($ph) => strlen($ph['bytes']), $photos));
if ($photos && $attachBytes <= MAX_ATTACH_BYTES) {
    $boundary = 'ybe-' . bin2hex(random_bytes(12));
    $mixed = $headers;
    $mixed[1] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';
    $message = '--' . $boundary . "\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: 8bit\r\n\r\n"
        . $body . "\r\n";
    foreach ($photos as $ph) {
        $message .= '--' . $boundary . "\r\n"
            . 'Content-Type: ' . $ph['mime'] . '; name="' . $ph['name'] . "\"\r\n"
            . "Content-Transfer-Encoding: base64\r\n"
            . 'Content-Disposition: attachment; filename="' . $ph['name'] . "\"\r\n\r\n"
            . chunk_split(base64_encode($ph['bytes']));
    }
    $message .= '--' . $boundary . "--\r\n";
    $emailed = @mail($recipients, $encodedSubject, $message, implode("\r\n", $mixed));
}
// No photos, or the email with attachments was refused: send the text alone.
// The photo file names are already in the body.
if (!$emailed) {
    $emailed = @mail($recipients, $encodedSubject, $body, implode("\r\n", $headers));
}

if (!$stored && !$emailed) {
    reply(500, ['ok' => false, 'error' => 'delivery']);
}
reply(200, ['ok' => true, 'stored' => $stored, 'emailed' => $emailed]);
