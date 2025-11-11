<?php
// Файл: admin/news_delete.php

require_once 'auth_check.php'; // ✅ ДОБАВЛЕНО
require_once '../include_config/config.php';
require_once '../include_config/db_connect.php';

if (!isset($_GET['id']) || !filter_var($_GET['id'], FILTER_VALIDATE_INT)) {
    header('Location: news_list.php');
    exit;
}

$newsId = (int)$_GET['id'];

// ✅ ИСПРАВЛЕНО: используем таблицу news
$stmt = $pdo->prepare("SELECT image FROM news WHERE id = ?");
$stmt->execute([$newsId]);
$news = $stmt->fetch();

if ($news && !empty($news['image'])) {
    @unlink('..' . $news['image']);
}

// ✅ ИСПРАВЛЕНО: удаляем из таблицы news
$stmt = $pdo->prepare("DELETE FROM news WHERE id = ?");
$stmt->execute([$newsId]);

header('Location: news_list.php');
exit;