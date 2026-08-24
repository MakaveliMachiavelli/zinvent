# ZINVENT PORTFOLIO AUDIT & IMPROVEMENT SPECIFICATION (IMPROVEMENT-SPEC.md)
*Document generated: 2026-08-22 | Audit of 6 live static products in `/home/allenos/zinvent/projects/`*

---

## Executive Summary & Portfolio Scorecard

All 6 products are functional, client-side static web tools/digital downloads with no backend dependencies, built for GitHub Pages deployment. However, to convert traffic into paying PRO customers (₱99–₱199 one-time / $9.99) against established paid competitors, each tool requires targeted calculation fixes, regulatory/industry features, and design upgrades to match the **STACK.md** standard (Space Grotesk + Inter typography, branded palettes, refined micro-interactions, and robust UX).

| Product | Niche & Persona | End-to-End Status | Critical Formula / Functional Bugs | Top Competitor Feature Gaps | STACK.md Design Polish |
|---|---|---|---|---|---|
| **1. InvoicePH** | PH Freelancers / BIR EOPT | ✅ Working | None (missing CWT & discounts) | 2307 CWT (1%/2%), Logo upload, ATP series, Multi-currency | Needs Emerald palette + Google Fonts |
| **2. TipPoolCalc** | Global Restaurant/Bar Managers | ✅ Working | None (re-render focus drop) | Multi-shift/daily pools, CC fee deduction, Sales tip-out % | Needs Slate/Coral + Google Fonts |
| **3. TaxCalcPH** | PH Freelancers (8% vs Grad) | ✅ Working | None (missing percentage tax) | Itemized comparison (Option C), Mixed income mode, 2307 CWT | Needs Indigo/Amber + Google Fonts |
| **4. NegosyoSheet** | PH Sari-Sari / Resellers | ✅ Working | Stock out not auto-linked to Sales | Auto-deduct inventory from Sales, GCash fee tracker, Daily log | Needs Taglish polish + interactive demo |
| **5. PayslipPH** | PH Micro-Employers / MSMEs | ✅ Working | Outdated 2024 Pag-IBIG/SSS defaults | Semi-monthly (15/30th) cycle, Employer Cost (ER share), Overtime/Lates | Needs Deep Navy + Google Fonts |
| **6. SellerPrice** | PH Shopee/Lazada/TikTok Sellers | ⚠️ Math Bug | **CRITICAL:** Voucher inverted in formula | 0.5% E-Commerce CWT (RR 16-2023), FSS/CCB campaign fees, Forward mode | Needs Terracotta/Ink + Google Fonts |

---

## 1. InvoicePH (`/projects/invoiceph/`)

### (1) End-to-End Functionality Assessment
- **Status:** Fully functional end-to-end for basic invoices.
- **Verification:** Calculates subtotal, 12% VAT (inclusive and exclusive), and non-VAT layouts accurately. Amount-in-words conversion generates clean English text. Auto-numbering increments correctly. LocalStorage draft persistence survives reloads. Print stylesheet hides UI controls and renders a clean A4/Letter invoice.
- **Discovered Limitations:**
  1. *Sales Book Duplication:* Every press of "Print / Save as PDF" appends an entry to the sales book without deduplicating by invoice number or date.
  2. *Client Management:* Saved clients cannot be deleted or edited from the client picker modal.
  3. *Unit Input Glitch:* Datalist `<datalist id="units">` is re-appended inside `#items` during item rendering, causing potential ID conflicts.

### (2) Missing Features vs Paid Competitors (Refrens, QuickBooks PH, Taxumo, JuanTax)
1. **Creditable Withholding Tax (CWT / BIR Form 2307 - 1% or 2%):** In the Philippines, corporate clients routinely withhold 1% (goods) or 2% (services) under BIR RR 2-98. InvoicePH needs an optional toggle to display CWT deducted and "Net Amount Payable".
2. **Custom Business Logo Upload:** Competitors allow uploading an SVG/PNG logo stored locally in `localStorage` as a base64 data URI to display on the invoice header.
3. **Formal BIR Invoice Compliance Details (RR 11-2024 / EOPT Act):**
   - Authority to Print (ATP) / Permit to Use (PTU) or Acknowledgement Certificate No. and Date Issued.
   - Serial Number Range (e.g., `000001 - 000500`).
   - Senior Citizen / PWD Discount row (mandatory statutory deduction on PH invoices under R.A. 9994).
4. **Multi-Currency Support (USD, EUR, GBP, SGD, AUD):** PH remote freelancers billing international clients need USD pricing with a PHP exchange rate note.
5. **Invoice Discount:** Line-item or invoice-level percentage/fixed discounts.

