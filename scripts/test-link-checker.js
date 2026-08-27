#!/usr/bin/env node
/**
 * Test for scripts/check-links-external.js.
 *
 * The link checker only earns trust if it can tell a working link from a
 * broken one, so this stands up a server with known responses, points a
 * throwaway docs tree at it, runs the real checker, and asserts on what it
 * reported. Everything is localhost, so it runs anywhere the checker itself
 * cannot.
 *
 *   node scripts/test-link-checker.js
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');
const os = require('os');

const srv = http.createServer((req, res) => {
  if (req.url === '/good') { res.writeHead(200); return res.end('ok'); }
  if (req.url === '/gone') { res.writeHead(404); return res.end('no'); }
  if (req.url === '/moved') { res.writeHead(301, { Location: '/good' }); return res.end(); }
  if (req.url === '/loop') { res.writeHead(302, { Location: '/loop' }); return res.end(); }
  if (req.url === '/nohead') {           // 405 on HEAD, 200 on GET
    if (req.method === 'HEAD') { res.writeHead(405); return res.end(); }
    res.writeHead(200); return res.end('ok');
  }
  if (req.url === '/preconnect-origin') { res.writeHead(404); return res.end(); }
  res.writeHead(404); res.end();
});

srv.listen(0, async () => {
  const base = 'http://127.0.0.1:' + srv.address().port;
  const repo = path.join(os.tmpdir(), 'ybe-link-checker-fixture');
  fs.rmSync(repo, { recursive: true, force: true });
  fs.mkdirSync(path.join(repo, 'docs'), { recursive: true });
  fs.mkdirSync(path.join(repo, 'scripts'), { recursive: true });
  fs.mkdirSync(path.join(repo, 'src', 'data'), { recursive: true });

  fs.writeFileSync(path.join(repo, 'docs', 'index.html'), `
    <link rel="preconnect" href="${base}/preconnect-origin">
    <a href="${base}/good">good</a>
    <a href="${base}/gone">gone</a>
    <a href="${base}/moved">moved</a>
    <a href="${base}/loop">loop</a>
    <a href="${base}/nohead">nohead</a>`);
  fs.writeFileSync(
    path.join(repo, 'src', 'data', 'business.js'),
    "module.exports = { siteUrl: 'https://example.com' };"
  );
  fs.copyFileSync(
    path.join(__dirname, 'check-links-external.js'),
    path.join(repo, 'scripts', 'check-links-external.js')
  );

  // execFileSync would block this process's event loop, and the server under
  // test lives in it — every request would time out regardless of the code.
  const { out, code } = await new Promise((resolve) => {
    execFile('node', [path.join(repo, 'scripts', 'check-links-external.js')],
      { encoding: 'utf8' },
      (err, stdout) => resolve({ out: stdout, code: err ? err.code : 0 }));
  });
  console.log(out);
  console.log('exit code:', code);

  const expect = [
    ['/good classified ok',        /ok\s+\S+\/good/],
    ['/moved follows to 200',      /ok\s+\S+\/moved/],
    ['/nohead retries as GET',     /ok\s+\S+\/nohead/],
    ['/gone reported 404',         /404\s+\S+\/gone/],
    ['/loop reported dead',        /too many redirects[\s\S]*\/loop|\/loop[\s\S]{0,60}too many redirects/],
    ['/loop not counted ok',       /dead    : 2/],
    ['preconnect origin skipped',  /^(?!.*preconnect-origin)[\s\S]*$/],
    ['exit non-zero on dead',      /checked : 5/]
  ];
  let pass = 0;
  for (const [name, re] of expect) {
    const ok = re.test(out);
    console.log((ok ? 'PASS  ' : 'FAIL  ') + name);
    if (ok) pass++;
  }
  console.log(`\n${pass}/${expect.length} assertions passed`);
  fs.rmSync(repo, { recursive: true, force: true });
  srv.close();
  process.exit(pass === expect.length ? 0 : 1);
});
