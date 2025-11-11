<?php
/**
 * API для управления плейлистами
 * Методы: GET, POST, PUT, DELETE
 */

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../../include_config/db_connect.php';

$method = $_SERVER['REQUEST_METHOD'];
$userId = isset($_SESSION['user_id']) ? (int)$_SESSION['user_id'] : null;

// ============================================
// GET - Получить список плейлистов
// ============================================
if ($method === 'GET') {
    try {
        if (isset($_GET['id'])) {
            // Получить конкретный плейлист
            $playlistId = (int)$_GET['id'];

            $stmt = $pdo->prepare("
                SELECT p.*,
                       (SELECT COUNT(*) FROM PlaylistTracks WHERE playlist_id = p.id) as track_count
                FROM Playlists p
                WHERE p.id = ? AND (p.is_public = 1 OR p.user_id = ?)
            ");
            $stmt->execute([$playlistId, $userId]);
            $playlist = $stmt->fetch();

            if (!$playlist) {
                http_response_code(404);
                echo json_encode(['error' => 'Плейлист не найден']);
                exit;
            }

            // Получаем треки плейлиста
            $stmt = $pdo->prepare("
                SELECT t.*, pt.position, pt.added_at
                FROM Track t
                INNER JOIN PlaylistTracks pt ON t.id = pt.track_id
                WHERE pt.playlist_id = ?
                ORDER BY pt.position ASC
            ");
            $stmt->execute([$playlistId]);
            $tracks = $stmt->fetchAll();

            echo json_encode([
                'success' => true,
                'playlist' => $playlist,
                'tracks' => $tracks
            ]);
        } else {
            // Получить список плейлистов
            if ($userId) {
                // Авторизованный пользователь видит свои и публичные
                $stmt = $pdo->prepare("
                    SELECT p.*,
                           (SELECT COUNT(*) FROM PlaylistTracks WHERE playlist_id = p.id) as track_count
                    FROM Playlists p
                    WHERE p.user_id = ? OR p.is_public = 1
                    ORDER BY p.created_at DESC
                ");
                $stmt->execute([$userId]);
            } else {
                // Анонимный видит только публичные
                $stmt = $pdo->query("
                    SELECT p.*,
                           (SELECT COUNT(*) FROM PlaylistTracks WHERE playlist_id = p.id) as track_count
                    FROM Playlists p
                    WHERE p.is_public = 1
                    ORDER BY p.created_at DESC
                ");
            }

            $playlists = $stmt->fetchAll();

            echo json_encode([
                'success' => true,
                'playlists' => $playlists
            ]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Ошибка при получении плейлистов: ' . $e->getMessage()]);
    }
    exit;
}

// ============================================
// POST - Создать новый плейлист
// ============================================
if ($method === 'POST') {
    if (!$userId) {
        http_response_code(401);
        echo json_encode(['error' => 'Необходима авторизация']);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    $name = isset($data['name']) ? trim($data['name']) : '';
    $description = isset($data['description']) ? trim($data['description']) : '';
    $isPublic = isset($data['is_public']) ? (int)$data['is_public'] : 0;

    if (empty($name)) {
        http_response_code(400);
        echo json_encode(['error' => 'Название плейлиста обязательно']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("
            INSERT INTO Playlists (user_id, name, description, is_public)
            VALUES (?, ?, ?, ?)
        ");
        $stmt->execute([$userId, $name, $description, $isPublic]);

        $playlistId = $pdo->lastInsertId();

        echo json_encode([
            'success' => true,
            'message' => 'Плейлист создан',
            'playlist_id' => $playlistId
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Ошибка при создании плейлиста: ' . $e->getMessage()]);
    }
    exit;
}

// ============================================
// PUT - Обновить плейлист
// ============================================
if ($method === 'PUT') {
    if (!$userId) {
        http_response_code(401);
        echo json_encode(['error' => 'Необходима авторизация']);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    $playlistId = isset($data['id']) ? (int)$data['id'] : 0;
    $name = isset($data['name']) ? trim($data['name']) : '';
    $description = isset($data['description']) ? trim($data['description']) : '';
    $isPublic = isset($data['is_public']) ? (int)$data['is_public'] : 0;

    if ($playlistId <= 0 || empty($name)) {
        http_response_code(400);
        echo json_encode(['error' => 'Неверные данные']);
        exit;
    }

    try {
        // Проверяем права
        $stmt = $pdo->prepare("SELECT user_id FROM Playlists WHERE id = ?");
        $stmt->execute([$playlistId]);
        $playlist = $stmt->fetch();

        if (!$playlist || $playlist['user_id'] != $userId) {
            http_response_code(403);
            echo json_encode(['error' => 'Нет прав на редактирование']);
            exit;
        }

        $stmt = $pdo->prepare("
            UPDATE Playlists
            SET name = ?, description = ?, is_public = ?
            WHERE id = ?
        ");
        $stmt->execute([$name, $description, $isPublic, $playlistId]);

        echo json_encode([
            'success' => true,
            'message' => 'Плейлист обновлен'
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Ошибка при обновлении плейлиста: ' . $e->getMessage()]);
    }
    exit;
}

// ============================================
// DELETE - Удалить плейлист
// ============================================
if ($method === 'DELETE') {
    if (!$userId) {
        http_response_code(401);
        echo json_encode(['error' => 'Необходима авторизация']);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    $playlistId = isset($data['id']) ? (int)$data['id'] : 0;

    if ($playlistId <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Неверный ID плейлиста']);
        exit;
    }

    try {
        // Проверяем права
        $stmt = $pdo->prepare("SELECT user_id FROM Playlists WHERE id = ?");
        $stmt->execute([$playlistId]);
        $playlist = $stmt->fetch();

        if (!$playlist || $playlist['user_id'] != $userId) {
            http_response_code(403);
            echo json_encode(['error' => 'Нет прав на удаление']);
            exit;
        }

        $stmt = $pdo->prepare("DELETE FROM Playlists WHERE id = ?");
        $stmt->execute([$playlistId]);

        echo json_encode([
            'success' => true,
            'message' => 'Плейлист удален'
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Ошибка при удалении плейлиста: ' . $e->getMessage()]);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
