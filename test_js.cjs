#!/usr/bin/env node
/**
 * Zinvent JS Product Test Runner
 * Smoke test + calculation + storage + PRO unlock verification
 */
const fs = require('fs');
const path = require('path');

const BASE = '/home/allenos/zinvent/projects';
const product = process.argv[2];
const testType = process.argv[3] || 'all';

if (!product) {
  console.error('Usage: node test-js.mjs <product> [test-type]');
  process.exit(1);
}

const dir = path.join(BASE, product);
if (!fs.existsSync(path.join(dir, 'app.js'))) {
  console.error(`No app.js in ${dir}`);
  process.exit(1);
}

// Test categories
const tests = {
  smoke: (html) => {
    const checks = [
      ['has DOCTYPE', /<!DOCTYPE html>/i.test(html)],
      ['has data-theme attr', /data-theme=/.test(html)],
      ['has skip-link', /skip-link/.test(html)],
      ['has design-system CSS', /zinvent-design-system/.test(html)],
      ['has analytics.js', /components\/analytics\.js/.test(html)],
      ['has payments.js', /components\/payments\.js/.test(html)],
    ];
    return checks;
  },

  calc: (html) => {
    const checks = [
      ['has calculation function', /function.*calc|function.*compute|function.*update|function.*render|function.*compress/i.test(html)],
      ['has event listener', /addEventListener|onclick|\.on\(/.test(html)],
    ];
    return checks;
  },

  storage: (html) => {
    const checks = [
      ['uses localStorage', /localStorage/.test(html)],
      ['uses setItem', /setItem/.test(html)],
      ['uses getItem', /getItem/.test(html)],
    ];
    return checks;
  },

  pro: (html) => {
    const checks = [
      ['has PRO button', /proBtn|PRO.*button|pro.*button/i.test(html)],
      ['has unlock function', /PRO_CODES\.map\(.*\)\.includes|PRO_CODES\.includes|unlockPro|setPro|enablePro/i.test(html)],
      ['has PRO storage key', /_pro/.test(html)],
    ];
    return checks;
  },

  affiliate: (html) => {
    const checks = [
      ['has affiliate param', /ref=|affiliate=|utm_/.test(html)],
      ['has referral storage', /ref|affiliate|referral/.test(html)],
    ];
    return checks;
  }
};

const appJs = fs.readFileSync(path.join(dir, 'app.js'), 'utf8');
const indexHtml = fs.existsSync(path.join(dir, 'index.html')) 
  ? fs.readFileSync(path.join(dir, 'index.html'), 'utf8') 
  : '';

const combined = indexHtml + '\n' + appJs;

let allChecks = [];
if (testType === 'all') {
  ['smoke', 'storage', 'pro'].forEach(t => {
    if (tests[t]) allChecks = allChecks.concat(tests[t](combined));
  });
  if (tests.calc) allChecks = allChecks.concat(tests.calc(combined));
} else {
  if (tests[testType]) allChecks = allChecks.concat(tests[testType](combined));
}

let passed = 0, failed = 0;

console.log(`\n=== ${product.toUpperCase()} ===`);

allChecks.forEach(([name, cond]) => {
  if (cond) {
    console.log(`  ✓ ${name}`);
    passed++;
  } else {
    console.log(`  ✗ ${name}`);
    failed++;
  }
});

console.log(`\n${product}: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);