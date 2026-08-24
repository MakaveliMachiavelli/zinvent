#!/usr/bin/env python3
"""MASTER GATE - run before declaring ANY zinvent work done.
Fails loudly. Zero trust in prior claims."""
import sys, re
from pathlib import Path

BASE = Path("/home/allenos/zinvent/projects")
PRODUCTS = [d.name for d in BASE.iterdir() if d.is_dir() and (d / "index.html").exists()]
fails = []

for p in PRODUCTS:
    html = (BASE / p / "index.html").read_text(errors="ignore")

    # GATE 1: no orphan attributes (injection corruption)
    if re.search(r"^\s+(class|id)=\"[^\"]*\">\s*$", html, re.M):
        fails.append(f"{p}: orphan attribute fragment")

    # GATE 2: no dangling section tags (line ends mid-tag with no >)
    for m in re.finditer(r"<section [^>]*$", html, re.M):
        fails.append(f"{p}: dangling <section> tag")

    # GATE 3: id-count regression (app UI present)
    n = len(re.findall(r' id="', html))
    if n < 15 and (BASE / p / "app.js").exists():
        fails.append(f"{p}: only {n} ids (app UI missing?)")

    # GATE 4: design system + cache-bust referenced
    if "zinvent-design-system" not in html:
        fails.append(f"{p}: no design system link")
    if "v=7" not in html:
        fails.append(f"{p}: no cache-bust version")

print(f"Gates run on {len(PRODUCTS)} products")
if fails:
    print(f"FAIL ({len(fails)}):")
    for f in fails:
        print(" -", f)
    sys.exit(1)
print("ALL GATES PASS")
