#!/usr/bin/env node
// Fails if any page.html in the repo root causes horizontal scroll at
// mobile viewport widths. This is the permanent guardrail for the class
// of bug where a shared component (a grid track, a flex child, an
// unwrapped table) quietly pushes the page wider than the viewport on
// narrow screens — see css/terminal.css history for prior incidents.
//
// Usage: node scripts/check-mobile-overflow.mjs
// Requires Playwright (npx playwright install chromium) and a local
// static server already running at BASE_URL (default http://127.0.0.1:8080).

import { chromium } from 'playwright';
import { readdirSync } from 'node:fs';

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8080';
const WIDTHS = [320, 375, 390, 430];
const TOLERANCE_PX = 1; // sub-pixel rounding slack

const pages = readdirSync('.').filter((f) => f.endsWith('.html')).sort();

if (pages.length === 0) {
  console.error('No .html files found in the repo root.');
  process.exit(1);
}

const browser = await chromium.launch();
let failures = [];

for (const file of pages) {
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const consoleErrors = [];
    page.on('pageerror', (err) => consoleErrors.push(String(err)));
    await page.goto(`${BASE_URL}/${file}`, { waitUntil: 'networkidle' });

    const { scrollWidth, innerWidth, offenders } = await page.evaluate(() => {
      const vw = window.innerWidth;
      const offenders = [];
      document.querySelectorAll('body *').forEach((el) => {
        if (el.closest('nav.topbar')) return; // fixed-position chrome, scrolls internally
        if (el.closest('.code-block')) return; // intentionally horizontally scrollable
        if (el.closest('.table-scroll')) return; // intentionally horizontally scrollable
        if (el.closest('.tree-pre')) return; // intentionally horizontally scrollable
        const cs = getComputedStyle(el);
        if (cs.position === 'fixed') return;
        const r = el.getBoundingClientRect();
        if (r.right > vw + 1 && r.width > 0) {
          offenders.push({
            tag: el.tagName,
            cls: (el.className || '').toString().slice(0, 60),
            right: Math.round(r.right),
          });
        }
      });
      return {
        scrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth,
        offenders: offenders.slice(0, 5),
      };
    });

    await page.close();

    if (scrollWidth > innerWidth + TOLERANCE_PX) {
      failures.push({ file, width, scrollWidth, innerWidth, offenders, consoleErrors });
    }
  }
}

await browser.close();

if (failures.length > 0) {
  console.error(`\nMobile horizontal overflow detected on ${failures.length} page/width combination(s):\n`);
  for (const f of failures) {
    console.error(`  ${f.file} @ ${f.width}px — body.scrollWidth=${f.scrollWidth} > viewport=${f.innerWidth}`);
    for (const o of f.offenders) {
      console.error(`      ${o.tag}.${o.cls || '(no class)'} right=${o.right}px`);
    }
  }
  console.error('\nFix: find the element overflowing its container (printed above) and either wrap it in a');
  console.error('horizontally scrollable container, add min-width:0/minmax(0,1fr) to its flex/grid track, or');
  console.error('add overflow-wrap:break-word to let long unbreakable tokens wrap instead of overflowing.');
  process.exit(1);
}

console.log(`OK — checked ${pages.length} page(s) x ${WIDTHS.length} width(s), zero horizontal overflow.`);
