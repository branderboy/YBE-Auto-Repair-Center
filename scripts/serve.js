#!/usr/bin/env node
/** Minimal static server for previewing the built site: npm run serve */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'docs');
const PORT = process.env.PORT || 4173;

/*
 * The build prefixes every URL with basePath so the site works from a GitHub
 * Pages subfolder. Mount the preview at that same prefix, otherwise the CSS,
 * JS and images all 404 here and the preview renders unstyled — which does not
 * match what visitors will actually get.
 */
const BASE = require('../src/data/business.js').basePath || '';
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon'
};

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);

  // Send the bare root to the mounted site so `npm run serve` just works.
  if (BASE && (p === '/' || p === '')) {
    res.writeHead(302, { Location: BASE + '/' });
    return res.end();
  }
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length) || '/';

  let file = path.join(ROOT, p);
  if (p.endsWith('/')) file = path.join(file, 'index.html');
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    const alt = path.join(ROOT, p, 'index.html');
    if (fs.existsSync(alt)) file = alt;
    else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end(fs.readFileSync(path.join(ROOT, '404.html')));
    }
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  res.end(fs.readFileSync(file));
}).listen(PORT, () =>
  console.log(`Serving docs/ at http://localhost:${PORT}${BASE}/`)
);
