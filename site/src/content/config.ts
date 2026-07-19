import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    permalink: z.string(),
    h1: z.string().optional(),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
    // GHL form id to embed on this page (contact / estimate pages).
    formId: z.string().optional(),
    // Keep this page out of search engines (PPC landing pages, thank-you).
    // Must be mirrored in NOINDEX_PATHS in astro.config.mjs to drop it from the sitemap.
    noindex: z.boolean().default(false),
    // Emit aggregateRating schema — only for pages that visibly display reviews.
    showRating: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    permalink: z.string(),
    h1: z.string().optional(),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
    kind: z.literal('post').default('post'),
    date: z.coerce.date(),
  }),
});

export const collections = { pages, blog };
