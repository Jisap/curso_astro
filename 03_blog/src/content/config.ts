import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string().transform(str => new Date(str)),
    description: z.string(),
    image: z.string().url(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  'posts': postsCollection,
};