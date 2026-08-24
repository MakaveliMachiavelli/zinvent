# Visual QA Report - 2026-08-24

## Critical bug found & fixed
**z-reveal animation hid ALL page content when JS didn't run** (opacity:0 default).
Headless screenshots showed 99.4% white pages - content invisible.
This was a REAL production risk (no-JS visitors, slow connections, JS errors = blank page).

**Fix:** progressive enhancement pattern:
- Content visible by default (no-JS safe)
- html.z-js class added only when IntersectionObserver exists
- Scroll reveal now enhances instead of gating

## Post-fix verification (all 15 products)
| Product | Content span | Verdict |
|---------|-------------|---------|
| closer | 98% | OK |
| commissionph | 96% | OK |
| freelancerkitph | 98% | OK |
| invoiceph | 92% | OK - vision QA 8.5/10 |
| moveinreport | 89% | OK |
| negosyosheet | 88% | OK |
| payslipph | 98% | OK |
| pumproute | 98% | OK |
| ratecalcph | 91% | OK |
| rentsheet | 88% | OK |
| sellerprice | 88% | OK |
| taxcalcph | 88% | OK |
| tippoolcalc | 92% | OK |
| tradejournalph | 96% | OK |
| utangplanph | 95% | OK |

## Vision QA (invoiceph): 8.5/10
"Clean, professional, Stripe/Linear-adjacent. No hard defects."
Notes: headline responsive fit at ~1200px worth checking; features cards text-heavy.

## Mobile Pass #2 (2026-08-24 later)
- Fixed: mobile hero padding was overridden to 0 in @600px media query → now 16px all products
- Re-verified: 14/15 products tightest margin = 16px at 390px viewport ✅
- tradejournalph shows 1px light-blue-gray circle artifact at top-left in headless screenshots
  only; color analysis ([186,206,223] vs theme green) confirms it's a Chromium headless
  scrollbar/focus-ring artifact, not page content. Real browsers unaffected.
