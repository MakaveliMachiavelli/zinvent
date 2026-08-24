#!/usr/bin/env python3
"""Update all products to include analytics script in index.html."""
import os
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
    
    # Add analytics script after design-system CSS links
    if 'zinvent-design-system' in content and 'analytics.js' not in content:
        # Find the design-system CSS links and add analytics after
        pattern = r'(<link rel="stylesheet" href="https://makavelimachiavelli\.github\.io/zinvent-design-system/components/base\.css">)'
        replacement = r'''\1
  <!-- Zinvent Analytics (privacy-first, no cookies) -->
  <script src="https://makavelimachiavelli.github.io/zinvent-design-system/components/analytics.js"></script>'''
        new_content = re.sub(pattern, replacement, content)
        
        if new_content != content:
            index_path.write_text(new_content)
            print(f"✅ {product}: added analytics.js")
        else:
            print(f"⚠️  {product}: pattern not found")
    elif 'analytics.js' in content:
        print(f"⏭️  {product}: already has analytics")
    else:
        print(f"❌ {product}: no design-system link found")

print("\nDone. Now commit and push each product.")