#!/usr/bin/env python3
"""Update all products to include payments.js in index.html."""
import re
from pathlib import Path

BASE = Path("/home/allenos/zinvent/projects")

products = [
    "closer", "invoiceph", "taxcalcph", "negosyosheet",
    "tippoolcalc", "payslipph", "sellerprice", "rentsheet",
    "moveinreport", "pumproute", "ratecalcph", "tradejournalph",
    "utangplanph", "commissionph", "freelancerkitph"
]

for product in products:
    index_path = BASE / product / "index.html"
    if not index_path.exists():
        continue
    
    content = index_path.read_text()
    
    # Add payments script after analytics.js
    if 'analytics.js' in content and 'payments.js' not in content:
        pattern = r'(<script src="https://makavelimachiavelli\.github\.io/zinvent-design-system/components/analytics\.js"></script>)'
        replacement = r'''\1
  <!-- Zinvent Payments (GCash + LemonSqueezy, affiliate, email capture) -->
  <script src="https://makavelimachiavelli.github.io/zinvent-design-system/components/payments.js"></script>'''
        new_content = re.sub(pattern, replacement, content)
        
        if new_content != content:
            index_path.write_text(new_content)
            print(f"✅ {product}: added payments.js")
        else:
            print(f"⚠️  {product}: pattern not found")
    elif 'payments.js' in content:
        print(f"⏭️  {product}: already has payments")
    else:
        print(f"❌ {product}: no analytics.js found")

print("\nDone. Now commit and push each product.")