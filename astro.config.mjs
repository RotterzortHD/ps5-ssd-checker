// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap'; // Das hat der Befehl gerade hinzugefügt
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // FÜGE DIESE ZEILE HINZU (Deine echte Domain):
  site: 'https://konsolen-ssd-check.de',
  
  integrations: [tailwind(), sitemap()],
});