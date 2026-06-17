#!/usr/bin/env python3
"""Extract WordPress page/post content from saved raw HTML into Astro markdown
content collections.

- Reads migration/inventory/pages.json (URL list + metadata) and the saved
  raw_html/<slug>.html files.
- Pulls the `.entry-content` body, strips GHL forms / scripts / empty chrome,
  converts to Markdown (keeping absolute wp-content image URLs for now).
- Writes:
    site/src/content/pages/<slug>.md   (the 37 pages, minus consolidated dupes)
    site/src/content/blog/<slug>.md     (the 27 posts)
  Each with frontmatter: title, description, permalink, h1, kind, draft, etc.
"""
import json, os, re
from datetime import datetime
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from markdownify import markdownify as md

ROOT = os.path.dirname(os.path.abspath(__file__))
PAGES_JSON = os.path.join(ROOT, "inventory", "pages.json")
RAW = os.path.join(ROOT, "raw_html")
SITE = os.path.abspath(os.path.join(ROOT, "..", "site"))
OUT_PAGES = os.path.join(SITE, "src", "content", "pages")
OUT_BLOG = os.path.join(SITE, "src", "content", "blog")
os.makedirs(OUT_PAGES, exist_ok=True)
os.makedirs(OUT_BLOG, exist_ok=True)

# Deck consolidation: keep the richer nested page as /deck-staining-okc/,
# drop the shorter duplicate (both old URLs 301 -> /deck-staining-okc/ via _redirects).
DECK_KEEP = "/exterior-painting/deck-staining-okc-professional-deck-staining-services-in-oklahoma-city/professional-deck-staining-okc-hometown-painting-oklahoma-city/"
DECK_DROP = "/exterior-painting/deck-staining-okc-professional-deck-staining-services-in-oklahoma-city/"
DECK_NEW = "/deck-staining-okc/"

# Known GHL form ids per page (from the crawl) so templates can render the iframe.
FORM_IDS = {
    "/contact-us/": "6JivItrSTCuiaeSyXWz8",
    "/painting-estimate/": "Gi6MfAF8VO97YgxZIwzu",
}
DEFAULT_FORM = "YVYhjNMJFKBjYA1uMNkm"  # "Website Form - Homepage" (global)


def slug_for(path):
    p = path.strip("/")
    if not p:
        return "home"
    return p.replace("/", "--")  # encode nesting so files stay flat


def clean_content(html, drop_h1=None):
    soup = BeautifulSoup(html, "lxml")
    content = soup.select_one(".entry-content") or soup.select_one("article") or soup.body
    if content is None:
        return ""
    # Drop non-content nodes
    for sel in ["script", "style", "noscript", "iframe", "form", ".sharedaddy",
                ".wp-block-buttons", ".elementor-button-wrapper"]:
        for el in content.select(sel):
            el.decompose()
    # Remove GHL/booking embed wrappers left behind
    for el in content.find_all(attrs={"data-form-id": True}):
        el.decompose()
    # Un-lazy images: WordPress swaps real src for an SVG placeholder and stows
    # the real URL in data-lazy-src / data-src. Restore it.
    for img in content.find_all("img"):
        real = img.get("data-lazy-src") or img.get("data-src") or img.get("data-orig-src")
        if real and not real.startswith("data:"):
            img["src"] = real
        # srcset placeholders cause huge noise in markdown — drop them
        for attr in ["srcset", "data-lazy-srcset", "data-srcset", "sizes"]:
            if img.has_attr(attr):
                del img[attr]
    body = md(str(content), heading_style="ATX", bullets="-").strip()
    # Collapse 3+ newlines, trim trailing whitespace per line
    body = re.sub(r"\n{3,}", "\n\n", body)
    body = "\n".join(line.rstrip() for line in body.splitlines())
    body = body.strip()
    # Strip the first H1 (the template renders the page hero H1 itself).
    lines = body.splitlines()
    for i, line in enumerate(lines):
        if re.match(r"^#\s+\S", line):
            del lines[i]
            break
    body = "\n".join(lines).strip()
    body = re.sub(r"\n{3,}", "\n\n", body)
    return body.strip()


def yaml_escape(s):
    if s is None:
        return '""'
    s = str(s).replace("\\", "\\\\").replace('"', '\\"')
    return f'"{s}"'


def write_md(out_dir, slug, fm, body):
    lines = ["---"]
    for k, v in fm.items():
        if isinstance(v, bool):
            lines.append(f"{k}: {'true' if v else 'false'}")
        elif v is None:
            continue
        else:
            lines.append(f"{k}: {yaml_escape(v)}")
    lines.append("---")
    lines.append("")
    lines.append(body)
    lines.append("")
    with open(os.path.join(out_dir, slug + ".md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


def load_lastmod():
    """Map URL path -> lastmod date (YYYY-MM-DD) from the post sitemap."""
    out = {}
    sm = os.path.join(ROOT, "sitemaps", "post-sitemap.xml")
    if not os.path.exists(sm):
        return out
    soup = BeautifulSoup(open(sm, encoding="utf-8").read(), "xml")
    for url in soup.find_all("url"):
        loc = url.find("loc")
        mod = url.find("lastmod")
        if loc:
            out[urlparse(loc.text).path] = (mod.text[:10] if mod else None)
    return out


def main():
    data = json.load(open(PAGES_JSON))
    lastmod = load_lastmod()
    n_pages = n_posts = 0
    for d in data:
        path = urlparse(d["url"]).path
        if path == "/":
            continue  # home is a custom Astro page
        if path == DECK_DROP:
            continue  # dropped duplicate
        is_post = d["kind"] == "post"
        raw_slug = slug_for(path)
        html_file = os.path.join(RAW, re.sub(r"[^a-z0-9]+", "-",
                     path.strip("/").lower()).strip("-")[:120] + ".html")
        if not os.path.exists(html_file):
            print("  MISSING html:", html_file)
            continue
        body = clean_content(open(html_file, encoding="utf-8").read())

        permalink = DECK_NEW if path == DECK_KEEP else path
        slug = "deck-staining-okc" if path == DECK_KEEP else raw_slug

        fm = {
            "title": d.get("title"),
            "description": d.get("meta_description"),
            "permalink": permalink,
            "h1": (d.get("h1") or [None])[0],
            "ogImage": d.get("og_image"),
            "draft": False,
        }
        if is_post:
            fm["kind"] = "post"
            fm["date"] = lastmod.get(path) or "2024-01-01"
            write_md(OUT_BLOG, slug, fm, body)
            n_posts += 1
        else:
            fm["formId"] = FORM_IDS.get(permalink)
            write_md(OUT_PAGES, slug, fm, body)
            n_pages += 1
    print(f"Wrote {n_pages} pages + {n_posts} posts")


if __name__ == "__main__":
    main()
