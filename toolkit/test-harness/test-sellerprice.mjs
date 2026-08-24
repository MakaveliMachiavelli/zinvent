/* Integration test: SellerPrice real DOM + app.js under jsdom.
   CORRECTED math (IMPROVEMENT-SPEC): voucher is a seller EXPENSE (adds to F),
   profit subtracts it; + campaign % + BIR 0.5% ecom CWT (toggle) + RTS buffer.
   price = F/(1−f−m), F = svc+fixed+ship+voucher+rts+cost, f=(comm+txn+camp+0.5)/100 */
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';

const root = '/home/allenos/zinvent/projects/sellerprice';
const html = readFileSync(root + '/index.html', 'utf8');
const js = readFileSync(root + '/app.js', 'utf8');

const dom = new JSDOM(html, { url: 'http://localhost:8905/', runScripts: 'outside-only', pretendToBeVisual: true });
const { window } = dom;
window.alert = () => {}; window.print = () => {};
window.localStorage.clear();
dom.window.eval(js);
window.document.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true }));

const $ = (id) => window.document.getElementById(id);
let pass = 0, fail = 0;
const check = (name, cond) => { cond ? (pass++, console.log('  ✓ ' + name)) : (fail++, console.log('  ✗ FAIL: ' + name)); };
const num = (s) => Number(String(s).replace(/[₱,%]/g, ''));
const setVal = (id, v) => { $(id).value = String(v); $(id).dispatchEvent(new window.Event('input', { bubbles: true })); };

console.log('— defaults: ₱150 cost, 30% margin, Shopee 8% + 0.5% ecom CWT = 8.5% —');
check('price = 243.90 (150/0.615)', num($('oPrice').textContent) === 243.9);
check('profit = 73.17 (30% of price)', Math.abs(num($('oProfit').textContent) - 73.17) < 0.01);
check('break-even = 163.93 (150/0.915)', Math.abs(num($('oBe').textContent) - 163.93) < 0.01);
check('all-in fees = 20.73 (8.5% of price)', Math.abs(num($('oFees').textContent) - 20.73) < 0.01);
check('actual margin shows 30%', $('p_margin').textContent.replace('%','').startsWith('30'));

console.log('— platform table (incl. 0.5% CWT column) —');
const platCells = [...$('platRows').querySelectorAll('tr')];
check('3 platform rows', platCells.length === 3);
check('Lazada (6.5%) = 236.22', platCells[1].textContent.includes('236.22'));
check('TikTok (8.5%) = 243.90', platCells[2].textContent.includes('243.90'));

console.log('— platform switch updates fee fields —');
$('platform').value = 'lazada';
$('platform').dispatchEvent(new window.Event('change', { bubbles: true }));
check('comm → 4', $('comm').value === '4');
check('platName shows Lazada', $('platName').textContent === 'Lazada PH');

console.log('— REGRESSION: voucher is an expense, never a subsidy —');
setVal('ship', 20); setVal('voucher', 15); setVal('fixed', 5);
// lazada f=6.5%: F = 0+5+20+15+150 = 190 → price = 190/0.635 = 299.21
// (the old buggy formula returned 250.00 by subtracting the voucher)
check('price with voucher = 299.21 (NOT 250)', Math.abs(num($('oPrice').textContent) - 299.21) < 0.01);

console.log('— ecom CWT toggle —');
$('ecomTax').checked = false;
$('ecomTax').dispatchEvent(new window.Event('change', { bubbles: true }));
check('ecom off: 190/0.64 = 296.88', Math.abs(num($('oPrice').textContent) - 296.88) < 0.01);
$('ecomTax').checked = true;
$('ecomTax').dispatchEvent(new window.Event('change', { bubbles: true }));

console.log('— campaign fee adds to % stack —');
setVal('campFee', 3.5);
// lazada: 4+2+3.5+0.5 = 10% → 190/0.60 = 316.67 (shopee row = 6+2+3.5+0.5 = 12%)
check('campaign 3.5%: 190/0.60 = 316.67', Math.abs(num($('oPrice').textContent) - 316.67) < 0.01);
check('platform table shows 12% column (shopee)', $('platRows').textContent.includes('12%'));

console.log('— RTS buffer adds to fixed costs —');
setVal('rtsBuffer', 10); setVal('campFee', 0);
// f=6.5%, F=200 → 200/0.635 = 314.96
check('RTS ₱10: 200/0.635 = 314.96', Math.abs(num($('oPrice').textContent) - 314.96) < 0.01);
setVal('rtsBuffer', 0);

console.log('— impossible margin guard —');
setVal('margin', 95);
check('shows impossible fees!', $('oPrice').textContent.includes('impossible'));
setVal('margin', 30);

console.log('— PRO + batch —');
$('proBtn').click();
$('codeInput').value = 'sp-demo';
$('codeBtn').click();
check('PRO unlocked', $('codeMsg').className.includes('ok'));
$('batchBtn').click();
setVal('bCost', 100); $('bCost').dispatchEvent(new window.Event('input', {bubbles:true}));
$('bItem').value = 'Tumbler';
$('bAdd').click();
$('bItem').value = 'Phone case';
setVal('bCost', 50);
$('bAdd').click();
check('2 batch rows', $('batchBody').querySelectorAll('tr').length === 2);
// tumbler: F = 0+5+20+15+100 = 140, shopee 8.5% → 140/0.615 = 227.64
check('tumbler shopee = 227.64 (140/0.615)', $('batchBody').textContent.includes('227.64'));

console.log('— draft persistence —');
const draft = JSON.parse(window.localStorage.getItem('sp_draft'));
check('draft saved', draft && draft.f[0] === '150');
check('draft keeps ecom flag', draft.ecom === true);

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
