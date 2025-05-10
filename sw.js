const CACHE_NAME = 'my-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        ASSETS_TO_CACHE.map(asset => {
          return fetch(asset)
            .then(response => {
              if (!response.ok) throw new Error(`${asset}: ${response.status}`);
              return cache.put(asset, response);
            })
            .catch(error => {
              console.error(`❌ Błąd przy dodawaniu do cache: ${asset}`, error);
            });
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
