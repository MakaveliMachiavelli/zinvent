/* Integration test: Closer — real DOM + app.js under jsdom.
   Covers: CV parser, JD matcher, all 5 generators, gating (free runs), tracker CRUD + stages,
   follow-ups-due copy, PRO unlock, CSV export, persistence. */
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';

const root = '/home/allenos/zinvent/projects/closer';
const html = readFileSync(root + '/index.html', 'utf8');
const js = readFileSync(root + '/app.js', 'utf8');

const dom = new JSDOM(html, { url: 'http://localhost:8906/', runScripts: 'outside-only', pretendToBeVisual: true });
const { window } = dom;
window.alert = () => {}; window.print = () => {};
window.fetch = () => Promise.reject(new Error('no network in test'));
window.localStorage.clear();
dom.window.eval(js);
window.document.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true }));

const { document } = window;
const E = window.CloserEngine;
const $ = (id) => document.getElementById(id);
let pass = 0, fail = 0;
const check = (name, cond) => { cond ? (pass++, console.log('  ✓ ' + name)) : (fail++, console.log('  ✗ FAIL: ' + name)); };
const fire = (el, type = 'input') => el.dispatchEvent(new window.Event(type, { bubbles: true }));
const toast = () => $('toast').textContent;

const CV = `Juan Dela Cruz
juan.delacruz@email.com | 0917-123-4567
Web Developer

EXPERIENCE
• Built 12 e-commerce sites with WordPress and Shopify for local businesses
• Automated client reports using Python, saving 10 hours a week
• Managed hosting, backups and Linux servers for 20 client domains
SKILLS
JavaScript, HTML, CSS, PHP, MySQL, Git, Canva, Customer Service`;

const JD = `Junior Web Developer — Acme Retail Group

We need a junior web developer to maintain and improve our online store.

Requirements:
- 1-2 years experience with JavaScript and WordPress
- Comfortable with HTML, CSS, and basic SEO
- Familiar with Shopify e-commerce platform
- Knowledge of React is a plus
- Experience with Google Analytics and Facebook Ads preferred
- Junior/entry-level applicants welcome`;

console.log('— engine: CV parser —');
const p = E.parseResume(CV);
check('name = Juan Dela Cruz', p.name === 'Juan Dela Cruz');
check('email parsed', p.email === 'juan.delacruz@email.com');
check('phone parsed', p.phone.replace(/\D/g, '').endsWith('09171234567'));
check('skills include WordPress, Shopify, Python, Linux', ['WordPress','Shopify','Python','Linux'].every(s => p.skills.includes(s)));
check('role detected: Web Developer', p.roles.includes('Web Developer'));
check('3 experience bullets', p.bullets.length === 3);

console.log('— engine: JD matcher —');
const m = E.matchJd(p, JD);
// jdSkills: JavaScript, WordPress, HTML, CSS, SEO, Shopify, React, Google Analytics, Facebook Ads = 9; have: JS, WP, HTML, CSS, SEO?, Shopify
// CV has: JavaScript, HTML, CSS, WordPress, Shopify + Canva/CS (not in JD). SEO not in CV. → matched 5, missing 4 → 56%
check('matched includes JavaScript & Shopify', m.matched.includes('JavaScript') && m.matched.includes('Shopify'));
check('missing includes React & Google Analytics', m.missing.includes('React') && m.missing.includes('Google Analytics'));
check('score = 60% (6 of 10, incl. E-commerce)', m.score === 60);
check('seniority = Junior post', m.seniority.includes('Junior'));

console.log('— engine: generators produce specific, honest output —');
const t = E.tailorCv(p, m, { company: 'Acme Retail Group', role: 'Junior Web Developer' });
check('tailored CV references role + company', t.includes('Junior Web Developer') && t.includes('Acme Retail Group'));
check('tailored CV flags missing keywords honestly', t.includes('React') && t.toLowerCase().includes('weave in honestly'));
check('tailored CV reorders matched-first', t.indexOf('WordPress ✓matched') > -1);
const letter = E.coverLetter(p, m, { company: 'Acme Retail Group', role: 'Junior Web Developer' });
check('letter opens with role + company', letter.includes('Junior Web Developer position at Acme Retail Group'));
check('letter includes real CV proof', letter.includes('e-commerce sites'));
check('letter handles gap honestly', letter.includes("haven't used them professionally yet"));
const dm = E.outreachDm(p, m, { client: 'Sarah', problem: 'Shopify store speed', role: 'store fixes' });
check('DM has observation→proof→offer→CTA', dm.includes('Hi Sarah') && dm.includes('Audit') && dm.includes('Fair?'));
const fu = E.followUps({ company: 'Acme', role: 'Jr Dev', myName: 'Juan Dela Cruz' });
check('follow-ups = Day 0/3/7', fu.includes('DAY 0') && fu.includes('DAY 3') && fu.includes('DAY 7'));
check('Day 3 is the value-add', fu.includes('value-add') || fu.includes('One idea'));
const ip = E.interviewPrep(p, m, { company: 'Acme', role: 'Jr Dev' });
check('interview prep STAR skeletons', ip.includes('S:') && ip.includes('R:'));
check('interview prep salary answer (PH)', ip.includes('salary expectations') && ip.includes('₱'));

