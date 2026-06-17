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