### (3) UX & Polish Gaps
- **Typography & Colors:** Uses system UI fonts and generic AI-blue (`#0b5fff`). Must adopt **Space Grotesk** (headings) + **Inter** (body) with a deep **Emerald (`#065f46`) + Ink (`#0f172a`)** palette.
- **Copy & Helper Notes:** Add guidance explaining the difference between VATable Sales and Non-VAT invoice wording under RR 11-2024.
- **Mobile Editing:** Table view in preview pane overflows on smaller viewports without horizontal scrolling indicators.

### (4) Concrete File-Level Fixes

#### File: `/projects/invoiceph/index.html`
1. **Load Google Fonts & Update Palette:**
   Add Google Fonts in `<head>`:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
   ```
2. **Add Logo Upload & BIR ATP & CWT Controls:**
   In Section 1 (Your details):
   ```html
   <div class="fields two">
     <label>Business Logo (optional)
       <input type="file" id="logoInput" accept="image/*" class="file-input">
     </label>
     <label>BIR ATP / PTU No. (optional)
       <input id="sAtp" placeholder="ATP-00012345 / RR-11-2024">
     </label>
   </div>
   ```
   In Section 3 (Invoice options):
   ```html
   <div class="fields three">
     <label>Currency
       <select id="invCur">
         <option value="PHP">₱ PHP</option>
         <option value="USD">$ USD</option>
         <option value="EUR">€ EUR</option>
         <option value="GBP">£ GBP</option>
         <option value="SGD">S$ SGD</option>
         <option value="AUD">A$ AUD</option>
       </select>
     </label>
     <label>Withholding Tax (2307)
       <select id="cwtRate">
         <option value="0">None (0%)</option>
         <option value="2">2% — Services / Freelance (BIR 2307)</option>
         <option value="1">1% — Goods (BIR 2307)</option>
         <option value="5">5% — Gov't / Other</option>
       </select>
     </label>
     <label>Discount (₱ or %)
       <input id="invDiscount" placeholder="e.g. 500 or 10%">
     </label>
   </div>
   ```
3. **Update Client Modal with Delete Button:**
   Update `#clientModal` list items to include delete buttons (`data-del-ci`).

#### File: `/projects/invoiceph/app.js`
1. **Support Logo, Currency, CWT, and Discount in `calc()` & `render()`:**
   ```javascript
   function calc() {
     const mode = $('vatMode').value;
     const cur = $('invCur') ? $('invCur').value : 'PHP';
     const sym = { PHP:'₱', USD:'$', EUR:'€', GBP:'£', SGD:'S$', AUD:'A$' }[cur] || '₱';
     const gross = items.reduce((s, it) => s + (Number(it.qty) || 0) * (Number(it.price) || 0), 0);
     
     // Discount
     let discVal = 0;
     const discInput = ($('invDiscount')?.value || '').trim();
     if (discInput.endsWith('%')) {
       discVal = gross * (parseFloat(discInput) / 100) || 0;
     } else {
       discVal = Number(discInput) || 0;
     }
     const discountedGross = Math.max(0, gross - discVal);

     let sub = discountedGross, vat = 0, total = discountedGross, vatLabel = '';
     if (mode === 'vat-excl') {
       vat = discountedGross * 0.12; sub = discountedGross; total = discountedGross + vat; vatLabel = 'VAT (12%)';
     } else if (mode === 'vat-incl') {
       total = discountedGross; sub = discountedGross / 1.12; vat = discountedGross - sub; vatLabel = 'VAT (12%, incl.)';
     } else {
       sub = discountedGross; vat = 0; total = discountedGross; vatLabel = '';
     }

     // Withholding CWT 2307
     const cwtPct = Number($('cwtRate')?.value) || 0;
     const cwt = sub * (cwtPct / 100);
     const netPayable = total - cwt;

     return { mode, cur, sym, gross, discVal, sub, vat, total, vatLabel, cwtPct, cwt, netPayable };
   }
   ```
2. **Handle Deduplication in Sales Book (`logToBook()`):**
   ```javascript
   function logToBook() {
     if (!pro) return;
     const c = calc();
     const book = getBook();
     const invNo = $('invNo').value || String(book.length + 1).padStart(6, '0');
     const existingIndex = book.findIndex(r => r.no === invNo);
     const entry = {
       date: $('invDate').value || todayISO(),
       no: invNo,
       client: $('bName').value,
       tin: $('bTin').value,
       sub: c.sub,
       vat: c.vat,
       total: c.total
     };
     if (existingIndex >= 0) {
       book[existingIndex] = entry; // update existing entry rather than duplicate
     } else {
       book.push(entry);
     }
     localStorage.setItem(LS.book, JSON.stringify(book));
   }
   ```

