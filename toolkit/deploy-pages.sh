#!/usr/bin/env bash
# toolkit/deploy-pages.sh — deploy a static site dir to GitHub Pages via gh.
# Usage: ./deploy-pages.sh <project-dir> [repo-name]
# Requires: gh authenticated with repo scope. Creates public repo under the
# authenticated account, pushes main, enables Pages, waits for 200.
set -euo pipefail

DIR="${1:?usage: deploy-pages.sh <project-dir> [repo-name]}"
REPO="${2:-$(basename "$DIR")}"
OWNER="$(gh api user --jq .login)"

cd "$DIR"
[ -d .git ] || { git init -q -b main; git config user.name "$OWNER"; git config user.email "$OWNER@users.noreply.github.com"; }
git add -A
git commit -q -m "deploy $(date -u +%FT%TZ)" || true

if ! gh repo view "$OWNER/$REPO" >/dev/null 2>&1; then
  gh repo create "$REPO" --public --source=. --push
else
  git push -q -u "https://github.com/$OWNER/$REPO.git" main 2>/dev/null || git remote add origin "https://github.com/$OWNER/$REPO.git" && git push -q -u origin main
fi

# enable Pages (idempotent)
gh api -X POST "repos/$OWNER/$REPO/pages" -f "source[branch]=main" -f "source[path]=/" >/dev/null 2>&1 \
  || gh api -X PUT "repos/$OWNER/$REPO/pages" -f "source[branch]=main" -f "source[path]=/" >/dev/null 2>&1 || true

URL="https://${OWNER,,}.github.io/$REPO/"
echo "deploying: $URL"
for i in $(seq 1 12); do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
  [ "$code" = "200" ] && { echo "LIVE: $URL"; exit 0; }
  sleep 15
done
echo "TIMEOUT waiting for $URL (check Actions/Pages tab)" >&2
exit 1
