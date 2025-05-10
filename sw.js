self.addEventListener('install', function(event) {
    console.log('Service Worker: Instalowanie...');

    event.waitUntil(
        caches.open('my-cache').then(function(cache) {
            console.log('Service Worker: Otwarto cache');

            const filesToCache = [
                'https://karolinahanslikgit.github.io/PWAApp/index.html',
                './app.js',
                './style.css',
                './icon.png',
                './manifest.json'
            ];

            return Promise.all(filesToCache.map(function(file) {
                return fetch(file).then(function(response) {
                    if (response.ok) {
                        return cache.put(file, response);
                    } else {
                        console.error(`Błąd podczas pobierania pliku: ${file}`);
                    }
                }).catch(function(error) {
                    console.error(`Błąd fetch dla pliku: ${file}`, error);
                });
            }));
        })
    );
});

self.addEventListener('fetch', function(event) {
    // Obsługa wejścia na stronę (czyli żądania dokumentu HTML)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            caches.match('./index.html').then(function(response) {
                return response || fetch('./index.html');
            })
        );
        return;
    }

    // Obsługa pozostałych zasobów (CSS, JS, obrazki itd.)
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
