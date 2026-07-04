import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/case-studies' }),
  schema: z.object({
    slug: z.string(),
    order: z.number(),
    title: z.record(z.string()),
    sector: z.record(z.string()),
    year: z.string(),
    url: z.string().url(),
    problem: z.record(z.string()),
    built: z.record(z.string()),
    result: z.record(z.string()),
  }),
});

export const collections = { caseStudies };
