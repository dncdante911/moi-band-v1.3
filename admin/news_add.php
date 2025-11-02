<?php
/**
 * Файл: admin/news_add.php
 * ИСПРАВЛЕННАЯ ВЕРСИЯ с защитой от уязвимостей
 */

require_once __DIR__ . '/auth_check.php';
require_once '../include_config/config.php';
require_once '../include_config/db_connect.php';

// ✅ ДОБАВЛЕНО: Проверка авторизации
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: /admin/login.php');
    exit;
}

// ✅ ДОБАВЛЕНО: Генерация CSRF токена
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

$errors = [];
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // ✅ ДОБАВЛЕНО: Проверка CSRF токена
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        die('CSRF token validation failed');
    }
    
    // ✅ УЛУЧШЕНО: Безопасная валидация
    $title = trim($_POST['title'] ?? '');
    $content = trim($_POST['content'] ?? '');
    $category = $_POST['category'] ?? 'update';
    
    // Проверка категории из белого списка
    $allowed_categories = ['update', 'release', 'event'];
    if (!in_array($category, $allowed_categories)) {
        $category = 'update';
    }
    
    $image = '';

    if (empty($title)) {
        $errors[] = 'Заголовок обязателен!';
    }
    
    if (empty($content)) {
        $errors[] = 'Содержание обязательно!';
    }

    // ✅ ИСПРАВЛЕНО: Безопасная загрузка файлов
    if (!empty($_FILES['image']['name']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        
        // Проверяем MIME-тип через finfo
        $allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime_type = finfo_file($finfo, $_FILES['image']['tmp_name']);
        finfo_close($finfo);
        
        if (!in_array($mime_type, $allowed_types)) {
            $errors[] = 'Разрешены только изображения (JPG, PNG, GIF, WEBP)';
        } else {
            // Проверяем размер файла (макс 5MB)
            $max_size = 5 * 1024 * 1024; // 5MB
            if ($_FILES['image']['size'] > $max_size) {
                $errors[] = 'Размер файла не должен превышать 5MB';
            } else {
                $upload_dir = '../assets/uploads/news/';
                
                // Создаем директорию если нет
                if (!is_dir($upload_dir)) {
                    mkdir($upload_dir, 0755, true);
                }
                
                // ✅ ИСПРАВЛЕНО: Генерируем безопасное имя файла
                $extension = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
                // Очищаем расширение от потенциально опасных символов
                $extension = preg_replace('/[^a-z]/', '', $extension);
                $image_name = uniqid('news_', true) . '.' . $extension;
                $image_path = $upload_dir . $image_name;
                
                if (move_uploaded_file($_FILES['image']['tmp_name'], $image_path)) {
                    $image = '/assets/uploads/news/' . $image_name;
                } else {
                    $errors[] = 'Ошибка при загрузке изображения';
                }
            }
        }
    }

    // ✅ ИСПРАВЛЕНО: Используем таблицу news (не Posts)
    if (empty($errors)) {
        try {
            $stmt = $pdo->prepare("
                INSERT INTO news (title, content, category, image, created_at) 
                VALUES (?, ?, ?, ?, NOW())
            ");
            
            if ($stmt->execute([$title, $content, $category, $image])) {
                $success = true;
                // ✅ ДОБАВЛЕНО: Логируем успешное добавление
                write_log("Новость добавлена: {$title}", 'info');
            } else {
                $errors[] = 'Ошибка при сохранении в БД';
                write_log("Ошибка добавления новости: " . print_r($stmt->errorInfo(), true), 'error');
            }
        } catch (PDOException $e) {
            $errors[] = 'Ошибка базы данных';
            write_log("Ошибка БД при добавлении новости: " . $e->getMessage(), 'error');
        }
    }
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Добавить новость - Админ-панель</title>
    <link rel="stylesheet" href="../assets/css/admin_style.css">
    <style>
        .form-container { 
            max-width: 800px; 
            margin: 0 auto;
        }
        .form-group { 
            margin-bottom: 20px; 
        }
        .form-group label { 
            display: block; 
            margin-bottom: 8px; 
            font-weight: bold; 
            color: #FFD700; 
        }
        .form-group input, 
        .form-group textarea, 
        .form-group select { 
            width: 100%; 
            padding: 10px; 
            background-color: #111; 
            border: 1px solid #444; 
            color: #e0e0e0; 
            border-radius: 4px; 
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }
        .form-group textarea { 
            resize: vertical; 
            min-height: 200px; 
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
        .submit-button:hover { 
            background-color: #3182ce; 
        }
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
        .file-info {
            font-size: 0.9rem;
            color: #999;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container form-container">
        <h1>➕ Добавить новость</h1>
        
        <?php if ($success): ?>
            <div class="success">
                ✅ Новость успешно добавлена!
                <a href="news_list.php" style="color: #fff; text-decoration: underline;">К списку новостей</a>
            </div>
        <?php endif; ?>
        
        <?php if (!empty($errors)): ?>
            <div class="errors">
                <?php foreach ($errors as $error): ?>
                    <div>❌ <?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
        
        <form method="POST" enctype="multipart/form-data">
            <!-- ✅ ДОБАВЛЕНО: CSRF токен -->
            <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8') ?>">
            
            <div class="form-group">
                <label for="title">📝 Заголовок *</label>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    required 
                    maxlength="255"
                    placeholder="Название новости"
                    value="<?= isset($_POST['title']) ? htmlspecialchars($_POST['title'], ENT_QUOTES, 'UTF-8') : '' ?>"
                >
            </div>
            
            <div class="form-group">
                <label for="category">🏷️ Категория *</label>
                <select id="category" name="category" required>
                    <option value="update" <?= (isset($_POST['category']) && $_POST['category'] === 'update') ? 'selected' : '' ?>>Обновление</option>
                    <option value="release" <?= (isset($_POST['category']) && $_POST['category'] === 'release') ? 'selected' : '' ?>>Релиз</option>
                    <option value="event" <?= (isset($_POST['category']) && $_POST['category'] === 'event') ? 'selected' : '' ?>>Событие</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="content">✍️ Содержание *</label>
                <textarea 
                    id="content" 
                    name="content" 
                    required 
                    placeholder="Текст новости"
                ><?= isset($_POST['content']) ? htmlspecialchars($_POST['content'], ENT_QUOTES, 'UTF-8') : '' ?></textarea>
            </div>
            
            <div class="form-group">
                <label for="image">🖼️ Изображение</label>
                <input 
                    type="file" 
                    id="image" 
                    name="image" 
                    accept="image/jpeg,image/png,image/gif,image/webp"
                >
                <div class="file-info">Максимальный размер: 5MB. Форматы: JPG, PNG, GIF, WEBP</div>
            </div>
            
            <button type="submit" class="submit-button">✅ Добавить новость</button>
            <a href="news_list.php" style="margin-left: 15px; color: #FFD700; text-decoration: none;">← Назад</a>
        </form>
    </div>
</body>
</html>