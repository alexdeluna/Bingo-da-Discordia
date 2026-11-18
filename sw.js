const CACHE = 'bingo-delunatech-v6';
const APP = ['./','./index.html','./styles.css','./manifest.json','./assets/icon.svg','./js/app.js','./js/firebase.js','./js/bingo.js','./firebase-config.js'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => { if (event.request.method !== 'GET') return; event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request))); });
