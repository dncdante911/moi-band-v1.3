<?php
/**
 * pages/post.php - ИСПРАВЛЕННАЯ ВЕРСИЯ
 */

require_once '../include_config/header.php';

if (!isset($_GET['id']) || !filter_var($_GET['id'], FILTER_VALIDATE_INT)) {
    $postId = null;
} else {
    $postId = (int)$_GET['id'];
}

$post = null;

if ($postId) {
    try {
        // ✅ ИСПРАВЛЕНО: используем news вместо Posts
        $stmt = $pdo->prepare("SELECT * FROM news WHERE id = ?");
        $stmt->execute([$postId]);
        $post = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        error_log("Database error: " . $e->getMessage());
        $post = null;
    }
}

if (!$post) {
    ?>
    <div class="container">
        <div class="error-404">
            <h2>⚠️ Ошибка 404</h2>
            <p>Пост не найден или удален.</p>
            <a href="/pages/news.php" class="btn-back">← Вернуться к новостям</a>
        </div>
    </div>
    <?php
    require_once '../include_config/footer.php';
    exit;
}
?>

<div class="post-banner">
    <h1 class="post-title"><?= htmlspecialchars($post['title']) ?></h1>
    <p class="post-meta">
        <span>📅 <?= date('d F Y', strtotime($post['created_at'])) ?></span>
        <span>⏱️ ~5 мин чтения</span>
    </p>
</div>

<div class="container">
    <div class="post-wrapper">
        
        <div class="post-main">
            <article class="post-content-box">
                <?php if (!empty($post['image'])): ?>
                    <figure class="post-image">
                        <img src="<?= htmlspecialchars($post['image']) ?>" alt="<?= htmlspecialchars($post['title']) ?>">
                    </figure>
                <?php endif; ?>

                <div class="post-body">
                    <?= nl2br(htmlspecialchars($post['content'])) ?>
                </div>

                <div class="post-tags">
                    <span class="tag">⚡ <?= htmlspecialchars($post['category']) ?></span>
                    <span class="tag">🎸 Master of Illusion</span>
                </div>
            </article>

            <a href="/pages/news.php" class="btn-back-bottom">← Вернуться к новостям</a>
        </div>

        <aside class="post-sidebar">
            <div class="sidebar-box about-box">
                <h3>⚡ Master of Illusion</h3>
                <p>Музыкальный проект Power Metal / Hard & Heavy / Punk Rock. Композиции с SUNO, тексты авторские.</p>
                <a href="/pages/about.php" class="sidebar-link">Узнать больше →</a>
            </div>

            <div class="sidebar-box">
                <h3>📂 Категории</h3>
                <ul class="category-list">
                    <li><a href="/pages/news.php">📰 Все новости</a></li>
                    <li><a href="/pages/albums.php">📀 Альбомы</a></li>
                    <li><a href="/pages/gallery.php">🖼️ Галерея</a></li>
                </ul>
            </div>

            <div class="sidebar-box">
                <h3>🔥 Рекомендуем</h3>
                <ul class="category-list">
                    <li><a href="/pages/albums.php">📀 Слушать альбомы</a></li>
                    <li><a href="/pages/gallery.php">🖼️ Галерея</a></li>
                    <li><a href="/pages/chat.php">💬 Чат</a></li>
                </ul>
            </div>
        </aside>
    </div>
</div>

<?php require_once '../include_config/footer.php'; ?>