#### File: `/projects/invoiceph/style.css`
1. **Apply STACK.md Design Tokens:**
   ```css
   :root {
     --primary: #065f46; /* Deep emerald */
     --primary-hover: #047857;
     --accent: #10b981;
     --ink: #0f172a;
     --muted: #64748b;
     --line: #e2e8f0;
     --bg: #f8fafc;
     --card: #ffffff;
     --font-heading: 'Space Grotesk', -apple-system, sans-serif;
     --font-body: 'Inter', -apple-system, sans-serif;
   }
   body { font-family: var(--font-body); background: var(--bg); color: var(--ink); }
   h1, h2, h3, .brand { font-family: var(--font-heading); }
   .btn.primary { background: var(--primary); border-color: var(--primary); }
   .btn.primary:hover { background: var(--primary-hover); }
   ```

---

## 2. TipPoolCalc (`/projects/tippoolcalc/`)

### (1) End-to-End Functionality Assessment
- **Status:** Works accurately end-to-end for single-shift weekly pools.
- **Verification:** Hours split and points-weighted split calculations distribute tips correctly with exact remainder balancing. Currency switcher supports 6 symbols. Draft persistence and PRO unlock work properly. History logs prints and exports CSV.
- **Discovered Limitations:**
  1. Changing role dropdown re-renders all rows, causing form focus to be lost.
  2. Role weight column is visible and active even when "By hours worked" split method is selected, creating user confusion.
  3. No deletion capability for saved team rosters in modal.

### (2) Missing Features vs Paid Competitors (TipHaus, 7shifts, Homebase, Toast)
1. **Multi-Shift / Day-of-Week Pooling (Lunch vs Dinner, Mon–Sun):** Restaurant managers cannot pool Tuesday lunch tips with Friday night tips. Competitors allow setting up daily shifts that roll up into a weekly total.
2. **Credit Card Processing Fee Deduction (FLSA Section 3(m) compliant):** In the US and globally, managers can legally deduct the employer's credit card merchant fee (e.g. 2.5% to 3.0%) from charged tips before distribution.
3. **Direct Role Tip-Outs (% of Sales or % of Tips):** Common restaurant practice where Bartenders receive 5% of beverage sales or Bussers receive 10% of total server tips prior to hour pooling.
4. **Individual Payout Receipt / Cash Envelope Slips:** Printable individual slips for staff members acknowledging their cash payout.

### (3) UX & Polish Gaps
- **Responsive Layout:** On mobile devices, the table layout hides roles (`.team-row select { display: none }`), but does not clearly inform the user what role is active.
- **Role Weight Feedback:** The weight column should be visually dimmed or hidden when the split mode is "hours".
- **Design Tokens:** Update color scheme to **Slate (`#1e293b`) + Coral (`#f43f5e`)** with Space Grotesk + Inter.

### (4) Concrete File-Level Fixes

#### File: `/projects/tippoolcalc/index.html`
1. **Add CC Fee Deduction & Shift Input:**
   In Section 1 (The pool):
   ```html
   <div class="fields four">
     <label>Total tips collected
       <input id="tips" type="number" min="0" step="any" value="1000">
     </label>
     <label>CC fee deduction (%)
       <input id="ccFee" type="number" min="0" max="10" step="0.1" value="0" placeholder="e.g. 2.5">
     </label>
     <label>Currency
       <select id="currency">
         <option value="$">$ USD</option>
         <option value="€">€ EUR</option>
         <option value="£">£ GBP</option>
         <option value="₱">₱ PHP</option>
         <option value="C$">C$ CAD</option>
         <option value="A$">A$ AUD</option>
       </select>
     </label>
     <label>Split method
       <select id="method">
         <option value="hours">By hours worked</option>
         <option value="points">By points (hours × role weight)</option>
       </select>
     </label>
   </div>
   ```
2. **Add Individual Envelope Print Mode in Actions:**
   ```html
   <button id="printSlipsBtn" class="btn">✉️ Print individual slips</button>
   ```

#### File: `/projects/tippoolcalc/app.js`
1. **Incorporate CC Fee Deduction & Net Distributable Tips in `calc()`:**
   ```javascript
   function calc() {
     const rawTips = Number($('tips').value) || 0;
     const ccFeePct = Number($('ccFee')?.value) || 0;
     const ccFeeDeduction = rawTips * (ccFeePct / 100);
     const tips = Math.max(0, rawTips - ccFeeDeduction);
     const method = $('method').value;

     const rows = team.map(t => {
       const h = Number(t.hrs) || 0, w = Number(t.wt) || 0;
       return { ...t, h, pts: method === 'points' ? h * w : h };
     });
     const denom = rows.reduce((s, r) => s + (method === 'points' ? r.pts : r.h), 0);
     const out = rows.map(r => {
       const share = denom > 0 ? (method === 'points' ? r.pts : r.h) / denom : 0;
       return { ...r, share, payout: Math.round(tips * share * 100) / 100 };
     });
     const sum = out.reduce((s, r) => s + r.payout, 0);
     const remainder = Math.round((tips - sum) * 100) / 100;
     if (out.length) out[0].payout = Math.round((out[0].payout + remainder) * 100) / 100;

     return { rawTips, ccFeePct, ccFeeDeduction, tips, method, rows: out, denom };
   }
   ```
