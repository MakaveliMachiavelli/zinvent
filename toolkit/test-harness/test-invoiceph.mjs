/* Integration test: runs InvoicePH's real DOM + app.js under jsdom.
   Verifies: totals math for all VAT modes, item add/remove, PRO unlock,
   client save/load, sales book logging, draft persistence. */
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';

const root = '/home/allenos/zinvent/projects/invoiceph';
const html = readFileSync(root + '/index.html', 'utf8');
const js = readFileSync(root + '/app.js', 'utf8');

const dom = new JSDOM(html, {
  url: 'http://localhost:8901/',
  runScripts: 'outside-only',
  pretendToBeVisual: true,
});
const { window } = dom;
window.alert = () => {}; window.confirm = () => true; window.print = () => {};
// seed localStorage before app runs
window.localStorage.clear();

// run the app script
dom.window.eval(js);
window.document.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true }));

const $ = (id) => window.document.getElementById(id);
let pass = 0, fail = 0;
const check = (name, cond) => { cond ? pass++ : (fail++, console.log('  ✗ FAIL: ' + name)); if (cond) console.log('  ✓ ' + name); };

console.log('— VAT-exclusive mode math —');
$('vatMode').value = 'vat-excl';
const priceInput = $('items').querySelectorAll('input[data-f="price"]')[0];
priceInput.value = '1000';
priceInput.dispatchEvent(new window.Event('input', { bubbles: true }));
check('subtotal = 1 × ₱1000 = ₱1,000.00', $('p_subtotal').textContent === '₱1,000.00');
check('VAT 12% = ₱120.00', $('p_vat').textContent === '₱120.00');
check('total = ₱1,120.00', $('p_total').textContent === '₱1,120.00');

console.log('— VAT-inclusive mode math —');
$('vatMode').value = 'vat-incl';
$('vatMode').dispatchEvent(new window.Event('input', { bubbles: true }));
check('incl: total = ₱1,000.00', $('p_total').textContent === '₱1,000.00');
check('incl: net = ₱892.86', $('p_subtotal').textContent === '₱892.86');
check('incl: VAT = ₱107.14', $('p_vat').textContent === '₱107.14');

console.log('— NON-VAT mode —');
$('vatMode').value = 'nonvat';
$('vatMode').dispatchEvent(new window.Event('input', { bubbles: true }));
check('nonvat: VAT row hidden', $('p_vatRow').style.display === 'none');
check('nonvat: total = net = ₱1,000.00', $('p_total').textContent === '₱1,000.00' && $('p_subtotal').textContent === '₱1,000.00');
check('nonvat: badge says NON-VAT', $('p_sVat').textContent === 'NON-VAT');

console.log('— add / remove items —');
const before = $('items').querySelectorAll('.item-row').length;
$('addItem').click();
let rows = $('items').querySelectorAll('.item-row');
check('add item → 2 rows', rows.length === before + 1);
const desc2 = rows[1].querySelector('input[data-f="desc"]');
const price2 = rows[1].querySelector('input[data-f="price"]');
desc2.value = 'Logo design';
desc2.dispatchEvent(new window.Event('input', { bubbles: true }));
price2.value = '500';
price2.dispatchEvent(new window.Event('input', { bubbles: true }));
check('2 items total = ₱1,500.00', $('p_total').textContent === '₱1,500.00');
rows[0].querySelector('.item-x').click();
check('remove → 1 row, total ₱500', $('items').querySelectorAll('.item-row').length === 1 && $('p_total').textContent === '₱500.00');

console.log('— PRO unlock flow —');
$('proBtn').click();
check('pay modal opens', !$('payModal').classList.contains('hidden'));
$('codeInput').value = 'WRONG-CODE';
$('codeBtn').click();
check('wrong code rejected', $('codeMsg').className.includes('bad'));
$('codeInput').value = 'iph-demo';   // case-insensitivity check
$('codeBtn').click();
check('valid code unlocks PRO', $('codeMsg').className.includes('ok'));

console.log('— client directory (PRO) —');
$('bName').value = 'Acme Corp';
$('bTin').value = '009-888-777-000';
$('saveClientBtn').click();
$('loadClientBtn').click();
check('client modal opens w/ Acme', !$('clientModal').classList.contains('hidden') && $('clientList').textContent.includes('Acme Corp'));
$('clientClose').click();

console.log('— sales book logging on print —');
$('printBtn').click();               // logs to book (PRO active) + calls print (stubbed)
$('salesbookBtn').click();
check('sales book shows 1 entry', $('bookBody').querySelectorAll('tr').length === 1);
check('entry has Acme + ₱500', $('bookBody').textContent.includes('Acme Corp') && $('bookBody').textContent.includes('₱500.00'));
$('bookClose').click();

console.log('— auto-numbering on new invoice (PRO) —');
const n1 = $('invNo').value;
$('newBtn').click();
check('number increments', Number($('invNo').value) === Number(n1) + 1);

