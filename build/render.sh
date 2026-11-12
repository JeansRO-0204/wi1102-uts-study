#!/usr/bin/env bash
# Render every materials/**/*.pdf page to app/public/pages/<SRC>/NNN.jpg (SRC = file stem). Needs poppler (pdftoppm).
set -euo pipefail
cd "$(dirname "$0")/.."
for f in materials/*/*.pdf; do
  id=$(basename "$f" .pdf); out="app/public/pages/$id"; mkdir -p "$out"
  [ -n "$(ls -A "$out" 2>/dev/null)" ] && [ "${FORCE:-0}" != 1 ] && continue
  pdftoppm -jpeg -jpegopt quality=72 -scale-to 1400 "$f" "$out/p"
  # p-01.jpg / p-001.jpg -> 001.jpg
  for img in "$out"/p-*.jpg; do n=$(basename "$img" .jpg); n=${n#p-}; mv "$img" "$out/$(printf %03d $((10#$n))).jpg"; done
  echo "$id: $(ls "$out" | wc -l | tr -d ' ') pages"
done
