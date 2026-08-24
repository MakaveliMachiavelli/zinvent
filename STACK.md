# STACK.md — Front-End & Design Stack for ZCode (verified, no-build, GitHub Pages)
*Compiled 2026-08-22 from Agent Reach / Exa research + gh API verification. CDN reachability tested from VPS. All static/no-backend.*

## 1. CDN STACK (verified reachable from VPS — curl tested)
| Lib | URL | Status | Use |
|-----|-----|--------|-----|
| Tailwind CSS | `https://cdn.tailwindcss.com` | 302 (works) | Utility CSS, no build |
| daisyUI | `https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css` | 200 | Premium components on Tailwind |
| Google Fonts — Space Grotesk (headings) + Inter (body) | `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;600&display=swap` | 200 | Distinctive typography (kills generic look) |
| Alpine.js | `https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js` | 302 (works) | Lightweight reactivity (no React build) |
| lucide icons | `https://unpkg.com/lucide@latest` | (use CDN) | Clean SVG icons |
| GSAP | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` | 200 | Micro-interactions / entrance anims |

## 2. PREMIUM DESIGN RULES (no generic AI look)
- **Typography:** Space Grotesk headings + Inter body. NEVER system-font-only.
- **Color:** No AI-blue (#0b5fff). Per-product branded palette in `:root` (emerald/ink, indigo/amber, slate/coral, etc).
- **Polish:** rounded-2xl cards, subtle shadows, hover-lift transitions, generous whitespace, SVG wordmark/logo.
- **Structure:** sticky header + hero (benefit copy) + feature grid + CTA + footer (cross-link siblings).
- **Icons:** lucide, not emoji.

## 3. STARTER TEMPLATES (real repos, gh-API verified)
- `analytiq-hub/analytiq-pages-starter` — Professional GitHub Pages starter, Tailwind. STEAL: structure + deploy.
- `ravvdevv/ravn-ui` — minimal premium CDN-first UI library inspired by daisyUI. STEAL: component patterns.
- `doctor500/landing-page` — static landing on GH Pages. STEAL: landing layout.
- daisyUI CDN docs: https://daisyui.com/docs/cdn/ — use daisyUI classes directly.
- useWeft (Tailwind no-build alt): https://useweft.dev/

## 4. DEPLOY WORKFLOW (reusable, gh api — no login wall)
```yaml
# .github/workflows/deploy.yml  (push to main → Pages)
name: Deploy Pages
on: { push: { branches: [main] } }
permissions: { contents: read, pages: write, id-token: write }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/upload-pages-artifact@v3
        with: { path: '.' }
      - uses: actions/deploy-pages@v4
```
OR one-command (no workflow file): `gh repo create X --public && git push && gh api repos/{owner}/X/pages -f source=branch -f branch=main` then enable via `gh api -X POST`.

## 5. TEST SETUP (static tools)
- **jsdom** (already used — 69 assertions passed). Keep: test calc logic, DOM rendering, event handlers.
- **Playwright** (optional, heavier): e2e click-through. Use if jsdom insufficient.
- Assert ≥20 per product before "done".

## 6. SELF-IMPROVEMENT LOOP
- Extract `toolkit/premium-base/` = index.html skeleton + style.css (Tailwind+daisyUI+fonts) + app.js Alpine pattern + test harness.
- Every new/deepened product starts from `premium-base` → 10% cost, premium by default.
- Update `premium-base` when you learn a better pattern.

## 7. NOTE
Full multi-model panel (Claude/GPT/Gemini via agy) was rate-limited (429) at compile time — this stack is from Agent Reach/Exa (working) + gh verification. Re-run panel when API recovers for opinion-layer refinement.
