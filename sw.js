self.addEventListener('install', function(event) {
    console.log('Service Worker: Instalowanie...');

    event.waitUntil(
        caches.open('my-cache').then(function(cache) {
            console.log('Service Worker: Otwarto cache');

            const filesToCache = [
                '/',
                './index.html',
                './app.js',
                './style.css',
                './icon.png',
                './manifest.json'
            ];

            // Sprawdzamy, czy pliki są dostępne i poprawnie je zapisujemy
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
