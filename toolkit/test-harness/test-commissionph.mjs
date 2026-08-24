/* Integration test: CommissionPH — DOM + app.js under jsdom.
   Defaults: ₱3M × 5% = ₱150k gross, no referral, 100% share, 0% company cut,
   non-VAT, 2307 ON → net 150k, CWT 7,500, cash 142,500. */
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';

const root = '/home/allenos/zinvent/projects/commissionph';
const html = readFileSync(root + '/index.html', 'utf8');
const js = readFileSync(root + '/app.js', 'utf8');

const dom = new JSDOM(html, { url: 'http://localhost:8909/', runScripts: 'outside-only', pretendToBeVisual: true });
const { window } = dom;
window.alert = () => {}; window.confirm = () => true; window.print = () => {};
window.URL.createObjectURL = () => 'blob:x';
window.localStorage.clear();
dom.window.eval(js);
window.document.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true }));

const { document } = window;
const $ = (id) => document.getElementById(id);
let pass = 0, fail = 0;
const check = (name, cond) => { cond ? (pass++, console.log('  ✓ ' + name)) : (fail++, console.log('  ✗ FAIL: ' + name)); };
const num = (s) => Number(String(s).replace(/[₱,\-]/g, ''));
const fire = (el, type = 'input') => el.dispatchEvent(new window.Event(type, { bubbles: true }));
const setV = (id, v) => { $(id).value = String(v); fire($(id)); };

console.log('— defaults: ₱3M × 5%, solo broker —');
check('gross = ₱150,000', num($('stGross').textContent) === 150000);
check('net = ₱150,000 (no splits)', num($('stNet').textContent) === 150000);
check('cash = ₱142,500 (after 5% CWT)', num($('stCash').textContent) === 142500);
check('breakdown shows 2307 line', $('p_rows').textContent.includes('2307'));
check('2307 note credits ₱7,500', $('cwtNote').textContent.includes('₱7,500'));
check('VAT note hidden (non-VAT)', $('vatNote').classList.contains('hidden'));

console.log('— co-broke 50/50 + company 30% —');
setV('myShare', '50'); setV('companyCut', '30');
// 150k → my share 75k → less 30% (22.5k) → net 52.5k → CWT 2,625 → cash 49,875
check('net = ₱52,500', num($('stNet').textContent) === 52500);
check('cash = ₱49,875', num($('stCash').textContent) === 49875);
check('co-broker line shows ₱75,000', $('p_rows').textContent.includes('₱75,000'));
check('company cut line shows ₱22,500', $('p_rows').textContent.includes('₱22,500'));

console.log('— referral fee off the top —');
setV('referral', 10000);
// (150k−10k) → 50% = 70k → −30% = 49k → CWT 2,450 → cash 46,550
check('net with referral = ₱49,000', num($('stNet').textContent) === 49000);
check('cash = ₱46,550', num($('stCash').textContent) === 46550);
setV('referral', 0);

console.log('— VAT mode —');
setV('vatMode', 'vat');
setV('myShare', '100'); setV('companyCut', '0'); setV('referral', 0);
check('VAT note appears with +₱18,000 (12% of 150k)', $('vatNote').textContent.includes('₱18,000') && !$('vatNote').classList.contains('hidden'));
check('net unchanged by VAT (150k)', num($('stNet').textContent) === 150000);
setV('vatMode', 'nonvat');

console.log('— 2307 toggle off —');
$('cwtOn').checked = false; fire($('cwtOn'));
check('cash = net when 2307 off', num($('stCash').textContent) === 150000);
check('2307 note hidden', $('cwtNote').classList.contains('hidden'));
$('cwtOn').checked = true; fire($('cwtOn'));

console.log('— rate presets —');
setV('commRate', '3');
check('3% on ₱3M = ₱90,000 gross', num($('stGross').textContent) === 90000);
setV('commRate', '5');

console.log('— tracker gated → PRO → CRUD —');
$('trackBtn').click();
check('tracker gated for free → pay modal', !$('payModal').classList.contains('hidden'));
$('payClose').click();
$('proBtn').click();
$('codeInput').value = 'cp-demo'; $('codeBtn').click();
check('PRO unlocked', $('codeMsg').className.includes('ok'));
$('trackBtn').click();
check('deal added, tracker visible', !$('trackerBox').classList.contains('hidden') && $('trkBody').querySelectorAll('tr').length === 1);
setV('price', 5000000); // 5M → 250k gross solo
$('trackBtn').click();
check('second deal logged', $('trkBody').querySelectorAll('tr').length === 2);
check('totals row computes (400k net)', $('trkTotal').textContent.includes('400,000'));
check('2307 credits total ₱20,000', $('trkTotal').textContent.includes('₱20,000'));

console.log('— CSV —');
let dl = null;
const origCreate = document.createElement.bind(document);
document.createElement = (tag) => { const el = origCreate(tag); if (tag === 'a') el.click = () => { dl = el.download; }; return el; };
$('csvBtn').click();
check('CSV downloads deals', dl === 'commissionph-deals.csv');
document.createElement = origCreate;

console.log('— persistence —');
const draft = JSON.parse(window.localStorage.getItem('cp_draft'));
check('draft saved with price', draft.p === '5000000');
check('deals persisted (2)', JSON.parse(window.localStorage.getItem('cp_trk')).length === 2);

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
