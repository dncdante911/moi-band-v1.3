// Создай /service-worker.js
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('moi-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/assets/css/main.css',
                '/assets/js/theme-system-v2.js'
            ]);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});