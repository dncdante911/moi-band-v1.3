<?php
// Файл: admin/news_edit.php

require_once 'auth_check.php'; // ✅ ДОБАВЛЕНО
require_once '../include_config/config.php';
require_once '../include_config/db_connect.php';

if (!isset($_GET['id']) || !filter_var($_GET['id'], FILTER_VALIDATE_INT)) {
    header('Location: news_list.php');
    exit;
}
$newsId = (int)$_GET['id'];
$errors = [];

// Обработка отправленной формы
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $content = trim($_POST['content'] ?? '');
    $category = trim($_POST['category'] ?? 'update');

    if (empty($title)) $errors[] = 'Заголовок не может быть пустым.';
    if (empty($content)) $errors[] = 'Текст новости не может быть пустым.';

    if (empty($errors)) {
        // ✅ ИСПРАВЛЕНО: используем таблицу news
        $stmt = $pdo->prepare("SELECT image FROM news WHERE id = ?");
        $stmt->execute([$newsId]);
        $currentNews = $stmt->fetch();
        $image = $currentNews['image'];

        // Если загружен новый файл, заменяем старый
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = '../assets/uploads/news/';
            if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
            $fileExtension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
            $fileName = time() . '_' . uniqid() . '.' . $fileExtension;
            $uploadPath = $uploadDir . $fileName;

            if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadPath)) {
                // Если старый файл был, удаляем его
                if ($image) {
                    @unlink('..' . $image);
                }
                $image = '/assets/uploads/news/' . $fileName;
            } else {
                $errors[] = 'Не удалось загрузить новое изображение.';
            }
        }

        // Если ошибок с файлом не было, обновляем запись
        if (empty($errors)) {
            // ✅ ИСПРАВЛЕНО: обновляем таблицу news с полем category
            $sql = "UPDATE news SET title = :title, content = :content, image = :image, category = :category WHERE id = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':title' => $title,
                ':content' => $content,
                ':image' => $image,
                ':category' => $category,
                ':id' => $newsId
            ]);

            header('Location: news_list.php');
            exit;
        }
    }
}

// Загружаем данные новости для отображения в форме
$stmt = $pdo->prepare("SELECT * FROM news WHERE id = ?");
$stmt->execute([$newsId]);
$news = $stmt->fetch();

if (!$news) {
    header('Location: news_list.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Редактировать новость - Админ-панель</title>
    <link rel="stylesheet" href="../assets/css/admin_style.css">
</head>
<body>
    <div class="container">
        <h1>Редактировать новость</h1>

        <?php if (!empty($errors)): ?>
            <div class="errors">
                <ul><?php foreach ($errors as $error) echo "<li>" . htmlspecialchars($error) . "</li>"; ?></ul>
            </div>
        <?php endif; ?>

        <form action="news_edit.php?id=<?= $newsId ?>" method="POST" enctype="multipart/form-data">
            <div class="form-group">
                <label for="title">Заголовок *</label>
                <input type="text" id="title" name="title" value="<?= htmlspecialchars($news['title']) ?>" required>
            </div>
            
            <div class="form-group">
                <label for="category">Категория *</label>
                <select id="category" name="category" required>
                    <option value="update" <?= $news['category'] === 'update' ? 'selected' : '' ?>>Обновление</option>
                    <option value="release" <?= $news['category'] === 'release' ? 'selected' : '' ?>>Релиз</option>
                    <option value="event" <?= $news['category'] === 'event' ? 'selected' : '' ?>>Событие</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="content">Текст *</label>
                <textarea id="content" name="content" rows="10" required><?= htmlspecialchars($news['content']) ?></textarea>
            </div>
            
            <div class="form-group">
                <label for="image">Изображение (оставить пустым, чтобы не менять)</label>
                <input type="file" id="image" name="image" accept="image/*">
                <?php if ($news['image']): ?>
                    <div class="current-file">
                        Текущее: <img src="../<?= htmlspecialchars($news['image']) ?>" alt="" height="50">
                    </div>
                <?php endif; ?>
            </div>
            
            <button type="submit" class="submit-button">✅ Сохранить изменения</button>
            <a href="news_list.php" style="margin-left: 15px; color: #FFD700; text-decoration: none;">← Назад</a>
        </form>
    </div>
</body>
</html>