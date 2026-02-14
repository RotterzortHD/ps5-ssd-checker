// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://konsolen-ssd-check.de',
  
  // FÜGE DIESE ZEILE HINZU:
  trailingSlash: 'always', 
  
  integrations: [tailwind(), sitemap()],
});