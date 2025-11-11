<?php
/**
 * ФАЙЛ: pages/news-detail.php
 * Страница детального просмотра новости
 */

require_once __DIR__ . '/../include_config/header.php';

// Получаем ID новости
$id = $_GET['id'] ?? null;

if (!$id || !filter_var($id, FILTER_VALIDATE_INT)) {
    header('Location: /pages/news.php');
    exit;
}

// Получаем новость из БД
try {
    // ✅ ИСПРАВЛЕНО: используем правильную таблицу "news"
    $stmt = $pdo->prepare("SELECT * FROM news WHERE id = ?");
    $stmt->execute([$id]);
    $news = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$news) {
        header('Location: /pages/news.php');
        exit;
    }
} catch (Exception $e) {
    error_log("Database error: " . $e->getMessage());
    header('Location: /pages/news.php');
    exit;
}
?>

<div class="container">
    <!-- БАННЕР -->
    <div class="news-detail-banner">
        <h1><?= htmlspecialchars($news['title']) ?></h1>
        <div class="news-meta">
            <span class="category"><?= htmlspecialchars($news['category']) ?></span>
            <span class="date">📅 <?= date('d.m.Y', strtotime($news['created_at'])) ?></span>
        </div>
    </div>
    
    <div class="page-content">
        <article class="news-detail">
            <?php if (!empty($news['image'])): ?>
                <div class="news-detail-image">
                    <img src="<?= htmlspecialchars($news['image']) ?>" 
                         alt="<?= htmlspecialchars($news['title']) ?>">
                </div>
            <?php endif; ?>
            
            <div class="news-detail-content">
                <?= nl2br(htmlspecialchars($news['content'])) ?>
            </div>
            
            <div class="news-detail-footer">
                <a href="/pages/news.php" class="back-link">← Назад к новостям</a>
            </div>
        </article>
    </div>
</div>

<style>
.news-detail-banner {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.05));
    padding: 60px 20px;
    text-align: center;
    margin-bottom: 40px;
    border-bottom: 2px solid #FFD700;
}

.news-detail-banner h1 {
    font-size: 2.5rem;
    color: #FFD700;
    margin-bottom: 20px;
}

.news-meta {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.news-meta .category {
    background: rgba(255, 215, 0, 0.2);
    color: #FFD700;
    padding: 5px 15px;
    border-radius: 15px;
    text-transform: capitalize;
    font-weight: bold;
}

.news-meta .date {
    color: #999;
}

.news-detail {
    max-width: 900px;
    margin: 0 auto;
}

.news-detail-image {
    width: 100%;
    max-height: 500px;
    overflow: hidden;
    border-radius: 12px;
    margin-bottom: 30px;
    border: 2px solid rgba(255, 215, 0, 0.3);
}

.news-detail-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.news-detail-content {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #ccc;
    margin-bottom: 40px;
    padding: 30px;
    background: rgba(26, 20, 16, 0.6);
    border-left: 4px solid #FFD700;
    border-radius: 8px;
}

.news-detail-footer {
    padding-top: 30px;
    border-top: 2px solid rgba(255, 215, 0, 0.2);
}

.back-link {
    color: #FFD700;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1rem;
    transition: all 0.3s;
    display: inline-block;
}

.back-link:hover {
    color: #FFA500;
    transform: translateX(-5px);
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

@media (max-width: 768px) {
    .news-detail-banner h1 {
        font-size: 2rem;
    }
    
    .news-detail-content {
        font-size: 1rem;
        padding: 20px;
    }
}
</style>

<?php require_once __DIR__ . '/../include_config/footer.php'; ?>