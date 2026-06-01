<?php
/**
 * API: gallery.php
 * GET /api/gallery.php — список изображений галереи
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

require_once __DIR__ . '/../include_config/db_connect.php';
require_once __DIR__ . '/../include_config/APIResponse.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    APIResponse::error('Method not allowed', 405);
}

$stmt = $pdo->query(
    "SELECT id, title, image_path, created_at FROM gallery ORDER BY created_at DESC"
);
$items = $stmt->fetchAll();
APIResponse::success($items);
