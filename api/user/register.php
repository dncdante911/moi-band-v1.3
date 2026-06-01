<?php
/**
 * API: POST /api/user/register.php
 * Body: { username, email, password }
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

require_once __DIR__ . '/../../include_config/db_connect.php';
require_once __DIR__ . '/../../include_config/APIResponse.php';
require_once __DIR__ . '/../../include_config/JWTHandler.php';
require_once __DIR__ . '/../../include_config/Auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    APIResponse::error('Method not allowed', 405);
}

$body     = json_decode(file_get_contents('php://input'), true);
$username = trim($body['username'] ?? '');
$email    = trim($body['email']    ?? '');
$password = trim($body['password'] ?? '');

if (!$username || !$email || !$password) {
    APIResponse::error('Все поля обязательны', 400);
}

$auth = new Auth($pdo);
$result = $auth->register($username, $email, $password);

if (!$result['success']) {
    APIResponse::error(implode('. ', $result['errors']), 422);
}

$stmt = $pdo->prepare("SELECT id, username, email, role FROM Users WHERE email = ? LIMIT 1");
$stmt->execute([strtolower($email)]);
$user = $stmt->fetch();

$jwt = new JWTHandler();
$token = $jwt->generateToken([
    'user_id' => $user['id'],
    'username' => $user['username'],
    'role' => $user['role'] ?? 'user',
]);

APIResponse::success(['token' => $token, 'user' => $user], 'Регистрация успешна', 201);
