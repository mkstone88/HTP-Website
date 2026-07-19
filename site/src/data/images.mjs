// Central image pipeline config.
//
// We serve images through Cloudflare's on-the-fly image transformations
// (/cdn-cgi/image/...), which resize to the exact display size, convert to
// AVIF/WebP based on the visitor's browser, and cache the result at the edge.
//
// SAFETY: this stays OFF until Cloudflare Transformations is actually enabled on
// the zone. While OFF, images are served exactly as before (no breakage). Turn
// it on in ONE of two ways once Transformations is live:
//   1. Flip IMG_CDN_DEFAULT below to true and redeploy, OR
//   2. Set the env var PUBLIC_IMG_CDN=cloudflare on the build.
const IMG_CDN_DEFAULT = true; // Cloudflare Transformations enabled 2026-07 (verified on test.hometownpaintingokc.com)

export const IMG_CDN =
  process.env.PUBLIC_IMG_CDN === 'cloudflare' ||
  (process.env.PUBLIC_IMG_CDN !== 'off' && IMG_CDN_DEFAULT);

// Responsive width steps generated for srcset.
export const IMG_WIDTHS = [400, 640, 960, 1280, 1600];
export const IMG_QUALITY = 78;

// Build a Cloudflare image-transformation URL for a same-origin path.
// When the CDN is off (or src isn't a local /uploads path), returns src unchanged.
export function cfSrc(src, width, quality = IMG_QUALITY) {
  if (!IMG_CDN || typeof src !== 'string' || !src.startsWith('/')) return src;
  return `/cdn-cgi/image/width=${width},quality=${quality},format=auto,fit=scale-down${src}`;
}

// A full srcset string across the standard widths (or undefined when CDN is off).
export function cfSrcset(src) {
  if (!IMG_CDN || typeof src !== 'string' || !src.startsWith('/')) return undefined;
  return IMG_WIDTHS.map((w) => `${cfSrc(src, w)} ${w}w`).join(', ');
}

// Background-image URL for heroes — a single larger transformed size.
export function cfBg(src, width = 1600) {
  return cfSrc(src, width);
}
