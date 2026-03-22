<?php
// Файл: admin/delete_track.php

require_once __DIR__ . '/auth_check.php';
require_once '../include_config/config.php';
require_once '../include_config/db_connect.php';

// Принимаем только POST (GET-запросы легко CSRF-ить через простую ссылку)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}

// Проверяем CSRF-токен
if (!isset($_POST['csrf_token']) || !verify_csrf_token($_POST['csrf_token'])) {
    header('Location: index.php?error=csrf');
    exit;
}

// Проверяем ID
if (!isset($_POST['id']) || !filter_var($_POST['id'], FILTER_VALIDATE_INT)) {
    header('Location: index.php');
    exit;
}

$trackId = (int)$_POST['id'];

// Находим трек
$stmt = $pdo->prepare("SELECT * FROM Track WHERE id = ?");
$stmt->execute([$trackId]);
$track = $stmt->fetch();

if (!$track) {
    header('Location: index.php');
    exit;
}

// Удаляем физические файлы
if ($track['coverImagePath']) {
    @unlink('..' . $track['coverImagePath']);
}
if ($track['fullAudioPath']) {
    @unlink('..' . $track['fullAudioPath']);
}
if ($track['videoPath']) {
    @unlink('..' . $track['videoPath']);
}

// Удаляем запись из БД
$stmt = $pdo->prepare("DELETE FROM Track WHERE id = ?");
$stmt->execute([$trackId]);

header('Location: index.php?success=deleted');
exit;
