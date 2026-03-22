<?php
// Файл: admin/index.php

require_once __DIR__ . '/auth_check.php';
require_once '../include_config/config.php';
require_once '../include_config/db_connect.php';

$stmt = $pdo->query('SELECT * FROM Track ORDER BY createdAt DESC');
$tracks = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Админ-панель - <?= htmlspecialchars(SITE_NAME) ?></title>
    <link rel="stylesheet" href="../assets/css/admin_style.css">
    <style>
        .delete-form { display: inline; }
        .delete-btn {
            background: none;
            border: none;
            color: #e53e3e;
            font-weight: bold;
            cursor: pointer;
            font-size: inherit;
            font-family: inherit;
            padding: 0;
            text-decoration: none;
        }
        .delete-btn:hover { color: #ff6666; text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Панель управления</h1>

        <div class="admin-nav">
            <a href="index.php" class="active">Управление треками</a>
            <span class="admin-nav-separator">|</span>
            <a href="albums_list.php">Управление альбомами</a>
            <span class="admin-nav-separator">|</span>
            <a href="news_list.php">Управление новостями</a>
            <span class="admin-nav-separator">|</span>
            <a href="gallery_list.php">Управление галереей</a>
            <span class="admin-nav-separator">|</span>
            <a href="hero_settings.php">🎸 Шапка сайта</a>
        </div>

        <?php if (isset($_GET['success'])): ?>
            <div style="background:#38A169;color:#fff;padding:10px;border-radius:4px;margin-bottom:15px;">
                ✅ <?= $_GET['success'] === 'deleted' ? 'Трек удалён.' : 'Операция выполнена.' ?>
            </div>
        <?php endif; ?>
        <?php if (isset($_GET['error']) && $_GET['error'] === 'csrf'): ?>
            <div style="background:#c53030;color:#fff;padding:10px;border-radius:4px;margin-bottom:15px;">
                ❌ Ошибка безопасности (CSRF). Попробуйте снова.
            </div>
        <?php endif; ?>

        <a href="add_track.php" class="add-button">+ Добавить новый трек</a>

        <table class="track-table">
            <thead>
                <tr>
                    <th>Обложка</th>
                    <th>Название</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
<?php foreach ($tracks as $track): ?>
    <tr>
        <td>
            <?php if (!empty($track['coverImagePath'])): ?>
                <img src="../<?= htmlspecialchars(ltrim($track['coverImagePath'], '/')) ?>" alt="Обложка" width="50">
            <?php else: ?>
                <span style="color:#666;font-size:0.8rem;">—</span>
            <?php endif; ?>
        </td>
        <td><?= htmlspecialchars($track['title']) ?></td>
        <td class="action-links">
            <a href="edit_track.php?id=<?= (int)$track['id'] ?>">Редактировать</a>
            <form method="POST" action="delete_track.php" class="delete-form"
                  onsubmit="return confirm('Удалить трек «<?= htmlspecialchars(addslashes($track['title'])) ?>»?');">
                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token'] ?? '') ?>">
                <input type="hidden" name="id" value="<?= (int)$track['id'] ?>">
                <button type="submit" class="delete-btn">Удалить</button>
            </form>
        </td>
    </tr>
<?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
