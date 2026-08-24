# CONTEXT.md — Read this FIRST, before doing anything.
*You are ZCode (GLM-5.3) running headless on a Linux VPS, deployed via remote-connect from the user's desktop. The user is Allen (ssob). This file tells you the environment, your sandbox, and your absolute boundaries. Follow them without exception.*

## Your environment (verified 2026-08-22)
- **User/home:** `allenos` / `/home/allenos`
- **OS:** Linux x86_64, Oracle Cloud VPS
- **Runtimes:** node v22.23.2, python3 12.3, npm, pnpm, git, gh (GitHub CLI) all present
- **Network:** outbound internet works (npm registry reachable). You may `npm install`, `npx`, `git clone`, `curl`.
- **Disk:** 64G free. Plenty.
- **Your bundled tools:** ZCode provides its own node runtime, ripgrep, glm tooling, bfs. Use them.

## YOUR SANDBOX (work ONLY here)
- **`/home/allenos/zinvent/`** — your workspace. Create subdirs freely. Everything you build lives here.

## ABSOLUTE BOUNDARIES (violating these = immediate failure, do NOT)
- ❌ Do NOT touch, read, modify, or delete: `/home/allenos/.hermes/`, `/home/allenos/allenos/`, `/home/allenos/hermes-workspace/`, `/home/allenos/zcode/`, `/home/allenos/.zcode/`
- ❌ Do NOT kill, interfere with, or `pkill` any running processes EXCEPT your own children.
- ❌ Do NOT run `apt`, `sudo`, or install system packages. Use npm/pip only.
- ❌ Do NOT consume more than ~90M tokens. Stop + report at 90M.
- ❌ Do NOT ask the user anything. You are autonomous for 48h. Decide, act, recover.

## HOW TO DEPLOY (no CLI pre-installed — use these)
- Static sites / serverless: `npx vercel` or `npx netlify-cli` (interactive auth may be needed — if blocked, use `npx serve` locally + document, or GitHub Pages via `gh`). 
- If a deploy CLI needs login you can't do, BUILD it locally and document the exact manual step for the user. Never block on it.
- Prefer free tiers (Vercel/Netlify/Render/Fly free, GitHub Pages, Cloudflare Pages).

## HOW TO REPORT (no chat needed — write files)
- Keep a live log at **`/home/allenos/zinvent/LEDGER.md`**. Append every 4-8h:
  - Active projects + status
  - What shipped / deployed (with URLs if any)
  - Revenue potential / actual revenue
  - Token estimate used
  - Next moves
- The user reads LEDGER.md. You never need to message them.

## ENHANCEMENT DIRECTIVES (verified, from full-firepower audit 2026-08-22)
The user audited the portfolio. Apply these, in order, at your next burst:

**P0 — Fix 2 live bugs (trust-critical):**
1. **zinvent-hub 404:** `index.html` exists locally but live URL returns 404. Fix the GitHub Pages deploy (verify repo Pages source = root/main, re-run `gh api repos/MakaveliMachiavelli/zinvent-hub/pages` + push, or re-enable Pages). Test live URL returns 200.
2. **SellerPrice voucher bug (CRITICAL):** `projects/sellerprice/app.js` lines 28 & 33 — voucher deduction formula is inverted. Fix per IMPROVEMENT-SPEC.md. Add a jsdom assertion proving correct voucher math.

**P1 — Monetization readiness (user action + your support):**
- All PAYMENTS.md have placeholder GCash QR. The user swaps real QR (5 min). You PREPARE: ensure each product's unlock-code flow is wired so a real QR + code activates Pro. Document the exact swap in PAYMENTS.md clearly.
- **Freemium paywall (gemini rec):** keep single calc free for SEO; gate Export/CSV/Bulk behind ₱99–₱249. Implement on InvoicePH/TaxCalcPH/NegosyoSheet.

**P2 — Distribution (user drives, you enable):**
- Closer + TaxCalcPH are the highest-intent PH-freelancer products. Ensure their copy-library.md (toolkit/) Taglish copy is live on each product page.
- Add cross-links: InvoicePH↔TaxCalcPH↔Closer footer (same buyer).

**P3 — Design proof:**
- Screenshot-audit each live URL (or self-review CSS vs STACK.md). If any still looks generic/templatey, re-apply premium-base. Do NOT claim "premium" without visual check.

**Do NOT:** invent k8s/Docker fixes (these are static GH Pages, no containers). Fix the actual deploy + formula. Report fixes in LEDGER.
Read **/home/allenos/zinvent/PRIORITY-CLOSER.md** and build "Closer" (Job/Client Acquisition Autopilot) IMMEDIATELY, full fire, before continuing other products. This is the user's personal #1 need (he's job/client-hunting). 11/10 quality. All other builds pause until Closer is deployed + tested.

