#!/usr/bin/env python3
"""Visual regression: full-page screenshots in light+dark, diff vs baseline.
First run saves baselines. Later runs report % pixel change > threshold."""
import asyncio, os, sys
from playwright.async_api import async_playwright

PRODUCTS = ["closer","invoiceph","taxcalcph","negosyosheet","tippoolcalc","payslipph",
            "sellerprice","rentsheet","moveinreport","pumproute","ratecalcph",
            "tradejournalph","utangplanph","commissionph","freelancerkitph"]
BASE = "/home/allenos/zinvent/vr-baselines"
THRESH = 8.0  # percent pixels changed

async def shot(browser, url, scheme):
    ctx = await browser.new_context(color_scheme=scheme, viewport={"width":390,"height":900})
    pg = await ctx.new_page()
    await pg.goto(url, wait_until="networkidle")
    await pg.wait_for_timeout(1200)
    png = await pg.screenshot(full_page=True)
    await ctx.close()
    return png

async def main():
    os.makedirs(BASE, exist_ok=True)
    mode = sys.argv[1] if len(sys.argv) > 1 else "check"
    async with async_playwright() as pw:
        b = await pw.chromium.launch(args=["--no-sandbox"])
        from PIL import Image
        import io, numpy as np
        fails = 0
        for p in PRODUCTS:
            url = f"https://makavelimachiavelli.github.io/{p}/"
            for scheme in ("light", "dark"):
                name = f"{p}-{scheme}"
                path = f"{BASE}/{name}.png"
                try:
                    png = await shot(b, url, scheme)
                except Exception as e:
                    print(f"{name}: SHOT-FAIL {e}"); fails += 1; continue
                if not os.path.exists(path) or mode == "baseline":
                    open(path, "wb").write(png); print(f"{name}: baseline saved"); continue
                a = np.asarray(Image.open(io.BytesIO(png)).convert("L"), dtype=np.int16)
                bimg = Image.open(path).convert("L")
                bb = np.asarray(bimg.resize((a.shape[1], a.shape[0])), dtype=np.int16)
                diff = (np.abs(a - bb) > 40).mean() * 100
                if diff > THRESH:
                    print(f"{name}: CHANGED {diff:.0f}% (> {THRESH}%)"); fails += 1
                else:
                    print(f"{name}: ok ({diff:.0f}%)")
        await b.close()
        verdict = "BASELINE SET" if mode == "baseline" else str(fails) + " regressions"
        print("RESULT:", verdict)

asyncio.run(main())
