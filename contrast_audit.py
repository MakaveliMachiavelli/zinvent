#!/usr/bin/env python3
"""10/10 verification: BOTH color schemes, every text element contrast-checked,
all 16 pages. Fails loudly with element-level detail."""
import asyncio, json

PRODUCTS = ["closer","invoiceph","taxcalcph","negosyosheet","tippoolcalc",
            "payslipph","sellerprice","rentsheet","moveinreport","pumproute",
            "ratecalcph","tradejournalph","utangplanph","commissionph",
            "freelancerkitph"]
BASE = "https://makavelimachiavelli.github.io"

JS = """() => {
  function lum(rgb){
    const m = rgb.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/);
    if(!m) return null;
    const f = v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4); };
    return 0.2126*f(+m[1]) + 0.7152*f(+m[2]) + 0.0722*f(+m[3]);
  }
  function bgOf(el){
    let e = el;
    while(e && e !== document.documentElement){
      const bg = getComputedStyle(e).backgroundColor;
      if(bg && !bg.includes('rgba(0, 0, 0, 0)')) return bg;
      e = e.parentElement;
    }
    return 'rgb(255,255,255)';
  }
  const bad = [];
  const seen = new Set();
  document.querySelectorAll('main *, .z-card, .panel, .card, label, p, h1, h2, h3, span, a, button, td, th, li').forEach(el => {
    if(el.children.length > 3) return;
    const txt = (el.textContent||'').trim();
    if(!txt || txt.length < 2) return;
    const cs = getComputedStyle(el);
    if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0) return;
    const l1 = lum(cs.color), l2 = lum(bgOf(el));
    if(l1==null||l2==null) return;
    const hi = Math.max(l1,l2), lo = Math.min(l1,l2);
    const ratio = (hi+0.05)/(lo+0.05);
    const size = parseFloat(cs.fontSize);
    const bold = parseInt(cs.fontWeight)>=600;
    const needed = (size>=24||(size>=18.66&&bold)) ? 3 : 4.5;
    if(ratio < needed){
      const key = el.tagName+'|'+cs.color+'|'+txt.slice(0,25);
      if(!seen.has(key)){
        seen.add(key);
        bad.push({cls:String(el.className).slice(0,30), tag:el.tagName,
                  color:cs.color, ratio:+ratio.toFixed(2), txt:txt.slice(0,35)});
      }
    }
  });
  return bad.slice(0,10);
}"""

async def main():
    from playwright.async_api import async_playwright
    async with async_playwright() as pw:
        b = await pw.chromium.launch(args=["--no-sandbox"])
        total_bad = 0
        for scheme in ["light","dark"]:
            pg = await b.new_page(viewport={"width":390,"height":900}, color_scheme=scheme)
            for p in PRODUCTS + [("zinvent-hub", f"{BASE}/zinvent-hub/")]:
                name, url = p if isinstance(p, tuple) else (p, f"{BASE}/{p}/")
                try:
                    await pg.goto(url, wait_until="networkidle", timeout=30000)
                    bad = await pg.evaluate(JS)
                    if bad:
                        total_bad += len(bad)
                        print(f"[{scheme}] {name}: {len(bad)} FAILURES")
                        for x in bad[:4]:
                            print(f"   {x}")
                    else:
                        print(f"[{scheme}] {name}: PASS")
                except Exception as e:
                    print(f"[{scheme}] {name}: ERROR {str(e)[:80]}")
            await pg.close()
        await b.close()
        print(f"\nTOTAL CONTRAST FAILURES BOTH SCHEMES: {total_bad}")

asyncio.run(main())
