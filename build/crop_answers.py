#!/usr/bin/env python3
"""Crop answer sections off source pages used as question figures (e.g. Bebras-style pages that print
'Jawaban : … / Pembahasan' under the task). Cuts each page just above its first answer marker.
Usage: python build/crop_answers.py <src> <out_dir> <page> [<page> ...]   (needs Pillow + poppler)
"""
import pathlib
import re
import subprocess
import sys

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
MARKERS = ("Jawaban", "Pembahasan", "Kunci")


def cut_ratio(pdf, page):
    xml = subprocess.run(["pdftotext", "-f", str(page), "-l", str(page), "-bbox", str(pdf), "-"], capture_output=True, text=True).stdout
    h = float(re.search(r'<page width="[\d.]+" height="([\d.]+)"', xml).group(1))
    ys = [float(m.group(1)) for m in re.finditer(r'<word xMin="[\d.]+" yMin="([\d.]+)"[^>]*>([^<]+)</word>', xml) if m.group(2).strip(" :") in MARKERS]
    return (min(ys) / h) if ys else None


def main():
    src, out = sys.argv[1], ROOT / sys.argv[2]
    pdf = next(ROOT.glob(f"materials/*/{src}.pdf"))
    out.mkdir(parents=True, exist_ok=True)
    for page in map(int, sys.argv[3:]):
        im = Image.open(ROOT / f"app/public/pages/{src}/{page:03d}.jpg")
        r = cut_ratio(pdf, page)
        if r is not None:
            im = im.crop((0, 0, im.width, max(1, int(im.height * r) - 8)))
        frac = im.height / Image.open(ROOT / f"app/public/pages/{src}/{page:03d}.jpg").height
        if frac < 0.12:
            print(f"h{page}: answer starts at the top ({frac:.0%}), no figure kept")
            continue
        im.save(out / f"h{page:02d}.jpg", quality=78)
        print(f"h{page}: kept top {frac:.0%}" + (" (no marker)" if r is None else ""))


if __name__ == "__main__":
    main()
