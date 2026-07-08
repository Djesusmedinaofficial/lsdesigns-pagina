self.addEventListener('install', (event) => {
  event.waitUntil(caches.open('ls-designs-cache').then((cache) => {
    return cache.addAll(['./', './index.html', './manifest.json', './logo-ls-designs.png']);
  }));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(caches.match(event.request).then((response) => {
    return response || fetch(event.request).catch(() => caches.match('./index.html'));
  }));
});