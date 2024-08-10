import { defineConfig, squooshImageService } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: true
  }), mdx()],
  image: {
    service: squooshImageService(),
  },
  site: 'https://example.com'
});