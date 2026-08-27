#!/usr/bin/env node
/**
 * Post-build validation.
 * Verifies internal links resolve, metadata is unique, headings are sane,
 * schema parses, and every required conversion path is present.
 */

const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'docs');
const b = require('../src/data/business.js');

const errors = [];
const warnings = [];

/** Titles are stored escaped in the HTML; measure what a user/search engine sees. */
const decode = (s = '') =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
   .replace(/&quot;/g, '"').replace(/&#39;/g, "'");

/** Collect every generated html file. */
function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (e.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

const files = walk(OUT);

/** Every file actually emitted, so asset links (logo, sitemap) resolve too. */
function walkAll(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkAll(full, acc);
    else acc.push('/' + path.relative(OUT, full).split(path.sep).join('/'));
  }
  return acc;
}
const allFiles = walkAll(OUT);
const urlOf = (file) => {
  const rel = path.relative(OUT, file).split(path.sep).join('/');
  return rel === '404.html' ? '/404.html' : '/' + rel.replace(/index\.html$/, '');
};

const validUrls = new Set([...files.map(urlOf), ...allFiles]);

const titles = new Map();
const descriptions = new Map();
let totalLinks = 0;

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const url = urlOf(file);
  const at = (msg) => `${url} — ${msg}`;

  /*
   * The offline fallback is a self-contained shell served with no network. It
   * is never indexed and never shared, so Open Graph, JSON-LD, canonicals and
   * breadcrumbs do not apply. It is still checked for a title, a description,
   * one h1, alt text, and the phone, text and address a stranded customer
   * needs.
   */
  const isOfflinePage = url === '/no-connection.html';

  // --- title ---
  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1]);
  if (!title) errors.push(at('missing <title>'));
  else {
    if (title.length > 60) warnings.push(at(`title is ${title.length} chars (>60): "${title}"`));
    if (!isOfflinePage) {
      if (titles.has(title)) errors.push(at(`duplicate title, also on ${titles.get(title)}`));
      else titles.set(title, url);
    }
  }

  // --- meta description ---
  const desc = decode((html.match(/<meta name="description" content="([\s\S]*?)">/) || [])[1]);
  if (!desc) errors.push(at('missing meta description'));
  else {
    if (desc.length > 165) warnings.push(at(`description is ${desc.length} chars (>165)`));
    if (desc.length < 70) warnings.push(at(`description is only ${desc.length} chars`));
    if (!isOfflinePage) {
      if (descriptions.has(desc)) errors.push(at(`duplicate description, also on ${descriptions.get(desc)}`));
      else descriptions.set(desc, url);
    }
  }

  // --- canonical ---
  if (!isOfflinePage) {
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)">/) || [])[1];
  if (!canonical) errors.push(at('missing canonical'));
  else if (url !== '/404.html' && canonical !== `${b.siteUrl}${url}`)
    errors.push(at(`canonical mismatch: ${canonical} vs expected ${b.siteUrl}${url}`));
  }

  // --- headings ---
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length === 0) errors.push(at('no <h1>'));
  if (h1s.length > 1) errors.push(at(`${h1s.length} <h1> tags (should be exactly 1)`));

  // --- open graph ---
  if (!isOfflinePage) {
    ['og:title', 'og:description', 'og:url', 'og:image'].forEach((p) => {
      if (!html.includes(`property="${p}"`)) errors.push(at(`missing ${p}`));
    });
  }

  // --- schema ---
  if (!isOfflinePage) {
  const ld = (html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [])[1];
  if (!ld) errors.push(at('missing JSON-LD'));
  else {
    try {
      const parsed = JSON.parse(ld);
      const types = (parsed['@graph'] || []).map((n) => n['@type']);
      if (!types.includes('AutoRepair')) errors.push(at('schema missing AutoRepair'));
      if (url !== '/' && url !== '/404.html' && !types.includes('BreadcrumbList'))
        warnings.push(at('no BreadcrumbList schema'));
      // FAQ schema must only appear where FAQs are visible on the page
      if (types.includes('FAQPage') && !html.includes('faq-btn'))
        errors.push(at('FAQPage schema present but no visible FAQ on page'));
    } catch (e) {
      errors.push(at(`invalid JSON-LD: ${e.message}`));
    }
  }
  }

  // --- images have alt text ---
  for (const img of html.match(/<img[^>]*>/g) || []) {
    if (!/\salt="/.test(img)) errors.push(at(`img without alt: ${img.slice(0, 70)}`));
  }

  /*
   * Internal links resolve.
   * The build prefixes every root-relative path with basePath so the site works
   * from a GitHub Pages subfolder, so strip that prefix before comparing
   * against the files on disk.
   */
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    totalLinks++;
    let target = m[1];
    if (b.basePath && target.startsWith(b.basePath)) {
      target = target.slice(b.basePath.length) || '/';
    }
    if (!validUrls.has(target)) errors.push(at(`broken internal link → ${m[1]}`));
  }

  // --- conversion paths present on every page ---
  if (!html.includes(`href="${b.phone.href}"`)) errors.push(at('no click-to-call link'));
  if (!html.includes(`href="${b.sms.href}"`)) errors.push(at('no click-to-text link'));
  if (!isOfflinePage) {
    if (!html.includes(b.maps.directionsUrl)) errors.push(at('no directions link'));
    if (!html.includes('data-track=')) errors.push(at('no conversion tracking attributes'));
  }

  // --- NAP consistency ---
  if (!html.includes(b.address.street)) errors.push(at('shop address missing from page'));

  // --- external links safe ---
  for (const a of html.match(/<a[^>]*target="_blank"[^>]*>/g) || []) {
    if (!a.includes('rel="noopener')) errors.push(at('target=_blank without rel=noopener'));
  }

  // --- honesty guard: never advertise towing as a service we provide ---
  if (/\bwe (also )?(provide|offer) towing\b/i.test(html)) errors.push(at('page appears to advertise towing'));
}

// --- sitemap sanity ---
const sitemap = fs.readFileSync(path.join(OUT, 'sitemap.xml'), 'utf8');
const smUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const u of smUrls) {
  const p = u.replace(b.siteUrl, '');
  if (!validUrls.has(p)) errors.push(`sitemap.xml — lists missing page ${p}`);
}
if (smUrls.some((u) => u.includes('404'))) errors.push('sitemap.xml — includes 404 page');
for (const f of files) {
  const u = urlOf(f);
  if (u !== '/404.html' && u !== '/no-connection.html' && !smUrls.includes(`${b.siteUrl}${u}`))
    warnings.push(`sitemap.xml — missing ${u}`);
}

// --- report ---
console.log(`\nChecked ${files.length} pages, ${totalLinks} internal links, ${smUrls.length} sitemap URLs\n`);
if (warnings.length) {
  console.log(`WARNINGS (${warnings.length}):`);
  warnings.forEach((w) => console.log('  ⚠ ' + w));
  console.log('');
}
if (errors.length) {
  console.log(`ERRORS (${errors.length}):`);
  errors.forEach((e) => console.log('  ✗ ' + e));
  console.log('');
  process.exit(1);
}
console.log('✓ All checks passed\n');
