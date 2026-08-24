# toolkit/components/ — 5 Production-Ready Reusable UI Components

*Generated 2026-08-22 for Zinvent tools. Zero build step, static GitHub Pages compatible, verified CDN stack.*

---

## 📦 Verified CDN Stack (Common to All Components)

Every component uses the standardized Zinvent stack (no npm install / build step needed):

```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>
<!-- daisyUI -->
<link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet" type="text/css" />
<!-- Space Grotesk (Headings) + Inter (Body) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<!-- Alpine.js (Reactivity) -->
<script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
<!-- Lucide Icons -->
<script src="https://unpkg.com/lucide@latest"></script>
<!-- GSAP (Micro-interactions & Entrance Animations) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

---

## 🎨 Design System Variables

Customize the `:root` palette in your stylesheet:
```css
:root {
  --brand: #0f766e;        /* Deep Emerald / Primary Brand */
  --brand-ink: #134e4a;    /* Contrast Dark Ink */
  --brand-light: #ccfbf1;  /* Soft Accent Pill Background */
  --accent: #f59e0b;       /* Warm Amber Highlight */
  --ink: #0f172a;          /* Slate 900 Typography */
  --muted: #64748b;        /* Slate 500 Subtitles */
  --line: #e2e8f0;         /* Slate 200 Card Borders */
  --bg: #f8fafc;           /* Slate 50 Page Background */
  --card: #ffffff;         /* White Surface */
}
```

---

## 🛠️ The 5 Components

| # | File | What it does | Key Features |
|---|---|---|---|
| 1 | [`branded-pricing-card.html`](file:///home/allenos/zinvent/toolkit/components/branded-pricing-card.html) | High-converting pricing grid | 3-tier layout (Free / PRO Lifetime / Commercial), ₱ PHP & $ USD switcher, Lifetime vs Monthly toggle, feature matrix, guarantee badge |
| 2 | [`multi-step-wizard.html`](file:///home/allenos/zinvent/toolkit/components/multi-step-wizard.html) | 4-step generation workflow | Animated stepper bar, dynamic line-item repeater table, live subtotal + 12% VAT math, step validation, draft autosave |
| 3 | [`results-export-panel.html`](file:///home/allenos/zinvent/toolkit/components/results-export-panel.html) | Results & multi-format export | 4 KPI cards, itemized journal table, BIR 1701Q quarterly schedule, client-side CSV download, clipboard copy, isolated print/PDF CSS |
| 4 | [`gcash-payment-unlock.html`](file:///home/allenos/zinvent/toolkit/components/gcash-payment-unlock.html) | Philippine GCash unlock module | Dual presentation (inline card + `#payModal` dialog), QR code display, 1-click mobile number copy, code validation, `localStorage` persistence |
| 5 | [`testimonial-strip.html`](file:///home/allenos/zinvent/toolkit/components/testimonial-strip.html) | Social proof & trust suite | Persona filtering (Freelancers, Sellers, CPAs), verified buyer badges, quantifiable result pills, live activity popup ticker (FOMO toast) |

---

## 🚀 How to Drop into a New Product

1. Open any component HTML file in your browser to inspect or test it.
2. Find the comment markers:
   ```html
   <!-- ========================================================================= -->
   <!-- START OF REUSABLE COMPONENT: <NAME>                                       -->
   <!-- ========================================================================= -->
   ... HTML snippet ...
   <!-- ========================================================================= -->
   <!-- END OF REUSABLE COMPONENT                                                 -->
   <!-- ========================================================================= -->
   ```
3. Copy the HTML snippet and paste it into your tool's `index.html`.
4. Merge the corresponding Alpine function / JS into your `app.js`.
5. Call `lucide.createIcons()` in your `init()` function.
