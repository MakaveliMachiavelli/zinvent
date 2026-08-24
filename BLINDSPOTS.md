# Zinvent Blindspot Audit — 2026-08-24

## 🔴 CRITICAL (fixed this session)

### B1. Redesign wiped every working app
The "world-class redesign" replaced functional apps with static landing pages.
- invoiceph went from **66 interactive elements → 7**
- closer 61→8, taxcalcph 52→7, payslipph 56→16, sellerprice 45→14 …all 15 affected
- JS crashed on load (`null .value` / `null .classList`) because app.js still
  referenced removed element ids
- **"Create Invoice Free" button did nothing** — no handler existed

**Fix:** `restore_apps.py` re-injects each product's original app UI as a hidden
`<section id="z-app">` below the landing hero; hero CTA unhides + scrolls to it.
All 15 restored & deployed. Verified: 0 console errors, z-app present, ids restored.

**Lesson:** visual QA (screenshots) can't catch missing functionality — always
diff interactive-element counts before/after UI changes. Now in test_js.cjs.

## 🟠 HIGH (documented, decision needed)

### B2. Unlock codes are public
PRO_CODES live in client-side app.js → anyone can view-source and unlock PRO free.
localStorage `pro=1` also settable via devtools.

**Threat model reality:** for ₱99–1,299 products sold via GCash QR to a casual PH
audience, friction matters more than cryptographic security. Paying requires
manual QR+code entry; freeloaders had to work anyway.
**Options (pick later):**
a) Accept as-is (honor-system, typical for this price tier)
b) Hash codes client-side (raises effort slightly)
c) Real licensing API when revenue justifies it

**Demo codes** (-DEMO-) remain active in all products — fine while parked.

## 🟡 MEDIUM (fixed this session)

### B3. Zero og:image across all 15 products
Links shared on FB/Messenger/TikTok bio rendered as bare URLs — fatal for a
social-commerce audience. **Fixed:** branded 1200×630 OG cards generated per
product from its theme colors + meta tags injected. All deployed.

### B4. No PWA manifest
Not yet fixed. Mobile users can't "Add to Home Screen" with proper icon/name.
Low priority vs above but cheap win next pass.

## 🟢 LOW / accepted
- tradejournalph formulas-lib full-model calc slow → structural checks cover it
- Feature cards text-only (no icons) — polish only
- Headless-chrome scrollbar artifact on TJ screenshots — not user-visible
