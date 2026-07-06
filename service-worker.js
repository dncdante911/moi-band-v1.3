/**
 * Service Worker — Master of Illusion
 *
 * Раньше этот файл существовал, но нигде не регистрировался — PWA-манифест
 * подключён, а офлайн-кеш фактически не работал. Заодно старая версия была
 * бы опасна, если бы её просто включили: она кэшировала АБСОЛЮТНО ВСЕ GET-
 * запросы навсегда без какой-либо ревалидации (cache-first на всё, включая
 * саму главную страницу и API) — значит после первого визита сайт мог бы
 * годами показывать замороженный снимок из кэша, включая устаревшие счётчики
 * лайков/просмотров из api/player/track-stats.php.
 *
 * Здесь — осознанная стратегия:
 *   - /api/* и /admin/* никогда не кэшируются, всегда идут в сеть
 *     (динамические данные — счётчики, лайки, чат — должны быть свежими);
 *   - HTML-навигация — "network first": свежая страница если сеть жива,
 *     кэш только как отвал на случай офлайна;
 *   - статика (/assets/*) — "stale-while-revalidate": отдаём из кэша сразу
 *     (быстро), но в фоне обновляем кэш свежей версией для следующего раза;
 *   - версия кэша в имени — при следующем деплое достаточно поднять
 *     CACHE_VERSION, и старый кэш будет вычищен в 'activate'.
 */

const CACHE_VERSION = 'moi-v2';
const STATIC_CACHE = `${CACHE_VERSION}-static`;

const PRECACHE_URLS = [
    '/assets/css/main.css',
    '/assets/css/responsive.css',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys
                .filter((key) => key.startsWith('moi-') && key !== STATIC_CACHE)
                .map((key) => caches.delete(key))
        )).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const request = event.request;

    // Кэш применим только к GET; POST/PUT и т.д. (лайки, чат, отправка форм)
    // всегда должны идти в сеть как есть.
    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    // Чужой origin (CDN шрифтов и т.п.) не трогаем — пусть браузер сам решает.
    if (url.origin !== self.location.origin) return;

    // Динамика — никогда не кэшируем.
    if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/admin/')) {
        return;
    }

    // HTML-навигация — network first, кэш только как офлайн-отвал.
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const copy = response.clone();
                    caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
                    return response;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    // Статика из /assets/ — stale-while-revalidate.
    if (url.pathname.startsWith('/assets/')) {
        event.respondWith(
            caches.open(STATIC_CACHE).then((cache) =>
                cache.match(request).then((cached) => {
                    const networkFetch = fetch(request)
                        .then((response) => {
                            if (response.ok) cache.put(request, response.clone());
                            return response;
                        })
                        .catch(() => cached);
                    return cached || networkFetch;
                })
            )
        );
    }
});
