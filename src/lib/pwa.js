/**
 * PROGRESSIVE WEB APP
 *
 * Makes the site installable and usable with a poor or absent connection —
 * which matters for a shop whose customers are often stranded on a roadside
 * with one bar of signal.
 *
 * The service worker uses two strategies:
 *   - Pages: network first, falling back to the cache, then to /offline.html.
 *     Visitors always get fresh content when they have signal.
 *   - Assets (CSS, images, fonts): cache first, since they are content-hashed
 *     by filename and change only on deploy.
 *
 * The phone number, address and hours are baked into the offline page so a
 * stranded customer can still reach the shop with no connection at all.
 */

const b = require('../data/business.js');

function manifest() {
  return JSON.stringify(
    {
      name: b.name,
      short_name: 'YBE Auto',
      description: `Auto repair, bodywork and roadside assistance in ${b.address.city}, ${b.address.state}. Open seven days a week.`,
      start_url: '/',
      scope: '/',
      display: 'standalone',
      orientation: 'portrait-primary',
      background_color: '#1A1A1A',
      theme_color: '#FC0101',
      lang: 'en-US',
      categories: ['business', 'utilities'],
      icons: [
        { src: '/assets/img/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/assets/img/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: '/assets/img/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ],
      shortcuts: [
        { name: 'Call the shop', url: '/contact/', description: 'Phone YBE Auto Repair Center' },
        { name: 'Roadside assistance', url: '/roadside-assistance/', description: 'Get help if you are stranded' },
        { name: 'Request an appointment', url: '/request-appointment/', description: 'Book a service visit' }
      ]
    },
    null,
    2
  );
}

/** Bumping this string retires every old cache on the next visit. */
const CACHE_VERSION = 'ybe-v1';

function serviceWorker(precache) {
  return `/* YBE Auto Repair Center service worker */
const CACHE = '${CACHE_VERSION}';
const PRECACHE = ${JSON.stringify(precache, null, 2)};

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
        .catch(() => caches.match(req).then((hit) => hit || caches.match('/no-connection.html')))
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
`;
}

/**
 * Standalone "no connection" page. Inlines its own styles so it needs no
 * network, and is served when a visitor opens a page with no signal.
 */
function offlinePage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>No Connection | ${b.name}</title>
<meta name="description" content="No internet connection. Call or text ${b.name} at ${b.phone.display}, or visit us at ${b.address.oneLine}. Open ${b.hours.summary.toLowerCase()}.">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#FC0101">
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: #1A1A1A; color: #fff; padding: 1.5rem; text-align: center;
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    position: relative; overflow-x: hidden;
  }
  /* Shop photo behind the panel. It is precached by the service worker, so it
     shows even with no connection; if it is missing the dark background below
     still gives readable contrast. */
  .bg {
    position: fixed; inset: 0; z-index: 0;
    background-image: url('/assets/img/hero-shop.jpg');
    background-size: cover; background-position: center;
  }
  .bg::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(10,10,11,.62) 0%, rgba(10,10,11,.48) 45%, rgba(10,10,11,.78) 100%);
  }
  .card { max-width: 30rem; width: 100%; position: relative; z-index: 1; }
  .logo { width: 8.5rem; height: auto; margin: 0 auto 1.5rem; display: block; }
  h1 {
    font-size: 1.9rem; margin: 0 0 .5rem; text-transform: uppercase; letter-spacing: .02em;
    text-shadow: 0 2px 12px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,.9);
  }
  p { color: #ececec; line-height: 1.6; margin: 0 0 1.5rem; text-shadow: 0 2px 10px rgba(0,0,0,1), 0 0 24px rgba(0,0,0,.85); }
  .bar { width: 4rem; height: 4px; background: #FC0101; margin: 0 auto 1.25rem; border-radius: 2px; }
  a.call {
    display: block; background: #FC0101; color: #fff; text-decoration: none; font-weight: 700;
    font-size: 1.4rem; padding: 1rem 1.25rem; border-radius: 3px; margin-bottom: .75rem;
    letter-spacing: .04em;
  }
  a.sms {
    display: block; background: #fff; color: #1A1A1A; text-decoration: none; font-weight: 700;
    font-size: 1.15rem; padding: .85rem 1.25rem; border-radius: 3px; margin-bottom: 1.5rem;
  }
  dl {
    margin: 0; text-align: left; padding: 1.25rem;
    background: rgba(0,0,0,.72); border: 1px solid rgba(255,255,255,.15); border-radius: 3px; backdrop-filter: blur(4px);
  }
  dt { font-size: .72rem; text-transform: uppercase; letter-spacing: .18em; color: #FC0101; font-weight: 700; }
  dd { margin: .15rem 0 1rem; color: #e6e6e6; }
</style>
</head>
<body>
  <div class="bg"></div>
  <main class="card">
    <img class="logo" src="${b.images.logo}" alt="${b.name}">
    <div class="bar"></div>
    <h1>Still Here To Help</h1>
    <p>This page needs an internet connection, but you can still reach the shop directly.</p>
    <a class="call" href="${b.phone.href}">Call ${b.phone.display}</a>
    <a class="sms" href="${b.sms.href}">Text ${b.phone.display}</a>
    <dl>
      <dt>Address</dt><dd>${b.address.oneLine}</dd>
      <dt>Hours</dt><dd>${b.hours.summary}</dd>
    </dl>
  </main>
</body>
</html>
`;
}

module.exports = { manifest, serviceWorker, offlinePage, CACHE_VERSION };