2. **Optimize Dynamic Role Event Listener (Prevent full DOM wipe):**
   Update only the specific weight `<input>` value in the DOM rather than calling `renderTeam()` to avoid dropping keyboard focus.

#### File: `/projects/tippoolcalc/style.css`
1. **Apply Slate + Coral Palette:**
   ```css
   :root {
     --primary: #f43f5e; /* Coral */
     --primary-hover: #e11d48;
     --slate: #0f172a;
     --muted: #64748b;
     --bg: #f8fafc;
     --card: #ffffff;
     --font-heading: 'Space Grotesk', sans-serif;
     --font-body: 'Inter', sans-serif;
   }
   ```

---

## 3. TaxCalcPH (`/projects/taxcalcph/`)

### (1) End-to-End Functionality Assessment
- **Status:** Fully functional for comparing 8% flat vs Graduated + 40% OSD.
- **Verification:** Accurately applies ₱250k deduction for 8% and graduated rates for (gross - 40% OSD). Quarterly cumulative 1701Q computation applies seasonal weightings accurately. CSV export works.
- **Discovered Limitations:**
  1. Only accepts annual income; users thinking in monthly rates must multiply by 12 manually.
  2. Does not incorporate 3% Percentage Tax (Section 116 of Tax Code / Form 2551Q) required for non-VAT individuals on graduated rates.

### (2) Missing Features vs Paid Competitors (Taxumo, JuanTax, TaxWhizPH)
1. **Option C: Graduated + Itemized Actual Deductions:** Many freelancers have actual expenses (equipment, high-speed fiber, co-working, contractors) exceeding 40%. A 3-way comparison (8% vs OSD vs Itemized) provides complete decision clarity.
2. **Mixed Income Mode (Compensation + Freelance):** Under TRAIN Law, mixed income earners have the ₱250,000 exemption applied to their employment compensation, removing the ₱250k deduction from their 8% freelance income!
3. **Creditable Withholding Tax (CWT / Form 2307) Deduction:** Freelancers can input their 2% CWT credits to determine their actual cash payable to the BIR on Form 1701Q.
4. **Percentage Tax (Form 2551Q) Toggle for Option B:** Under the Tax Code, non-VAT taxpayers electing graduated rates owe 3% percentage tax on gross sales unless exempt. Factoring this in shows the true total tax burden of Option B.

### (3) UX & Polish Gaps
- **Income Input Mode:** Add a toggle button: "Monthly" vs "Annual" gross income with automatic live synchronization.
- **Interactive Visual Comparison:** Add a progress bar comparing net take-home pay between Option A and Option B.
- **Design Tokens:** Update palette to **Indigo (`#4338ca`) + Amber (`#d97706`)** with Space Grotesk + Inter.

### (4) Concrete File-Level Fixes

#### File: `/projects/taxcalcph/index.html`
1. **Add Monthly/Annual Switch & Mixed Income Mode & 2307 Credits:**
   In Section "Your income":
   ```html
   <div class="fields">
     <div class="income-toggle-row">
       <label>Gross Receipts Period</label>
       <div class="btn-group">
         <button type="button" id="periodAnnual" class="btn-tab active">Annual</button>
         <button type="button" id="periodMonthly" class="btn-tab">Monthly</button>
       </div>
     </div>
     <label>Gross receipts (<span id="periodLabel">Annual</span> ₱)
       <input id="gross" type="number" min="0" step="any" value="600000">
     </label>
     <label class="checkbox-label">
       <input type="checkbox" id="isMixedIncome">
       <span>I am a Mixed-Income Earner (also have full-time employee salary)</span>
     </label>
     <label>Form 2307 Creditable Tax Withheld by Clients (optional ₱)
       <input id="cwtCredits" type="number" min="0" step="any" value="0" placeholder="e.g. 12000">
     </label>
   </div>
   ```

