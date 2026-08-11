import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Equipo QHPA'),
    /** Cómo se escribió el artículo: persona real o generado/asistido por IA. */
    origin: z.enum(['human', 'ai']).default('human'),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    popular: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
