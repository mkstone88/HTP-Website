#!/usr/bin/env python3
"""Localize all WordPress images into the Astro site.

Approach (per Matt, 2026-06-16): download the ORIGINALS (strip WP's -WxH size
suffix to get the full upload), then optimize ourselves:
  - content body images -> WebP, max 1600px wide, q80
  - OG share images      -> JPG,  max 1200px wide, q82 (broad social support)
Output mirrors the WP path under site/public/uploads/<year>/<month>/...
Then rewrite every markdown reference (body images + ogImage) to the local path.

Re-runnable and idempotent: skips downloads/encodes that already exist.
"""
import glob, hashlib, io, os, re, sys
from urllib.parse import urlparse
import requests
from PIL import Image

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.abspath(os.path.join(ROOT, "..", "site"))
CONTENT = os.path.join(SITE, "src", "content")
UPLOADS = os.path.join(SITE, "public", "uploads")
ORIG_CACHE = os.path.join(ROOT, "image_cache")  # raw originals (gitignored)
os.makedirs(UPLOADS, exist_ok=True)
os.makedirs(ORIG_CACHE, exist_ok=True)

HEADERS = {"User-Agent": "HTP-image-localizer/1.0 (site owner authorized)"}
DOMAIN = "hometownpaintingokc.com"
CONTENT_MAX_W = 1600
OG_MAX_W = 1200

# Match markdown images:  ![alt](URL)  or  ![alt](URL "title")
IMG_RE = re.compile(r'(!\[[^\]]*\]\()\s*(https?://[^)\s]+)(\s+"[^"]*")?\s*(\))')
OG_RE = re.compile(r'^(ogImage:\s*")([^"]+)(")', re.M)


def strip_size(path):
    """Remove WP -WxH suffix to get the original upload path."""
    return re.sub(r'-\d+x\d+(?=\.\w+$)', '', path)


def local_paths(url):
    """Return (rel_webp, rel_jpg) public paths for a source URL's original."""
    path = strip_size(urlparse(url).path)              # /wp-content/uploads/2025/02/foo.jpg
    rel = re.sub(r'^/wp-content/uploads/', '', path)   # 2025/02/foo.jpg
    stem, _ = os.path.splitext(rel)
    return stem + ".webp", stem + ".jpg"


def original_url(url):
    p = urlparse(url)
    return f"{p.scheme}://{p.netloc}{strip_size(p.path)}"


_session = requests.Session()
_session.headers.update(HEADERS)


def download_original(url):
    """Download the original (suffix-stripped); fall back to the referenced URL."""
    cache_key = hashlib.md5(original_url(url).encode()).hexdigest() + os.path.splitext(urlparse(url).path)[1]
    cache_file = os.path.join(ORIG_CACHE, cache_key)
    if os.path.exists(cache_file):
        return open(cache_file, "rb").read()
    for candidate in (original_url(url), url):
        try:
            r = _session.get(candidate, timeout=60)
            if r.status_code == 200 and r.content:
                open(cache_file, "wb").write(r.content)
                return r.content
        except Exception as e:
            print("   download err:", candidate, e)
    return None


def encode(data, out_path, fmt, max_w, quality):
    if os.path.exists(out_path):
        return True
    try:
        im = Image.open(io.BytesIO(data))
    except Exception as e:
        print("   decode err:", out_path, e)
        return False
    if im.mode in ("P", "LA"):
        im = im.convert("RGBA")
    if fmt == "JPEG" and im.mode in ("RGBA", "P"):
        bg = Image.new("RGB", im.size, (255, 255, 255))
        bg.paste(im, mask=im.split()[-1] if im.mode == "RGBA" else None)
        im = bg
    elif fmt == "WEBP" and im.mode == "P":
        im = im.convert("RGBA")
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    save_kwargs = {"quality": quality, "method": 6} if fmt == "WEBP" else {"quality": quality, "optimize": True, "progressive": True}
    im.save(out_path, fmt, **save_kwargs)
    return True


def collect_refs():
    body_urls, og_urls = set(), set()
    for f in glob.glob(os.path.join(CONTENT, "**", "*.md"), recursive=True):
        t = open(f, encoding="utf-8").read()
        for m in IMG_RE.finditer(t):
            if DOMAIN in m.group(2):
                body_urls.add(m.group(2))
        for m in OG_RE.finditer(t):
            if DOMAIN in m.group(2):
                og_urls.add(m.group(2))
    return body_urls, og_urls


def main():
    body_urls, og_urls = collect_refs()
    all_urls = body_urls | og_urls
    print(f"{len(all_urls)} unique image URLs ({len(body_urls)} body, {len(og_urls)} og)")

    ok = fail = 0
    for i, url in enumerate(sorted(all_urls), 1):
        data = download_original(url)
        if not data:
            fail += 1
            print(f"[{i}] FAIL {url}")
            continue
        rel_webp, rel_jpg = local_paths(url)
        # Always make webp (body); make jpg too if used as an og image.
        encode(data, os.path.join(UPLOADS, rel_webp), "WEBP", CONTENT_MAX_W, 80)
        if url in og_urls:
            encode(data, os.path.join(UPLOADS, rel_jpg), "JPEG", OG_MAX_W, 82)
        ok += 1
        if i % 25 == 0:
            print(f"  ...{i}/{len(all_urls)}")
    print(f"Downloaded/encoded: {ok} ok, {fail} failed")

    # Rewrite markdown references.
    rewrites = 0
    for f in glob.glob(os.path.join(CONTENT, "**", "*.md"), recursive=True):
        t = open(f, encoding="utf-8").read()
        orig = t

        def repl_body(m):
            url = m.group(2)
            if DOMAIN not in url:
                return m.group(0)
            rel_webp, _ = local_paths(url)
            return f"{m.group(1)}/uploads/{rel_webp}{m.group(3) or ''}{m.group(4)}"

        def repl_og(m):
            url = m.group(2)
            if DOMAIN not in url:
                return m.group(0)
            _, rel_jpg = local_paths(url)
            return f"{m.group(1)}/uploads/{rel_jpg}{m.group(3)}"

        t = IMG_RE.sub(repl_body, t)
        t = OG_RE.sub(repl_og, t)
        if t != orig:
            open(f, "w", encoding="utf-8").write(t)
            rewrites += 1
    print(f"Rewrote {rewrites} markdown files")


if __name__ == "__main__":
    main()
