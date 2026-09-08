// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pocketcurio.app',
  // Serve and link every page at its trailing-slash URL so there is exactly one
  // indexable URL per page (no redirect hops between /faq and /faq/).
  trailingSlash: 'always',
  integrations: [sitemap()],
});
