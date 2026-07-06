<?php
/**
 * Файл: api/player/queue.php
 * ИСПРАВЛЕННАЯ ВЕРСИЯ - ВИДЕО РАБОТАЕТ!
 */

header('Content-Type: application/json; charset=utf-8');

require_once '../../include_config/config.php';
require_once '../../include_config/db_connect.php';
require_once '../../include_config/StreamToken.php';

$albumId = intval($_GET['album_id'] ?? 0);
$playlistId = intval($_GET['playlist_id'] ?? 0);

try {
    $tracks = [];
    
    // === ПОЛУЧИТЬ ТРЕКИ ИЗ АЛЬБОМА ===
    if ($albumId > 0) {
        console_log("📀 Fetching album #$albumId");
        
        $stmt = $pdo->prepare("
            SELECT 
                t.id,
                t.title,
                t.description,
                t.albumId,
                t.coverImagePath,
                t.fullAudioPath,
                t.videoPath,
                t.lyricsPath,
                t.duration,
                t.likes,
                t.views,
                a.title as albumTitle
            FROM Track t
            LEFT JOIN Albums a ON t.albumId = a.id
            WHERE t.albumId = ?
            ORDER BY t.id ASC
        ");
        $stmt->execute([$albumId]);
        $tracks = $stmt->fetchAll();
        
        console_log("✅ Album #$albumId loaded: " . count($tracks) . " tracks");
    } 
    // === ПОЛУЧИТЬ ТРЕКИ ИЗ ПЛЕЙЛИСТА ===
    else if ($playlistId > 0) {
        console_log("📋 Fetching playlist #$playlistId");
        
        $stmt = $pdo->prepare("
            SELECT 
                t.id,
                t.title,
                t.description,
                t.albumId,
                t.coverImagePath,
                t.fullAudioPath,
                t.videoPath,
                t.lyricsPath,
                t.duration,
                t.likes,
                t.views,
                a.title as albumTitle
            FROM Track t
            LEFT JOIN Albums a ON t.albumId = a.id
            INNER JOIN PlaylistTracks pt ON t.id = pt.track_id
            WHERE pt.playlist_id = ?
            ORDER BY pt.position ASC
        ");
        $stmt->execute([$playlistId]);
        $tracks = $stmt->fetchAll();
        
        console_log("✅ Playlist #$playlistId loaded: " . count($tracks) . " tracks");
    }
    
    // === ПРОВЕРИТЬ НАЛИЧИЕ ФАЙЛОВ ===
    $processedTracks = [];
    foreach ($tracks as $track) {
        // Проверяем аудиофайл
        $audioExists = false;
        if (!empty($track['fullAudioPath'])) {
            $audioPath = ltrim($track['fullAudioPath'], '/');
            $fullAudioPath = dirname(__DIR__, 2) . '/' . $audioPath;
            $audioExists = file_exists($fullAudioPath);
            
            if (!$audioExists) {
                console_log("⚠️ Audio missing for track #{$track['id']}: $audioPath");
            }
        }
        
        // Проверяем видеофайл
        $videoExists = false;
        $videoPath = null;
        if (!empty($track['videoPath'])) {
            $videoFile = ltrim($track['videoPath'], '/');
            $fullVideoPath = dirname(__DIR__, 2) . '/' . $videoFile;
            $videoExists = file_exists($fullVideoPath);
            
            if ($videoExists) {
                $videoPath = $track['videoPath'];
                console_log("✅ Video found for track #{$track['id']}: $videoPath");
            } else {
                console_log("⚠️ Video missing for track #{$track['id']}: $videoPath");
            }
        }
        
        // Проверяем обложку
        $coverExists = false;
        if (!empty($track['coverImagePath'])) {
            $coverFile = ltrim($track['coverImagePath'], '/');
            $fullCoverPath = dirname(__DIR__, 2) . '/' . $coverFile;
            $coverExists = file_exists($fullCoverPath);
        }
        
        $processedTracks[] = [
            'id' => (int)$track['id'],
            'title' => htmlspecialchars($track['title']),
            'description' => htmlspecialchars($track['description'] ?? ''),
            'albumTitle' => htmlspecialchars($track['albumTitle'] ?? 'Album'),
            'coverImagePath' => $track['coverImagePath'],
            // Подписанная, ограниченная по времени ссылка вместо сырого пути
            // к файлу — см. include_config/StreamToken.php.
            'fullAudioPath' => $audioExists ? build_stream_url($track['id']) : null,
            'videoPath' => $videoPath, // Только если видео существует
            'lyricsPath' => $track['lyricsPath'],
            'duration' => (int)($track['duration'] ?? 0),
            'likes' => (int)($track['likes'] ?? 0),
            'views' => (int)($track['views'] ?? 0),
            // === ОТЛАДКА ===
            '_debug' => [
                'audioExists' => $audioExists,
                'videoExists' => $videoExists,
                'coverExists' => $coverExists
            ]
        ];
    }
    
    // === ВЕРНУТЬ РЕЗУЛЬТАТ ===
    echo json_encode([
        'success' => true,
        'count' => count($processedTracks),
        'tracks' => $processedTracks
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    
    console_log("✅ API Response: " . count($processedTracks) . " tracks sent");
    
} catch (\Throwable $e) {
    // \Throwable (не только \Exception) — иначе фатальные ошибки (например
    // "Call to undefined function" или "Failed opening required" при
    // отсутствующем на сервере файле) вообще не попадают сюда и уходят
    // голой 500-кой без тела ответа — именно так и произошло, когда сюда
    // добавили require StreamToken.php, а сам файл не задеплоился.
    console_log("❌ API Error: " . $e->getMessage());
    error_log('queue.php: ' . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => DEBUG_MODE ? $e->getMessage() : 'Внутренняя ошибка сервера'
    ]);
}

/**
 * Логирование в error_log
 */
function console_log($msg) {
    if (DEBUG_MODE) {
        error_log($msg);
    }
}
?>