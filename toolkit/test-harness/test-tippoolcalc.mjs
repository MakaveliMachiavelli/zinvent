/* Integration test: TipPoolCalc real DOM + app.js under jsdom. */
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';

const root = '/home/allenos/zinvent/projects/tippoolcalc';
const html = readFileSync(root + '/index.html', 'utf8');
const js = readFileSync(root + '/app.js', 'utf8');

const dom = new JSDOM(html, { url: 'http://localhost:8902/', runScripts: 'outside-only', pretendToBeVisual: true });
const { window } = dom;
window.alert = () => {}; window.confirm = () => true; window.print = () => {};
window.prompt = () => 'Friday crew';
window.localStorage.clear();
dom.window.eval(js);
window.document.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true }));

const $ = (id) => window.document.getElementById(id);
let pass = 0, fail = 0;
const check = (name, cond) => { cond ? (pass++, console.log('  ✓ ' + name)) : (fail++, console.log('  ✗ FAIL: ' + name)); };
const setVal = (el, v) => { el.value = v; el.dispatchEvent(new window.Event('input', { bubbles: true })); };

console.log('— hours mode: $1000 pool, 40/30/25/40 hrs (135 total) —');
$('method').value = 'hours';
$('method').dispatchEvent(new window.Event('input', { bubbles: true }));
const expect = ['296.29', '222.22', '185.19', '296.30']; // first row absorbs rounding remainder (Σ raw = 1000.01)
const payouts = [...$('p_rows').querySelectorAll('td:last-child')].map(td => td.textContent.replace('$', '').replace(',', ''));
expect.forEach((e, i) => check(`payout ${i + 1} ≈ ${e} (got ${payouts[i]})`, payouts[i] === e));
const sumP = payouts.reduce((s, v) => s + parseFloat(v), 0);
check('Σ payouts balances to 1000.00', Math.abs(sumP - 1000) < 0.001);
check('balance check line shows', $('p_check').textContent.includes('balances'));

console.log('— points mode: weights 1.0/1.0/0.6/0.7 —');
$('method').value = 'points';
$('method').dispatchEvent(new window.Event('input', { bubbles: true }));
// pts: 40, 30, 15, 28 → total 113 → payouts: 353.98, 265.49, 132.74, 247.79
const pts = [40, 30, 15, 28], tot = 113;
const expPts = pts.map(p => 1000 * p / tot);
const gotPts = [...$('p_rows').querySelectorAll('td:last-child')].map(td => parseFloat(td.textContent.replace('$', '').replace(/,/g, '')));
expPts.forEach((e, i) => check(`points payout ${i + 1} ≈ ${e.toFixed(2)} (got ${gotPts[i]})`, Math.abs(gotPts[i] - e) < 0.011));
check('points Σ = 1000.00', Math.abs(gotPts.reduce((s, v) => s + v, 0) - 1000) < 0.001);

console.log('— role select updates weight —');
const sel = $('team').querySelectorAll('select[data-f="role"]')[2];
sel.value = 'Kitchen / BOH';
sel.dispatchEvent(new window.Event('change', { bubbles: true }));
const wt = $('team').querySelectorAll('input[data-f="wt"]')[2];
check('busser→kitchen weight becomes 0.7', wt.value === '0.7');

console.log('— add / remove rows —');
$('addRow').click();
check('5 people now', $('team').querySelectorAll('.team-row').length === 5);
$('team').querySelector('.row-x').click();
check('removed → 4 people', $('team').querySelectorAll('.team-row').length === 4);

console.log('— currency switch —');
$('currency').value = '₱';
$('currency').dispatchEvent(new window.Event('input', { bubbles: true }));
check('₱ symbol in total', $('p_total').textContent.startsWith('₱'));

console.log('— PRO unlock —');
$('proBtn').click();
$('codeInput').value = 'nope';
$('codeBtn').click();
check('bad code rejected', $('codeMsg').className.includes('bad'));
$('codeInput').value = 'tpc-demo';
$('codeBtn').click();
check('PRO unlocked', $('codeMsg').className.includes('ok'));

