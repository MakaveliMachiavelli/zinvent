#!/usr/bin/env python3
"""Fix index.html for products that lost design system integration.
For each product: inject design-system CSS+JS into <head>, preserve body content."""
import re
from pathlib import Path

BASE = Path("/home/allenos/zinvent/projects")

DS_CSS = '<link rel="stylesheet" href="https://makavelimachiavelli.github.io/zinvent-design-system/tokens.css">\n  <link rel="stylesheet" href="https://makavelimachiavelli.github.io/zinvent-design-system/components/base.css">'
DS_JS = '''  <!-- Zinvent Analytics (privacy-first, no cookies) -->
  <script src="https://makavelimachiavelli.github.io/zinvent-design-system/components/analytics.js"></script>
  <!-- Zinvent Payments (GCash + LemonSqueeasy, affiliate, email capture) -->
  <script src="https://makavelimachiavelli.github.io/zinvent-design-system/components/payments.js"></script>'''

# Products to fix (missing design system)
products_to_fix = ["ratecalcph", "commissionph", "tippoolcalc", "utangplanph", "tradejournalph", "freelancerkitph"]

for name in products_to_fix:
    d = BASE / name
    idx = d / "index.html"
    if not idx.exists():
        print(f"⚠️  {name}: no index.html")
        continue
    
    html = idx.read_text()
    
    # Check if already has design system
    if "zinvert-design-system" not in html:
        # Find </head> and inject before it
        # Find first <link rel="stylesheet" href="style.css"> and inject before it
        # Actually, inject right after <head> or after <meta name="description">
        
        # Strategy: find the first <link> or <style> tag and inject before it
        # If no design system links exist, inject after <meta name="viewport">
        
        injection_point = html.find('<link rel="stylesheet"')
        if injection_point == -1:
            injection_point = html.find('<meta name="viewport"')
            if injection_point != -1:
                injection_point = html.find('>', injection_point) + 1
        
        if injection_point != -1:
            html = html[:injection_point] + "  <!-- Zinvent Design System -->\n  " + DS_CSS.replace('\n', '\n  ') + "\n" + DS_JS + "\n" + html[injection_point:]
        else:
            print(f"⚠️  {name}: could not find injection point")
            continue
    
    # Ensure skip-link exists (for a11y)
    if 'skip-link' not in html:
        # Insert after <body>
        body_pos = html.find('<body')
        if body_pos != -1:
            body_close = html.find('>', body_pos) + 1
            html = html[:body_close] + '\n  <a href="#main" class="skip-link">Skip to main content</a>' + html[body_close:]
    
    # Ensure data-theme attribute on <html>
    if 'data-theme=' not in html:
        html = html.replace('<html', f'<html data-theme="{name}"', 1)
    
    idx.write_text(html)
    print(f"✅ {name}: injected design system + skip-link + data-theme")

print("\nDone. Commit and push each product.")
