// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import netlify from '@astrojs/netlify';

import db from '@astrojs/db';

import auth from 'auth-astro';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), db(), auth(), react()],
  output: 'server',
  adapter: netlify(),
  vite: {
    define: {
      'import.meta.env.CLOUDINARY_CLOUD_NAME': JSON.stringify(process.env.CLOUDINARY_CLOUD_NAME),
      'import.meta.env.CLOUDINARY_API_KEY': JSON.stringify(process.env.CLOUDINARY_API_KEY),
      'import.meta.env.CLOUDINARY_API_SECRET': JSON.stringify(process.env.CLOUDINARY_API_SECRET),
    },
  }
})