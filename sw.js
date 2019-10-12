const VERSION = "v2";

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(`exif-reader-${VERSION}`).then(function(cache) {
      return cache.addAll(["/", "/index.html", "/index.js"]);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
