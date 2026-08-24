/* toolkit/pay-block.js — drop-in PRO unlock module for static sites.
   Paste before your app.js (or import as a <script>), then:

   PayBlock.mount({
     codes: ['YOUR-CODE-1'],            // codes you message to buyers
     modalId: 'payModal',               // your modal element ids (defaults shown)
     price: 199, currency: '₱',
     storageKey: 'myprefix_pro'
   });

   In HTML provide (or let defaults build it):
     #payModal .modal > .modal-card with #codeInput, #codeBtn, #codeMsg,
     buttons with class .js-pro-open to open it.
   API: PayBlock.isPro(), PayBlock.onChange(fn) — call applyPro() in fn.
*/
(function () {
  'use strict';
  let _cfg = {
    codes: [], modalId: 'payModal', inputId: 'codeInput',
    btnId: 'codeBtn', msgId: 'codeMsg', storageKey: '_pro', price: 199, currency: '₱'
  };
  const listeners = [];
  const isPro = () => localStorage.getItem(_cfg.storageKey) === '1';

  function setMsg(ok, text) {
    const el = document.getElementById(_cfg.msgId);
    if (el) { el.textContent = text; el.className = 'code-msg ' + (ok ? 'ok' : 'bad'); }
  }
  function unlock() {
    localStorage.setItem(_cfg.storageKey, '1');
    setMsg(true, '✓ PRO unlocked!');
    listeners.forEach(fn => { try { fn(true); } catch (e) {} });
    setTimeout(() => { const m = document.getElementById(_cfg.modalId); if (m) m.classList.add('hidden'); }, 1500);
  }
  function tryCode() {
    const inp = document.getElementById(_cfg.inputId);
    const code = (inp.value || '').trim().toUpperCase();
    if (_cfg.codes.map(c => c.toUpperCase()).includes(code)) unlock();
    else setMsg(false, 'Invalid code — check your payment confirmation.');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById(_cfg.modalId);
    document.querySelectorAll('.js-pro-open').forEach(b => b.addEventListener('click', () => {
      if (modal) { modal.classList.remove('hidden'); setMsg(null, ''); }
    }));
    if (modal) modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });
    const btn = document.getElementById(_cfg.btnId);
    const inp = document.getElementById(_cfg.inputId);
    if (btn) btn.addEventListener('click', tryCode);
    if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') tryCode(); });
  });

  window.PayBlock = {
    mount(cfg) { Object.assign(_cfg, cfg || {}); },
    isPro,
    onChange(fn) { listeners.push(fn); if (isPro()) fn(true); },
    // convenience: toggle .hidden on elements for pro/non-pro states
    toggle(elements) { elements.forEach(id => { const el = document.getElementById(id); if (el) el.classList.toggle('hidden', !isPro()); }); }
  };
})();
