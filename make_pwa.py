#!/usr/bin/env python3
"""Generate PWA manifests + inject <link rel=manifest> + theme-color into all products."""
import re, os, json

BASE = "/home/allenos/zinvent/projects"

# per-product: (name, short_name, description, bg, theme, icon_emoji_or_char)
PRODUCTS = {
    "invoiceph":      ("InvoicePH", "Invoice", "BIR-compliant invoice generator", "#0f2c4c", "#0f2c4c", "₱"),
    "taxcalcph":      ("TaxCalcPH", "TaxCalc", "Philippine income tax calculator", "#0b3d2e", "#0b3d2e", "%"),
    "negosyosheet":   ("NegosyoSheet", "Negosyo", "Sari-sari store inventory tracker", "#b5462f", "#b5462f", "N"),
    "tippoolcalc":    ("TipPoolCalc", "TipPool", "Fair tip distribution calculator", "#7a1f2b", "#7a1f2b", "%"),
    "payslipph":      ("PayslipPH", "Payslip", "TRAIN-compliant payslip generator", "#1a3a5c", "#1a3a5c", "P"),
    "sellerprice":    ("SellerPrice", "SellPrice", "Marketplace pricing calculator", "#5b21b6", "#5b21b6", "₱"),
    "rentsheet":      ("RentSheet", "Rent", "Rental property tracker", "#134e4a", "#134e4a", "R"),
    "moveinreport":   ("MoveInReport", "MoveIn", "Photo move-in inspection reports", "#92400e", "#92400e", "M"),
    "pumproute":      ("PumpRoute", "PumpRoute", "Water delivery route tracker", "#0c4a6e", "#0c4a6e", "W"),
    "ratecalcph":     ("RateCalcPH", "RateCalc", "Freelancer rate calculator", "#4338ca", "#4338ca", "₱"),
    "utangplanph":    ("UtangPlanPH", "UtangPlan", "Debt payoff planner", "#14532d", "#14532d", "U"),
    "commissionph":   ("CommissionPH", "Commission", "Sales commission calculator", "#7c2d12", "#7c2d12", "%"),
    "freelancerkitph":("FreelancerKitPH", "FreeKit", "Modular freelancer toolkit", "#374151", "#374151", "F"),
    "closer":         ("Closer", "Closer", "Job hunt autopilot", "#18181b", "#18181b", "C"),
}

MANIFEST_TPL = """{{
  "name": "{name}",
  "short_name": "{short}",
  "description": "{desc}",
  "start_url": "./",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "{theme}",
  "icons": [
    {{"src": "icon-192.png", "sizes": "192x192", "type": "image/png"}},
    {{"src": "icon-512.png", "sizes": "512x512", "type": "image/png"}}
  ]
}}"""

def make_icon(path, size, bg, char):
    from PIL import Image, ImageDraw, ImageFont
    img = Image.new("RGB", (size, size), bg)
    d = ImageDraw.Draw(img)
    fs = int(size * 0.55)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", fs)
    except Exception:
        font = ImageFont.load_default()
    bbox = d.textbbox((0, 0), char, font=font)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text(((size - w) / 2 - bbox[0], (size - h) / 2 - bbox[1]), char, fill="white", font=font)
    img.save(path)

ok, skip = [], []
for slug, (name, short, desc, _bg, theme, ch) in PRODUCTS.items():
    d = os.path.join(BASE, slug)
    idx = os.path.join(d, "index.html")
    if not os.path.exists(idx):
        skip.append(slug); continue
    # icons
    make_icon(os.path.join(d, "icon-192.png"), 192, theme, ch)
    make_icon(os.path.join(d, "icon-512.png"), 512, theme, ch)
    # manifest
    mf = MANIFEST_TPL.format(name=name, short=short, desc=json.dumps(desc), theme=theme)
    open(os.path.join(d, "manifest.json"), "w").write(mf)
    # inject head tags if missing
    html = open(idx).read()
    changed = False
    if 'rel="manifest"' not in html:
        tag = f'  <link rel="manifest" href="manifest.json">\n  <meta name="theme-color" content="{theme}">\n'
        html = html.replace("</head>", tag + "</head>", 1)
        changed = True
    if changed:
        open(idx, "w").write(html)
        ok.append(slug)
    else:
        ok.append(slug + "(tags-exist)")

print("PWA done:", len(ok), "| skipped:", skip or "none")
for s in ok: print(" ", s)
