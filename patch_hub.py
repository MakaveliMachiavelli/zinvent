#!/usr/bin/env python3
import re

P = '/home/allenos/zinvent/projects/zinvent-hub/index.html'
src = open(P).read()

# 1. og tags
if 'og:image' not in src:
    og = (
        '<meta property="og:title" content="Zinvent \u2014 Free business tools">\n'
        '<meta property="og:description" content="16 free no-signup tools for PH freelancers & small business: invoicing, tax, payslips, pricing, route planning. 100% in-browser.">\n'
        '<meta property="og:type" content="website">\n'
        '<meta property="og:url" content="https://makavelimachiavelli.github.io/zinvent-hub/">\n'
        '<meta property="og:image" content="https://makavelimachiavelli.github.io/zinvent-hub/og-image.png">\n'
        '<meta name="twitter:card" content="summary_large_image">\n'
    )
    src = src.replace('<style>', og + '<style>', 1)

# 2. PumpRoute card before freelancerkitph
if 'pumproute' not in src:
    pump = (
        '    <a class="card" href="https://makavelimachiavelli.github.io/pumproute/">\n'
        '      <span class="tag t2">\U0001F30D Global</span>\n'
        '      <h2>PumpRoute \u2014 Water Delivery Route Optimizer</h2>\n'
        '      <p>Multi-stop, capacity-aware routes for water refilling stations. Driver assignment + printable manifests.</p>\n'
        '      <div class="pill">Free \u00b7 PRO $9.99 one-time</div>\n'
        '    </a>\n'
    )
    anchor = '    <a class="card" href="https://makavelimachiavelli.github.io/freelancerkitph/">'
    src = src.replace(anchor, pump + anchor, 1)

open(P, 'w').write(src)
print('ok:', 'pumproute' in src, 'og:image' in src)
