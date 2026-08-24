# PRIORITY PROJECT — "Closer" (Job/Client Acquisition Autopilot)
*Added 2026-08-22 by Allen. This is the #1 full-fire project. Build it to 11/10 quality.*

## WHY (user context)
Allen: BS IT, 2.5 yrs experience, currently struggling to land a job OR his FIRST client. The blocker is not document quality — it's GETTING RESPONSES. Generic resume builders are saturated. This tool must attack the actual problem: targeted, high-volume, personalized outreach + follow-up discipline.

## WHAT "Closer" DOES (MVP, then deepen)
1. **CV Ingest** — paste CV text OR upload; parses skills, experience, target roles.
2. **Multi-Source Scanner** — searches PH job boards (JobStreet, Indeed PH, OnlineJobs.ph) + client sources (Upwork, Reddit r/phjobs r/forhire, FB groups, LinkedIn). Client-side fetch via CORS proxies / public APIs where possible; document the manual-paste fallback.
3. **Auto-Tailor** — for each matched posting: rewrites CV bullets to match JD keywords (ATS-optimized), generates a role-specific cover letter.
4. **Outreach Generator** — for client work: writes the exact DM/proposal to send (warm, specific, not spammy). For jobs: the tailored application + follow-up sequence (Day 0, Day 3, Day 7).
5. **Tracker** — table of all applications: status, next action, deadline. LocalStorage. Reminder copy per follow-up.
6. **Interview Coach** — per role, generates likely questions + strong answer skeletons from Allen's CV.

## DESIGN (premium, per STACK.md)
- Tailwind CDN + daisyUI, Space Grotesk/Inter, Alpine.js, lucide, GSAP
- Branded: "Closer — land the job, not just apply." Deep indigo + amber accent.
- No generic AI-blue. SVG logo. Micro-interactions.

## TECH CONSTRAINTS
- Static, client-side, GitHub Pages (like siblings)
- No paid API keys required to function (user pastes JD text; optional: fetch via CORS proxy)
- GCash payment block (PRO ₱199 one-time unlocks: unlimited tailoring, export, tracker CSV)
- Real working logic, tested (≥20 jsdom assertions)

## SUCCESS = Allen can use it THIS WEEK to apply to 20 jobs/clients with tailored materials + follow-up discipline.

## Build it NOW — full fire, top priority. Other products can wait.
