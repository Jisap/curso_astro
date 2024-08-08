import { defineCollection, reference, z } from 'astro:content';

const blogCollection = defineCollection({ // Collection nos da el tipado y situa la collection en content/blog
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      image: image().refine((img) => img.width < 1200, {
        message: 'Image should be lower than 1200px',
      }),

      // Relación
      //author: z.string(),
      author: reference('author'),

      // Relación
      tags: z.array(z.string()),

      // Boolean
      isDraft: z.boolean().default(false),
    }),
});

const authorCollection = defineCollection({
  type: 'data',
  schema: ({image}) => 
    z.object({
      name: z.string(),
      avatar: image(),
      twitter: z.string(),
      linkedIn: z.string(),
      github: z.string(),
      bio: z.string(),
      subtitle: z.string(),
    })
})


export const collections = {
  blog: blogCollection,           // blog apunta al nombre del directorio que contiene los mdx (dentro de /content)
  author: authorCollection,
};