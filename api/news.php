<?php
/**
 * API: news.php
 * GET /api/news.php                     — список новостей
 * GET /api/news.php?id=N                — одна новость
 * GET /api/news.php?limit=9&offset=0    — пагинация
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

require_once __DIR__ . '/../include_config/db_connect.php';
require_once __DIR__ . '/../include_config/APIResponse.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    APIResponse::error('Method not allowed', 405);
}

if (isset($_GET['id'])) {
    $id = (int)$_GET['id'];
    $stmt = $pdo->prepare("SELECT id, title, content, created_at FROM news WHERE id = ?");
    $stmt->execute([$id]);
    $post = $stmt->fetch();
    if (!$post) {
        APIResponse::error('News not found', 404);
    }
    APIResponse::success($post);
}

$limit  = max(1, min(50, (int)($_GET['limit']  ?? 10)));
$offset = max(0, (int)($_GET['offset'] ?? 0));

$stmt = $pdo->prepare(
    "SELECT id, title, content, created_at FROM news ORDER BY created_at DESC LIMIT ? OFFSET ?"
);
$stmt->bindValue(1, $limit,  PDO::PARAM_INT);
$stmt->bindValue(2, $offset, PDO::PARAM_INT);
$stmt->execute();
$posts = $stmt->fetchAll();
APIResponse::success($posts);
