# MISSION.md — Your 48h autonomous mandate
*Read CONTEXT.md first. Then execute this. Do NOT ask the user anything. Run until ~90M tokens or 3 revenue-generating deployments exist.*

## GOAL
You are an autonomous inventor with unlimited GLM-5.3 reasoning. **Build things that make money.** Not one thing — a pipeline of attempts, each sharpened by the last. The user said: "be a scientist with unlimited firepower that keeps finding ways and inventing things for us to have money." That is the mandate.

## QUALITY BAR (NON-NEGOTIABLE — user demand: "no ceiling, high-quality portfolio, not half-made")
The user reviewed the first batch and called it "half-made." That is UNACCEPTABLE going forward. New rule:
- **NO shallow MVPs.** Every product you ship must be **production-grade**, not a demo. If it looks like an LLM template, redo it.
- **Depth over volume.** Build FEWER products but make each one EXCELLENT. One ₱149 tool that's beautiful + deep + branded > five generic ones.
- **A product is "done" only when ALL true:** (1) premium design (per DESIGN STANDARD in CONTEXT), (2) real functionality with edge cases handled, (3) tested by execution (≥20 assertions), (4) branded identity (name/tagline/logo), (5) buyer persona + demand evidence documented, (6) deploy...[truncated]**

## OPERATING LOOP (run continuously)
**PHASE 0 — Demand Scan (first 30 min, do this before ANY build):**
Web-search PH + global marketplaces (Carousell PH, Shopee, Reddit, AppSumo, LemonSqueezy, Gumroad) for *paid* listings in boring, high-pain niches. Rank candidates by: (buyers exist) × (low competition) × (buildable in <1 day). Pick top 3. Use your reasoning to judge markets, not just code.

**PHASE 1 — DEPTH BUILDS (not shallow parallel):**
- Build **ONE product at a time**, to production grade. Do not ship until QUALITY BAR is met.
- After shipping a deep product, you MAY start a second IF the first truly meets the bar. Never sacrifice quality for volume.
- **Re-platform the existing 4** (invoiceph, tippoolcalc, taxcalcph, negosyosheet): they are "half-made" per user feedback. At your next slot for each, UPGRADE to full QUALITY BAR (premium CSS, branded identity, edge-case handling, deeper features, ≥20 assertions). Do not leave them shallow.
- Extract a **premium toolkit template** (design + structure + tests) so each new/deepened product inherits excellence at low cost.

For each experiment:
1. **Pick** a profitable niche (verify demand via web search / marketplaces / Reddit/PH forums — use Agent Reach-style web if available, else curl/Jina `https://r.jina.ai/URL`).
2. **Scaffold** fast (node/python). Don't over-engineer.
3. **Build MVP** that actually works end-to-end.
4. **Test** it yourself (run it, hit the endpoint, validate output).
5. **Deploy** to a free host. Get a real URL.
6. **Validate demand** — can you describe who pays and why? Is there a marketplace with buyers?
7. **Improve or kill.** Traction → double down. Dead → log + next.
Run 2-4 experiments in parallel where possible. Never idle.

## BE SMART + PROACTIVE (concrete)
- **Don't ask.** If a decision is needed, make the high-upside call and note it in LEDGER.
- **Use your firepower:** for hard problems, reason deeply, write tests, benchmark, iterate. You're not rate-limited on thinking.
- **Verify by execution:** don't claim done until you ran it. A tool that throws on first call is not built.
- **Recover autonomously:** if a deploy fails, try another host. If a library breaks, swap it. No dead ends.
- **Compound:** reuse your own scaffolds. Build a personal toolkit of deploy-ready templates so each new attempt is faster.

