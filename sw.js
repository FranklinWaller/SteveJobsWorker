importScripts('http://localhost:3000/build/index.js');

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    'http://localhost:3000/',
    'http://localhost:3000/package.json',
    'http://localhost:3000/README.md',
    'http://localhost:3000/test.js',
];

self.addEventListener('install', (event) => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }),
    );
});
