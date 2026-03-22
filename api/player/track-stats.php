<?php
/**
 * API для получения статистики трека
 * Метод: GET
 * Параметры:
 * - track_id (int, обязательный)
 */

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../../include_config/db_connect.php';

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Получаем ID трека
$trackId = isset($_GET['track_id']) ? (int)$_GET['track_id'] : 0;

// Валидация
if ($trackId <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Неверный ID трека']);
    exit;
}

try {
    // Получаем статистику трека.
    // Колонки likes/dislikes добавляются миграцией add_track_reactions.sql.
    // Если миграция ещё не запущена — получаем только views и возвращаем 0 для реакций.
    $stmt = $pdo->prepare("SELECT id, views FROM Track WHERE id = ?");
    $stmt->execute([$trackId]);
    $track = $stmt->fetch();

    if (!$track) {
        http_response_code(404);
        echo json_encode(['error' => 'Трек не найден']);
        exit;
    }

    // Проверяем, есть ли колонки likes/dislikes (запускалась ли миграция)
    $likesCount    = 0;
    $dislikesCount = 0;
    $userReaction  = null;

    try {
        $chk = $pdo->query("SHOW COLUMNS FROM Track LIKE 'likes'");
        if ($chk->rowCount() > 0) {
            $stmt2 = $pdo->prepare("SELECT likes, dislikes FROM Track WHERE id = ?");
            $stmt2->execute([$trackId]);
            $row = $stmt2->fetch();
            $likesCount    = (int)($row['likes']    ?? 0);
            $dislikesCount = (int)($row['dislikes'] ?? 0);
        }
    } catch (\Exception $ignored) {}

    // Реакция текущего пользователя (только если таблица существует)
    try {
        $userId    = isset($_SESSION['user_id']) ? (int)$_SESSION['user_id'] : null;
        $sessionId = $userId ? null : session_id();

        if ($userId) {
            $r = $pdo->prepare("SELECT reaction_type FROM TrackReactions WHERE track_id = ? AND user_id = ?");
            $r->execute([$trackId, $userId]);
        } else {
            $r = $pdo->prepare("SELECT reaction_type FROM TrackReactions WHERE track_id = ? AND session_id = ?");
            $r->execute([$trackId, $sessionId]);
        }
        $reaction = $r->fetch();
        if ($reaction) $userReaction = $reaction['reaction_type'];
    } catch (\Exception $ignored) {}

    echo json_encode([
        'success'       => true,
        'track_id'      => $trackId,
        'likes'         => $likesCount,
        'dislikes'      => $dislikesCount,
        'views'         => (int)$track['views'],
        'user_reaction' => $userReaction
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка при получении статистики: ' . $e->getMessage()]);
}
