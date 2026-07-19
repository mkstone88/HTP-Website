import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeCfImages from './src/lib/rehype-cf-images.mjs';

// Production hostname — used for canonical URLs and sitemap generation.
export const SITE = 'https://hometownpaintingokc.com';

// Pages excluded from the sitemap. Keep in sync with `noindex: true`
// frontmatter in src/content/pages/ (PPC landing pages + thank-you).
const NOINDEX_PATHS = [
  '/painters/',
  '/interior-painting/',
  '/exterior-painting/',
  '/thank-you/',
];

export default defineConfig({
  site: SITE,
  // WordPress serves trailing-slash URLs; match exactly to preserve SEO.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !NOINDEX_PATHS.some((p) => page === `${SITE}${p}`),
    }),
  ],
  // Lazy-load + (once the CDN is on) responsive AVIF/WebP for markdown images.
  markdown: { rehypePlugins: [rehypeCfImages] },
});
