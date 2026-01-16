// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // WICHTIG: Ersetze das hier durch deine echte URL von Netlify!
  // (Ohne Slash am Ende, z.B. 'https://tourmaline-beijinho.netlify.app')
  site: 'https://DEINE-NETLIFY-URL.netlify.app', 
  
  integrations: [tailwind(), sitemap()],
});