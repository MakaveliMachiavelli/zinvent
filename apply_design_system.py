#!/usr/bin/env python3
"""Apply unified design system to all products."""
import os
import shutil

BASE = "/home/allenos/zinvent/projects"
DESIGN_SYSTEM = "/home/allenos/zinvent/design-system"

products = [
    "closer", "invoiceph", "taxcalcph", "negosyosheet", "tippoolcalc",
    "payslipph", "sellerprice", "rentsheet", "moveinreport", "pumproute",
    "ratecalcph", "tradejournalph", "utangplanph", "commissionph", "freelancerkitph"
]

def update_product(product_name):
    product_dir = os.path.join(BASE, product_name)
    style_path = os.path.join(product_dir, "style.css")
    index_path = os.path.join(product_dir, "index.html")
    
    if not os.path.exists(style_path):
        print(f"  ⚠ {product_name}: no style.css")
        return False
    
    # Read current style.css
    with open(style_path, "r") as f:
        css = f.read()
    
    # Read current index.html
    with open(index_path, "r") as f:
        html = f.read()
    
    # Backup originals
    shutil.copy2(style_path, style_path + ".bak")
    shutil.copy2(index_path, index_path + ".bak")
    
    # Update index.html to include design system CSS
    # Add tokens.css and base.css before style.css
    tokens_link = '<link rel="stylesheet" href="https://makavelimachiavelli.github.io/zinvent-design-system/tokens.css">'
    base_link = '<link rel="stylesheet" href="https://makavelimachiavelli.github.io/zinvent-design-system/components/base.css">'
    
    # Find where style.css is linked and add our links before it
    if 'href="style.css"' in html and tokens_link not in html:
        html = html.replace('href="style.css"', f'{tokens_link}\n    {base_link}\n    <link rel="stylesheet" href="style.css"')
    elif 'href="./style.css"' in html and tokens_link not in html:
        html = html.replace('href="./style.css"', f'{tokens_link}\n    {base_link}\n    <link rel="stylesheet" href="./style.css"')
    
    # Add data-theme attribute to <html> or <body>
    if 'data-theme="' not in html:
        html = html.replace('<html ', f'<html data-theme="{product_name}" ')
        if 'data-theme="' not in html:
            html = html.replace('<body', f'<body data-theme="{product_name}"')
    
    # Add skip link after <body>
    if 'skip-link' not in html:
        html = html.replace('<body', '<body>\n  <a href="#main" class="skip-link">Skip to main content</a>')
    
    # Write updated files
    with open(index_path, "w") as f:
        f.write(html)
    
    # For style.css, we keep product-specific overrides only
    # The base styles come from design system
    print(f"  ✓ {product_name}: updated index.html, backed up style.css")
    return True

for p in products:
    update_product(p)

# Also update hub and alias
for p in ["zinvent-hub", "zinvent-alias"]:
    product_dir = os.path.join(BASE, p)
    index_path = os.path.join(product_dir, "index.html")
    if os.path.exists(index_path):
        with open(index_path, "r") as f:
            html = f.read()
        shutil.copy2(index_path, index_path + ".bak")
        tokens_link = '<link rel="stylesheet" href="https://makavelimachiavelli.github.io/zinvent-design-system/tokens.css">'
        base_link = '<link rel="stylesheet" href="https://makavelimachiavelli.github.io/zinvent-design-system/components/base.css">'
        if 'href="style.css"' in html and tokens_link not in html:
            html = html.replace('href="style.css"', f'{tokens_link}\n    {base_link}\n    <link rel="stylesheet" href="style.css"')
        if 'data-theme="' not in html:
            html = html.replace('<html ', f'<html data-theme="{p}" ')
        with open(index_path, "w") as f:
            f.write(html)
        print(f"  ✓ {p}: updated")

print("\nDone. Now push design-system repo and update each product.")