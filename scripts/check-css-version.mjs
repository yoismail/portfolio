#!/usr/bin/env node
// CI gate: fails if css/terminal.css's cache-busting query string (?v=<hash>)
// doesn't match the file's actual current content, which means someone
// edited the CSS without running `npm run update:css-version` first.
// Without this, a real CSS fix can ship but users keep seeing the old
// stylesheet from cache — see PR history for the incident this closes.

import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';

const CSS_PATH = 'css/terminal.css';
const expectedHash = createHash('sha256').update(readFileSync(CSS_PATH)).digest('hex').slice(0, 10);
const expectedHref = `href="css/terminal.css?v=${expectedHash}"`;

const files = readdirSync('.').filter((f) => f.endsWith('.html'));
const stale = [];

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const match = content.match(/href="css\/terminal\.css(\?v=[0-9a-f]+)?"/);
  if (!match || match[0] !== expectedHref) {
    stale.push({ file, found: match ? match[0] : '(no stylesheet link found)' });
  }
}

if (stale.length > 0) {
  console.error(`css/terminal.css has changed but its cache-busting version wasn't updated.\n`);
  console.error(`Expected every page to reference: ${expectedHref}\n`);
  for (const s of stale) {
    console.error(`  ${s.file}: found ${s.found}`);
  }
  console.error(`\nFix: run \`npm run update:css-version\` and commit the result.`);
  process.exit(1);
}

console.log(`OK — all ${files.length} page(s) reference the current css/terminal.css version (${expectedHash}).`);
