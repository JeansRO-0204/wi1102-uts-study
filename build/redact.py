#!/usr/bin/env python3
"""Black out personal data (NIM / Nama / Kelas) on the scanned 2025 attempt's page images.

The scan is a real student's marked paper; only the questions, answers and marks are used (anonymised).
Boxes are in fractions of the page size (x0, y0, x1, y1); re-run after build/render.sh (FORCE=1).
Needs Pillow: python3 -m pip install pillow (or a venv).
"""
import pathlib
import sys

from PIL import Image, ImageDraw

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "app" / "public" / "pages" / "UTS2025_attempt_scan"
# header block "NIM: … Nama: … Kelas: …" sits top-right on every printed page
HEADER = (0.56, 0.035, 0.93, 0.101)
BOXES = {1: [HEADER], 2: [HEADER], 3: [HEADER], 5: [HEADER], 6: [HEADER], 7: [HEADER], 9: [HEADER]}


def main():
    for page, boxes in BOXES.items():
        p = SRC / f"{page:03d}.jpg"
        if not p.exists():
            sys.exit(f"missing {p}")
        im = Image.open(p).convert("RGB")
        w, h = im.size
        d = ImageDraw.Draw(im)
        for x0, y0, x1, y1 in boxes:
            d.rectangle([x0 * w, y0 * h, x1 * w, y1 * h], fill=(20, 20, 20))
        im.save(p, quality=80)
    print(f"redacted {len(BOXES)} pages")


if __name__ == "__main__":
    main()