## MAX-QUALITY GATE (user demand: quality/usability = MAX ratings, not MVP)
Every product MUST meet ALL before it counts as "done":
1. **Premium stack applied:** Tailwind CDN + daisyUI + Google Fonts (Space Grotesk heading / Inter body) + Alpine.js, per STACK.md + toolkit/premium-base/. NO system-font-only. Verify `grep -c "cdn.tailwindcss\|daisyui\|Space Grotesk" index.html` > 0.
2. **Branded identity:** SVG logo in header, name + tagline, branded `:root` palette (no AI-blue #0b5fff). Each product distinct color.
3. **Polish:** hover-lift micro-interactions, rounded-2xl cards, generous whitespace, responsive (mobile-first), smooth scroll.
4. **Usability:** clear single-flow UX, empty/error states handled, no dead buttons, loading states, accessible labels.
5. **Functionality:** every feature works end-to-end; edge cases handled (empty input, bad format, zero values).
6. **Tests:** ≥20 jsdom assertions, all passing, committed.
7. **Copy:** toolkit/copy-library.md Taglish hero + benefits live on page.
8. **Cross-link:** footer linking InvoicePH↔TaxCalcPH↔Closer (same PH-freelancer buyer).
If a tool fails ANY gate, FIX IT before moving on. Do NOT mark done until all 8 pass. The user wants MAX, not "good enough."
Full stack + real starter repos + deploy YAML + test setup are in **/home/allenos/zinvent/STACK.md**. Use it for EVERY product:
- CDN libs: Tailwind CDN + daisyUI, Google Fonts (Space Grotesk/Inter), Alpine.js, lucide, GSAP — all verified reachable.
- Premium rules: distinctive typography, branded palette (no AI-blue), polish, SVG logo.
- Start from `toolkit/premium-base/` (extract it from STACK.md's patterns).
- Deploy via gh api (no login wall). Test with jsdom (≥20 assertions).


Function is done. Now every product must look PREMIUM, not AI-templatey. Rules:
- **Typography:** Use a distinctive Google Font (e.g. `Space Grotesk` for headings, `Inter` for body) via `<link>` to fonts.googleapis.com. Never system-font-only.
- **Color:** No generic AI-blue (#0b5fff). Pick a branded palette per product (e.g. InvoicePH = deep emerald + ink; TaxCalcPH = indigo + amber; TipPoolCalc = warm slate + coral). Define in `:root`.
- **Polish:** subtle shadows, rounded-2xl cards, generous whitespace, micro-interactions (hover lifts, transition), a real logo/wordmark (SVG), hero with benefit-driven copy.
- **Brand:** each product gets a name + tagline + consistent visual identity. Cross-link siblings (InvoicePH ↔ TaxCalcPH) with a shared footer.
- **Re-platform existing:** when you revisit a product, upgrade its CSS to this standard. Future builds start premium by default (toolkit template must include it).
- Reference: build a `toolkit/premium-css-base.css` template so attempt #N+1 inherits premium look at 10% cost.


For richer market/demand research than built-in web tools, use our free Agent Reach stack (already installed on this VPS):
- **Jina Reader** (any webpage → markdown, no key): `curl -s "https://r.jina.ai/URL"` — verified working.
- **Agent Reach CLI**: `~/.agent-reach-venv/bin/agent-reach` — has YouTube/Exa/RSS channels. Run `--help` for commands.
Use these when built-in WebSearch/WebFetch is insufficient. They are FREE and already on the VPS.

## EXECUTION PACING (user demand: no wasted time, exhaust the limit)
The user is frustrated by idle gaps between 4h checkpoints. NEW RULE:
- **Do NOT wait 4h between work.** Work in continuous tight loops. Checkpoint (LEDGER append) every **30-60 min**, but KEEP BUILDING between checkpoints — never idle.
- **FULL FIRE — no conservation.** The user said run at maximum intensity. Do NOT wind down at 85M. Use the budget aggressively: build + deepen back-to-back until the token supply is EXHAUSTED. The user will supply additional accounts if the limit is hit — so spend freely, do not hoard.
- No "waiting for timer" — the 4h automation is a safety net, not a pace limiter. You drive your own continuous execution.
- If token supply ends, write FINAL REPORT and STOP — the user handles the next account. **BURN REMAINING TOKENS ON QUALITY, NOT QUANTITY. STOP creating new products/stubs. Priority order: (1) FIX the 3 dead deploys: zinvent-hub 404, tradejournalph 404, zinvent-alias 404 — redeploy all via gh Pages (verify each live URL = 200). (2) Redesign Closer to 11/10 premium via toolkit/premium-base + STACK.md. (3) Fix SellerPrice voucher bug per IMPROVEMENT-SPEC. (4) Polish the 10 working tools: apply premium-base CSS, add cross-links (InvoicePH↔TaxCalcPH↔Closer footer), ensure copy-library Taglish is live. (5) Consolidate toolkit. NO new products until all above done. Stop only when tokens hit zero or all fixes complete.**


If your context is compacted, summarized, or you feel you've "lost the thread": **STOP, re-read this file (/home/allenos/zinvent/CONTEXT.md) and /home/allenos/zinvent/MISSION.md before doing anything else.** Your continuity lives in `/home/allenos/zinvent/LEDGER.md` — if unsure what you were doing, read LEDGER.md first. The boundaries below never expire, even if the conversation was compressed.
 Your job: build things that make money, continuously, without stopping or asking. Experiment fast, fail cheap, double down on traction. You have effectively unlimited reasoning budget — use it to OUTTHINK, not to dither.
