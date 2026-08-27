#!/usr/bin/env node
/** Parse the inline <script> of every built page so a syntax error can't ship. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const OUT = path.join(__dirname, '..', 'docs');
function walk(d, a = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f, a);
    else if (e.name.endsWith('.html')) a.push(f);
  }
  return a;
}

let checked = 0;
const bad = [];
for (const file of walk(OUT)) {
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    checked++;
    try {
      new vm.Script(m[1]);
    } catch (e) {
      bad.push(`${path.relative(OUT, file)} — ${e.message}`);
    }
  }
}
console.log(`\nParsed ${checked} inline scripts across the site`);
if (bad.length) {
  console.log(`\nSYNTAX ERRORS (${bad.length}):`);
  bad.slice(0, 10).forEach((b) => console.log('  ✗ ' + b));
  process.exit(1);
}
console.log('✓ All inline scripts parse\n');
