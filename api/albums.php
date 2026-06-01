<?php
/**
 * API: albums.php
 * GET /api/albums.php              — список всех альбомов
 * GET /api/albums.php?id=N         — один альбом
 * GET /api/albums.php?album_id=N&tracks=1 — треки альбома
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

require_once __DIR__ . '/../include_config/db_connect.php';
require_once __DIR__ . '/../include_config/APIResponse.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    APIResponse::error('Method not allowed', 405);
}

// Треки альбома
if (isset($_GET['album_id']) && isset($_GET['tracks'])) {
    $albumId = (int)$_GET['album_id'];
    try {
        $stmt = $pdo->prepare(
            "SELECT id, title, description, albumId, coverImagePath, fullAudioPath,
                    duration, views, videoPath
             FROM Track WHERE albumId = ? ORDER BY id ASC"
        );
        $stmt->execute([$albumId]);
        $tracks = $stmt->fetchAll();

        // Sanitize strings to valid UTF-8 to prevent json_encode failure
        foreach ($tracks as &$t) {
            foreach ($t as $k => $v) {
                if (is_string($v)) {
                    $t[$k] = mb_convert_encoding($v, 'UTF-8', 'UTF-8');
                }
            }
        }
        unset($t);

        $json = json_encode(['success' => true, 'message' => 'Success', 'data' => $tracks],
                             JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        if ($json === false) {
            APIResponse::error('Ошибка кодирования данных: ' . json_last_error_msg(), 500);
        }
        http_response_code(200);
        echo $json;
        exit;
    } catch (\PDOException $e) {
        write_log('Tracks query error: ' . $e->getMessage(), 'error');
        APIResponse::error('Ошибка загрузки треков', 500);
    }
}

// Один альбом
if (isset($_GET['id'])) {
    $id = (int)$_GET['id'];
    $stmt = $pdo->prepare(
        "SELECT id, title, description, coverImagePath, releaseDate
         FROM Albums WHERE id = ?"
    );
    $stmt->execute([$id]);
    $album = $stmt->fetch();
    if (!$album) {
        APIResponse::error('Album not found', 404);
    }
    APIResponse::success($album);
}

// Все альбомы
$stmt = $pdo->query(
    "SELECT id, title, description, coverImagePath, releaseDate
     FROM Albums ORDER BY releaseDate DESC"
);
$albums = $stmt->fetchAll();
APIResponse::success($albums);
