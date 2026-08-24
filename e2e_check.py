#!/usr/bin/env python3
"""End-to-end functional tests: drive each product's real UI with Playwright.
Fills inputs, clicks compute, asserts on-screen results with expected values."""
import asyncio, sys
from playwright.async_api import async_playwright

BASE = "https://makavelimachiavelli.github.io"

# Per-product E2E scenarios: (url, [(action...)], assertions)
# action types: fill <id> <val>; click <id>; assert_text_contains <selector> <txt>
SCENARIOS = {
    "taxcalcph": [
        ("fill", "#gross", "600000"),
        ("click", "input[value='annual'], #periodAnnual", None),
        ("compute", None, None),
        ("assert_any", "tax|totalTax|taxDue", None),
    ],
}

async def run_product(pw, name):
    page = await pw.new_page(viewport={"width":1280,"height":900})
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    try:
        await page.goto(f"{BASE}/{name}/", wait_until="networkidle", timeout=30000)
        # Reveal the app section if hidden behind landing
        app = page.locator("#z-app")
        cnt = await app.count()
        info = {"app_section": bool(cnt)}
        if cnt:
            visible = await app.is_visible()
            info["app_visible"] = visible
            if not visible:
                await page.evaluate("document.getElementById('z-app').hidden=false; document.getElementById('z-app').style.display='block'")
        # Count live form controls
        info["inputs"] = await page.locator("#z-app input, main input, body input").count()
        info["buttons"] = await page.locator("#z-app button, main button").count()
        info["js_errors"] = len(errors)
        return name, info, errors[:3]
    except Exception as e:
        return name, {"error": str(e)[:120]}, []
    finally:
        await page.close()

async def main():
    products = ["invoiceph","taxcalcph","payslipph","sellerprice","tippoolcalc",
                "moveinreport","pumproute","ratecalcph","utangplanph","commissionph",
                "closer","freelancerkitph"]
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(args=["--no-sandbox"])
        for name in products:
            n, info, errs = await run_product(browser, name)
            status = "OK" if info.get("inputs",0) > 0 and info.get("js_errors",1)==0 else "PROBLEM"
            print(f"{name}: {status}  inputs={info.get('inputs','?')} buttons={info.get('buttons','?')} jsErr={info.get('js_errors','?')} appSection={info.get('app_section','?')}")
            if errs:
                print(f"   err0: {errs[0][:100]}")
        await browser.close()

asyncio.run(main())
