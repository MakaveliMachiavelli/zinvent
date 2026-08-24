/* Integration test: MoveInReport real DOM + app.js under jsdom.
   Photos path tested by seeding a draft (with embedded data-URI photos) BEFORE boot,
   which also verifies draft-restore → render for real. */
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';

const root = '/home/allenos/zinvent/projects/moveinreport';
const html = readFileSync(root + '/index.html', 'utf8');
const js = readFileSync(root + '/app.js', 'utf8');

const TINY = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';

const dom = new JSDOM(html, { url: 'http://localhost:8904/', runScripts: 'outside-only', pretendToBeVisual: true });
const { window } = dom;
window.alert = () => {}; window.confirm = () => true; window.print = () => {};
window.localStorage.clear();
// seed a draft with photos so the photo pipeline is exercised via the real load path
window.localStorage.setItem('mir_draft', JSON.stringify({
  meta: { t: 'Move-out', d: '2026-08-22', a: '12 Maple St.', l: 'Maple Rentals', n: 'J. Santos', u: '2A' },
  areas: [
    { name: 'Living room', cond: 'Good', notes: 'Walls repainted 2025', photos: [TINY, TINY] },
    { name: 'Kitchen', cond: 'Needs repair', notes: 'Sink faucet dripping', photos: [TINY] }
  ]
}));

dom.window.eval(js);
window.document.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true }));

const $ = (id) => window.document.getElementById(id);
let pass = 0, fail = 0;
const check = (name, cond) => { cond ? (pass++, console.log('  ✓ ' + name)) : (fail++, console.log('  ✗ FAIL: ' + name)); };
const fire = (el, type = 'input') => el.dispatchEvent(new window.Event(type, { bubbles: true }));

console.log('— draft restore —');
check('type restored MOVE-OUT', $('p_type').textContent.includes('MOVE-OUT'));
check('address restored', $('p_addr').textContent === '12 Maple St.');
check('2 areas restored', $('areas').querySelectorAll('.area-block').length === 2);
check('3 photos restored in editor', $('areas').querySelectorAll('.photo-thumb img').length === 3);
check('photos embed in preview', $('p_areas').querySelectorAll('.rd-photos img').length === 3);
check('notes restored', $('p_areas').textContent.includes('faucet dripping'));
check('Needs repair shows red pill', $('p_areas').querySelectorAll('.rd-cond.cond-bad').length === 1);

console.log('— photo removal —');
$('areas').querySelector('.photo-x').click();
check('remove photo → 2 in editor', $('areas').querySelectorAll('.photo-thumb img').length === 2);
check('preview updates to 2', $('p_areas').querySelectorAll('.rd-photos img').length === 2);

console.log('— area CRUD —');
$('addArea').click();
check('3 blocks', $('areas').querySelectorAll('.area-block').length === 3);
const nameIn = $('areas').querySelectorAll('input[data-f="name"]')[2];
nameIn.value = 'Bathroom 1'; fire(nameIn);
check('new area in preview', $('p_areas').textContent.includes('Bathroom 1'));
$('areas').querySelectorAll('.row-x')[1].click();
check('remove → 2 blocks', $('areas').querySelectorAll('.area-block').length === 2);

console.log('— meta edits —');
$('unit').value = '5B'; fire($('unit'));
check('unit in title', $('p_type').textContent.includes('UNIT 5B'));

console.log('— draft persistence after edits —');
const draft = JSON.parse(window.localStorage.getItem('mir_draft'));
check('draft: 2 areas (Living + Bathroom), Living keeps 1 photo', draft.areas.length === 2 && draft.areas[0].photos.length === 1);
check('draft meta unit 5B', draft.meta.u === '5B');

console.log('— PRO flow —');
$('proBtn').click();
check('pay modal opens', !$('payModal').classList.contains('hidden'));
$('codeInput').value = 'bogus'; $('codeBtn').click();
check('bad code rejected', $('codeMsg').className.includes('bad'));
$('codeInput').value = 'mir-demo'; $('codeBtn').click();
check('PRO unlocked', $('codeMsg').className.includes('ok'));
check('template button visible', !$('tplBtn').classList.contains('hidden'));
check('footer branding flips to PRO (landlord name)', $('p_foot').textContent === 'Maple Rentals');

console.log('— template (PRO) —');
$('tplBtn').click();
check('12 standard areas loaded', $('areas').querySelectorAll('.area-block').length === 12);
check('preview lists HVAC', $('p_areas').textContent.includes('HVAC'));

console.log('— saved reports (PRO, on print) —');
// slim areas so localStorage quota is safe under jsdom
window.localStorage.setItem('mir_draft', JSON.stringify({
  meta: { t: 'Move-in', d: '2026-08-22', a: '9 Cedar Ave.', l: '', n: 'K. Reyes', u: '' },
  areas: [{ name: 'Living room', cond: 'Good', notes: '', photos: [] }]
}));
// simulate reopening via saved-reports save path: set fields then print
$('insAddr').value = '9 Cedar Ave.'; fire($('insAddr'));
$('printBtn').click();
$('savedBtn').click();
check('saved modal lists report', !$('savedModal').classList.contains('hidden') && $('savedList').textContent.includes('9 Cedar Ave.'));

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
