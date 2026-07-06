<?php
/**
 * ФАЙЛ: include_config/header.php
 * АВАРИЙНАЯ ВЕРСИЯ - восстанавливаем ОСНОВные стили
 * БЕЗ системы тем
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db_connect.php';  // ← ДОБАВЛЕНО: подключение БД

// Автоплей-видео фона показываем только на главной — на остальных
// страницах это просто лишний вес видео без визуальной надобности.
$requestPath  = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$requestQuery = [];
parse_str(parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_QUERY) ?? '', $requestQuery);
$isHomePage = in_array($requestPath, ['/', '/index.php'], true) && (($requestQuery['p'] ?? 'home') === 'home');

// Open Graph / Twitter Card — раньше отсутствовали вообще, поэтому ссылка
// на альбом/трек, кинутая в Discord/Telegram/соцсети, показывала пустое
// превью без обложки и описания. Страница может переопределить любое из
// этих значений (см. pages/albums.php), выставив переменные ДО того как
// требует этот файл — иначе используются дефолты сайта.
$og_title       = $og_title       ?? SITE_NAME . ' — AI Metal музыка';
$og_description = $og_description ?? 'Master of Illusion — AI Metal музыка с SUNO. Слушайте альбомы, смотрите галерею.';
$og_image       = $og_image       ?? (rtrim(SITE_URL, '/') . '/assets/images/icon-512.png');
$og_type        = $og_type        ?? 'website';
$og_url         = rtrim(SITE_URL, '/') . ($_SERVER['REQUEST_URI'] ?? '/');
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="Master of Illusion - AI Metal музыка с SUNO. Слушайте альбомы, смотрите галерею">
    <meta name="keywords" content="metal music, AI music, SUNO, Master of Illusion, метал музыка">
    <meta name="author" content="Master of Illusion">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?= htmlspecialchars(SITE_NAME) ?></title>

    <!-- === OPEN GRAPH / TWITTER CARD === -->
    <meta property="og:site_name" content="<?= htmlspecialchars(SITE_NAME) ?>">
    <meta property="og:type" content="<?= htmlspecialchars($og_type) ?>">
    <meta property="og:title" content="<?= htmlspecialchars($og_title) ?>">
    <meta property="og:description" content="<?= htmlspecialchars($og_description) ?>">
    <meta property="og:image" content="<?= htmlspecialchars($og_image) ?>">
    <meta property="og:url" content="<?= htmlspecialchars($og_url) ?>">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= htmlspecialchars($og_title) ?>">
    <meta name="twitter:description" content="<?= htmlspecialchars($og_description) ?>">
    <meta name="twitter:image" content="<?= htmlspecialchars($og_image) ?>">
   

    
    <!-- ✅ ОСНОВНЫЕ СТИЛИ — блокирующие, чтобы не было вспышки нестилизованной
         страницы (layout, шапка, базовая адаптивность) -->
    <link rel="manifest" href="/manifest.json">
    <link rel="stylesheet" href="/assets/css/main.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="/assets/css/responsive.css">
    <link rel="stylesheet" href="/assets/css/header-epic.css">
    <link rel="stylesheet" href="/assets/css/universal-theme.css">
    <link rel="stylesheet" href="/assets/css/mobile.css">
    <!-- <link rel="stylesheet" href="/assets/css/mobile-universal.css"> -->

    <!-- ✅ ОСТАЛЬНЫЕ СТИЛИ — специфичны для отдельных разделов сайта,
         грузятся не блокируя рендер (preload+swap): страница не ждёт их,
         чтобы показать первый кадр. -->
    <?php foreach ([
        '/assets/css/auth.css',
        '/assets/css/chat.css',
        '/assets/css/about.css',
        '/assets/css/post.css',
        '/assets/css/albums.css',
        '/assets/css/albums-epic.css',
        '/assets/css/epic-home.css',
        '/assets/css/visualizer.css',
    ] as $asyncCss): ?>
    <link rel="preload" href="<?= $asyncCss ?>" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="<?= $asyncCss ?>"></noscript>
    <?php endforeach; ?>

    <!-- === ШРИФТЫ === -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Roboto:wght@400;700&display=swap" rel="stylesheet">

    <!-- === БИБЛИОТЕКИ ===
         particles.js убран: грузился с CDN на каждой странице, но
         particlesJS(...) нигде не вызывался — эффекта не было вообще,
         чистый мёртвый вес. Скрипты — с defer, чтобы не блокировать
         разбор HTML. -->
    <script src="/assets/js/theme-system-v2.js" defer></script>

<meta name="theme-color" content="#FFD700">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
    <script src="/assets/js/visualizer.js" defer></script>
    <script src="/assets/js/track-stats.js" defer></script>
    <script src="/assets/js/chat-v2.js" defer></script>
</head>
<body>
    <!-- === ФОНОВЫЕ ЭЛЕМЕНТЫ ===
         Видео-фон — только на главной. На остальных страницах декодирование
         зацикленного видео весь визит — это чистый расход CPU/GPU/батареи
         без визуальной пользы (страница новости/контактов не выигрывает
         от фонового ролика, а платит за него так же, как главная). -->
    <?php if ($isHomePage): ?>
    <video autoplay muted loop playsinline id="background-video">
        <source src="/assets/videos/background_video.mp4" type="video/mp4">
    </video>
    <?php endif; ?>

    <!-- === ШАПКА САЙТА === -->
    <header class="site-header">
        <div class="container header-container">
            <div class="logo">
                <a href="/"><?= htmlspecialchars(SITE_NAME) ?></a>
            </div>
            
            <!-- Бургер меню для мобильных -->
            <button class="hamburger-menu" id="hamburger" aria-label="Открыть меню" aria-expanded="false">☰</button>
            
            <!-- Навигация -->
            <nav class="main-nav" id="mainNav" aria-label="Главная навигация">
                <ul>
                    <li><a href="/" class="nav-link" data-ajax-link>🏠 Главная</a></li>
                    <li><a href="/pages/albums.php" class="nav-link" data-ajax-link>📀 Альбомы</a></li>
                    <li><a href="/pages/about.php" class="nav-link" data-ajax-link>ℹ️ О проекте</a></li>
                    <li><a href="/pages/news.php" class="nav-link" data-ajax-link>📰 Новости</a></li>
                    <li><a href="/pages/gallery.php" class="nav-link" data-ajax-link>🖼️ Галерея</a></li>
                    <li><a href="/pages/contact.php" class="nav-link" data-ajax-link>✉️ Контакты</a></li>
                    
                  <!--  <?php 
                    // Проверяем авторизацию
                    if (isset($_SESSION['user_id'])): 
                    ?>
                        <li><a href="/pages/chat.php" class="nav-link" data-ajax-link>💬 Чат</a></li>
                        <li><a href="/pages/auth/profile.php" class="nav-link" data-ajax-link>👤 Профиль</a></li>
                        <li><a href="/pages/auth/logout.php" class="nav-link" data-ajax-link>🚪 Выход</a></li>
                    <?php else: ?>
                        <li><a href="/pages/auth/login.php" class="nav-link" data-ajax-link>🔐 Вход</a></li>
                        <li><a href="/pages/auth/register.php" class="nav-link" data-ajax-link>✍️ Регистрация</a></li>
                    <?php endif; ?> -->
                </ul>
            </nav>
        </div>
        <script src="/assets/js/protection.js" defer></script>
        <script>
        (function(){
            const btn = document.getElementById('hamburger');
            const nav = document.getElementById('mainNav');
            if (!btn || !nav) return;
            btn.addEventListener('click', function(e){
                e.stopPropagation();
                const open = nav.classList.toggle('active');
                btn.setAttribute('aria-expanded', open);
                btn.textContent = open ? '✕' : '☰';
            });
            document.addEventListener('click', function(e){
                if (!nav.contains(e.target) && e.target !== btn) {
                    nav.classList.remove('active');
                    btn.setAttribute('aria-expanded', 'false');
                    btn.textContent = '☰';
                }
            });
        })();
        </script>
    </header>

    <!-- === ОСНОВНОЙ КОНТЕНТ === -->
    <main class="main-content">