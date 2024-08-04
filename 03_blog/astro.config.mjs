import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: true
  }), mdx()],
  // content: {
  //   collections: {
  //     posts: {
  //       path: './src/pages/posts',  // Define la ruta a la carpeta de posts
  //     },
  //   }
  // }
});