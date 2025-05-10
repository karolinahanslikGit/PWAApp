self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('my-cache').then(function(cache) {
            return cache.add('/').then(() => {
                console.log('Dodano: /');
                return cache.add('./index.html');
            }).then(() => {
                console.log('Dodano: ./index.html');
                return cache.add('./app.js');
            }).then(() => {
                console.log('Dodano: ./app.js');
                return cache.add('./style.css');
            }).then(() => {
                console.log('Dodano: ./style.css');
                return cache.add('./icon.png');
            }).then(() => {
                console.log('Dodano: ./icon.png');
                return cache.add('./manifest.json');
            }).then(() => {
                console.log('Dodano: ./manifest.json');
            }).catch(function(error) {
                console.error('Błąd podczas dodawania plików do cache:', error);
            });
        })
    );
});
