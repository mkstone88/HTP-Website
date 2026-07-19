// Rehype plugin: upgrade every markdown <img> that points at a local /uploads
// path. Always adds lazy loading + async decoding (a free win). Once the
// Cloudflare CDN is enabled (see src/data/images.mjs) it also adds a responsive
// AVIF/WebP srcset and points src at a right-sized transform.
//
// Markdown images arrive two ways: as parsed element nodes (![alt](src)), and
// as `raw` nodes when authors embed literal <img> HTML (grids, figures). Astro
// passes raw HTML through without parsing it into the tree, so those are
// upgraded with a string rewrite here — otherwise they ship full-size, eager,
// and without a srcset.
import { cfSrc, cfSrcset } from '../data/images.mjs';

const SIZES = '(max-width: 820px) 100vw, 800px';

function isLocalUpload(src) {
  return typeof src === 'string' && src.startsWith('/uploads/');
}

// Upgrade a single raw `<img ...>` tag string. Conservative: only touches
// tags whose src is a local upload, never overwrites existing attributes.
function upgradeRawImgTag(tag) {
  const srcMatch = tag.match(/\bsrc="([^"]+)"/);
  if (!srcMatch || !isLocalUpload(srcMatch[1])) return tag;
  const src = srcMatch[1];

  let out = tag;
  const addAttr = (attr) => {
    out = out.replace(/\/?>$/, (end) => ` ${attr}${end === '/>' ? ' /' : ''}>`);
  };

  if (!/\bloading=/.test(out)) addAttr('loading="lazy"');
  if (!/\bdecoding=/.test(out)) addAttr('decoding="async"');

  const srcset = cfSrcset(src);
  if (srcset && !/\bsrcset=/.test(out)) {
    addAttr(`srcset="${srcset}" sizes="${SIZES}"`);
    out = out.replace(srcMatch[0], `src="${cfSrc(src, 960)}"`);
  }
  return out;
}

export default function rehypeCfImages() {
  return (tree) => {
    const walk = (node) => {
      if (node.type === 'element' && node.tagName === 'img' && node.properties) {
        const src = node.properties.src;
        if (isLocalUpload(src)) {
          if (node.properties.loading == null) node.properties.loading = 'lazy';
          if (node.properties.decoding == null) node.properties.decoding = 'async';
          const srcset = cfSrcset(src);
          if (srcset && !node.properties.srcset) {
            node.properties.srcset = srcset;
            node.properties.sizes = SIZES;
            node.properties.src = cfSrc(src, 960);
          }
        }
      }
      if (node.type === 'raw' && typeof node.value === 'string' && node.value.includes('<img')) {
        node.value = node.value.replace(/<img\b[^>]*\/?>/g, upgradeRawImgTag);
      }
      if (node.children) for (const child of node.children) walk(child);
    };
    walk(tree);
  };
}
