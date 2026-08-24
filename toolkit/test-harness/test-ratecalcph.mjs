/* Integration test: RateCalcPH — DOM + app.js under jsdom.
   Defaults: net 40,000, expenses 5,000, tax 8%, 40h/wk, 60% billable, 10% buffer.
   gross = (40k+5k)×12 / 0.92 / 0.9 → monthly; billable = 40×4.33×0.6 = 103.92h.
   grossMonthly = 45000 / 0.92 / 0.9 = 54,347.83 → hourly = 523.11 */
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';

const root = '/home/allenos/zinvent/projects/ratecalcph';
const html = readFileSync(root + '/index.html', 'utf8');
const js = readFileSync(root + '/app.js', 'utf8');

const dom = new JSDOM(html, { url: 'http://localhost:8907/', runScripts: 'outside-only', pretendToBeVisual: true });
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
const num = (s) => Number(String(s).replace(/[₱,]/g, '').replace(/\/hr/, ''));
const fire = (el, type = 'input') => el.dispatchEvent(new window.Event(type, { bubbles: true }));

const GM = 45000 / 0.92 / 0.9;               // 54,347.83
const HR = GM / 103.92;                      // 523.11

console.log('— defaults math —');
check('hourly = 523.11', Math.abs(num($('oHourly').textContent) - HR) < 0.01);
check('day rate = hourly × 8 = 4,184.87', Math.abs(num($('oDay').textContent) - HR * 8) < 1);
check('weekly = hourly × 40 = 20,924.36', Math.abs(num($('oWeek').textContent) - HR * 40) < 1);
check('monthly retainer = 54,348', num($('oMonth').textContent) === Math.round(GM));
check('5-day project = day × 5 = 20,924.35', Math.abs(num($('oProject').textContent) - HR * 40) < 1);
check('echo shows 104 billable hours', $('hoursEcho').textContent.includes('104h/buwan'));
check('explain shows gross/buwan', $('oExplain').textContent.includes('buwan gross'));
check('explain mentions dead buwan', $('oExplain').textContent.includes('dead'));

console.log('— no buffer / no tax changes rate —');
const setV = (id, v) => { $(id).value = String(v); fire($(id)); };
setV('bufferPct', '0');
const GM2 = 45000 / 0.92;
const HR2 = GM2 / 103.92;
check('buffer 0: hourly drops to 470.86', Math.abs(num($('oHourly').textContent) - HR2) < 0.01);
setV('taxPct', '0');
const HR3 = 45000 / 103.92;
check('tax 0: hourly = 432.99', Math.abs(num($('oHourly').textContent) - HR3) < 0.01);

console.log('— billable % lever —');
setV('bufferPct', '10'); setV('taxPct', '8'); setV('billablePct', '50');
const HR4 = GM / (40 * 4.33 * 0.5);
check('50% billable: hourly = 627.73', Math.abs(num($('oHourly').textContent) - HR4) < 0.01);

console.log('— service menu (free cap 2 → PRO) —');
setV('billablePct', '60');
$('addSvc').click(); $('addSvc').click();
check('2 free services added', $('svcRows').querySelectorAll('.svc-row').length === 2);
const nameIn = $('svcRows').querySelector('input[data-f="name"]');
nameIn.value = 'Landing page'; fire(nameIn);
const hoursIn = $('svcRows').querySelector('input[data-f="hours"]');
hoursIn.value = '10'; fire(hoursIn);
check('service price = hourly × 10 = 5,231', num($('svcPrice-0').textContent) === Math.round(HR * 10));
$('addSvc').click(); // 3rd gated
check('3rd service gated → pay modal', !$('payModal').classList.contains('hidden'));
check('still 2 services', $('svcRows').querySelectorAll('.svc-row').length === 2);
$('payClose').click();

console.log('— PRO unlock —');
$('proBtn').click();
$('codeInput').value = 'rcp-demo'; $('codeBtn').click();
check('PRO unlocked', $('codeMsg').className.includes('ok'));
check('CSV button visible', !$('svcCsv').classList.contains('hidden'));
$('addSvc').click();
check('3rd service now allowed', $('svcRows').querySelectorAll('.svc-row').length === 3);

console.log('— CSV export —');
let dl = null;
const origCreate = document.createElement.bind(document);
document.createElement = (tag) => { const el = origCreate(tag); if (tag === 'a') el.click = () => { dl = el.download; }; return el; };
$('svcCsv').click();
check('CSV downloads price list', dl === 'ratecalcph-price-list.csv');
document.createElement = origCreate;

console.log('— persistence —');
const draft = JSON.parse(window.localStorage.getItem('rcp_draft'));
check('draft saved', draft && draft.f[0] === '40000');
const svcs = JSON.parse(window.localStorage.getItem('rcp_svc'));
check('services persisted (3)', svcs.length === 3);

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
