import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeCfImages from './src/lib/rehype-cf-images.mjs';

// Production hostname — used for canonical URLs and sitemap generation.
export const SITE = 'https://hometownpaintingokc.com';

export default defineConfig({
  site: SITE,
  // WordPress serves trailing-slash URLs; match exactly to preserve SEO.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
  // Lazy-load + (once the CDN is on) responsive AVIF/WebP for markdown images.
  markdown: { rehypePlugins: [rehypeCfImages] },
});
