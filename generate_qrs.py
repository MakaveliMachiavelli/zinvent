#!/usr/bin/env python3
"""Generate placeholder GCash QR SVGs for all products."""
import os

BASE = "/home/allenos/zinvent/projects"

products = [
    ("closer", "gcash-qr.svg"),
    ("invoiceph", "assets/gcash-qr.svg"),
    ("taxcalcph", "assets/gcash-qr.svg"),
    ("payslipph", "assets/gcash-qr.svg"),
    ("sellerprice", "assets/gcash-qr.svg"),
    ("negosyosheet", "gcash-qr.svg"),
    ("tippoolcalc", "assets/gcash-qr.svg"),
    ("rentsheet", "pay-qr.svg"),
    ("moveinreport", "pay-qr.svg"),
    ("pumproute", "pay-qr.svg"),
    ("ratecalcph", "gcash-qr.svg"),
    ("tradejournalph", "gcash-qr.svg"),
    ("utangplanph", "gcash-qr.svg"),
    ("commissionph", "gcash-qr.svg"),
    ("freelancerkitph", "gcash-qr.svg"),
]

qr_template = '''<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#ffffff"/>
  <rect x="8" y="8" width="164" height="164" fill="none" stroke="#00A651" stroke-width="3" stroke-dasharray="8 5"/>
  <g fill="#00A651" font-family="Arial" text-anchor="middle">
    <text x="90" y="70" font-size="14" font-weight="bold">GCash QR</text>
    <text x="90" y="92" font-size="18" font-weight="bold">{product}</text>
    <text x="90" y="115" font-size="9">Scan to pay ₱{price}</text>
    <text x="90" y="130" font-size="8">Replace with real QR</text>
    <text x="90" y="145" font-size="7">see PAYMENTS.md</text>
  </g>
</svg>'''

for product_dir, qr_file in products:
    qr_path = os.path.join(BASE, product_dir, qr_file)
    os.makedirs(os.path.dirname(qr_path), exist_ok=True)
    
    # Extract price from PAYMENTS.md or use default
    price_map = {
        "closer": "199", "invoiceph": "199", "taxcalcph": "99", "payslipph": "149",
        "sellerprice": "99", "negosyosheet": "149", "tippoolcalc": "9.99",
        "rentsheet": "6.99", "moveinreport": "12.99", "pumproute": "49",
        "ratecalcph": "99", "tradejournalph": "149", "utangplanph": "99",
        "commissionph": "149", "freelancerkitph": "149"
    }
    price = price_map.get(product_dir, "0")
    
    with open(qr_path, "w") as f:
        f.write(qr_template.format(product=product_dir.upper(), price=price))
    
    print(f"✅ {product_dir}/{qr_file}")

print("\n📝 Done. Allen: replace each with real GCash QR from your app.")