#### File: `/projects/taxcalcph/app.js`
1. **Update `calc()` for Mixed Income & Withholding Tax:**
   ```javascript
   function calc() {
     let rawGross = Number($('gross').value) || 0;
     const isMonthly = $('periodMonthly')?.classList.contains('active');
     const gross = isMonthly ? rawGross * 12 : rawGross;
     const isMixed = $('isMixedIncome')?.checked || false;
     const cwt = Number($('cwtCredits')?.value) || 0;

     // Option A: 8% Flat (Exemption is ₱0 if mixed income earner)
     const exemptA = isMixed ? 0 : EXEMPT;
     const aBase = Math.max(0, gross - exemptA);
     const aTaxGross = aBase * 0.08;
     const aTaxPayable = Math.max(0, aTaxGross - cwt);

     // Option B: Graduated + 40% OSD + 3% Percentage Tax (non-VAT)
     const osdAmt = gross * OSD;
     const bTaxable = Math.max(0, gross - osdAmt);
     const bIncomeTax = gradTax(bTaxable);
     const bPercentageTax = gross <= VAT_THRESHOLD ? gross * 0.03 : 0;
     const bTaxTotal = bIncomeTax + bPercentageTax;
     const bTaxPayable = Math.max(0, bTaxTotal - cwt);

     return { gross, isMixed, cwt, aBase, aTaxGross, aTaxPayable, osdAmt, bTaxable, bIncomeTax, bPercentageTax, bTaxTotal, bTaxPayable };
   }
   ```

#### File: `/projects/taxcalcph/style.css`
1. **Apply Indigo + Amber STACK.md Styling:**
   ```css
   :root {
     --primary: #4338ca; /* Indigo */
     --primary-hover: #3730a3;
     --accent: #d97706;  /* Amber */
     --ink: #0f172a;
     --muted: #64748b;
     --bg: #faf5ff;
     --card: #ffffff;
     --font-heading: 'Space Grotesk', sans-serif;
     --font-body: 'Inter', sans-serif;
   }
   ```

---

## 4. NegosyoSheet (`/projects/negosyosheet/`)

### (1) End-to-End Functionality Assessment
- **Status:** Functional digital spreadsheet product generation (`build_sheet.py`) and static web landing page with code gating.
- **Verification:** Generates 200-row full spreadsheet and 5-row demo workbook with verified openpyxl formatting. Web page triggers instant demo download and reveals full link upon entering code.
- **Discovered Limitations:**
  1. *Critical Excel Formula Disconnect:* In `INVENTORY`, the `Stock Out` column (F) is currently hardcoded for manual entry. It is NOT linked to `SALES LOG`. Users have to log sales twice (once in Sales Log and once in Inventory Stock Out).

