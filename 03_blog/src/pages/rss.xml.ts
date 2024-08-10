
import rss from '@astrojs/rss';


import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async({ params, request, site }) => {

  const blogPosts = await getCollection('blog');

  return rss({

    //stylesheet: '/styles/rss.xsl',

    title: 'Jisap’s Blog',

    description: 'Blog de aprendizaje con Astro',
  
    site: site!,
   
    items: blogPosts.map(({ data, slug }) => ({
      title: data.title,
      pubDate: data.date,
      description: data.description,
      link: `posts/${slug}`,
    })),

    customData: `<language>es-es</language>`,
  });
}