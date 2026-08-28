#!/usr/bin/env node
/**
 * BUILD — renders the whole site into docs/ as clean-URL directories.
 * No dependencies. Run with: npm run build
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const crypto = require('crypto');

const b = require('./src/data/business.js');
const { categories, roadsideHub, areas, articles } = require('./src/data/pillars.js');
const R = require('./src/lib/pages.js');
const PWA = require('./src/lib/pwa.js');
const { renderHomeOriginal } = require('./src/lib/home-original.js');

const OUT = process.env.OUT_DIR
  ? path.resolve(__dirname, process.env.OUT_DIR)
  : path.join(__dirname, 'docs');
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
      // Offer artwork lives in its own folder.
      if (f.isDirectory() && f.name === 'offers') {
        const dst = path.join(imgDir, 'offers');
        fs.mkdirSync(dst, { recursive: true });
        for (const o of fs.readdirSync(path.join(srcImg, 'offers'))) {
          fs.copyFileSync(path.join(srcImg, 'offers', o), path.join(dst, o));
        }
      }
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
  /*
   * Fail loudly on a broken stylesheet.
   *
   * A malformed rule makes the CLI exit without writing site.css, and the
   * build carried on and deployed a site with no stylesheet at all — every
   * image at its natural size, every layout gone, and nothing in the output
   * saying so. Surfacing the CLI's stderr and refusing an implausibly small
   * file turns that into a build failure instead of a live incident.
   */
  try {
    execFileSync(bin, ['-i', 'src/assets/tailwind.css', '-o', out, '--minify'], {
      cwd: __dirname,
      stdio: ['ignore', 'ignore', 'pipe']
    });
  } catch (e) {
    const detail = (e.stderr && e.stderr.toString().trim()) || e.message;
    throw new Error(`CSS build failed — site.css was not written:\n${detail}`);
  }

  if (!fs.existsSync(out)) throw new Error('CSS build produced no site.css');
  const size = fs.statSync(out).size;
  // A real build of this site is ~30KB. Anything tiny means the content scan
  // found nothing and the utilities are missing.
  if (size < 5000) throw new Error(`site.css is only ${size} bytes — utilities are missing`);
  return size;
}

/**
 * Progressive web app files. Runs after the pages and CSS exist so the service
 * worker precaches what was actually built.
 */
