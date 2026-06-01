<?php
/**
 * API: POST /api/user/logout.php
 * JWT — stateless, поэтому просто возвращаем успех.
 * Клиент удаляет токен из localStorage.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

require_once __DIR__ . '/../../include_config/APIResponse.php';

APIResponse::success([], 'Выход выполнен');
