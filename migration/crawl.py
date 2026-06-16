#!/usr/bin/env python3
"""Crawl the live WordPress site and extract SEO-relevant data per URL.

Outputs:
  migration/inventory/pages.json  - full structured data per URL
  migration/inventory/inventory.csv - flat summary for the migration map
Also saves each page's raw HTML to migration/raw_html/<slug>.html
"""
import csv
import json
import os
import re
import time
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.abspath(__file__))
URLS_TSV = os.path.join(ROOT, "inventory", "urls.tsv")
RAW_DIR = os.path.join(ROOT, "raw_html")
os.makedirs(RAW_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; HTP-migration-crawler/1.0; site owner authorized)"
}


def slug_for(url):
    path = urlparse(url).path.strip("/")
    if not path:
        return "home"
    return re.sub(r"[^a-z0-9]+", "-", path.lower()).strip("-")[:120]


def text_or_none(el):
    return el.get_text(strip=True) if el else None


def crawl(url):
    r = requests.get(url, headers=HEADERS, timeout=30, allow_redirects=True)
    final_url = r.url
    status = r.status_code
    html = r.text
    soup = BeautifulSoup(html, "lxml")

    # Save raw HTML
    with open(os.path.join(RAW_DIR, slug_for(url) + ".html"), "w", encoding="utf-8") as f:
        f.write(html)

    def meta(name=None, prop=None):
        if name:
            el = soup.find("meta", attrs={"name": name})
        else:
            el = soup.find("meta", attrs={"property": prop})
        return el.get("content") if el and el.get("content") else None

    canonical_el = soup.find("link", attrs={"rel": "canonical"})
    canonical = canonical_el.get("href") if canonical_el else None

    h1s = [h.get_text(strip=True) for h in soup.find_all("h1")]
    h2s = [h.get_text(strip=True) for h in soup.find_all("h2")]

    # JSON-LD schema types
    schema_types = []
    for s in soup.find_all("script", attrs={"type": "application/ld+json"}):
        try:
            data = json.loads(s.string or "{}")
        except Exception:
            continue
        items = data.get("@graph", [data]) if isinstance(data, dict) else data
        if isinstance(items, dict):
            items = [items]
        for it in items if isinstance(items, list) else []:
            if isinstance(it, dict):
                t = it.get("@type")
                if isinstance(t, list):
                    schema_types.extend(t)
                elif t:
                    schema_types.append(t)

    # internal links
    internal_links = set()
    images = set()
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if "hometownpaintingokc.com" in href or href.startswith("/"):
            internal_links.add(href.split("#")[0])
    for img in soup.find_all("img"):
        src = img.get("src") or img.get("data-src")
        if src:
            images.add(src)

    # word count of main content (rough)
    body_text = soup.get_text(" ", strip=True)
    word_count = len(body_text.split())

    robots_meta = meta(name="robots")

    return {
        "url": url,
        "final_url": final_url,
        "status": status,
        "redirected": url.rstrip("/") != final_url.rstrip("/"),
        "title": text_or_none(soup.title),
        "meta_description": meta(name="description"),
        "robots": robots_meta,
        "canonical": canonical,
        "og_title": meta(prop="og:title"),
        "og_description": meta(prop="og:description"),
        "og_image": meta(prop="og:image"),
        "og_type": meta(prop="og:type"),
        "h1": h1s,
        "h2": h2s,
        "schema_types": sorted(set(schema_types)),
        "word_count": word_count,
        "image_count": len(images),
        "internal_link_count": len(internal_links),
        "images": sorted(images),
        "internal_links": sorted(internal_links),
    }


def main():
    rows = []
    with open(URLS_TSV) as f:
        entries = [line.strip().split("\t") for line in f if line.strip()]

    results = []
    for url, kind in entries:
        try:
            data = crawl(url)
            data["kind"] = kind
            print(f"[{data['status']}] {kind:5} {url}  ({data['word_count']}w, schema={data['schema_types']})")
        except Exception as e:
            data = {"url": url, "kind": kind, "status": "ERROR", "error": str(e)}
            print(f"[ERR] {url}: {e}")
        results.append(data)
        time.sleep(0.4)

    with open(os.path.join(ROOT, "inventory", "pages.json"), "w") as f:
        json.dump(results, f, indent=2)

    # Flat CSV
    fields = ["kind", "url", "status", "redirected", "final_url", "title",
              "meta_description", "robots", "canonical", "word_count",
              "image_count", "internal_link_count", "h1_first", "schema_types"]
    with open(os.path.join(ROOT, "inventory", "inventory.csv"), "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        for d in results:
            w.writerow({
                "kind": d.get("kind"),
                "url": d.get("url"),
                "status": d.get("status"),
                "redirected": d.get("redirected"),
                "final_url": d.get("final_url"),
                "title": d.get("title"),
                "meta_description": d.get("meta_description"),
                "robots": d.get("robots"),
                "canonical": d.get("canonical"),
                "word_count": d.get("word_count"),
                "image_count": d.get("image_count"),
                "internal_link_count": d.get("internal_link_count"),
                "h1_first": (d.get("h1") or [None])[0] if d.get("h1") else None,
                "schema_types": ";".join(d.get("schema_types", []) or []),
            })
    print(f"\nDone. {len(results)} URLs crawled.")


if __name__ == "__main__":
    main()
