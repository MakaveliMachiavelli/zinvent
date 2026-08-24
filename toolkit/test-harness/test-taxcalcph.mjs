/* Integration test: TaxCalcPH real DOM + app.js under jsdom.
   Verifies TRAIN-table math for both options, verdict logic, warnings,
   bracket table, PRO unlock + quarterly 1701Q cumulative method. */
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';

const root = '/home/allenos/zinvent/projects/taxcalcph';
const html = readFileSync(root + '/index.html', 'utf8');
const js = readFileSync(root + '/app.js', 'utf8');

const dom = new JSDOM(html, { url: 'http://localhost:8903/', runScripts: 'outside-only', pretendToBeVisual: true });
const { window } = dom;
window.alert = () => {}; window.confirm = () => true; window.print = () => {};
window.localStorage.clear();
dom.window.eval(js);
window.document.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true }));

const $ = (id) => window.document.getElementById(id);
let pass = 0, fail = 0;
const check = (name, cond) => { cond ? (pass++, console.log('  ✓ ' + name)) : (fail++, console.log('  ✗ FAIL: ' + name)); };
const setGross = (v) => { $('gross').value = String(v); $('gross').dispatchEvent(new window.Event('input', { bubbles: true })); };
const num = (s) => Number(String(s).replace(/[₱,]/g, ''));

console.log('— ₱600k: with 3% percentage tax included, 8% should win —');
setGross(600000);
check('A 8% = ₱28,000 (8% × 350k)', num($('aTax').textContent) === 28000);
check('B = ₱34,500 (16,500 income tax + 18,000 3% PT)', num($('bTax').textContent) === 34500);
check('verdict picks 8% (PT flips it)', $('verdict').textContent.includes('8%'));
check('savings = ₱6,500', $('verdict').textContent.includes('6,500'));
check('PT shown in doc', num($('d_pt').textContent) === 18000);

console.log('— ₱1M: 8% should win —');
setGross(1000000);
check('A 8% = ₱60,000 (8% × 750k)', num($('aTax').textContent) === 60000);
check('B = ₱92,500 (62.5k + 30k PT)', num($('bTax').textContent) === 92500);
check('verdict picks 8%', $('verdict').textContent.includes('8%'));

console.log('— edge cases —');
setGross(200000);
check('below 250k: 8% = ₱0, graduated = ₱6,000 (3% PT only)', num($('aTax').textContent) === 0 && num($('bTax').textContent) === 6000);
check('warn explains PT below 250k', $('warn').textContent.includes('3% percentage tax'));
check('warn explains 8% replaces PT', $('warn').textContent.includes('8% replaces it'));
setGross(3200000);
check('warn: not eligible for 8%', $('warn').textContent.includes('NOT eligible'));
check('warn: VAT threshold', $('warn').textContent.includes('VAT'));
setGross(2500000);
// B: taxable = 1.5M → 102500 + 25%×700k = 277500; A: 8%×2.25M = 180000
check('₱2.5M: A=180,000', num($('aTax').textContent) === 180000);
check('₱2.5M: B=352,500 (277.5k + 75k PT)', num($('bTax').textContent) === 352500);

console.log('— comparison doc + bracket table —');
setGross(1000000);
check('doc shows OSD −400,000', $('d_osd').textContent.includes('400,000'));
check('doc taxable B = 600,000', num($('d_taxableB').textContent) === 600000);
check('bracket table highlights 400k–800k row', [...window.document.querySelectorAll('.bracket-table tr.hit')].length === 1);

console.log('— monthly echo —');
check('₱83,333/mo echo', $('monthlyEcho').textContent.includes('83,333'));

console.log('— PRO + quarterly cumulative (even, ₱1M, method A) —');
$('proBtn').click();
$('codeInput').value = 'tcp-demo';
$('codeBtn').click();
check('PRO unlocked', $('codeMsg').className.includes('ok'));
$('quarterBtn').click();
check('modal picks method A', $('qBest').textContent.includes('8% flat'));
const qrows = [...$('qBody').querySelectorAll('tr')].map(tr => [...tr.querySelectorAll('td')].map(td => num(td.textContent)));
check('Q1 cum tax = 8%×(250k−250k)=0', qrows[0][2] === 0);
check('Q2 cum = 8%×(500k−250k)=20,000', qrows[1][2] === 20000);
check('Q2 pay = 20,000', qrows[1][3] === 20000);
check('Q4 cum = 60,000', qrows[3][2] === 60000);
check('Σ quarterly pay = 60,000', qrows.reduce((s, r) => s + r[3], 0) === 60000);

