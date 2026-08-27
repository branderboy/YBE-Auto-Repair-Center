/* YBE Auto Repair Center service worker */
const CACHE = 'ybe-17756a0be1';
const PRECACHE = [
  "/",
  "/YBE-Auto-Repair-Center/no-connection.html",
  "/YBE-Auto-Repair-Center/assets/css/site.css",
  "/YBE-Auto-Repair-Center/assets/img/ybe-auto-logo.png",
  "/YBE-Auto-Repair-Center/assets/img/hero-shop.jpg",
  "/YBE-Auto-Repair-Center/assets/fonts/caveat-700.woff2",
  "/YBE-Auto-Repair-Center/roadside-assistance/",
  "/YBE-Auto-Repair-Center/contact/",
  "/YBE-Auto-Repair-Center/services/"
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
        .catch(() => caches.match(req).then((hit) => hit || caches.match('/YBE-Auto-Repair-Center/no-connection.html')))
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
