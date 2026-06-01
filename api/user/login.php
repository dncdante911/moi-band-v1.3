<?php
/**
 * API: POST /api/user/login.php
 * Body: { email, password }
 * Response: { token, user }
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

require_once __DIR__ . '/../../include_config/db_connect.php';
require_once __DIR__ . '/../../include_config/APIResponse.php';
require_once __DIR__ . '/../../include_config/JWTHandler.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    APIResponse::error('Method not allowed', 405);
}

$body = json_decode(file_get_contents('php://input'), true);
$email    = trim($body['email']    ?? '');
$password = trim($body['password'] ?? '');

if (!$email || !$password) {
    APIResponse::error('Email и пароль обязательны', 400);
}

$stmt = $pdo->prepare(
    "SELECT id, username, email, password_hash, role FROM Users WHERE email = ? LIMIT 1"
);
$stmt->execute([strtolower($email)]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    APIResponse::error('Неверный email или пароль', 401);
}

$jwt = new JWTHandler();
$token = $jwt->generateToken([
    'user_id' => $user['id'],
    'username' => $user['username'],
    'role' => $user['role'] ?? 'user',
]);

unset($user['password_hash']);
APIResponse::success(['token' => $token, 'user' => $user]);
