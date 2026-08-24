#!/usr/bin/env python3
"""Restore working app UI below the new landing hero for every redesigned product.

Strategy per product:
1. Extract old <body> app markup from git (commit before redesign).
2. Wrap it as <section id="app" class="z-section"> ... </section>.
3. Insert before </main> (or before PRO section) in new index.html.
4. Hero CTA [data-action] gets a click handler: scroll to #app + remove hidden.
5. Keep old style.css link (app styles) — scoped so it doesn't fight design system.

NOTE: old CSS may conflict with z- classes; we load product style.css LAST but its
selectors are mostly product-specific classes (.app-grid, .panel), not z-*.
"""
import subprocess, re, os, sys

BASE = "/home/allenos/zinvent/projects"

# product -> pre-redesign commit that contains full app UI
PRE = {
    "invoiceph": "958443f",
    # filled after probing git log per repo
}

def get_pre_commit(repo):
    """Last commit whose message is NOT the redesign."""
    log = subprocess.run(
        ["git", "log", "--format=%H %s"], cwd=repo, capture_output=True, text=True
    ).stdout.strip().split("\n")
    for line in log:
        h, _, msg = line.partition(" ")
        if not msg.startswith("design:") and not msg.startswith("fix: integrate") \
           and not msg.startswith("feat: add payments") and not msg.startswith("feat: add privacy"):
            return h
    return None

def extract_old_body(old_html):
    m = re.search(r"<body[^>]*>(.*)</body>", old_html, re.S)
    if not m:
        return None
    body = m.group(1)
    # strip scripts and skip-link from old body
    body = re.sub(r"<script.*?</script>", "", body, flags=re.S)
    body = re.sub(r'<a href="#main"[^>]*>.*?</a>', "", body, flags=re.S)
    return body

def main():
    products = sys.argv[1:] or [
        "closer","invoiceph","taxcalcph","negosyosheet","tippoolcalc","payslipph",
        "sellerprice","rentsheet","moveinreport","pumproute","ratecalcph",
        "tradejournalph","utangplanph","commissionph","freelancerkitph"
    ]
    for p in products:
        repo = f"{BASE}/{p}"
        idx = f"{repo}/index.html"
        pre = get_pre_commit(repo)
        if not pre:
            print(f"{p}: NO pre-redesign commit found, SKIP"); continue
        old = subprocess.run(["git","show",f"{pre}:index.html"],cwd=repo,capture_output=True,text=True).stdout
        app_body = extract_old_body(old)
        if not app_body or 'id="' not in app_body:
            print(f"{p}: no interactive markup in {pre}, SKIP"); continue
        new_html = open(idx).read()
        if 'id="z-app"' in new_html:
            print(f"{p}: already restored"); continue
        # wrap app section, hidden until CTA click
        app_section = (
            '\n  <section id="z-app" class="z-section" hidden>\n'
            '    <div class="z-wrap" id="z-app-root">\n' + app_body + "\n    </div>\n  </section>\n"
        )
        # insert before closing </main>
        if "</main>" in new_html:
            new_html = new_html.replace("</main>", app_section + "</main>", 1)
        else:
            new_html = new_html.replace("</body>", app_section + "</body>", 1)
        # ensure old style.css still linked (it is) AND add reveal handler script
        cta_script = """
<script>
(function(){
  document.addEventListener('click', function(e){
    var btn = e.target.closest('[data-action]');
    if(!btn) return;
    var act = btn.getAttribute('data-action');
    if(act && act.indexOf('new-')===0 || act==='start'){
      var app = document.getElementById('z-app');
      if(app){ app.hidden = false; app.scrollIntoView({behavior:'smooth'}); }
    }
  });
})();
</script>
</body>"""
        new_html = new_html.replace("</body>", cta_script, 1)
        open(idx,"w").write(new_html)
        n_ids = len(re.findall(r'id="', app_body))
        print(f"{p}: RESTORED app section ({n_ids} ids) from {pre[:8]}")

if __name__ == "__main__":
    main()
