/* YBE Auto Repair Center service worker */
const CACHE = 'ybe-v1';
const PRECACHE = [
  "/",
  "/offline.html",
  "/assets/css/site.css",
  "/assets/img/ybe-auto-logo.png",
  "/assets/fonts/caveat-700.woff2",
  "/roadside-assistance/",
  "/contact/",
  "/services/"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      // addAll rejects the whole install if a single file 404s, so cache
      // individually and let any one miss fail on its own.
      .then((cache) => Promise.all(PRECACHE.map((url) => cache.add(url).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Never touch other origins: Google Maps, the Square booking site, socials.
  if (url.origin !== self.location.origin) return;

  const isPage = req.mode === 'navigate';

  if (isPage) {
    // Network first: a visitor with signal always gets current content.
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('/offline.html')))
    );
    return;
  }

  // Assets: cache first, refresh in the background.
  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      });
    })
  );
});
