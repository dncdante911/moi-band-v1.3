<?php
/**
 * Файл: api/player/stream.php
 * Защищённый стриминг аудиофайлов.
 *
 * Два режима вызова:
 *   1. Прямой:   /api/player/stream.php?id=TRACK_ID
 *   2. Через .htaccess rewrite: параметр _file=имя_файла.mp3 (добавляет Apache)
 *
 * Проверяет наличие активной PHP-сессии или Referer от домена сайта.
 * Поддерживает byte-range для корректной перемотки в браузере.
 */

define('SKIP_SESSION_START', true);
require_once __DIR__ . '/../../include_config/config.php';
require_once __DIR__ . '/../../include_config/db_connect.php';

// ── Проверка доступа: сессия ИЛИ правильный Referer ───────────────
session_start();
$hasSession = !empty($_SESSION);

$referer     = $_SERVER['HTTP_REFERER'] ?? '';
$siteUrl     = rtrim(SITE_URL, '/');
$serverHost  = $_SERVER['HTTP_HOST'] ?? '';
$hasValidReferer = !empty($referer) && (
    strpos($referer, $siteUrl) === 0 ||
    (!empty($serverHost) && strpos($referer, $serverHost) !== false)
);

if (!$hasSession && !$hasValidReferer) {
    http_response_code(403);
    exit('Доступ запрещён');
}

// ── Определяем путь к файлу ────────────────────────────────────────
//   Режим 1: ?id=TRACK_ID — ищем в БД
//   Режим 2: ?_file=имя_файла.mp3 — используем имя файла из rewrite
$filePath = null;

if (!empty($_GET['id'])) {
    // Режим 1: по ID трека
    $trackId = (int)$_GET['id'];
    if ($trackId <= 0) {
        http_response_code(400);
        exit('Неверный ID трека');
    }
    try {
        $stmt = $pdo->prepare("SELECT fullAudioPath FROM Track WHERE id = ? LIMIT 1");
        $stmt->execute([$trackId]);
        $track = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        http_response_code(500);
        exit('Ошибка БД');
    }
    if (!$track || empty($track['fullAudioPath'])) {
        http_response_code(404);
        exit('Трек не найден');
    }
    $relativePath = ltrim($track['fullAudioPath'], '/');

} elseif (!empty($_GET['_file'])) {
    // Режим 2: внутренний rewrite от Apache — имя файла
    // Только имя файла (без пути), чтобы исключить path traversal
    $filename = basename($_GET['_file']);
    // Проверяем что расширение аудио
    if (!preg_match('/\.(mp3|wav|flac|ogg|m4a)$/i', $filename)) {
        http_response_code(400);
        exit('Неверный тип файла');
    }
    $relativePath = 'public/uploads/full/' . $filename;

} else {
    http_response_code(400);
    exit('Необходим параметр id или _file');
}

// ── Строим абсолютный путь и проверяем что он внутри uploads ──────
$filePath    = realpath(BASE_PATH . '/' . $relativePath);
$uploadsPath = realpath(BASE_PATH . '/public/uploads');

if (
    $filePath === false ||
    !is_file($filePath) ||
    $uploadsPath === false ||
    strpos($filePath, $uploadsPath) !== 0
) {
    http_response_code(404);
    exit('Файл не найден');
}

// ── Определяем MIME тип ────────────────────────────────────────────
$ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
$mimeMap = [
    'mp3'  => 'audio/mpeg',
    'wav'  => 'audio/wav',
    'flac' => 'audio/flac',
    'ogg'  => 'audio/ogg',
    'm4a'  => 'audio/mp4',
];
$mime = $mimeMap[$ext] ?? 'audio/mpeg';

$fileSize = filesize($filePath);

// ── Byte-range support (нужен для перемотки в браузере) ───────────
$start  = 0;
$end    = $fileSize - 1;
$length = $fileSize;

if (isset($_SERVER['HTTP_RANGE'])) {
    if (preg_match('/bytes=(\d*)-(\d*)/', $_SERVER['HTTP_RANGE'], $matches)) {
        $start = $matches[1] !== '' ? (int)$matches[1] : 0;
        $end   = $matches[2] !== '' ? (int)$matches[2] : $fileSize - 1;

        if ($start > $end || $end >= $fileSize) {
            header('HTTP/1.1 416 Range Not Satisfiable');
            header("Content-Range: bytes */$fileSize");
            exit;
        }

        $length = $end - $start + 1;
        http_response_code(206);
        header("Content-Range: bytes $start-$end/$fileSize");
    }
} else {
    http_response_code(200);
}

// ── Заголовки ─────────────────────────────────────────────────────
header('Content-Type: ' . $mime);
header('Content-Length: ' . $length);
header('Accept-Ranges: bytes');
header('Content-Disposition: inline'); // НЕ attachment — предотвращает автоскачивание
header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');
header('Pragma: no-cache');

// ── Стримим файл ──────────────────────────────────────────────────
$fp = fopen($filePath, 'rb');
if (!$fp) {
    http_response_code(500);
    exit('Ошибка чтения файла');
}

fseek($fp, $start);
$remaining = $length;
$chunkSize = 8192; // 8 KB

while ($remaining > 0 && !feof($fp) && !connection_aborted()) {
    $read = min($chunkSize, $remaining);
    echo fread($fp, $read);
    $remaining -= $read;
    flush();
}

fclose($fp);
