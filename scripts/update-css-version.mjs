#!/usr/bin/env node
// Keeps css/terminal.css's cache-busting query string in sync with its own
// content, so a CSS change always forces browsers (and GitHub Pages' CDN) to
// fetch the new file instead of serving a stale cached copy.
//
// Run this whenever css/terminal.css changes, then commit the result.
// `npm run check:css-version` (wired into CI) fails if you forget.

import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const CSS_PATH = 'css/terminal.css';
const HREF_RE = /href="css\/terminal\.css(?:\?v=[0-9a-f]+)?"/g;

const hash = createHash('sha256').update(readFileSync(CSS_PATH)).digest('hex').slice(0, 10);
const newHref = `href="css/terminal.css?v=${hash}"`;

const files = readdirSync('.').filter((f) => f.endsWith('.html'));
let changed = 0;

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const next = content.replace(HREF_RE, newHref);
  if (next !== content) {
    writeFileSync(file, next);
    changed++;
  }
}

console.log(`css/terminal.css hash: ${hash}`);
console.log(`Updated ${changed}/${files.length} page(s) to reference ?v=${hash}.`);