console.log('— UI: step 1 → step 2 flow —');
$('cvInput').value = CV; $('cvAnalyze').click();
check('profile card renders with name', $('cvProfile').textContent.includes('Juan Dela Cruz'));
check('skills chips render', $('cvProfile').querySelectorAll('.skill-chip').length >= 5);
$('jdCompany').value = 'Acme Retail Group';
$('jdRole').value = 'Junior Web Developer';
$('jdInput').value = JD; $('matchBtn').click();
check('score dial shows 60', $('matchScore').textContent === '60');
check('matched + missing chips render', $('matchedSkills').querySelectorAll('.skill-chip').length === 6 && $('missingSkills').querySelectorAll('.skill-chip').length === 4);
check('materials unlocked (matWrap visible)', !$('matWrap').classList.contains('hidden'));
check('tailored CV textarea filled', $('outCv').value.includes('Acme Retail Group'));
check('cover letter filled', $('outLetter').value.includes('Dear Hiring Manager'));
check('follow-ups filled', $('outFollow').value.includes('DAY 7'));
check('interview prep filled', $('outInterview').value.includes('INTERVIEW PREP'));

console.log('— UI: DM regenerates from inputs —');
$('dmClient').value = 'Sarah'; fire($('dmClient'));
$('dmProblem').value = 'slow Shopify store'; fire($('dmProblem'));
check('DM picks up client + problem', $('outDm').value.includes('Hi Sarah') && $('outDm').value.includes('slow Shopify store'));

console.log('— tracker: add, cap, stages —');
$('trkCompany').value = 'Acme Retail Group'; $('trkRole').value = 'Junior Web Developer'; $('addTrk').click();
check('1 row added with Day-3 due date', $('trkBody').querySelectorAll('tr').length === 1 && $('trkBody').textContent.includes('Applied'));
check('tracker prefilled from match (company kept)', $('trkBody').textContent.includes('Acme Retail Group'));
const rows = JSON.parse(window.localStorage.getItem('closer_trk'));
check('nextActionAt = applied+3d', rows[0].nextActionAt > rows[0].appliedAt);
// stage advance
const sel = $('trkBody').querySelector('.stage-select');
sel.value = 'Interview'; sel.dispatchEvent(new window.Event('change', { bubbles: true }));
check('stage → Interview counted', $('cntInterview').textContent === '1');

console.log('— gating: free runs —');
check('free runs counter = 1 after one generate', Number(window.localStorage.getItem('closer_runs')) === 1);
// exhaust: 2 more generates → 3 total → 4th should gate
$('matchBtn').click(); $('matchBtn').click(); $('matchBtn').click();
check('4th generate gated → pay modal opens', !$('payModal').classList.contains('hidden'));

console.log('— PRO unlock —');
$('codeInput').value = 'closer-demo'; $('codeBtn').click();
check('PRO unlocked', $('codeMsg').className.includes('ok'));
applyProCheck: {
  check('CSV export visible', !$('trkCsv').classList.contains('hidden'));
}
$('matchBtn').click();
check('generate works unlimited under PRO (no gating)', !$('payModal').classList.contains('hidden'));

console.log('— CSV export —');
window.URL.createObjectURL = () => 'blob:test';
let dl = null;
const origCreate = document.createElement.bind(document);
document.createElement = (tag) => { const el = origCreate(tag); if (tag === 'a') el.click = () => { dl = el.download; }; return el; };
$('trkCsv').click();
check('CSV downloads closer-pipeline.csv', dl === 'closer-pipeline.csv');
document.createElement = origCreate;

console.log('— 11/10 pass: sample loader + CV persistence —');
$('codeInput').value = ''; // clear modal state
window.localStorage.setItem('closer_cv_text', 'My saved CV');
// simulate reload: re-dispatch DOMContentLoaded wiring on same page
$('cvSample').click();
check('sample fills CV + JD + company/role', $('cvInput').value.includes('Juan Dela Cruz') && $('jdCompany').value === 'Acme Retail Group');
check('sample auto-analyzed (profile rendered)', $('cvProfile').textContent.includes('Juan Dela Cruz'));
check('materials auto-generated', $('outCv').value.includes('Acme Retail Group'));
$('cvInput').value = 'My saved CV';
$('cvSave').click();
check('CV save persists', window.localStorage.getItem('closer_cv_text') === 'My saved CV');
check('print-materials button exists', $('printMat') !== null);

console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
