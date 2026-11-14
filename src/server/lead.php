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
const DOMAIN = '{{DOMAIN}}';
const BUSINESS = '{{BUSINESS}}';
const FORMS = [
    'callback'    => 'Call back request',
    'commercial'  => 'Commercial service request',
    'emergency'   => 'EMERGENCY roadside request',
];
const MAX_PER_HOUR = 10;

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

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    reply(405, ['ok' => false, 'error' => 'method']);
}

// Only this site's own pages may post.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !preg_match('#^https?://(www\.)?' . preg_quote(DOMAIN, '#') . '$#i', $origin)) {
    reply(403, ['ok' => false, 'error' => 'origin']);
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
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
$subject = FORMS[$form] . ($name !== '' ? ': ' . $name : '') . ' (' . $phone . ')';
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
$emailed = @mail(TO_EMAIL, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));

if (!$stored && !$emailed) {
    reply(500, ['ok' => false, 'error' => 'delivery']);
}
reply(200, ['ok' => true, 'stored' => $stored, 'emailed' => $emailed]);
