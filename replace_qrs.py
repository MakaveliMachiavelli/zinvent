#!/usr/bin/env python3
"""Replace all placeholder GCash QRs with real QR in one command."""
import os
import sys
import shutil
from pathlib import Path

BASE = Path("/home/allenos/zinvent/projects")

def replace_qrs(qr_image_path: str):
    """Replace all placeholder GCash QRs with the real QR image."""
    if not Path(qr_image_path).exists():
        print(f"❌ QR image not found: {qr_image_path}")
        return False
    
    # Products with gcash-qr.svg at root
    root_qr_products = [
        "closer", "commissionph", "freelancerkitph", "invoiceph",
        "negosyosheet", "ratecalcph", "taxcalcph", "tippoolcalc",
        "utangplanph"
    ]
    
    # Products with pay-qr.svg at root
    pay_qr_products = [
        "moveinreport", "pumproute", "rentsheet"
    ]
    
    # Products with assets/gcash-qr.svg
    assets_qr_products = [
        "invoiceph", "sellerprice", "taxcalcph", "tippoolcalc"
    ]
    
    replaced = 0
    
    for product in root_qr_products:
        target = BASE / product / "gcash-qr.svg"
        if target.exists():
            shutil.copy2(qr_image_path, target)
            print(f"✅ {product}/gcash-qr.svg")
            replaced += 1
    
    for product in pay_qr_products:
        target = BASE / product / "pay-qr.svg"
        if target.exists():
            shutil.copy2(qr_image_path, target)
            print(f"✅ {product}/pay-qr.svg")
            replaced += 1
    
    for product in assets_qr_products:
        target = BASE / product / "assets" / "gcash-qr.svg"
        if target.exists():
            shutil.copy2(qr_image_path, target)
            print(f"✅ {product}/assets/gcash-qr.svg")
            replaced += 1
    
    print(f"\n🎉 Replaced {replaced} QR placeholders")
    return replaced > 0

def commit_and_push_all():
    """Commit and push all QR changes."""
    for product_dir in BASE.iterdir():
        if product_dir.is_dir() and (product_dir / ".git").exists():
            qr_files = list(product_dir.glob("*gcash-qr.svg")) + list(product_dir.glob("*pay-qr.svg")) + list(product_dir.glob("assets/*gcash-qr.svg"))
            if qr_files:
                try:
                    subprocess.run(["git", "add", "."], cwd=product_dir, check=True)
                    subprocess.run(["git", "commit", "-m", "feat: add real GCash QR codes"], cwd=product_dir, check=True)
                    subprocess.run(["git", "push"], cwd=product_dir, check=True)
                    print(f"✅ Pushed {product_dir.name}")
                except subprocess.CalledProcessError as e:
                    print(f"⚠️  {product_dir.name}: {e}")

if __name__ == "__main__":
    import subprocess
    
    if len(sys.argv) < 2:
        print("Usage: python3 replace_qrs.py <path-to-real-gcash-qr.png>")
        print("Example: python3 replace_qrs.py ~/Pictures/gcash-qr.png")
        sys.exit(1)
    
    qr_path = sys.argv[1]
    if replace_qrs(qr_path):
        print("\n📤 Pushing to GitHub...")
        commit_and_push_all()
        print("\n✅ Done! All products now have real GCash QR codes.")
        print("⏱️  GitHub Pages will update in ~60 seconds.")
    else:
        sys.exit(1)