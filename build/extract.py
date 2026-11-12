#!/usr/bin/env python3
"""Extract per-page text from every materials/**/*.pdf (poppler's pdftotext; stdlib only otherwise).

Writes:
  knowledge/chunks.jsonl         one line per page: {"src", "group", "page", "text", "image", "words"}
  knowledge/corpus.md            all sources, page by page, headed "## [<src> h<page>]"
  knowledge/SOURCES.md           table of sources: group, pages, words, scanned? (scanned = read the page images)
  app/public/pages/index.json    {src: pageCount} for the lightbox
Run from the repo root: python3 build/extract.py
"""
import json
import pathlib
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
MAT = ROOT / "materials"
KNOW = ROOT / "knowledge"
PAGES = ROOT / "app" / "public" / "pages"


def page_count(pdf):
    out = subprocess.run(["pdfinfo", str(pdf)], capture_output=True, text=True, check=True).stdout
    return int(next(line.split()[-1] for line in out.splitlines() if line.startswith("Pages:")))


def page_text(pdf, n):
    return subprocess.run(["pdftotext", "-layout", "-f", str(n), "-l", str(n), str(pdf), "-"], capture_output=True, text=True).stdout


def main():
    KNOW.mkdir(exist_ok=True)
    chunks, corpus, rows, counts = [], ["# WI1102 source corpus (page by page)\n"], [], {}
    for pdf in sorted(MAT.glob("*/*.pdf")):
        src, group = pdf.stem, pdf.parent.name
        n = page_count(pdf)
        counts[src] = n
        words = 0
        corpus.append(f"\n# SOURCE {src} ({group}, {n} pages)\n")
        for p in range(1, n + 1):
            text = page_text(pdf, p).rstrip()
            w = len(text.split())
            words += w
            img = f"app/public/pages/{src}/{p:03d}.jpg"
            chunks.append({"src": src, "group": group, "page": p, "text": text, "image": img, "words": w})
            corpus.append(f"\n## [{src} h{p}]\n")
            corpus.append(text if w >= 15 else (text + "\n\n> (little or no text layer: read the page image " + img + ")"))
        scanned = words < 30 * n
        rows.append(f"| {group} | `{src}` | {n} | {words} | {'**scanned: read images**' if scanned else ''} |")
    (KNOW / "chunks.jsonl").write_text("".join(json.dumps(c, ensure_ascii=False) + "\n" for c in chunks))
    (KNOW / "corpus.md").write_text("\n".join(corpus) + "\n")
    (KNOW / "SOURCES.md").write_text(
        "# Sources\n\nPage images: `app/public/pages/<src>/NNN.jpg` (1-based, 3 digits). Text: `knowledge/corpus.md`.\n\n"
        "| group | src | pages | words | note |\n|---|---|---|---|---|\n" + "\n".join(rows) + "\n"
    )
    PAGES.mkdir(parents=True, exist_ok=True)
    (PAGES / "index.json").write_text(json.dumps(counts, indent=0))
    print(f"{len(counts)} sources, {len(chunks)} pages")


if __name__ == "__main__":
    main()
