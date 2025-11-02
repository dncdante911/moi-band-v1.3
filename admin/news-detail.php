<?php
/**
 * pages/news-detail.php - ИСПРАВЛЕННАЯ ВЕРСИЯ
 */

require_once __DIR__ . '/../include_config/config.php';
require_once __DIR__ . '/../include_config/db_connect.php';

if (!isset($_GET['id']) || !filter_var($_GET['id'], FILTER_VALIDATE_INT) || $_GET['id'] <= 0) {
    header('Location: /pages/news.php');
    exit;
}

$news_id = (int)$_GET['id'];

// ✅ ИСПРАВЛЕНО: используем news вместо Posts
$stmt = $pdo->prepare("SELECT * FROM news WHERE id = ?");
$stmt->execute([$news_id]);
$news = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$news) {
    header('Location: /pages/news.php');
    exit;
}

$page_title = htmlspecialchars($news['title'], ENT_QUOTES, 'UTF-8');
require_once __DIR__ . '/../include_config/header.php';
?>

<style>
    .news-detail-container { max-width: 900px; margin: 40px auto; padding: 20px; }
    .news-detail-header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #FFD700; }
    .news-detail-title { font-size: 2.5rem; color: #FFD700; margin-bottom: 15px; text-shadow: 0 0 10px rgba(255, 215, 0, 0.3); }
    .news-detail-meta { display: flex; justify-content: center; gap: 20px; font-size: 0.9rem; color: #999; }
    .news-category { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; padding: 5px 15px; border-radius: 20px; font-weight: bold; text-transform: uppercase; font-size: 0.8rem; }
    .news-date { color: #999; }
    .news-detail-image { width: 100%; max-height: 500px; object-fit: cover; border-radius: 12px; margin: 30px 0; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); }
    .news-detail-content { font-size: 1.1rem; line-height: 1.8; color: #e0e0e0; margin: 30px 0; text-align: justify; }
    .news-detail-content p { margin-bottom: 20px; }
    .back-button { display: inline-block; padding: 12px 25px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; transition: all 0.3s ease; margin-top: 30px; }
    .back-button:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4); }
</style>

<div class="container news-detail-container">
    
    <div class="news-detail-header">
        <h1 class="news-detail-title">
            <?= htmlspecialchars($news['title'], ENT_QUOTES, 'UTF-8') ?>
        </h1>
        
        <div class="news-detail-meta">
            <span class="news-category">
                <?php
                $category_names = ['update' => 'Обновление', 'release' => 'Релиз', 'event' => 'Событие'];
                echo htmlspecialchars($category_names[$news['category']] ?? $news['category'], ENT_QUOTES, 'UTF-8');
                ?>
            </span>
            <span class="news-date">
                📅 <?= date('d.m.Y H:i', strtotime($news['created_at'])) ?>
            </span>
        </div>
    </div>
    
    <?php if (!empty($news['image'])): ?>
        <img 
            src="<?= htmlspecialchars($news['image'], ENT_QUOTES, 'UTF-8') ?>" 
            alt="<?= htmlspecialchars($news['title'], ENT_QUOTES, 'UTF-8') ?>"
            class="news-detail-image"
        >
    <?php endif; ?>
    
    <div class="news-detail-content">
        <?= nl2br(htmlspecialchars($news['content'], ENT_QUOTES, 'UTF-8')) ?>
    </div>
    
    <a href="/pages/news.php" class="back-button">
        ← Вернуться к новостям
    </a>
    
</div>

<?php require_once __DIR__ . '/../include_config/footer.php'; ?>