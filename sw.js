const CACHE_NAME = "pwa-weather-cache-v1";
const urlsToCache = [
  "index.html",
  "form.html",
  "favourites.html",
  "style.css",
  "manifest.json",
  "icons/icon192.png",
  "icons/icon512.png"
];
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => {
          return new Response("Brak połączenia i brak danych offline.");
        })
      );
    })
  );
});
