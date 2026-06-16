import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production hostname — used for canonical URLs and sitemap generation.
export const SITE = 'https://hometownpaintingokc.com';

export default defineConfig({
  site: SITE,
  // WordPress serves trailing-slash URLs; match exactly to preserve SEO.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
