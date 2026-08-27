#!/usr/bin/env node
/**
 * SEO / AEO / GEO audit.
 *
 * Reports on the things that decide whether a page can be found, understood
 * and quoted: the internal link graph, metadata quality, structured data
 * coverage, and every external URL the site points at.
 */

const fs = require('fs');
const path = require('path');
const b = require('../src/data/business.js');

const OUT = path.join(__dirname, '..', 'docs');
const BASE = b.basePath || '';

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, acc);
    else if (e.name.endsWith('.html')) acc.push(f);
  }
  return acc;
}

const files = walk(OUT);
const urlOf = (f) => {
  const rel = path.relative(OUT, f).split(path.sep).join('/');
  return rel === '404.html' ? '/404.html' : '/' + rel.replace(/index\.html$/, '');
};

const pages = new Map();
const inbound = new Map();
const external = new Map();

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const url = urlOf(file);

  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([\s\S]*?)">/) || [])[1] || '';
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  const words = html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

  let schemaTypes = [];
  const ld = (html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [])[1];
  if (ld) {
    try {
      schemaTypes = (JSON.parse(ld)['@graph'] || []).map((n) => n['@type']);
    } catch { schemaTypes = ['INVALID']; }
  }

  pages.set(url, {
    title: title.replace(/&amp;/g, '&'),
    desc,
    h1: h1.replace(/<[^>]+>/g, '').trim(),
    words,
    schemaTypes,
    outbound: new Set()
  });
  if (!inbound.has(url)) inbound.set(url, new Set());

  // internal links, with the base path stripped
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    let t = m[1];
    if (BASE && t.startsWith(BASE)) t = t.slice(BASE.length) || '/';
    if (!/\.(css|js|png|jpe?g|webp|svg|xml|txt|webmanifest|woff2?)$/.test(t)) {
      pages.get(url).outbound.add(t);
      if (!inbound.has(t)) inbound.set(t, new Set());
      inbound.get(t).add(url);
    }
  }

  // external links
  for (const m of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
    if (!external.has(m[1])) external.set(m[1], new Set());
    external.get(m[1]).add(url);
  }
}

const real = [...pages.keys()].filter((u) => u !== '/404.html' && u !== '/no-connection.html');

console.log(`\n${'='.repeat(62)}`);
console.log(`SEO / AEO / GEO AUDIT — ${real.length} indexable pages`);
console.log('='.repeat(62));

// --- link graph ---
const orphans = real.filter((u) => u !== '/' && (inbound.get(u) || new Set()).size === 0);
const thin = real
  .map((u) => ({ u, n: (inbound.get(u) || new Set()).size }))
  .filter((x) => x.u !== '/' && x.n > 0 && x.n < 3)
  .sort((a, b2) => a.n - b2.n);

console.log('\nINTERNAL LINKING');
console.log(`  orphan pages (no inbound links): ${orphans.length}`);
orphans.slice(0, 10).forEach((u) => console.log(`    ${u}`));
console.log(`  pages with fewer than 3 inbound links: ${thin.length}`);
thin.slice(0, 10).forEach((x) => console.log(`    ${x.n}x  ${x.u}`));

// --- metadata ---
const noDesc = real.filter((u) => !pages.get(u).desc);
const longTitle = real.filter((u) => pages.get(u).title.length > 60);
const shortDesc = real.filter((u) => pages.get(u).desc.length < 70);
const thinContent = real.filter((u) => pages.get(u).words < 300).sort((a, c) => pages.get(a).words - pages.get(c).words);

console.log('\nMETADATA');
console.log(`  missing description:        ${noDesc.length}`);
console.log(`  title over 60 chars:        ${longTitle.length}`);
console.log(`  description under 70 chars: ${shortDesc.length}`);
console.log(`  pages under 300 words:      ${thinContent.length}`);
thinContent.slice(0, 5).forEach((u) => console.log(`    ${pages.get(u).words} words  ${u}`));

// --- structured data ---
const counts = {};
for (const u of real) for (const t of pages.get(u).schemaTypes) counts[t] = (counts[t] || 0) + 1;
console.log('\nSTRUCTURED DATA');
Object.entries(counts).sort((a, c) => c[1] - a[1]).forEach(([t, n]) => console.log(`  ${String(n).padStart(3)}x  ${t}`));
const noSchema = real.filter((u) => pages.get(u).schemaTypes.length === 0);
if (noSchema.length) console.log(`  pages with no schema: ${noSchema.length}`);

// --- external links ---
console.log('\nEXTERNAL LINKS');
console.log(`  distinct external URLs: ${external.size}`);
const byHost = {};
for (const url of external.keys()) {
  const h = new URL(url).host;
  byHost[h] = (byHost[h] || 0) + 1;
}
Object.entries(byHost).sort((a, c) => c[1] - a[1]).forEach(([h, n]) => console.log(`  ${String(n).padStart(3)}  ${h}`));

console.log('\nRun `npm run links:external` to check those URLs resolve.\n');

fs.writeFileSync(
  path.join(__dirname, '..', '.audit-external-urls.json'),
  JSON.stringify([...external.keys()].sort(), null, 2) + '\n'
);
