<?php
// Файл: admin/album_view.php - ОБНОВЛЕННАЯ ВЕРСИЯ

require_once __DIR__ . '/auth_check.php';
require_once '../include_config/config.php';
require_once '../include_config/db_connect.php';

if (!isset($_GET['id']) || !filter_var($_GET['id'], FILTER_VALIDATE_INT)) {
    header('Location: albums_list.php');
    exit;
}
$albumId = (int)$_GET['id'];

// 1. Получаем информацию о самом альбоме
$stmt_album = $pdo->prepare("SELECT * FROM Albums WHERE id = ?");
$stmt_album->execute([$albumId]);
$album = $stmt_album->fetch();
if (!$album) {
    header('Location: albums_list.php');
    exit;
}

// 2. Получаем все треки, которые относятся к этому альбому
$stmt_tracks = $pdo->prepare("SELECT * FROM Track WHERE albumId = ? ORDER BY id ASC");
$stmt_tracks->execute([$albumId]);
$tracks = $stmt_tracks->fetchAll();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Обзор альбома: <?= htmlspecialchars($album['title']) ?></title>
    <link rel="stylesheet" href="../assets/css/admin_style.css">
    <style>
        .album-header { display: flex; align-items: flex-start; margin-bottom: 30px; gap: 30px; }
        .album-cover { margin-right: 0; }
        .album-cover img { border-radius: 4px; border: 1px solid #444; }
        .album-details h2 { margin-top: 0; }
        .album-actions { display: flex; gap: 15px; flex-wrap: wrap; margin-top: 20px; }
        .album-actions a, .album-actions button {
            padding: 10px 20px;
            background-color: #333;
            border: 1px solid #555;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        .album-actions a:hover, .album-actions button:hover {
            background-color: #9B1C1C;
            border-color: #ff3333;
        }
        .album-actions .delete-link { background-color: #8B0000; border-color: #c53030; }
        .album-actions .delete-link:hover { background-color: #c53030; }
        /* Inline delete form in track table */
        .track-delete-form { display: inline; }
        .track-del-btn {
            background: none; border: none; color: #e53e3e;
            font-weight: bold; cursor: pointer; font-size: inherit;
            font-family: inherit; padding: 0; text-decoration: none;
        }
        .track-del-btn:hover { color: #ff6666; text-decoration: underline; }
        .success-message {
            background-color: #38A169;
            color: #fff;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="breadcrumbs">
            <a href="albums_list.php">Управление альбомами</a> &raquo;
            <span>Обзор альбома</span>
        </div>
        
        <?php if (isset($_GET['success'])): ?>
            <div class="success-message">
                ✅ <?= htmlspecialchars($_GET['success']) ?> треков успешно загружено
            </div>
        <?php endif; ?>
        
        <div class="album-header">
            <div class="album-cover">
                <img src="../<?= htmlspecialchars(ltrim($album['coverImagePath'], '/')) ?>" alt="Обложка" width="200">
            </div>
            <div class="album-details">
                <h1><?= htmlspecialchars($album['title']) ?></h1>
                
                <?php if ($album['releaseDate']): ?>
                    <p><strong>📅 Дата релиза:</strong> <?= date('d.m.Y', strtotime($album['releaseDate'])) ?></p>
                <?php endif; ?>
                
                <p><strong>🎵 Треков в альбоме:</strong> <?= count($tracks) ?></p>
                
                <?php if ($album['description']): ?>
                    <p><strong>Описание:</strong></p>
                    <p><?= nl2br(htmlspecialchars($album['description'])) ?></p>
                <?php endif; ?>
                
                <div class="album-actions action-links">
                    <a href="album_edit.php?id=<?= $albumId ?>">✏️ Редактировать информацию</a>
                    <a href="add_track.php?album_id=<?= $albumId ?>">🎵 Добавить один трек</a>
                    <a href="album_add_tracks.php?album_id=<?= $albumId ?>">📂 Массово загрузить треки</a>
                    <a href="album_add.php" style="background-color: #2b6cb0; border-color: #3182ce;">📀 Добавить новый альбом</a>
                    <a href="albums_list.php" style="background-color: #555; border-color: #777;">📋 К списку альбомов</a>
                    <a href="album_delete.php?id=<?= $albumId ?>" class="delete-link" onclick="return confirm('⚠️ ВНИМАНИЕ: Это удалит альбом и ВСЕ <?= count($tracks) ?> треков в нём!\n\nЭтого действия нельзя отменить. Вы уверены?');">🗑️ Удалить альбом</a>
                </div>
            </div>
        </div>

        <h2>🎵 Треки в альбоме</h2>
        <table class="track-table">
            <thead>
                <tr>
                    <th>Обложка</th>
                    <th>Название</th>
                    <th>Описание</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($tracks)): ?>
                    <tr><td colspan="4">✨ В этом альбоме пока нет треков. <a href="album_add_tracks.php?album_id=<?= $albumId ?>">Добавить треки</a></td></tr>
                <?php else: ?>
                    <?php foreach ($tracks as $index => $track): ?>
                        <tr>
                            <td><img src="../<?= htmlspecialchars(ltrim($track['coverImagePath'], '/')) ?>" alt="Обложка" width="40"></td>
                            <td><strong><?= htmlspecialchars($track['title']) ?></strong></td>
                            <td><?= mb_substr(htmlspecialchars($track['description'] ?? ''), 0, 50) ?>...</td>
                            <td class="action-links">
                                <a href="edit_track.php?id=<?= (int)$track['id'] ?>&album_id=<?= $albumId ?>">✏️ Редактировать</a>
                                <form method="POST" action="delete_track.php" class="track-delete-form"
                                      onsubmit="return confirm('Удалить трек «<?= htmlspecialchars(addslashes($track['title'])) ?>»?');">
                                    <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token'] ?? '') ?>">
                                    <input type="hidden" name="id" value="<?= (int)$track['id'] ?>">
                                    <button type="submit" class="track-del-btn">🗑️ Удалить</button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</body>
</html>