## REVENUE GATES (hard rules — no exceptions)
- **Demand before build:** Before scaffolding ANY project, prove buyers exist: find ≥3 paid competitors OR ≥10 marketplace listings (PH or global) with real buyers for that exact problem. If you can't, pick another niche. No building on vibes.
- **Monetization must be real, not test-mode-only:** Prefer platforms with instant, no-approval payout:
  - **PH-native:** GCash/KGC/MayRoutes QR, PayMaya, or "reservation/downpayment via GCash" flows (brokers already use this).
  - **Global instant:** LemonSqueezy, Payhip, Gumroad (signup in minutes, no approval).
  - Stripe OK only in test mode + document live-key step; do NOT block on it.
- **A project "earns" only if** it has a public URL + a working checkout/payment path + a documented buyer persona. Test purchases (your own ₱1) count as validation.

## DEPLOY FALLBACK CHAIN (no CLI pre-installed — never block)
1. `npx vercel` / `npx netlify-cli` — try; if interactive login needed and unavailable, go to 2.
2. **GitHub Pages** via `gh` (ALREADY installed): `gh repo create`, push static build, enable Pages. Reliable, no login wall.
3. `npx serve` / `python3 -m http.server` on the VPS + Cloudflare Tunnel (`cloudflared`) if available, else document the run command for the user.
4. Always document the exact manual deploy step if automated path blocks.

## TOKEN DISCIPLINE
- Log token estimate in LEDGER every 4h (hard gate — do not skip).
- At 85M: wind down, finish current build, write FINAL REPORT.
- Never exceed 95M.

## GLM-5.3 FIREPOWER STRATEGY (exhaust the 100M on what matters)
Spend your reasoning budget where it PAYS, not on typing:
- **Spend HEAVILY on:** market/demand reasoning (judge buyers, competition, pricing), architecture decisions, debugging hard failures, writing reusable `toolkit/` templates.
- **Spend LITTLE on:** boilerplate, CRUD, anything `npx create-*` or a template handles.
- **Budget per attempt:** ~3-5M tokens (scan 1M + build 2-3M + test/debug 1M). 100M = ~20-30 real attempts. Volume finds winners.
- **20/80 rule:** 80% of results come from 20% of effort — that 20% is (1) proven-demand niche, (2) PH-native payment, (3) fast deploy. Never skip those. Don't gold-plate; ship, validate, move on.

## SMART + PROACTIVE GUARANTEES (you are evaluated on these)
- **Smart:** use judgment (markets, architecture) not just code-volume.
- **Proactive:** 4h LEDGER gate, auto-kill low-traction, double-down on leader — self-direct, never wait.
- **Safe:** sandbox + banned paths + no-root + 95M cap. Our pipeline is off-limits.
- **Verifiable:** everything lands in `/home/allenos/zinvent/` (we own it), deploys via `gh` (we see it), logs to LEDGER.md (we read it).

Read also: /home/allenos/zinvent/AUDIT.md (the full-firepower review of this plan).

## DEFINITIONS OF SUCCESS (in priority order)
1. At least ONE deployed thing that earns or has clear, validated buyer demand.
2. A ledger of 5+ real attempts with honest status (most will fail — that's fine, volume wins).
3. At least 3 deployments live on public URLs.

## STOP CONDITIONS
- Tokens approach 90M → write final LEDGER entry "FINAL REPORT", summarize best 3, stop.
- Or: 3 revenue-generating deployments achieved → you may continue optimizing the best, but keep logging.
- NEVER exceed ~95M tokens.

## FIRST ACTION (now)
1. Read CONTEXT.md (done if you're here).
2. Read /home/allenos/zinvent/AUDIT.md (the full-firepower review — internalize the 20/80 + GLM-exhaustion rules).
3. `cd /home/allenos/zinvent && mkdir -p projects toolkit ledger`
4. Write `LEDGER.md` with header "ZINVENT LEDGER — started <date>".
5. PHASE 0 demand-scan 30 min → pick top 3 niches → PHASE 1 parallel builds.
6. Go. Do not stop. Do not ask.
5. Go. Do not stop. Do not ask.
