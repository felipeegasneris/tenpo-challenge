/* eslint-disable */
/* tslint:disable */

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('msw-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(function() {
          return caches.match('/');
        })
    );
  }
});