# Closer — Art Direction Brief (for ZCode account #2 rebuild)
*Why this exists: account #1 built Closer as a generic indigo/amber SaaS template (1/10). This brief gives the NEXT run a real concept so it builds 11/10, not template-slop.*

## THE CONCEPT (not "premium SaaS")
**"The Quiet Closer" — a warm, editorial, craft-grade tool for PH freelancers.**
Not a neon SaaS. A calm, trustworthy, almost print-magazine feel — like a private career coach's notebook, not a startup landing page. The user is stressed about money/jobs; the design should feel *reassuring and human*, not corporate.

## VISUAL SYSTEM (exact, no deviation)
- **Palette:** ink `#1a1410` (near-black warm brown), paper `#faf6ef` (warm off-white), gold `#c8962a` (single accent, used sparingly), muted `#7c6f5f`. NO blue. NO gradient-neon. NO #312e81/#f59e0b (the old trash).
- **Typography:** Display = **Fraunces** (a soft serif with character, Google Fonts). Body = **Inter**. Headings serif, body sans. This single choice kills the "AI template" look instantly.
- **Texture:** subtle paper grain (CSS radial gradient, not image), generous whitespace, max-width 680px reading column for text blocks.
- **Components:** rounded-2xl cards with 1px `#e7ddcd` border (not heavy shadow), soft hover-lift (translateY -2px). No glassmorphism.

## LAYOUT RULES
1. Hero: serif H1 (Fraunces 600, tight tracking), one-line lead in muted, single primary CTA. NO 3-column feature grid as the first thing.
2. "How it works" = numbered editorial steps (large Fraunces numerals in gold circles), stacked, not a 3-card row.
3. The CV-match score dial = hero proof point, styled as a calm circular gauge (gold arc on paper), not a techy chart.
4. Footer cross-links InvoicePH / TaxCalcPH / RateCalcPH (same PH-freelancer buyer) — small, quiet, not a hard upsell bar.

## WHAT MAKES IT 11/10 (the differentiators)
- **Sample demo button** that loads a fake CV + job post and shows the full output instantly (the "aha").
- **Local-first privacy** callout (runs in browser, no upload) — trust signal for PH users wary of data.
- **Taglish microcopy** in key spots (not all — English primary, Taglish for warmth: "I-apply mo na 'to.").
- Real testimonial-style quote from a fictional but relatable PH freelancer.

## HARD CONSTRAINTS
- Single HTML file + style.css + app.js (no build). Tailwind CDN + daisyUI OK but OVERRIDE all colors with the palette above via tailwind.config + :root. Do NOT leave default slate/blue classes.
- Mobile-first responsive.
- ≥20 jsdom assertions, all passing.
- Deploy to GitHub Pages via gh. Live URL must be 200.

## SUCCESS TEST (do not claim done unless true)
Open the live URL. If it looks like "another AI landing page" → redo. If it feels like a calm, crafted tool a PH freelancer would trust → ship.