console.log('— draft persistence —');
$('bName').value = 'Persisted Client';
$('bName').dispatchEvent(new window.Event('input', { bubbles: true }));
const saved = JSON.parse(window.localStorage.getItem('iph_draft'));
check('draft saved to localStorage', saved && saved.b[0] === 'Persisted Client');

console.log('— amount in words —');
const pIn = $('items').querySelectorAll('input[data-f="price"]')[0];
pIn.value = '500';
pIn.dispatchEvent(new window.Event('input', { bubbles: true }));
check('₱500 → "Five Hundred Pesos & 0/100 Only"', $('p_words').textContent.includes('Five Hundred Pesos & 0/100 Only'));
pIn.value = '1234.56';
pIn.dispatchEvent(new window.Event('input', { bubbles: true }));
check('₱1,234.56 → "One Thousand Two Hundred Thirty-Four Pesos & 56/100 Only"',
  $('p_words').textContent.includes('One Thousand Two Hundred Thirty-Four Pesos & 56/100'));
pIn.value = '1150000';
pIn.dispatchEvent(new window.Event('input', { bubbles: true }));
check('₱1,150,000 → "One Million One Hundred Fifty Thousand Pesos"',
  $('p_words').textContent.includes('One Million One Hundred Fifty Thousand Pesos'));

console.log('— copy label + signature block —');
check('signature lines present', window.document.querySelector('.inv-sign') !== null);
$('invCopy').value = 'Duplicate';
$('invCopy').dispatchEvent(new window.Event('change', { bubbles: true }));
check('footer shows Duplicate copy', $('p_footer').textContent.includes('Duplicate copy'));

console.log('— v1.2: discount —');
const pIn2 = $('items').querySelectorAll('input[data-f="price"]')[0];
pIn2.value = '1000'; pIn2.dispatchEvent(new window.Event('input', { bubbles: true }));
$('vatMode').value = 'vat-excl'; $('vatMode').dispatchEvent(new window.Event('input', { bubbles: true }));
$('invDiscount').value = '100'; $('invDiscount').dispatchEvent(new window.Event('input', { bubbles: true }));
check('fixed ₱100 discount: total = 1,008.00', $('p_total').textContent.includes('1,008.00'));
check('discount row visible', $('p_discRow').style.display !== 'none');
$('invDiscount').value = '10%'; $('invDiscount').dispatchEvent(new window.Event('input', { bubbles: true }));
check('10% discount path: total = 1,008.00', $('p_total').textContent.includes('1,008.00'));

console.log('— v1.2: CWT 2307 —');
$('invDiscount').value = ''; $('invDiscount').dispatchEvent(new window.Event('input', { bubbles: true }));
$('cwtRate').value = '2'; $('cwtRate').dispatchEvent(new window.Event('input', { bubbles: true }));
check('CWT = ₱20.00 shown', $('p_cwt').textContent.includes('20.00'));
check('net payable = 1,100.00', $('p_net').textContent.includes('1,100.00'));
check('label says 2% (2307)', $('p_cwtLabel').textContent.includes('2%'));
$('cwtRate').value = '0'; $('cwtRate').dispatchEvent(new window.Event('input', { bubbles: true }));
check('CWT off hides rows', $('p_cwtRow').style.display === 'none' && $('p_netRow').style.display === 'none');

console.log('— v1.2: currency switch —');
$('invCur').value = 'USD'; $('invCur').dispatchEvent(new window.Event('input', { bubbles: true }));
check('total renders $ symbol', $('p_total').textContent.startsWith('$'));
$('invCur').value = 'PHP'; $('invCur').dispatchEvent(new window.Event('input', { bubbles: true }));
check('back to ₱', $('p_total').textContent.startsWith('₱'));

console.log('— v1.2: ATP on invoice —');
$('sAtp').value = 'ATP-000-778899'; $('sAtp').dispatchEvent(new window.Event('input', { bubbles: true }));
check('footer shows ATP no.', $('p_footer').textContent.includes('ATP-000-778899'));

console.log('— v1.2: sales-book dedup on reprint —');
$('invNo').value = '000123'; $('invNo').dispatchEvent(new window.Event('input', { bubbles: true }));
$('printBtn').click(); $('printBtn').click();
$('salesbookBtn').click();
const inv123 = [...$('bookBody').querySelectorAll('tr')].filter(tr => tr.textContent.includes('000123'));
check('invoice 000123 logged exactly once (reprint updates)', inv123.length === 1);
$('bookClose').click();

console.log('— v1.2: client delete —');
$('saveClientBtn').click();
$('loadClientBtn').click();
const beforeDel = $('clientList').querySelectorAll('li').length;
const delBtn = $('clientList').querySelector('button[data-del-ci]');
if (delBtn) delBtn.click();
check('client deleted from picker', $('clientList').querySelectorAll('li').length === beforeDel - 1);
$('clientClose').click();

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
