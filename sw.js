const CACHE_NAME = 'cozy-lucky-cache-v1.4';
const ASSETS_TO_CACHE = [
  '/ai-lucky/',
  '/ai-lucky/index.html',
  '/ai-lucky/assets/css/style.css',
  '/ai-lucky/assets/js/main.js',
  '/ai-lucky/manifest.json',
  '/ai-lucky/assets/img/icon-192.png',
  '/ai-lucky/assets/img/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Quicksand:wght@500;600;700&display=swap'
];

// Install Service Worker and cache all vital assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('Pre-caching assets failed, some assets might be offline-only:', err);
      });
    })
  );
  self.skipWaiting(); // Force active immediately
});

// Activate Service Worker and clear stale caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Hybrid strategy: Network-First for HTML/navigation, Cache-First for static assets
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  
  // 1. Navigation requests or HTML pages: Network-First with Cache Fallback
  if (e.request.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('.html')) {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(e.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            return caches.match('/ai-lucky/');
          });
        })
    );
  } else {
    // 2. Static assets (CSS, JS, Images, Fonts): Cache-First with Network Fallback
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(e.request).then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, responseClone);
            });
          }
          return response;
        });
      })
    );
  }
});

