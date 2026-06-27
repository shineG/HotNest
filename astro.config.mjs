// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.hotnest.net',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
