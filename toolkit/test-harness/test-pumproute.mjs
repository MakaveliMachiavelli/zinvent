/* Integration test: PumpRoute real DOM + app.js under jsdom.
   Covers: next-due engine, status chips, route-sheet filtering/sorting, stats,
   mark-serviced, free-tier cap, PRO unlock + CSV export path, persistence. */
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';

const root = '/home/allenos/zinvent/projects/pumproute';
const html = readFileSync(root + '/index.html', 'utf8');
const js = readFileSync(root + '/app.js', 'utf8');

const dom = new JSDOM(html, { url: 'http://localhost:8905/', runScripts: 'outside-only', pretendToBeVisual: true });
const { window } = dom;
window.alert = (m) => { window.__lastAlert = m; }; window.print = () => {};
window.URL.createObjectURL = window.URL.createObjectURL || (() => 'blob:x');
window.URL.revokeObjectURL = window.URL.revokeObjectURL || (() => {});
window.FileReader = window.FileReader || function () { this.readAsText = () => {}; };
window.localStorage.clear();
dom.window.eval(js);
window.document.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true }));

const $ = (id) => window.document.getElementById(id);
const doc = window.document;
let pass = 0, fail = 0;
const check = (name, cond) => { cond ? (pass++, console.log('  ✓ ' + name)) : (fail++, console.log('  ✗ FAIL: ' + name)); };
const fire = (el, type = 'input') => el.dispatchEvent(new window.Event(type, { bubbles: true }));
const iso = (off) => { const t = new Date(); t.setDate(t.getDate() + off); return t.toISOString().slice(0, 10); };

console.log('— demo data statuses —');
// Miller's Diner: last -100d, interval 90 → 10d OVERDUE
// J. Family: -300 +365 → due in 65d (not on route)
// SunnyGas: -190 +180 → 10d OVERDUE
// Riverside: -3 +7 → due in 4d
check('2 overdue in stats', $('stOverdue').textContent === '2');
check('1 due ≤14d', $('stWeek').textContent === '1');
check('4 customers total', $('stTotal').textContent === '4');
const chips = [...doc.querySelectorAll('.status-chip')].map(c => c.textContent);
check('chip shows 10d OVERDUE', chips.some(t => t === '10d OVERDUE'));
check('chip shows due in 4d', chips.some(t => t === 'due in 4d'));

console.log('— route sheet: overdue + due ≤14d only, sorted —');
const routeNames = [...$('p_rows').querySelectorAll('tr td:nth-child(2)')].map(td => td.textContent);
check('3 on route (2 overdue + 1 due soon)', $('p_rows').querySelectorAll('tr').length === 3);
check('J. Family not on route', !routeNames.join().includes('J. Family'));
check('route includes Miller + SunnyGas + Riverside',
  routeNames.map(n => n).join('|').includes("Miller's Diner") && routeNames.join('|').includes('SunnyGas') && routeNames.join('|').includes('Riverside'));
const firstRow = $('p_rows').querySelector('tr');
check('overdue rows flagged', firstRow.textContent.includes('overdue'));

console.log('— mark serviced rolls due date —');
const doneBtns = doc.querySelectorAll('.done-btn');
[...doneBtns].find(b => doc.querySelectorAll('.cust-row')[+b.dataset.i].querySelector('input[data-f="name"]').value.includes('Riverside')).click();
check('Riverside now due in 7d', [...doc.querySelectorAll('.status-chip')].some(c => c.textContent === 'due in 7d'));

console.log('— interval edit recomputes —');
const intInput = doc.querySelectorAll('input[data-f="interval"]')[1]; // J. Family
intInput.value = '290'; fire(intInput);
check('J. Family becomes 10d OVERDUE after interval change (-300+290)', [...doc.querySelectorAll('.status-chip')].some(c => c.textContent === '10d OVERDUE'));
check('route now has 4 rows', $('p_rows').querySelectorAll('tr').length === 4);

console.log('— free-tier cap —');
check('cap hint visible', $('freeCap').textContent.includes('4/10'));
// add 6 more to hit cap
for (let k = 0; k < 6; k++) $('addRow').click();
check('10 customers now', $('stTotal').textContent === '10');
$('addRow').click(); // 11th should be blocked → opens pay modal
check('add blocked at cap → pay modal opens', !$('payModal').classList.contains('hidden'));
check('still 10 customers', $('stTotal').textContent === '10');
$('payClose').click();

console.log('— PRO unlock —');
$('proBtn').click();
$('codeInput').value = 'pr-demo'; $('codeBtn').click();
check('PRO unlocked', $('codeMsg').className.includes('ok'));
check('cap hint cleared', $('freeCap').textContent === '');
check('CSV export button visible', !$('exportBtn').classList.contains('hidden'));
check('import button visible', !$('importWrap').classList.contains('hidden'));

console.log('— CSV export —');
window.URL.createObjectURL = () => 'blob:test';
let dl = null;
const origCreate = window.document.createElement.bind(window.document);
window.document.createElement = (tag) => {
  const el = origCreate(tag);
  if (tag === 'a') { el.click = () => { dl = el.download; }; }
  return el;
};
$('exportBtn').click();
check('export triggers pumproute-customers.csv download', dl === 'pumproute-customers.csv');
window.document.createElement = origCreate;

console.log('— add beyond cap works as PRO —');
$('addRow').click();
check('11th customer added under PRO', $('stTotal').textContent === '11');

console.log('— persistence —');
const saved = JSON.parse(window.localStorage.getItem('pr_data'));
check('11 customers persisted', saved.length === 11);

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
