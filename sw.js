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

            filesToCache.forEach(function(file) {
                console.log('Próba dodania pliku do cache: ', file);
            });

            return cache.addAll(filesToCache)
                .then(function() {
                    console.log('Service Worker: Pliki zostały dodane do cache');
                })
                .catch(function(error) {
                    console.error('Błąd podczas dodawania plików do cache', error);
                });
        })
    );
});