function buildPwa() {
  fs.writeFileSync(path.join(OUT, 'manifest.webmanifest'), PWA.manifest());
  fs.writeFileSync(path.join(OUT, 'no-connection.html'), PWA.offlinePage());

  // Precache the shell plus the pages a stranded customer is most likely to need.
  const precache = [
    '/',
    '/no-connection.html',
    '/assets/css/site.css',
    '/assets/img/ybe-auto-logo.png',
    '/assets/img/hero-shop.jpg',
    '/assets/fonts/caveat-700.woff2',
    '/roadside-assistance/',
    '/contact/',
    '/services/'
  ].filter((u) => {
    if (u === '/') return fs.existsSync(path.join(OUT, 'index.html'));
    if (u.endsWith('/')) return fs.existsSync(path.join(OUT, u.slice(1), 'index.html'));
    return fs.existsSync(path.join(OUT, u.slice(1)));
  });

  /*
   * Version the cache by the content it holds. Any change to the stylesheet or
   * the precached pages produces a new cache name, so the old one is dropped on
   * activate and returning visitors stop being served stale assets.
   */
  const hash = crypto.createHash('sha1');
  for (const rel of precache) {
    const file = rel.endsWith('/')
      ? path.join(OUT, rel.slice(1), 'index.html')
      : path.join(OUT, rel.slice(1));
    if (fs.existsSync(file)) hash.update(fs.readFileSync(file));
  }
  const version = hash.digest('hex').slice(0, 10);

  fs.writeFileSync(path.join(OUT, 'sw.js'), PWA.serviceWorker(precache, version));
  return { count: precache.length, version };
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

/**
 * Rewrite root-relative references so the site works from a subfolder.
 *
 * GitHub Pages serves a project site at /<repo>/, so every href="/...",
 * src="/..." and url('/...') would otherwise 404. This runs last, over the
 * finished output, so nothing upstream has to know about the prefix.
 * External URLs (http…, //…, mailto:, tel:, sms:) are left alone.
 */
function applyBasePath() {
  const base = b.basePath;
  if (!base) return 0;

  const rewrite = (text) =>
    text
      // href="/x" and src="/x" but not "//host"
      .replace(/(href|src)="\/(?!\/)/g, `$1="${base}/`)
      // CSS url('/x')
      .replace(/url\((['"]?)\/(?!\/)/g, `url($1${base}/`)
      // service worker paths and precache entries
      .replace(/(['"])\/(assets|services|roadside-assistance|service-areas|car-care|about|reviews|contact|request-appointment|faq|no-connection\.html|sw\.js|manifest\.webmanifest)/g,
        `$1${base}/$2`)
      // manifest start_url / scope
      .replace(/"start_url":\s*"\/"/g, `"start_url": "${base}/"`)
      .replace(/"scope":\s*"\/"/g, `"scope": "${base}/"`);

  let touched = 0;
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) { walk(full); continue; }
      if (!/\.(html|css|js|webmanifest|xml)$/.test(e.name)) continue;
      const before = fs.readFileSync(full, 'utf8');
      const after = rewrite(before);
      if (after !== before) { fs.writeFileSync(full, after); touched++; }
    }
  };
  walk(OUT);
  return touched;
}

/**
 * Publish the built site to the repository root.
 *
 * GitHub Pages is serving this repo from its root, and Pages has no index.html
 * there, so it falls back to rendering README.md. Copying the build to the root
 * puts index.html where Pages actually looks.
 *
 * Source files are never touched: PROTECTED lists everything that must survive,
 * and .published-files.json records what the previous run copied so stale pages
 * are removed before the new ones land.
 */
const PROTECTED = new Set([
  '.git', '.github', '.gitignore', 'node_modules',
  'build.js', 'package.json', 'package-lock.json', 'tailwind.config.js',
  'src', 'scripts', 'images', 'docs',
  'README.md', 'project-brief.md', 'ybe_auto_repair_center.html',
  '.published-files.json'
]);

function publishToRoot() {
  const manifestPath = path.join(__dirname, '.published-files.json');

  // Remove what the last run published, so renamed or deleted pages do not linger.
  if (fs.existsSync(manifestPath)) {
    let previous = [];
    try { previous = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); } catch { previous = []; }
    for (const name of previous) {
      if (PROTECTED.has(name)) continue;
      const target = path.join(__dirname, name);
      if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
    }
  }

  const published = [];
  for (const entry of fs.readdirSync(OUT, { withFileTypes: true })) {
    if (PROTECTED.has(entry.name)) {
      console.warn(`  ! skipped ${entry.name}: name collides with a source file`);
      continue;
    }
    fs.cpSync(path.join(OUT, entry.name), path.join(__dirname, entry.name), { recursive: true });
    published.push(entry.name);
  }

  fs.writeFileSync(manifestPath, JSON.stringify(published.sort(), null, 2) + '\n');
  return published.length;
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
  const pwaInfo = buildPwa();
  buildSitemap();
  buildRobots();
  const rebased = applyBasePath();
  // Publishing to the repo root is how GitHub Pages serves this. Other hosts
  // take the output directory as-is and must not have the repo rewritten.
  const publishedCount = process.env.SKIP_ROOT_PUBLISH ? 0 : publishToRoot();

  console.log(`  ✓ ${pages.length} pages written`);
  console.log(`  ✓ site.css compiled (${(cssBytes / 1024).toFixed(1)} KB minified)`);
  console.log(`  ✓ sitemap.xml (${pages.filter((p) => p.indexed).length} indexed URLs)`);
  console.log(`  ✓ robots.txt`);
  console.log(`  ✓ PWA: manifest, service worker (${pwaInfo.count} precached, cache ybe-${pwaInfo.version}), offline page`);
  console.log(`  ✓ assets copied`);
  if (rebased) console.log(`  ✓ base path ${b.basePath} applied to ${rebased} files`);
  if (publishedCount) {
    console.log(`  ✓ published ${publishedCount} entries to the repo root for GitHub Pages\n`);
  } else {
    console.log(`  ✓ output written to ${path.relative(__dirname, OUT)}/\n`);
  }
}

run();
