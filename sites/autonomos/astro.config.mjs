// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Variables: .env de esta carpeta en local, panel de Cloudflare Pages en producción.
try {
  process.loadEnvFile('.env');
} catch {
  // Sin .env local: se usan las variables del entorno (hosting o CI).
}
const env = process.env;

export default defineConfig({
  site: env.PUBLIC_SITE_URL || 'https://example.com',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap()],
  vite: {
    resolve: {
      alias: { '@site-config': fileURLToPath(new URL('./src/site.config.ts', import.meta.url)) },
    },
  },
});
