#!/usr/bin/env node
/**
 * External link checker.
 *
 * Walks the built site, collects every off-site href, and asks each host
 * whether the URL still resolves. Internal links are already covered by
 * scripts/check.js, which can verify them against the file tree; these can
 * only be checked over the network.
 *
 * Run it outside a restricted network. Inside the build sandbox every
 * external host is refused by the egress proxy, which looks identical to a
 * dead link — so a run there proves nothing and the script says so rather
 * than reporting false failures.
 *
 *   node scripts/check-links-external.js
 *   node scripts/check-links-external.js --include-self   (also check our own URLs)
 *
 * Exits non-zero if any link is dead.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const b = require('../src/data/business.js');

const DOCS = path.join(__dirname, '..', 'docs');
const CONCURRENCY = 6;
const TIMEOUT_MS = 15000;
const MAX_REDIRECTS = 5;
const INCLUDE_SELF = process.argv.includes('--include-self');

const SELF_HOST = new URL(b.siteUrl).host;

/** Every .html file under docs/. */
function htmlFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

/**
 * Collect external URLs and remember which pages use each one, so a failure
 * names the pages to fix rather than just the URL.
 */
function collect() {
  const found = new Map(); // url -> Set(page)
  for (const file of htmlFiles(DOCS)) {
    const page = '/' + path.relative(DOCS, file).replace(/index\.html$/, '').replace(/\\/g, '/');
    // preconnect/dns-prefetch name a host to warm a connection to, not a
    // document. Fetching the bare origin 404s on plenty of CDNs, which would
    // report a working hint as a dead link.
    const html = fs
      .readFileSync(file, 'utf8')
      .replace(/<link\b[^>]*rel\s*=\s*["'][^"']*(?:preconnect|dns-prefetch)[^"']*["'][^>]*>/gi, '');
    const re = /\b(?:href|src)\s*=\s*["'](https?:\/\/[^"']+)["']/gi;
    let m;
    while ((m = re.exec(html))) {
      let url;
      try {
        url = new URL(m[1].replace(/&amp;/g, '&'));
      } catch {
        continue;
      }
      if (!INCLUDE_SELF && url.host === SELF_HOST) continue;
      const key = url.toString();
      if (!found.has(key)) found.set(key, new Set());
      found.get(key).add(page);
    }
  }
  return found;
}

/**
 * One request. HEAD first because it is cheap; a fair number of hosts do not
 * implement it and answer 403/405, so those retry as GET before being called
 * dead. Redirects are followed by hand to report the final status.
 */
function request(url, method, redirectsLeft) {
  return new Promise((resolve) => {
    let target;
    try {
      target = new URL(url);
    } catch {
      return resolve({ status: 0, error: 'malformed URL' });
    }
    const lib = target.protocol === 'https:' ? https : http;
    const req = lib.request(
      target,
      {
        method,
        timeout: TIMEOUT_MS,
        headers: {
          // Some hosts refuse requests without a browser-shaped UA.
          'User-Agent':
            'Mozilla/5.0 (compatible; YBE-link-check/1.0; +' + b.siteUrl + ')',
          Accept: 'text/html,application/xhtml+xml,*/*'
        }
      },
      (res) => {
        res.resume();
        const status = res.statusCode;
        if (status >= 300 && status < 400 && res.headers.location) {
          if (!redirectsLeft) return resolve({ status, error: 'too many redirects' });
          const next = new URL(res.headers.location, target).toString();
          return resolve(request(next, method, redirectsLeft - 1));
        }
        resolve({ status, finalUrl: target.toString() });
      }
    );
    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 0, error: 'timeout after ' + TIMEOUT_MS + 'ms' });
    });
    req.on('error', (e) => resolve({ status: 0, error: e.code || e.message }));
    req.end();
  });
}

/**
 * A URL is good only if it answered in the 2xx/3xx range AND nothing went
 * wrong getting there. The status alone is not enough: an exhausted redirect
 * chain reports the last hop's 302, which would otherwise pass as healthy
 * while the link goes nowhere.
 */
function isOk(r) {
  return r.status >= 200 && r.status < 400 && !r.error;
}

async function check(url) {
  let r = await request(url, 'HEAD', MAX_REDIRECTS);
  if (r.status === 403 || r.status === 405 || r.status === 501 || r.status === 0) {
    const g = await request(url, 'GET', MAX_REDIRECTS);
    // Keep whichever attempt got further.
    if (g.status && (!r.status || isOk(g))) r = g;
  }
  return r;
}

async function main() {
  if (!fs.existsSync(DOCS)) {
    console.error('docs/ not found — run `npm run build` first.');
    process.exit(1);
  }

  const found = collect();
  const urls = [...found.keys()].sort();
  if (!urls.length) {
    console.log('No external links found.');
    return;
  }

  console.log(
    `Checking ${urls.length} external URL${urls.length === 1 ? '' : 's'}` +
      (INCLUDE_SELF ? ' (including ' + SELF_HOST + ')' : '') +
      `, ${CONCURRENCY} at a time...\n`
  );

  const results = [];
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, urls.length) }, async () => {
      while (next < urls.length) {
        const url = urls[next++];
        const r = await check(url);
        results.push({ url, ...r });
        const ok = isOk(r);
        const mark = ok ? '  ok ' : r.status ? ' ' + r.status : ' ERR';
        console.log(`${mark}  ${url}${r.error ? '  (' + r.error + ')' : ''}`);
      }
    })
  );

  const dead = results.filter((r) => !isOk(r));

  /*
   * Tell a blocked network apart from a broken site.
   *
   * An egress proxy refusing everything returns the same status for every
   * host, which reads exactly like every link being dead at once. Real rot
   * does not arrive all at once across unrelated hosts, so treat one failure
   * shape spanning several hosts and most of the list as a network problem
   * and say so, rather than printing a wall of false failures.
   */
  const shape = (r) => (r.error ? r.error : 'HTTP ' + r.status);
  const byShape = new Map();
  for (const r of dead) {
    const k = shape(r);
    if (!byShape.has(k)) byShape.set(k, []);
    byShape.get(k).push(r);
  }
  let networkWall = null;
  for (const [k, group] of byShape) {
    const hosts = new Set(group.map((r) => new URL(r.url).host));
    if (hosts.size >= 3 && group.length >= results.length * 0.8) {
      networkWall = { shape: k, hosts: hosts.size, count: group.length };
    }
  }

  console.log('\n' + '-'.repeat(60));
  console.log(`checked : ${results.length}`);
  console.log(`ok      : ${results.length - dead.length}`);
  console.log(`dead    : ${dead.length}`);

  if (networkWall) {
    console.log(
      `\n${networkWall.count} of ${results.length} URLs failed identically ` +
        `(${networkWall.shape}) across ${networkWall.hosts} unrelated hosts.\n` +
        'That is a blocked network, not a broken site. Re-run this outside the\n' +
        'sandbox or proxy before believing any of it.'
    );
    process.exit(2);
  }

  if (dead.length) {
    console.log('\nBROKEN LINKS');
    for (const r of dead) {
      console.log(`\n  ${r.url}`);
      console.log(
        `    ${r.status ? 'HTTP ' + r.status : 'no response'}${r.error ? ' — ' + r.error : ''}`
      );
      for (const page of found.get(r.url)) console.log(`    used on ${page}`);
    }
  }

  process.exit(dead.length ? 1 : 0);
}

main();
