#!/usr/bin/env python3
"""
Generate unlock codes for all 16 zinvent products and update app.js files.
"""
import os
import re
import secrets
import subprocess

BASE = "/home/allenos/zinvent/projects"

products = [
    ("closer", "CLOSER-PRO-199"),
    ("invoiceph", "IPH-PRO-199"),
    ("taxcalcph", "TCP-PRO-99"),
    ("payslipph", "PSP-PRO-149"),
    ("sellerprice", "SP-PRO-99"),
    ("negosyosheet", "NS-PRO-149"),
    ("tippoolcalc", "TPC-PRO-999"),
    ("rentsheet", "RS-PRO-699"),
    ("moveinreport", "MIR-PRO-1299"),
    ("pumproute", "PR-PRO-49"),
    ("ratecalcph", "RCP-PRO-99"),
    ("tradejournalph", "TJP-PRO-149"),
    ("utangplanph", "UPP-PRO-99"),
    ("commissionph", "CPH-PRO-149"),
    ("freelancerkitph", "FKP-PRO-149"),
    ("duessheet", "DS-PRO-149"),  # assuming this is product #16
]

def gen_code(prefix):
    """Generate a secure unlock code: PREFIX-XXXX-XXXX"""
    part1 = secrets.token_hex(2).upper()
    part2 = secrets.token_hex(2).upper()
    return f"{prefix}-{part1}-{part2}"

codes_summary = []
codes_summary.append("# UNLOCK CODES FOR ALLEN — ZINVENT PORTFOLIO")
codes_summary.append("")
codes_summary.append("*Generated securely. Replace placeholder PRO_CODES in each app.js.*")
codes_summary.append("")

for product_dir, prefix in products:
    app_js = os.path.join(BASE, product_dir, "app.js")
    if not os.path.exists(app_js):
        print(f"SKIP {product_dir}: no app.js")
        continue
    
    # Generate 2 codes per product (one main, one demo)
    code1 = gen_code(prefix)
    code2 = gen_code(prefix + "-DEMO")
    
    # Read and update app.js
    with open(app_js, "r") as f:
        content = f.read()
    
    # Find and replace PRO_CODES line
    new_line = f"const PRO_CODES = ['{code1}', '{code2}'];"
    content = re.sub(r"const PRO_CODES\s*=\s*\[.*?\];", new_line, content)
    
    with open(app_js, "w") as f:
        f.write(content)
    
    print(f"✅ {product_dir}: {code1}, {code2}")
    codes_summary.append(f"## {product_dir}")
    codes_summary.append(f"- Main: `{code1}`")
    codes_summary.append(f"- Demo: `{code2}`")
    codes_summary.append("")

# Write summary
with open("/home/allenos/zinvent/UNLOCK_CODES.md", "w") as f:
    f.write("\n".join(codes_summary))

print("\n📝 Summary written to /home/allenos/zinvent/UNLOCK_CODES.md")