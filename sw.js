importScripts('build/index.js');

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/package.json',
    '/README.md',
];

self.addEventListener('install', (event) => {
    console.log(event);
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});