console.log('— save team + reload —');
$('saveTeamBtn').click();
$('loadTeamBtn').click();
check('team listed', $('teamList').textContent.includes('Friday crew'));
$('teamClose').click();

console.log('— history on print —');
$('printBtn').click();
$('historyBtn').click();
check('1 history entry', $('histBody').querySelectorAll('tr').length === 1);
check('shows ₱ pool', $('histBody').textContent.includes('₱'));
$('histClose').click();

console.log('— role-group pools method (60/40 FOH/BOH) —');
// deterministic team reset
$('resetBtn').click();
const setField = (rowIdx, field, value) => {
  const row = $('team').querySelectorAll('.team-row')[rowIdx];
  const el = row.querySelector(field === 'name' ? 'input[data-f="name"]' : field === 'hrs' ? 'input[data-f="hrs"]' : 'select[data-f="role"]');
  el.value = value;
  el.dispatchEvent(new window.Event(field === 'name' || field === 'hrs' ? 'input' : 'change', { bubbles: true }));
};
setField(0, 'name', 'Anna'); setField(0, 'hrs', 40);
$('addRow').click(); setField(1, 'name', 'Ben'); setField(1, 'role', 'Bartender'); setField(1, 'hrs', 30);
$('addRow').click(); setField(2, 'name', 'Carla'); setField(2, 'role', 'Busser'); setField(2, 'hrs', 25);
$('addRow').click(); setField(3, 'name', 'Diego'); setField(3, 'role', 'Kitchen / BOH'); setField(3, 'hrs', 40);
$('method').value = 'pools';
$('method').dispatchEvent(new window.Event('input', { bubbles: true }));
check('pool editor visible', !$('poolEditor').classList.contains('hidden'));
// FOH=60% → $600 split by Anna 40/Ben 30 → Anna 342.86, Ben 257.14; BOH=40% → $400 → Diego 400; Support 0% → Carla 0
const poolPays = [...$('p_rows').querySelectorAll('td:last-child')].map(td => parseFloat(td.textContent.replace(/[₱$,]/g, '')));
check('FOH pool $600: Anna = 342.86', Math.abs(poolPays[0] - 342.86) < 0.011);
check('Ben = 257.14', Math.abs(poolPays[1] - 257.14) < 0.011);
check('Support 0%: Carla = 0', poolPays[2] === 0);
check('BOH pool $400: Diego = 400', poolPays[3] === 400);
check('pools Σ = 1000.00', Math.abs(poolPays.reduce((s, v) => s + v, 0) - 1000) < 0.001);

console.log('— pool % auto-normalization (50/50) —');
const fohIn = $('poolRows').querySelector('input[data-g="FOH"]');
const bohIn = $('poolRows').querySelector('input[data-g="BOH"]');
fohIn.value = '50'; fohIn.dispatchEvent(new window.Event('input', { bubbles: true }));
bohIn.value = '50'; bohIn.dispatchEvent(new window.Event('input', { bubbles: true }));
const poolPays2 = [...$('p_rows').querySelectorAll('td:last-child')].map(td => parseFloat(td.textContent.replace(/[₱$,]/g, '')));
check('50/50: Diego (BOH alone) = 500', Math.abs(poolPays2[3] - 500) < 0.001);
check('50/50: Anna = 285.71', Math.abs(poolPays2[0] - 285.71) < 0.011);
$('method').value = 'hours';
$('method').dispatchEvent(new window.Event('input', { bubbles: true }));
check('pool editor hidden again', $('poolEditor').classList.contains('hidden'));

console.log('— draft persistence —');
const draft = JSON.parse(window.localStorage.getItem('tpc_draft'));
check('draft has method=hours', draft && draft.method === 'hours');
check('draft has 4 people', draft && draft.team.length === 4);
check('draft has pool pcts', draft && draft.poolPcts && draft.poolPcts.FOH === 50);

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
