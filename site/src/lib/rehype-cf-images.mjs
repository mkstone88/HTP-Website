// Rehype plugin: upgrade every markdown <img> that points at a local /uploads
// path. Always adds lazy loading + async decoding (a free win). Once the
// Cloudflare CDN is enabled (see src/data/images.mjs) it also adds a responsive
// AVIF/WebP srcset and points src at a right-sized transform.
import { cfSrc, cfSrcset } from '../data/images.mjs';

const SIZES = '(max-width: 820px) 100vw, 800px';

function isLocalUpload(src) {
  return typeof src === 'string' && src.startsWith('/uploads/');
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
      if (node.children) for (const child of node.children) walk(child);
    };
    walk(tree);
  };
}