console.log('— back-loaded season —');
$('season').value = 'back';
$('season').dispatchEvent(new window.Event('input', { bubbles: true }));
$('quarterBtn').click();
const q2 = [...$('qBody').querySelectorAll('tr')].map(tr => [...tr.querySelectorAll('td')].map(td => num(td.textContent)));
check('Q1 cum income = 100k, tax 0', q2[0][1] === 100000 && q2[0][2] === 0);
check('Q4 cum income = 1M, cum tax 60k', q2[3][1] === 1000000 && q2[3][2] === 60000);

console.log('— v1.2: 2307 CWT credits → payable —');
setGross(1000000); // A=60,000, B=92,500
$('cwtCredits').value = '12000'; $('cwtCredits').dispatchEvent(new window.Event('input', { bubbles: true }));
check('payable A = 48,000 after credits', num($('d_payA').textContent) === 48000);
check('payable B = 80,500 after credits', num($('d_payB').textContent) === 80500);
check('pay rows visible', $('payRow').style.display !== 'none');
$('cwtCredits').value = '0'; $('cwtCredits').dispatchEvent(new window.Event('input', { bubbles: true }));
check('pay rows hidden at 0 credits', $('payRow').style.display === 'none');

console.log('— v1.2: monthly/annual toggle converts —');
setGross(600000);
$('periodMonthly').click();
check('monthly active', $('periodMonthly').classList.contains('active'));
check('gross converted to 50,000', $('gross').value === '50000');
check('monthly echo shows /yr total', $('monthlyEcho').textContent.includes('600,000'));
$('periodAnnual').click();
check('back to annual 600,000', $('gross').value === '600000');

console.log('— draft persistence —');
const draft = JSON.parse(window.localStorage.getItem('tcp_draft'));
check('draft saved with back season', draft && draft.season === 'back');

console.log('— v1.1 mixed income: comp ₱420k (₱90k exempt) + freelance ₱600k —');
setGross(600000); // reset from earlier 1M scenario
$('mixMode').value = 'mixed';
$('mixMode').dispatchEvent(new window.Event('input', { bubbles: true }));
check('comp field visible', !$('compWrap').classList.contains('hidden'));
check('contrib field visible', !$('contribWrap').classList.contains('hidden'));
// comp taxable = 420k − 90k = 330k → 15%×80k = 12,000; freelance A=28k B=16.5k
check('salary tax = ₱12,000', num($('d_compTax').textContent) === 12000);
check('A total = ₱60,000 (8% × full 600k — no 250k exempt in mixed + 12k salary)', num($('aTax').textContent) === 60000);
check('B total = ₱46,500 (34.5k + 12k)', num($('bTax').textContent) === 46500);
check('graduated wins in mixed mode (8% lost its exemption)', $('verdict').textContent.includes('Graduated'));
check('grand totals in doc (60,000 vs 46,500)', num($('d_grandA').textContent) === 60000 && num($('d_grandB').textContent) === 46500);
check('mixed warning shows', $('warn').textContent.includes('Mixed income'));

console.log('— v1.1 mixed: contributions deducted —');
const setV = (id, v) => { $(id).value = String(v); $(id).dispatchEvent(new window.Event('input', { bubbles: true })); };
setV('comp', 960000); setV('contribs', 10000);
// comp taxable = 960k − 90k − 10k = 860k → 102,500 + 25%×60k = 117,500
check('salary tax w/ contribs = ₱117,500', num($('d_compTax').textContent) === 117500);
check('deduction line shows 100,000', $('d_compded').textContent.includes('100,000'));

console.log('— v1.1 back to pure mode: backward compat —');
$('mixMode').value = 'pure';
$('mixMode').dispatchEvent(new window.Event('input', { bubbles: true }));
check('comp fields hidden again', $('compWrap').classList.contains('hidden'));
check('A card back to freelance-only ₱28,000', num($('aTax').textContent) === 28000);

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
