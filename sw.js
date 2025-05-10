// sw.js



self.addEventListener('install', function(event) {

    event.waitUntil(

        caches.open('my-cache').then(function(cache) {

            return cache.addAll([

                '/',
                './index.html',
                './app.js',
                './style.css',
                './icon.png',
                './manifest.json'
                
           
                

            ]).catch(function(error) {
                console.error('Błąd podczas dodawania plików do cache:', error);
            });

        })

    );

});

self.addEventListener('fetch', function(event) {

    event.respondWith(

        caches.match(event.request).then(function(response) {

            return response || fetch(event.request);

        })

    );

});
