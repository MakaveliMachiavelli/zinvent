#!/usr/bin/env python3
"""Generate branded OG images (1200x630) per product + inject og/meta tags into index.html."""
import re, os, subprocess
from PIL import Image, ImageDraw, ImageFont

BASE = "/home/allenos/zinvent/projects"
DS = "/home/allenos/zinvent/design-system/tokens.css"
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

MARKS = {  # brand mark glyph + product title
 "closer": ("🎯", "Closer", "Job applications on autopilot"),
 "invoiceph": ("₱", "InvoicePH", "BIR-compliant invoices in minutes"),
 "taxcalcph": ("🧮", "TaxCalcPH", "Know your PH income tax instantly"),
 "negosyosheet": ("🏪", "NegosyoSheet", "Sari-sari store inventory & sales"),
 "tippoolcalc": ("🍽️", "TipPoolCalc", "Fair tip splitting for your crew"),
 "payslipph": ("💵", "PayslipPH", "TRAIN-accurate payslips in batch"),
 "sellerprice": ("🏷️", "SellerPrice", "Price your TikTok/Shopee listings right"),
 "rentsheet": ("🏠", "RentSheet", "Rental tracking made simple"),
 "moveinreport": ("📸", "MoveInReport", "Photo move-in inspection reports"),
 "pumproute": ("💧", "PumpRoute", "Water delivery routes & collections"),
 "ratecalcph": ("💼", "RateCalcPH", "Ano ang tamang singil mo?"),
 "tradejournalph": ("📈", "TradeJournalPH", "PSE trading journal with auto P&L"),
 "utangplanph": ("🧾", "UtangPlanPH", "Debt payoff plans that work"),
 "commissionph": ("🤝", "CommissionPH", "Sales commission calculator"),
 "freelancerkitph": ("🧰", "FreelancerKitPH", "Contracts, invoices, time tracking"),
}

def themes():
    css = open(DS).read()
    out = {}
    for name, block in re.findall(r'\[data-theme="([a-z]+)"\]\s*\{(.*?)\}', css, re.S):
        prim = re.search(r'--p-primary:\s*(#[0-9a-fA-F]{6})', block)
        acc = re.search(r'--p-accent:\s*(#[0-9a-fA-F]{6})', block)
        bg = re.search(r'--p-bg:\s*(#[0-9a-fA-F]{6})', block)
        ink = re.search(r'--p-ink:\s*(#[0-9a-fA-F]{6})', block)
        out[name] = dict(
            primary=prim.group(1) if prim else "#101828",
            accent=acc.group(1) if acc else "#f59e0b",
            bg=bg.group(1) if bg else "#ffffff",
            ink=ink.group(1) if ink else "#101828",
        )
    return out

def hex2rgb(h): return tuple(int(h[i:i+2],16) for i in (1,3,5))

def make_og(name, colors):
    mark, title, tagline = MARKS[name]
    W,H = 1200,630
    img = Image.new("RGB",(W,H),hex2rgb(colors["bg"]))
    d = ImageDraw.Draw(img)
    # left color bar
    d.rectangle([0,0,24,H], fill=hex2rgb(colors["primary"]))
    # brand chip
    cx,cy,s = 100,120,110
    d.rounded_rectangle([cx,cy,cx+s,cy+s], radius=26, fill=hex2rgb(colors["primary"]))
    f_mark = ImageFont.truetype(FONT_BOLD, 64)
    d.text((cx+s/2, cy+s/2), mark if mark=="₱" else mark[0], font=f_mark, anchor="mm", fill="#fff")
    # title
    f_t = ImageFont.truetype(FONT_BOLD, 88)
    d.text((100,290), title, font=f_t, fill=hex2rgb(colors["ink"]))
    # tagline
    f_g = ImageFont.truetype(FONT_REG, 40)
    d.text((100,410), tagline, font=f_g, fill=hex2rgb("#667085"))
    # footer
    f_f = ImageFont.truetype(FONT_REG, 28)
    d.text((100,545), "Free tool · zinvent.ph tools for Pinoy negosyo", font=f_f, fill=hex2rgb(colors["accent"]))
    path = f"{BASE}/{name}/og-image.png"
    img.save(path, optimize=True)
    return path

def inject_meta(name):
    idx = f"{BASE}/{name}/index.html"
    html = open(idx).read()
    if 'property="og:image"' in html:
        return "already"
    url = f"https://makavelimachiavelli.github.io/{name}/"
    _, title, desc = MARKS[name]
    full_title = f"{title} — {desc}"
    meta = f'''  <meta property="og:type" content="website">
  <meta property="og:url" content="{url}">
  <meta property="og:title" content="{full_title}">
  <meta property="og:description" content="{desc}. Free, no signup.">
  <meta property="og:image" content="{url}og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{full_title}">
  <meta name="twitter:description" content="{desc}. Free, no signup.">
  <meta name="twitter:image" content="{url}og-image.png">
  <link rel="canonical" href="{url}">
'''
    html = html.replace("</head>", meta + "</head>", 1)
    open(idx,"w").write(html)
    return "injected"

if __name__ == "__main__":
    th = themes()
    results = []
    for name in MARKS:
        c = th.get(name, {})
        make_og(name, c)
        r = inject_meta(name)
        results.append(f"{name}: og-image + meta {r}")
    print("\n".join(results))
