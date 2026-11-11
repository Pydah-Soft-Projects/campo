import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { generateSitemap } from './scripts/generate-sitemap.mjs';

function sitemapPlugin() {
  return {
    name: 'vite-plugin-sitemap',
    buildStart() {
      generateSitemap();
    },
  };
}

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  server: {
    port: 5173,
    open: true,
  },
});

