/* Integration test: PayslipPH real DOM + app.js under jsdom.
   Expected math (2025 statutory defaults per IMPROVEMENT-SPEC, salary ₱25,000):
   SSS = 25000×4.5% = 1,125 · PhilHealth = 25000×2.5% = 625 · Pag-IBIG = 10000×2% = 200
   taxable = 23,050 → tax 20%×2,218 = 443.60 · deductions 2,393.60 · net 22,606.40
   ER cost = 25,000 + (25,000×9.5%+30) + 625 + 200 = 28,230 */
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';

const root = '/home/allenos/zinvent/projects/payslipph';
const html = readFileSync(root + '/index.html', 'utf8');
const js = readFileSync(root + '/app.js', 'utf8');

const dom = new JSDOM(html, { url: 'http://localhost:8904/', runScripts: 'outside-only', pretendToBeVisual: true });
const { window } = dom;
window.alert = () => {}; window.confirm = () => true; window.print = () => {};
window.localStorage.clear();
dom.window.eval(js);
window.document.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true }));

const $ = (id) => window.document.getElementById(id);
let pass = 0, fail = 0;
const check = (name, cond) => { cond ? (pass++, console.log('  ✓ ' + name)) : (fail++, console.log('  ✗ FAIL: ' + name)); };
const num = (s) => Number(String(s).replace(/[₱,]/g, ''));
const setVal = (id, v) => { $(id).value = String(v); $(id).dispatchEvent(new window.Event('input', { bubbles: true })); };

console.log('— ₱25,000 default math (2025 rates) —');
check('SSS = 1,125.00 (4.5%)', num($('p_sss').textContent) === 1125);
check('PhilHealth = 625.00 (2.5%)', num($('p_ph').textContent) === 625);
check('Pag-IBIG = 200 (MSC cap 10,000 × 2%)', num($('p_pi').textContent) === 200);
check('withholding tax = 443.60', num($('p_tax').textContent) === 443.6);
check('total deductions = 2,393.60', num($('p_ded').textContent) === 2393.6);
check('net = 22,606.40', num($('oNet').textContent) === 22606.4);
check('13th accrued = 2,083.33', num($('o13').textContent) === 2083.33);
check('employer total cost = 28,230', num($('oErCost').textContent) === 28230);

console.log('— ₱15,000: zero withholding —');
setVal('eSalary', 15000);
check('tax = 0 (below 20,832 after ded)', num($('p_tax').textContent) === 0);
check('net = 13,750 (ded 675+375+200)', num($('oNet').textContent) === 13750);

console.log('— ₱100,000: 30% bracket + caps —');
setVal('eSalary', 100000);
// SSS capped 35,000×4.5% = 1,575 · PH capped 100,000×2.5% = 2,500 · PI capped 10,000×2% = 200
const expTax = 10833.33 + 0.30 * (100000 - 1575 - 2500 - 200 - 66666);
check(`tax ≈ ${expTax.toFixed(2)}`, Math.abs(num($('p_tax').textContent) - expTax) < 0.01);
check('SSS capped at MSC 35,000 → 1,575', Math.abs(num($('p_sss').textContent) - 1575) < 0.011);
check('PhilHealth capped 2,500', num($('p_ph').textContent) === 2500);

console.log('— overtime + allowance + late + vale rows —');
setVal('eSalary', 20000);
setVal('eOtHrs', 10);      // hourly = 20000/208 = 96.15 → OT = 10×96.15×1.25 = 1,201.92
setVal('eAllowance', 500);
setVal('eLate', 100);
setVal('eVale', 300);
check('OT row visible = 1,201.92', $('p_ot').parentElement.style.display !== 'none' && Math.abs(num($('p_ot').textContent) - 1201.92) < 0.01);
check('allowance row visible = 500', $('p_allow').parentElement.style.display !== 'none' && num($('p_allow').textContent) === 500);
check('late row visible = 100', $('p_late').parentElement.style.display !== 'none' && num($('p_late').textContent) === 100);
check('vale row visible = 300', $('p_vale').parentElement.style.display !== 'none' && num($('p_vale').textContent) === 300);
// gross = 20,000 + 1,201.92 + 500 = 21,701.92
check('gross includes OT + allowance', Math.abs(num($('p_gross').textContent) - 21701.92 - num($('p_13').textContent)) < 0.02);
setVal('eOtHrs', 0); setVal('eAllowance', 0); setVal('eLate', 0); setVal('eVale', 0);
check('OT row hides at 0', $('p_ot').parentElement.style.display === 'none');

console.log('— semi-monthly mode —');
setVal('eSalary', 25000);
$('payFreq').value = 'semi';
$('payFreq').dispatchEvent(new window.Event('input', { bubbles: true }));
check('basic halves to 12,500', num($('p_basic').textContent) === 12500);
check('SSS halves to 562.50', num($('p_sss').textContent) === 562.5);
check('tax halves (computed on monthly base ×0.5)', num($('p_tax').textContent) === 443.6 / 2);
$('payFreq').value = 'monthly';
$('payFreq').dispatchEvent(new window.Event('input', { bubbles: true }));
check('back to monthly 25,000', num($('p_basic').textContent) === 25000);

console.log('— 13th month months worked —');
setVal('eSalary', 24000);
setVal('eMonths', 8);
check('13th for 8 months = 16,000', $('o13Year').textContent.includes('16,000'));
check('13th accrued = 2,000', num($('o13').textContent) === 2000);

console.log('— payslip header fields —');
setVal('eName', 'Liza D. Reyes');
setVal('eCo', 'Tindahan Ni Aling Nena');
check('payslip shows name', $('p_name').textContent === 'Liza D. Reyes');
check('payslip shows company', $('p_co').textContent === 'Tindahan Ni Aling Nena');
check('ER cost line on payslip', $('p_er').textContent.includes('Employer total cost'));

console.log('— PRO unlock + staff + batch —');
$('proBtn').click();
$('codeInput').value = 'psp-demo';
$('codeBtn').click();
check('PRO unlocked', $('codeMsg').className.includes('ok'));
setVal('eName', 'Employee One');
setVal('eSalary', 25000);
$('saveEmpBtn').click();
setVal('eName', 'Employee Two');
setVal('eSalary', 15000);
$('saveEmpBtn').click();
$('batchBtn').click();
check('staff table lists 2', $('batchBody').querySelectorAll('tr').length === 2);
check('staff shows computed net 22,606.40', $('batchBody').textContent.includes('22,606.40'));
window.print = () => { window.__printed = true; };
$('batchPrint').click();
check('batch print ran', window.__printed === true);
await new Promise(r => setTimeout(r, 550));
check('batch mode class toggled off', !window.document.body.classList.contains('batch-printing'));

console.log('— draft persistence —');
const draft = JSON.parse(window.localStorage.getItem('psp_draft'));
check('draft saved with salary', draft && draft.f[4] === '15000');

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
