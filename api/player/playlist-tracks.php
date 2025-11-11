<?php
/**
 * API для управления треками в плейлисте
 * Методы: POST (добавить), DELETE (удалить)
 */

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../../include_config/db_connect.php';

$method = $_SERVER['REQUEST_METHOD'];
$userId = isset($_SESSION['user_id']) ? (int)$_SESSION['user_id'] : null;

if (!$userId) {
    http_response_code(401);
    echo json_encode(['error' => 'Необходима авторизация']);
    exit;
}

// ============================================
// POST - Добавить трек в плейлист
// ============================================
if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $playlistId = isset($data['playlist_id']) ? (int)$data['playlist_id'] : 0;
    $trackId = isset($data['track_id']) ? (int)$data['track_id'] : 0;

    if ($playlistId <= 0 || $trackId <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Неверные данные']);
        exit;
    }

    try {
        // Проверяем права на плейлист
        $stmt = $pdo->prepare("SELECT user_id FROM Playlists WHERE id = ?");
        $stmt->execute([$playlistId]);
        $playlist = $stmt->fetch();

        if (!$playlist || $playlist['user_id'] != $userId) {
            http_response_code(403);
            echo json_encode(['error' => 'Нет прав на редактирование плейлиста']);
            exit;
        }

        // Проверяем существование трека
        $stmt = $pdo->prepare("SELECT id FROM Track WHERE id = ?");
        $stmt->execute([$trackId]);
        if (!$stmt->fetch()) {
            http_response_code(404);
            echo json_encode(['error' => 'Трек не найден']);
            exit;
        }

        // Проверяем, не добавлен ли уже трек
        $stmt = $pdo->prepare("SELECT id FROM PlaylistTracks WHERE playlist_id = ? AND track_id = ?");
        $stmt->execute([$playlistId, $trackId]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['error' => 'Трек уже в плейлисте']);
            exit;
        }

        // Получаем последнюю позицию
        $stmt = $pdo->prepare("SELECT MAX(position) as max_pos FROM PlaylistTracks WHERE playlist_id = ?");
        $stmt->execute([$playlistId]);
        $result = $stmt->fetch();
        $position = $result['max_pos'] ? $result['max_pos'] + 1 : 0;

        // Добавляем трек
        $stmt = $pdo->prepare("
            INSERT INTO PlaylistTracks (playlist_id, track_id, position)
            VALUES (?, ?, ?)
        ");
        $stmt->execute([$playlistId, $trackId, $position]);

        echo json_encode([
            'success' => true,
            'message' => 'Трек добавлен в плейлист'
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Ошибка при добавлении трека: ' . $e->getMessage()]);
    }
    exit;
}

// ============================================
// DELETE - Удалить трек из плейлиста
// ============================================
if ($method === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $playlistId = isset($data['playlist_id']) ? (int)$data['playlist_id'] : 0;
    $trackId = isset($data['track_id']) ? (int)$data['track_id'] : 0;

    if ($playlistId <= 0 || $trackId <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Неверные данные']);
        exit;
    }

    try {
        // Проверяем права на плейлист
        $stmt = $pdo->prepare("SELECT user_id FROM Playlists WHERE id = ?");
        $stmt->execute([$playlistId]);
        $playlist = $stmt->fetch();

        if (!$playlist || $playlist['user_id'] != $userId) {
            http_response_code(403);
            echo json_encode(['error' => 'Нет прав на редактирование плейлиста']);
            exit;
        }

        // Удаляем трек
        $stmt = $pdo->prepare("DELETE FROM PlaylistTracks WHERE playlist_id = ? AND track_id = ?");
        $stmt->execute([$playlistId, $trackId]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['error' => 'Трек не найден в плейлисте']);
            exit;
        }

        // Перестраиваем позиции
        $stmt = $pdo->prepare("
            UPDATE PlaylistTracks
            SET position = (@pos := @pos + 1) - 1
            WHERE playlist_id = ?
            ORDER BY position
        ");
        $pdo->query("SET @pos = 0");
        $stmt->execute([$playlistId]);

        echo json_encode([
            'success' => true,
            'message' => 'Трек удален из плейлиста'
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Ошибка при удалении трека: ' . $e->getMessage()]);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
