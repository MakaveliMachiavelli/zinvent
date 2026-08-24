#!/usr/bin/env python3
"""Generate placeholder qr-gcash.svg per product + create hub terms.html & privacy.html.
Fixes all 404s found by link crawler. QR placeholders are branded; Allen replaces
with real QR via replace_qrs.py when ready (parked task)."""
import os

PRODUCTS = {
    "closer":        ("Closer PRO", "#0f172a", "#38bdf8"),
    "invoiceph":     ("InvoicePH PRO", "#0f2c4c", "#c89b3c"),
    "taxcalcph":     ("TaxCalcPH PRO", "#0b3d2e", "#2f9e6e"),
    "negosyosheet":  ("NegosyoSheet PRO", "#b5462f", "#e0922e"),
    "tippoolcalc":   ("TipPoolCalc PRO", "#134e4a", "#2dd4bf"),
    "payslipph":     ("PayslipPH PRO", "#1e293b", "#f59e0b"),
    "sellerprice":   ("SellerPrice PRO", "#3b0764", "#a855f7"),
    "rentsheet":     ("RentSheet PRO", "#052e16", "#22c55e"),
    "moveinreport":  ("MoveInReport PRO", "#0c4a6e", "#38bdf8"),
    "pumproute":     ("PumpRoute PRO", "#0c4a6e", "#7dd3fc"),
    "ratecalcph":    ("RateCalcPH PRO", "#4338ca", "#f59e0b"),
    "tradejournalph":("TradeJournalPH PRO", "#065f46", "#34d399"),
    "utangplanph":   ("UtangPlanPH PRO", "#7c2d12", "#fb923c"),
    "commissionph":  ("CommissionPH PRO", "#1e1b4b", "#818cf8"),
    "freelancerkitph":("FreelancerKitPH PRO", "#312e81", "#a5b4fc"),
}

def qr_svg(name, bg, accent):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
  <rect width="300" height="300" rx="16" fill="{bg}"/>
  <rect x="20" y="20" width="110" height="110" rx="10" fill="none" stroke="{accent}" stroke-width="10"/>
  <rect x="45" y="45" width="60" height="60" rx="6" fill="{accent}"/>
  <rect x="170" y="20" width="110" height="110" rx="10" fill="none" stroke="{accent}" stroke-width="10"/>
  <rect x="195" y="45" width="60" height="60" rx="6" fill="{accent}"/>
  <rect x="20" y="170" width="110" height="110" rx="10" fill="none" stroke="{accent}" stroke-width="10"/>
  <rect x="45" y="195" width="60" height="60" rx="6" fill="{accent}"/>
  <text x="225" y="215" font-family="Arial" font-size="52" font-weight="bold" fill="{accent}">GC</text>
  <text x="150" y="285" text-anchor="middle" font-family="Arial" font-size="18" fill="#fff">{name}</text>
</svg>'''

base = "/home/allenos/zinvent/projects"
for slug, (name, bg, ac) in PRODUCTS.items():
    d = f"{base}/{slug}"
    if not os.path.exists(f"{d}/qr-gcash.svg"):
        open(f"{d}/qr-gcash.svg", "w").write(qr_svg(name, bg, ac))
        print(f"{slug}: qr-gcash.svg created")

# Hub legal pages
HUB = "/home/allenos/zinvent-repos/makavelimachiavelli.github.io/zinvent-hub"
terms = '''<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Terms of Service — Zinvent</title><style>body{font-family:system-ui,sans-serif;max-width:720px;margin:40px auto;padding:0 24px;line-height:1.7;color:#1f2937}h1{color:#111827}</style></head><body>
<h1>Terms of Service</h1>
<p>Last updated: August 24, 2026</p>
<p>Zinvent tools run entirely in your browser. We do not collect, transmit, or store your data on any server.</p>
<h2>Licenses</h2>
<p>Free tiers are provided as-is for personal and business use. Paid ("PRO") tiers are one-time purchases unlocked by a code delivered after payment. Each license is for one user.</p>
<h2>Refunds</h2>
<p>If a PRO unlock code does not work, contact us within 14 days of purchase for a full refund or a working code.</p>
<h2>No warranty</h2>
<p>Tools are provided without warranty. Tax computations follow published BIR rules but are informational — consult a professional for filings.</p>
<h2>Contact</h2>
<p>Questions: allenolavidez@gmail.com</p>
</body></html>'''
privacy = terms.replace("<h1>Terms of Service</h1>", "<h1>Privacy Policy</h1>").replace(
    "<p>Last updated: August 24, 2026</p>",
    "<p>Last updated: August 24, 2026</p>"
).replace(
    "<h2>Licenses</h2>",
    "<h2>Data collection</h2>\n<p>We collect nothing. All tool inputs stay in your browser's localStorage. No accounts, no analytics cookies, no tracking pixels. Aggregate page-view counts only (no personal data).</p>\n<h2>Payments</h2>\n<p>GCash/LemonSqueezy payments are processed by those platforms; we never see your financial details.</p>\n<h2>Contact</h2>\n<p>Questions: allenolavidez@gmail.com</p>"
).replace("<h1>Privacy Policy</h1>\n<p>Zinvent tools run entirely in your browser. We do not collect, transmit, or store your data on any server.</p>", "<h1>Privacy Policy</h1>")
open(f"{HUB}/terms.html","w").write(terms)
open(f"{HUB}/privacy.html","w").write(privacy)
print("hub: terms.html + privacy.html created")
