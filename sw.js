self.addEventListener('install', function(event) {
    console.log('Service Worker: Instalowanie...');

    event.waitUntil(
        caches.open('my-cache').then(function(cache) {
            console.log('Service Worker: Otwarto cache');
            return cache.addAll([
                '/',
                './index.html',
                './app.js',
                './style.css',
                './icon.png',
                './manifest.json'
            ])
            .then(function() {
                console.log('Service Worker: Pliki zostały dodane do cache');
            })
            .catch(function(error) {
                console.error('Błąd podczas dodawania plików do cache', error);
            });
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log('Service Worker: Odbieranie żądania', event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
