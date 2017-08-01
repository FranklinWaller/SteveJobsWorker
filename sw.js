importScripts('http://localhost:3000/build/index.js');

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    'http://localhost:3000/',
    'http://localhost:3000/package.json',
    'http://localhost:3000/README.md',
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
