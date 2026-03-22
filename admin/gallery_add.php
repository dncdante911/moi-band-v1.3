<?php
// Файл: admin/gallery_add.php

require_once __DIR__ . '/auth_check.php';
require_once '../include_config/config.php';
require_once '../include_config/db_connect.php';

$errors = [];
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Проверка CSRF-токена
    if (!isset($_POST['csrf_token']) || !verify_csrf_token($_POST['csrf_token'])) {
        $errors[] = 'Неверный CSRF-токен. Попробуйте ещё раз.';
    }

    $title    = trim($_POST['title'] ?? '');
    $category = trim($_POST['category'] ?? 'studio');

    $allowedCategories = ['studio', 'concert', 'event', 'promo'];
    if (!in_array($category, $allowedCategories, true)) {
        $category = 'studio';
    }

    if (empty($title)) {
        $errors[] = 'Заполни название фото!';
    }

    if (empty($_FILES['image']['name'])) {
        $errors[] = 'Выбери изображение!';
    }

    // Серверная проверка MIME типа (клиентский accept легко обойти)
    if (empty($errors) && !empty($_FILES['image']['name'])) {
        $allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $detectedMime = finfo_file($finfo, $_FILES['image']['tmp_name']);
        finfo_close($finfo);

        if (!in_array($detectedMime, $allowedMimes, true)) {
            $errors[] = 'Недопустимый тип файла. Разрешены: JPG, PNG, WebP, GIF.';
        }

        // Проверяем что это действительно изображение (не polyglot-файл)
        if (empty($errors) && @getimagesize($_FILES['image']['tmp_name']) === false) {
            $errors[] = 'Файл повреждён или не является изображением.';
        }
    }

    if (empty($errors) && !empty($_FILES['image']['name'])) {
        $upload_dir = '../assets/uploads/gallery/';
        if (!is_dir($upload_dir)) mkdir($upload_dir, 0755, true);

        // Безопасное имя файла с хешем
        $ext        = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
        $image_name = hash('sha256', uniqid() . time()) . '.' . $ext;
        $image_path = $upload_dir . $image_name;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $image_path)) {
            @chmod($image_path, 0644);
            $image_url = '/assets/uploads/gallery/' . $image_name;
            
            $stmt = $pdo->prepare("INSERT INTO gallery (title, category, image_url, created_at) VALUES (?, ?, ?, NOW())");
            if ($stmt->execute([$title, $category, $image_url])) {
                $success = true;
            } else {
                $errors[] = 'Ошибка при сохранении в БД';
            }
        } else {
            $errors[] = 'Ошибка при загрузке изображения';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Добавить фото - Админ-панель</title>
    <link rel="stylesheet" href="../assets/css/admin_style.css">
    <style>
        .form-container { max-width: 600px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: bold; color: #FFD700; }
        .form-group input, .form-group select { 
            width: 100%; 
            padding: 10px; 
            background-color: #111; 
            border: 1px solid #444; 
            color: #e0e0e0; 
            border-radius: 4px; 
            box-sizing: border-box;
        }
        .submit-button { 
            padding: 12px 30px; 
            background-color: #2b6cb0; 
            color: #fff; 
            border: none; 
            border-radius: 4px; 
            font-size: 1rem; 
            cursor: pointer;
            font-weight: bold;
        }
        .submit-button:hover { background-color: #3182ce; }
        .errors { 
            background-color: #c53030; 
            color: #fff; 
            padding: 15px; 
            border-radius: 4px; 
            margin-bottom: 20px;
        }
        .success { 
            background-color: #38A169; 
            color: #fff; 
            padding: 15px; 
            border-radius: 4px; 
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container form-container">
        <h1>➕ Добавить фото в галерею</h1>
        
        <?php if ($success): ?>
            <div class="success">
                ✅ Фото успешно добавлено! <a href="gallery_list.php" style="color: #fff; text-decoration: underline;">К галерее</a>
            </div>
        <?php endif; ?>
        
        <?php if (!empty($errors)): ?>
            <div class="errors">
                <?php foreach ($errors as $error): ?>
                    <div>❌ <?= htmlspecialchars($error) ?></div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
        
        <form method="POST" enctype="multipart/form-data">
            <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token'] ?? '') ?>">
            <div class="form-group">
                <label for="title">📝 Название фото *</label>
                <input type="text" id="title" name="title" required placeholder="Описание фото">
            </div>
            
            <div class="form-group">
                <label for="category">🏷️ Категория *</label>
                <select id="category" name="category" required>
                    <option value="studio">Студия</option>
                    <option value="concert">Концерт</option>
                    <option value="event">Событие</option>
                    <option value="promo">Промо</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="image">🖼️ Выбери фото *</label>
                <input type="file" id="image" name="image" accept="image/*" required>
            </div>
            
            <button type="submit" class="submit-button">✅ Добавить фото</button>
            <a href="gallery_list.php" style="margin-left: 15px; color: #FFD700; text-decoration: none;">← Назад</a>
        </form>
    </div>
</body>
</html>