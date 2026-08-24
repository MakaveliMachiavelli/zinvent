#!/usr/bin/env python3
"""
ai_critic.py — Local-AI red team for any Zinvent page (or any URL/text).

USAGE:
  python3 ai_critic.py <product>              # critique live landing page
  python3 ai_critic.py --text "your copy"     # critique raw text before posting

Models: gemma3:12b (fast, ~30s) | qwen2.5vl:7b (vision, for screenshots)
Zero cost. Runs on your VPS. No API keys.

EXAMPLE OUTPUT SECTIONS:
  1. Trust kill   - what makes users distrust it
  2. Clarity fail - what a tired reader won't understand
  3. PH lens      - cultural/context misses (Taglish mix, GCash norms)
  4. Fix first    - single highest-impact change
"""
import sys, json, urllib.request
from pathlib import Path

MODEL = "gemma3:12b"
BASE = "https://makavelimachiavelli.github.io"

def ask(prompt, timeout=280):
    body = json.dumps({"model": MODEL, "messages": [
        {"role": "system", "content":
         "You are a skeptical Filipino freelancer who reviews free tools for a living. "
         "You have been burned by fake tools before. Be harsh but specific. "
         "Never invent features that are not in the input."},
        {"role": "user", "content": prompt}],
        "stream": False}).encode()
    req = urllib.request.Request("http://localhost:11434/api/chat",
                                 data=body, headers={"Content-Type": "application/json"})
    return json.loads(urllib.request.urlopen(req, timeout=timeout).read())["message"]["content"]

def get_page_text(product):
    """Extract hero + sections + PRO pitch from the live page."""
    out = Path("/tmp") / f"critic-{product}.txt"
    if out.exists():
        return out.read_text()
    import asyncio
    from playwright.async_api import async_playwright
    async def grab():
        async with async_playwright() as pw:
            b = await pw.chromium.launch(args=["--no-sandbox"])
            pg = await b.new_page()
            await pg.goto(f"{BASE}/{product}/", wait_until="networkidle")
            txt = await pg.evaluate("""() =>
                Array.from(document.querySelectorAll('h1,h2,h3,p,button,a.z-btn'))
                    .map(e => e.innerText.trim()).filter(t => t).join('\\n')""")
            await b.close()
            return txt[:3000]
    txt = asyncio.run(grab())
    out.write_text(txt)
    return txt

PROMPT = """Review this landing page copy for a free Philippine business tool.

COPY:
{copy}

Answer in exactly this format:
TRUST KILL: [the one thing that most makes users distrust it]
CLARITY FAIL: [what a tired reader will not understand]
PH LENS: [what misses Filipino freelancer/SME context - GCash norms, Taglish expectations, BIR anxiety]
FIX FIRST: [single highest-impact change, one sentence]"""

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    if sys.argv[1] == "--text":
        copy = " ".join(sys.argv[2:])
    else:
        copy = get_page_text(sys.argv[1].strip("/"))
    print(ask(PROMPT.format(copy=copy)))

if __name__ == "__main__":
    main()