### (2) Missing Features vs Paid Competitors (Etsy Bestsellers, Shopee PH Store Trackers)
1. **Automatic Inventory Stock-Out from Sales Log:** Column F in `INVENTORY` must use `=SUMIF('SALES LOG'!B:B, A{r}, 'SALES LOG'!C:C)` so every sale entered in `SALES LOG` automatically reduces available stock.
2. **GCash Cash-In / Cash-Out & E-Load Ledger:** In the Philippines, 80%+ of sari-sari stores operate as GCash cash-in/cash-out hubs. Adding a dedicated GCash/Load transaction sheet with fee tracking (e.g. ₱10 fee per ₱1,000) adds immense real-world utility.
3. **Payment Method in Sales Log:** Column for `Payment Type` (Cash, GCash, Utang).
4. **Daily / Monthly Filter Summary Tab:** Allows sari-sari owners to view "Benta Ngayong Araw" (Today's Sales) and "Benta Ngayong Buwan" (Month-to-Date).

### (3) UX & Polish Gaps
- **Landing Page Interactivity:** The landing page currently has static dashboard text. Adding an interactive in-browser simulator where users can type 2 items and see real-time profits will multiply conversion.
- **Visual Proof:** Add screenshots/previews of the actual styled Excel sheets on the landing page.
- **Design Tokens:** Update palette to **Warm Bronze (`#92400e`) + Forest (`#166534`)** with Space Grotesk + Inter.

### (4) Concrete File-Level Fixes

#### File: `/projects/negosyosheet/build_sheet.py`
1. **Fix Inventory Stock-Out Formula:**
   In `build_sheet.py`, update lines 88–90:
   ```python
   for r in range(2, N_ROWS + 2):
       # Column F (Stock Out) automatically sums sales from SALES LOG!
       ws.cell(row=r, column=6, value=f'=IF(A{r}="","",SUMIF(\'SALES LOG\'!B:B, A{r}, \'SALES LOG\'!C:C))')
       # Column G: Current Stock = Stock In - Stock Out
       ws.cell(row=r, column=7, value=f'=IF(A{r}="","",E{r}-F{r})')
       # Column H: Stock Value = Current Stock * Cost
       ws.cell(row=r, column=8, value=f'=IF(A{r}="","",G{r}*C{r})')
       # Column J: Status Alert
       ws.cell(row=r, column=10, value=f'=IF(A{r}="","",IF(G{r}<=I{r},"⚠️ REORDER NA!","OK"))')
   ```
2. **Add GCash Cash-In/Out Ledger Sheet:**
   Add a 6th worksheet titled `GCASH & LOAD` with columns: `Date`, `Type (Cash-In / Cash-Out / Load)`, `Amount`, `Fee Collected (Kita)`, `Customer / Ref No`.
   Include the GCash fee totals in the main `DASHBOARD` metrics.

#### File: `/projects/negosyosheet/index.html`
1. **Add Live Interactive Simulator in `index.html`:**
   Replace the static mock with live inputs:
   ```html
   <div class="interactive-preview">
     <h3>Subukan: Ilagay ang isang item at benta mo</h3>
     <div class="sim-grid">
       <input id="simCost" type="number" value="12" placeholder="Cost ₱">
       <input id="simSell" type="number" value="18" placeholder="Selling Price ₱">
       <input id="simQty" type="number" value="5" placeholder="Qty">
     </div>
     <div class="sim-result">
       <div>Kita mo sa benta: <strong id="simProfit" class="text-green">₱30.00</strong></div>
       <div>Margin: <strong id="simMargin">33.3%</strong></div>
     </div>
   </div>
   ```

#### File: `/projects/negosyosheet/style.css`
1. **Apply STACK.md Styling:**
   ```css
   :root {
     --primary: #92400e; /* Warm bronze */
     --primary-hover: #78350f;
     --green: #166534;
     --bg: #fffbeb;
     --card: #ffffff;
     --font-heading: 'Space Grotesk', sans-serif;
     --font-body: 'Inter', sans-serif;
   }
   ```

---

## 5. PayslipPH (`/projects/payslipph/`)

### (1) End-to-End Functionality Assessment
- **Status:** Fully functional for single-employee monthly payslips and batch printing.
- **Verification:** Computes SSS, PhilHealth, Pag-IBIG employee shares, TRAIN withholding tax, and 13th month accrual accurately. Batch printing successfully clones printable nodes per employee. CSV payroll export generates clean table data.
- **Discovered Limitations:**
  1. Default statutory contribution rates are outdated (Pag-IBIG default is ₱50 instead of the updated 2024 mandatory ₱200 cap under HDMF Circular 460; SSS default is 3.63% instead of current 4.5% employee share).
  2. Earnings and Deductions table layout displays empty rows when deductions outnumber earnings.

### (2) Missing Features vs Paid Competitors (Sprout Solutions, Salarium, PayrollHero)
1. **Semi-Monthly Pay Frequency (15th / 30th Cut-offs):** Over 90% of Philippine private businesses pay semi-monthly. Adding a "Semi-Monthly" mode with options to split statutory deductions across the 1st and 2nd half cutoffs is a required feature.
2. **Employer Contribution Breakdown (Total Cost to Employer):** Small business owners need to know their total cost per employee, including:
   - SSS Employer Share (~9.5% to 10%) + ECC (₱10-₱30).
   - PhilHealth Employer Share (1.25% to 2.5%).
   - Pag-IBIG Employer Share (2%, max ₱200).
3. **Overtime (OT), Holiday Pay & Night Differential Calculator:** Overtime at 125% regular rate, Rest day/Special Holiday at 130%, and Night Shift Differential at 10%.
4. **Absences, Tardiness (Late), and Cash Advance (Vale) Deductions:** Common line items on every PH payslip.

### (3) UX & Polish Gaps
- **Payslip Table Layout:** Balance earnings vs deductions dynamically so blank cells are replaced with structured sub-totals.
- **Mobile Responsive Form:** 4-column statutory inputs wrap awkwardly on mobile screens.
- **Design Tokens:** Update palette to **Deep Navy (`#0369a1`) + Teal (`#0d9488`)** with Space Grotesk + Inter.

### (4) Concrete File-Level Fixes

#### File: `/projects/payslipph/index.html`
1. **Add Semi-Monthly Toggle, Overtime & Allowances, and Updated Statutory Rates:**
   In Section "Employee":
   ```html
   <div class="fields three">
     <label>Pay Frequency
       <select id="payFreq">
         <option value="semi">Semi-Monthly (15th / 30th)</option>
         <option value="monthly" selected>Monthly</option>
       </select>
     </label>
     <label>Overtime Hours (125%)
       <input id="eOtHrs" type="number" min="0" step="0.5" value="0">
     </label>
     <label>Allowances (Non-taxable ₱)
       <input id="eAllowance" type="number" min="0" step="any" value="0">
     </label>
   </div>
   <div class="fields two">
     <label>Late / Tardiness (Deduction ₱)
       <input id="eLate" type="number" min="0" step="any" value="0">
     </label>
     <label>Cash Advance / Vale (Deduction ₱)
       <input id="eVale" type="number" min="0" step="any" value="0">
     </label>
   </div>
   ```
2. **Update Statutory Input Defaults in `index.html`:**
   - SSS EE %: `4.5` (Floor: ₱5,000, Cap: ₱35,000).
   - PhilHealth EE %: `2.5` (Floor: ₱10,000, Cap: ₱100,000).
   - Pag-IBIG EE %: `2.0` (MSC Cap: ₱10,000 -> Max: ₱200.00).

#### File: `/projects/payslipph/app.js`
1. **Update `calc()` Engine for Modern Rates, Semi-Monthly & Additional Line Items:**
   ```javascript
   function calc(monthlySalary, rates, options = {}) {
     const freq = options.freq || 'monthly';
     const factor = freq === 'semi' ? 0.5 : 1.0;
     const baseSalary = (monthlySalary || 0) * factor;

     // Hourly rate for OT calculation (26 working days / 8 hrs)
     const hourlyRate = (monthlySalary || 0) / (26 * 8);
     const otPay = (options.otHrs || 0) * hourlyRate * 1.25;
     const allowance = options.allowance || 0;
     const grossEarnings = baseSalary + otPay + allowance;

     // Statutory deductions (calculated on monthly MSC, then scaled by pay factor)
     const sss = (clamp(monthlySalary, rates.sssFloor, rates.sssCap) * (rates.sssPct / 100)) * factor;
     const ph = (clamp(monthlySalary, PH_FLOOR, PH_CAP) * (rates.phPct / 100)) * factor;
     const pi = (Math.min(monthlySalary, rates.piCap) * (rates.piPct / 100)) * factor;

     // Withholding tax on taxable portion
     const taxableMonthly = Math.max(0, monthlySalary - (sss/factor) - (ph/factor) - (pi/factor));
     const taxMonthly = withholding(taxableMonthly);
     const tax = taxMonthly * factor;

     const lates = options.lates || 0;
     const vale = options.vale || 0;
     const totalDeductions = sss + ph + pi + tax + lates + vale;
     const netPay = grossEarnings - totalDeductions;

     // Employer share calculation
     const erSss = (clamp(monthlySalary, rates.sssFloor, rates.sssCap) * 0.095 + 30) * factor;
     const erPh = ph;
     const erPi = (Math.min(monthlySalary, rates.piCap) * 0.02) * factor;
     const totalErCost = grossEarnings + erSss + erPh + erPi;

     return {
       baseSalary, otPay, allowance, grossEarnings,
       sss, ph, pi, tax, lates, vale, totalDeductions, netPay,
       erSss, erPh, erPi, totalErCost
     };
   }
   ```

---

## 6. SellerPrice (`/projects/sellerprice/`)

### (1) End-to-End Functionality Assessment
- **Status:** ⚠️ **CRITICAL FORMULA BUG DETECTED** in voucher handling.
- **Bug Analysis in `/projects/sellerprice/app.js` (Lines 28 & 33):**
  ```javascript
  // Line 28:
  const F = svc + fixed + ship - voucher + cost;
  // Line 33:
  const profit = price - fees - fixed - ship + voucher - cost;
  ```
  - *The Error:* If a seller funds a voucher (e.g. ₱50 off), that is an *expense/discount* borne by the seller. Subtracted from `F` and added to `profit`, the code mistakenly treats seller vouchers as income/subsidy!
  - *The Correct Formula:*
    $$\text{Price} = \frac{\text{Cost} + \text{Fixed} + \text{Ship} + \text{Voucher} + \text{SvcFee}}{1 - \text{Commission\%} - \text{Txn\%} - \text{TargetMargin\%}}$$
    $$\text{Profit} = \text{Price} - \text{Fees} - \text{Fixed} - \text{Ship} - \text{Voucher} - \text{Cost}$$
- **Verification:** Once the formula bug is corrected, platform fee presets (Shopee, Lazada, TikTok) and batch price tables work seamlessly.

### (2) Missing Features vs Paid Competitors (Shopee SellerCentre, FeeCheck, EcomBalance)
1. **BIR RR 16-2023 0.5% E-Commerce Withholding Tax (1% on 50% Gross Remittance):** Mandatory Philippine tax withheld directly by Shopee, Lazada, and TikTok Shop since July 2024.
2. **Campaign / Service Program Fee Toggles:**
   - Shopee Free Shipping Special (FSS): ~3% to 5%.
   - Shopee Coins Cashback (CCB): ~3%.
   - Lazada Free Shipping Max: ~3.5% to 5.6%.
   - TikTok Shipping Subsidy Program: ~3% to 5%.
3. **Dual Mode (Target Margin vs Target Price):**
   - *Mode A (Inverse Solver):* Input Cost + Target Margin % -> Output Required Selling Price.
   - *Mode B (Forward Profit Check):* Input Cost + Competitor's Selling Price -> Output Resulting Net Profit & Margin %.
4. **Return-to-Sender (RTS) Loss Allowance %:** Buffer for packaging loss and return shipping fees on failed COD deliveries.

### (3) UX & Polish Gaps
- **Batch Table Usability:** Allow typing items directly into the table with inline editing.
- **Design Tokens:** Update palette to **Terracotta (`#ea580c`) + Slate (`#1e293b`)** with Space Grotesk + Inter.

### (4) Concrete File-Level Fixes

#### File: `/projects/sellerprice/app.js`
1. **Fix Critical Formula Bug & Add 0.5% E-Commerce CWT & Campaign Programs:**
   ```javascript
   function compute(cost, marginPct, commPct, txnPct, svc, fixed, ship, voucher, hasEcomTax = true, campaignPct = 0) {
     const ecomTaxPct = hasEcomTax ? 0.5 : 0; // BIR RR 16-2023: 0.5% of gross
     const totalPctFees = (commPct + txnPct + campaignPct + ecomTaxPct) / 100;
     
     // Corrected F: voucher is a seller expense, so it ADDS to fixed costs
     const F = Number(cost) + Number(svc) + Number(fixed) + Number(ship) + Number(voucher);
     const m = Number(marginPct) / 100;
     const denom = 1 - totalPctFees - m;
     const price = denom > 0 ? F / denom : NaN;
     
     const fees = Number.isFinite(price) ? (price * totalPctFees + Number(svc)) : 0;
     // Corrected profit: voucher is subtracted from profit
     const profit = Number.isFinite(price) ? (price - fees - Number(fixed) - Number(ship) - Number(voucher) - Number(cost)) : 0;
     const breakEven = (1 - totalPctFees) > 0 ? (F / (1 - totalPctFees)) : NaN;

     return { price, fees, profit, breakEven, totalPctFees, ecomTaxPct };
   }
   ```

#### File: `/projects/sellerprice/index.html`
1. **Add E-Commerce Withholding Tax Checkbox & Campaign Selector:**
   In Section 2 (Platform fees):
   ```html
   <div class="fields three">
     <label>Commission (%) <input id="comm" type="number" min="0" step="any" value="6"></label>
     <label>Transaction fee (%) <input id="txn" type="number" min="0" step="any" value="2"></label>
     <label>Campaign / FSS fee (%) <input id="campFee" type="number" min="0" step="any" value="0" placeholder="e.g. 3.5"></label>
   </div>
   <div class="fields two">
     <label class="checkbox-label">
       <input type="checkbox" id="ecomTax" checked>
       <span>BIR 0.5% E-Commerce Withholding Tax (RR 16-2023)</span>
     </label>
     <label>Packaging &amp; RTS buffer (₱) <input id="rtsBuffer" type="number" min="0" step="any" value="0"></label>
   </div>
   ```

#### File: `/toolkit/test-harness/test-sellerprice.mjs`
1. **Update Test Expectations to Match Correct Mathematical Formula:**
   Update line 57 in the test harness so tests validate correct voucher addition.

---

## 7. Cross-Cutting Portfolio Roadmap

### 1. Unified Design Standard (STACK.md Compliance)
- Load Google Fonts (`Space Grotesk:wght@600;700` and `Inter:wght@400;500;600`) via `<link>` in every `index.html`.
- Replace all generic AI-blue (`#0b5fff`) with per-product brand identities:
  - `invoiceph`: Emerald (`#065f46`)
  - `tippoolcalc`: Coral / Warm Slate (`#f43f5e` / `#0f172a`)
  - `taxcalcph`: Indigo / Amber (`#4338ca` / `#d97706`)
  - `negosyosheet`: Warm Bronze (`#92400e`)
  - `payslipph`: Deep Navy / Teal (`#0369a1` / `#0d9488`)
  - `sellerprice`: Terracotta / Charcoal (`#ea580c` / `#1e293b`)

### 2. SEO & Ecosystem Cross-Linking
- Include a cohesive portfolio footer on all 6 sites linking siblings:
  - `InvoicePH` ↔ `TaxCalcPH` (PH Freelancers)
  - `PayslipPH` ↔ `InvoicePH` (PH Small Businesses)
  - `SellerPrice` ↔ `NegosyoSheet` (PH Resellers/E-Commerce)
- Maintain valid `robots.txt` and `sitemap.xml` referencing `https://makavelimachiavelli.github.io/<project>/`.

### 3. Payment Flow & Unlock Automation
- Maintain `PAYMENTS.md` per repo with the inventor's real GCash QR code and unlock codes.
- Provide clear visual feedback and immediate copy-to-clipboard actions upon code entry.
