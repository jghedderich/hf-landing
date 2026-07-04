import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server',
  compressHTML: true,
  adapter: cloudflare({
    imageService: 'compile',
  }),
  integrations: [tailwind({ applyBaseStyles: false })],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      redirectToDefaultLocale: true,
    },
  },
  image: {
    layout: 'constrained',
  },
});
