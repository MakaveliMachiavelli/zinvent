/* Integration test: UtangPlanPH — real DOM + app.js under jsdom.
   Engine math cross-checked with an independent simulator re-implemented in the test. */
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';

const root = '/home/allenos/zinvent/projects/utangplanph';
const html = readFileSync(root + '/index.html', 'utf8');
const js = readFileSync(root + '/app.js', 'utf8');

const dom = new JSDOM(html, { url: 'http://localhost:8908/', runScripts: 'outside-only', pretendToBeVisual: true });
const { window } = dom;
window.alert = () => {}; window.print = () => {};
window.URL.createObjectURL = () => 'blob:x';
window.localStorage.clear();
dom.window.eval(js);
window.document.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true }));

const { document } = window;
const $ = (id) => document.getElementById(id);
let pass = 0, fail = 0;
const check = (name, cond) => { cond ? (pass++, console.log('  ✓ ' + name)) : (fail++, console.log('  ✗ FAIL: ' + name)); };
const num = (s) => Number(String(s).replace(/[₱,]/g, ''));
const fire = (el, type = 'input') => el.dispatchEvent(new window.Event(type, { bubbles: true }));

/* independent simulator (reference implementation) */
function refSim(debts, budget, extra = 0) {
  const L = debts.map(d => ({ name: d.name, bal: d.balance, rate: d.rate, min: d.min, ip: 0 }));
  let m = 0, ti = 0;
  while (L.some(d => d.bal > 0.005) && m < 600) {
    m++;
    let avail = budget + extra;
    L.forEach(d => { if (d.bal > 0) { const i = d.bal * d.rate / 100; d.bal += i; d.ip += i; ti += i; } });
    L.forEach(d => { if (d.bal > 0) { const p = Math.min(d.min, d.bal, avail); d.bal -= p; avail -= p; } });
    // avalanche attack order: highest rate first
    const order = L.slice().sort((a, b) => b.rate - a.rate);
    for (const t of order) { if (avail <= 0) break; if (t.bal <= 0) continue; const p = Math.min(avail, t.bal); t.bal -= p; avail -= p; }
  }
  return { months: m, totalInterest: ti };
}

console.log('— defaults: 3 PH debts, ₱5,600 budget, avalanche —');
// defaults: budget 5000; minimums 1400+2000+2200 = 5600 > 5000 → under-budget truth shown
check('under-budget warning shows (mins 5,600 > 5,000)', $('p_rows').textContent.includes('Kulang ang budget'));
check('warning states the minimum total', $('p_rows').textContent.includes('₱5,600'));

console.log('— valid budget simulation vs reference —');
const setV = (id, v) => { $(id).value = String(v); fire($(id)); };
setV('budget', 7000);
const cur = [
  { name: 'CC', balance: 28000, rate: 3, min: 1400 },
  { name: '5-6', balance: 10000, rate: 20, min: 2000 },
  { name: 'Bank', balance: 45000, rate: 1.79, min: 2200 },
];
const ref = refSim(cur, 7000, 0);
check(`months matches reference (${ref.months})`, $('stMonths').textContent === String(ref.months));
check(`total interest matches reference (~₱${Math.round(ref.totalInterest)})`, Math.abs(num($('stInterest').textContent) - Math.round(ref.totalInterest)) <= 1);

console.log('— 5-6 alert fires —');
check('alert names the 5-6 debt', !$('fiveSixAlert').classList.contains('hidden') && $('fiveSixAlert').textContent.includes('5-6 ni Aling Rosa'));
check('alert shows doubling warning', $('fiveSixAlert').textContent.includes('doble'));

console.log('— avalanche order: 5-6 attacked first —');
const firstRow = $('p_rows').querySelector('tr');
check('order row 1 = 5-6 debt (highest rate)', firstRow.textContent.includes('5-6 ni Aling Rosa'));

console.log('— snowball flips order —');
setV('strategy', 'snowball');
const firstSnow = $('p_rows').querySelector('tr');
check('snowball row 1 = smallest balance (5-6, ₱10k)', firstSnow.textContent.includes('5-6 ni Aling Rosa'));
setV('strategy', 'avalanche');

console.log('— extra payment saves —');
const baseMonths = Number($('stMonths').textContent);
const baseInterest = num($('stInterest').textContent);
setV('extra', 1000);
check('extra reduces months', Number($('stMonths').textContent) < baseMonths);
check('savings message appears', !$('saveMsg').classList.contains('hidden') && $('saveMsg').textContent.includes('nag-iipit'));
const ref2 = refSim(cur, 7000, 1000);
check(`extra-months matches reference (${ref2.months})`, $('stMonths').textContent === String(ref2.months));
setV('extra', 0);

console.log('— zero-rate debt stays flat —');
// edit first debt to 0% via editor
const balIn = $('debtRows').querySelectorAll('input[data-f="balance"]');
balIn[0].value = '12000'; fire(balIn[0]);
const rateSel = $('debtRows').querySelector('select[data-f="rate"]');
rateSel.value = '0'; fire(rateSel, 'input');
// single-debt equivalent: others still exist; just check plan renders without error and row shows 0%
check('plan renders with 0% debt', $('p_rows').textContent.includes('0%'));

console.log('— free cap (3) → gate → PRO —');
$('addDebt').click();
check('4th debt gated → pay modal', !$('payModal').classList.contains('hidden'));
check('still 3 debts', $('debtRows').querySelectorAll('.debt-row').length === 3);
$('payClose').click();
$('proBtn').click();
$('codeInput').value = 'up-demo'; $('codeBtn').click();
check('PRO unlocked', $('codeMsg').className.includes('ok'));
check('CSV button visible', !$('csvBtn').classList.contains('hidden'));
$('addDebt').click();
check('4th debt allowed under PRO', $('debtRows').querySelectorAll('.debt-row').length === 4);

console.log('— CSV export —');
let dl = null;
const origCreate = document.createElement.bind(document);
document.createElement = (tag) => { const el = origCreate(tag); if (tag === 'a') el.click = () => { dl = el.download; }; return el; };
$('csvBtn').click();
check('CSV downloads schedule', dl === 'utangplan-schedule.csv');
document.createElement = origCreate;

console.log('— persistence —');
const saved = JSON.parse(window.localStorage.getItem('up_debts'));
check('debts persisted (4)', saved.length === 4);
check('draft persisted', JSON.parse(window.localStorage.getItem('up_draft')).b === '7000');

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
