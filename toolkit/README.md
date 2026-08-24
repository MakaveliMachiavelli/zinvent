# toolkit/ — the compounding engine

*Everything a new zinvent product needs. Attempt #14 starts at ~10% of attempt #1's cost.*

## Index
| Asset | What it does |
|---|---|
| `premium-base/index.html` | STACK.md starter: Tailwind+daisyUI CDN, Space Grotesk/Inter, Alpine-ready, lucide, guarded GSAP reveals, `[x-cloak]`, branded `:root` tokens. |
| `components/` | 5 production UI blocks (pricing card, GCash payment-unlock, multi-step wizard, results-export panel, testimonial strip) — copy-paste. |
| `pay-block.js` | Drop-in PRO unlock module (modal wiring, codes, localStorage, onChange). |
| `deploy-pages.sh` | One-command deploy: git → gh repo → push → Pages API → poll until 200. Usage: `./deploy-pages.sh ../projects/<dir> [repo]` |
| `test-harness/` | jsdom rig + 11 product suites (`node test-<name>.mjs`). Pattern: real index.html + app.js, real events, assert DOM text. For xlsx: openpyxl structural + `formulas` engine evaluation (see `projects/*/eval_test.py`). |
| `copy-library.md` | Taglish marketing copy patterns per product archetype. |
| Below: **Verified Patterns** — hard-won, all caught by tests. |

## Verified patterns (battle-tested through 13 shipped products)
1. **Event delegation with guards**: `if (f === undefined || Number.isNaN(i)) return` on every delegated container listener — stray bubbles crash nothing.
2. **Word-boundary skill matching**: substring matching reports "Java" inside "JavaScript" (Closer bug). Use `(^|[^a-z0-9+#])SKILL([^a-z0-9+#]|$)` — shared helper, both sides (CV + JD).
3. **Rounding-balance**: round payouts to cents, add remainder to the first row → sheet balances exactly (TipPool, PumpRoute).
4. **Date objects, never ISO strings, in xlsx**: text dates silently compare greater than any number in both the `formulas` engine AND real Excel (RentSheet bug — expiry alerts never fired).
5. **SUMIFS over SUMPRODUCT for date windows**: SUMPRODUCT over formula columns containing `""` = #VALUE! in real Excel (NegosyoSheet MTD bug). SUMIFS with `">="&DATE(...)` bounds skips text safely.
6. **Sales-log dedup on print**: reprinting an invoice updates by invoice number — never appends (InvoicePH).
7. **Re-render after PRO unlock**: unlock handlers must call `render()` or footer/branding stays stale (MoveInReport bug).
8. **Quota-safe draft save**: photos in localStorage → wrap in try/catch, retry without photos rather than losing the draft.
9. **Disabled buttons kill their own CTA**: gating a button that should open the paywall? Keep it clickable, dim it, let the handler route to the modal (PumpRoute bug).
10. **VAT-inclusive reverse math**: total/1.12 (never total×0.12). **Percentage-tax reality**: graduated non-VAT PH freelancers owe +3% of gross (2551Q); 8% replaces it — crossover ₱937.5k → ≈₱535.7k (TaxCalcPH, guide updated).
11. **One-time vs SaaS positioning**: every product priced once (₱99–₱199 / $6.99–49) against $12–500/mo incumbents — the wedge is the whole brand.
12. **PH statutory snapshot (2025, editable in-app)**: SSS EE 4.5% MSC 5k–35k; PhilHealth 2.5% 10k–100k; Pag-IBIG 2% cap 10k (max ₱200); 13th month = basic/12, exempt ≤₱90k combined; TRAIN brackets unchanged.

## Product archetypes (pick one, copy the closest sibling)
- **Web tool, global**: tippoolcalc (engine + print doc + PRO history/CSV)
- **Web tool, PH**: taxcalcph / payslipph / closer (PH rules + Taglish options + GCash)
- **xlsx product**: negosyosheet / rentsheet / tradejournalph (`build_sheet.py` + `eval_test.py` + code-gated landing; copy `.venv`)
- **Funnel companion**: ratecalcph (simple engine, cross-links to siblings)

## Deploy & verify ritual (per product)
```bash
node --check app.js                                    # syntax
cd ../toolkit/test-harness && node test-<name>.mjs     # ≥20 assertions, 0 fail
../toolkit/deploy-pages.sh . <name>                    # live in ~90s
curl the URL + key assets                              # 200s
hub card + sitemap + cross-links + LEDGER
```
