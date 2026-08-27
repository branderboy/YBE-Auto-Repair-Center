#!/usr/bin/env node
/**
 * BUILD — renders the whole site into docs/ as clean-URL directories.
 * No dependencies. Run with: npm run build
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const b = require('./src/data/business.js');
const { categories, roadsideHub, areas, articles } = require('./src/data/pillars.js');
const R = require('./src/lib/pages.js');
const PWA = require('./src/lib/pwa.js');
const { renderHomeOriginal } = require('./src/lib/home-original.js');

const OUT = path.join(__dirname, 'docs');
const pages = [];

function emit(urlPath, html, { changefreq = 'monthly', priority = '0.7', lastmod = true } = {}) {
  const rel = urlPath === '/404.html' ? '404.html' : path.join(urlPath.replace(/^\//, ''), 'index.html');
  const dest = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
  pages.push({ urlPath, changefreq, priority, indexed: urlPath !== '/404.html', lastmod });
}

function copyAssets() {
  const imgDir = path.join(OUT, 'assets', 'img');
  fs.mkdirSync(imgDir, { recursive: true });
  const logoSrc = path.join(__dirname, 'images', 'ybe auto.png');
  if (fs.existsSync(logoSrc)) {
    fs.copyFileSync(logoSrc, path.join(imgDir, 'ybe-auto-logo.png'));
  } else {
    console.warn('  ! logo not found at images/ybe auto.png');
  }
  // Site imagery (hero background, any future shop photos)
  const srcImg = path.join(__dirname, 'src', 'assets', 'img');
  if (fs.existsSync(srcImg)) {
    // Files only: subdirectories (icons/) are copied separately below.
    for (const f of fs.readdirSync(srcImg, { withFileTypes: true })) {
      if (f.isFile()) fs.copyFileSync(path.join(srcImg, f.name), path.join(imgDir, f.name));
    }
  }

  // PWA icons
  const srcIcons = path.join(__dirname, 'src', 'assets', 'img', 'icons');
  if (fs.existsSync(srcIcons)) {
    const iconDir = path.join(imgDir, 'icons');
    fs.mkdirSync(iconDir, { recursive: true });
    for (const f of fs.readdirSync(srcIcons)) {
      fs.copyFileSync(path.join(srcIcons, f), path.join(iconDir, f));
    }
  }

  // Self-hosted fonts
  const srcFonts = path.join(__dirname, 'src', 'assets', 'fonts');
  if (fs.existsSync(srcFonts)) {
    const fontDir = path.join(OUT, 'assets', 'fonts');
    fs.mkdirSync(fontDir, { recursive: true });
    for (const f of fs.readdirSync(srcFonts)) {
      fs.copyFileSync(path.join(srcFonts, f), path.join(fontDir, f));
    }
  }

  // Tell GitHub Pages not to run Jekyll over the output.
  fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
}

/**
 * Compile the real stylesheet. Runs AFTER pages are written because Tailwind
 * scans the generated HTML to decide which utilities to emit.
 */
function buildCss() {
  const bin = path.join(__dirname, 'node_modules', '.bin', 'tailwindcss');
  const out = path.join(OUT, 'assets', 'css', 'site.css');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  execFileSync(bin, ['-i', 'src/assets/tailwind.css', '-o', out, '--minify'], {
    cwd: __dirname,
    stdio: ['ignore', 'ignore', 'pipe']
  });
  return fs.statSync(out).size;
}

/**
 * Progressive web app files. Runs after the pages and CSS exist so the service
 * worker precaches what was actually built.
 */
function buildPwa() {
  fs.writeFileSync(path.join(OUT, 'manifest.webmanifest'), PWA.manifest());
  fs.writeFileSync(path.join(OUT, 'offline.html'), PWA.offlinePage());

  // Precache the shell plus the pages a stranded customer is most likely to need.
  const precache = [
    '/',
    '/offline.html',
    '/assets/css/site.css',
    '/assets/img/ybe-auto-logo.png',
    '/assets/fonts/caveat-700.woff2',
    '/roadside-assistance/',
    '/contact/',
    '/services/'
  ].filter((u) => {
    if (u === '/') return fs.existsSync(path.join(OUT, 'index.html'));
    if (u.endsWith('/')) return fs.existsSync(path.join(OUT, u.slice(1), 'index.html'));
    return fs.existsSync(path.join(OUT, u.slice(1)));
  });

  fs.writeFileSync(path.join(OUT, 'sw.js'), PWA.serviceWorker(precache));
  return precache.length;
}

function buildSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const urls = pages
    .filter((p) => p.indexed)
    .map(
      (p) => `  <url>
    <loc>${b.siteUrl}${p.urlPath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join('\n');

  fs.writeFileSync(
    path.join(OUT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
  );
}

function buildRobots() {
  fs.writeFileSync(
    path.join(OUT, 'robots.txt'),
    `User-agent: *
Allow: /

Sitemap: ${b.siteUrl}/sitemap.xml
`
  );
}

function run() {
  console.log(`\nBuilding ${b.name} → docs/\n`);
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  // 1 + 2. Services and service categories
  // Homepage is the client's original page, with site nav wrapped around it.
  emit('/', renderHomeOriginal(), { changefreq: 'weekly', priority: '1.0' });
  emit('/services/', R.renderServicesHub(), { changefreq: 'monthly', priority: '0.9' });
  categories.forEach((cat) => {
    emit(cat.url, R.renderCategoryHub(cat), { priority: '0.8' });
    cat.services.forEach((svc) => emit(svc.url, R.renderServicePage(svc, cat), { priority: '0.7' }));
  });

  // Roadside (the 8th category hub, at its own top-level path)
  emit(roadsideHub.url, R.renderRoadsideHub(), { changefreq: 'weekly', priority: '0.9' });
  roadsideHub.services.forEach((svc) => emit(svc.url, R.renderRoadsidePage(svc), { priority: '0.8' }));

  // 4. Geographic relevance
  emit('/service-areas/', R.renderAreasHub(), { priority: '0.8' });
  areas.forEach((a) => emit(a.url, R.renderAreaPage(a), { priority: a.isPrimary ? '0.9' : '0.7' }));

  // 3. Topical relevance
  emit('/car-care/', R.renderCarCareHub(), { priority: '0.7' });
  articles.forEach((a) => emit(a.url, R.renderArticle(a), { priority: '0.6' }));

  // 5. Trust and decision support
  emit('/about/', R.renderAbout(), { priority: '0.8' });
  emit('/reviews/', R.renderReviews(), { priority: '0.8' });
  emit('/contact/', R.renderContact(), { priority: '0.9' });
  emit('/request-appointment/', R.renderAppointment(), { priority: '0.9' });
  emit('/faq/', R.renderFaq(), { priority: '0.7' });
  emit('/404.html', R.render404());

  copyAssets();
  const cssBytes = buildCss();
  const precached = buildPwa();
  buildSitemap();
  buildRobots();

  console.log(`  ✓ ${pages.length} pages written`);
  console.log(`  ✓ site.css compiled (${(cssBytes / 1024).toFixed(1)} KB minified)`);
  console.log(`  ✓ sitemap.xml (${pages.filter((p) => p.indexed).length} indexed URLs)`);
  console.log(`  ✓ robots.txt`);
  console.log(`  ✓ PWA: manifest, service worker (${precached} precached), offline page`);
  console.log(`  ✓ assets copied\n`);
}

run();
