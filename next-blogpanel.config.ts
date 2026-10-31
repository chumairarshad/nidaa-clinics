import { defineConfig } from 'next-blogpanel';

export default defineConfig({
  basePath: '/blog',
  adminPath: '/admin/blog',
  apiPath: '/api/blog',
  auth: {
    strategy: 'api-key',
  },
  seo: {
    titleTemplate: '%s | NiDAA Clinic Blog',
    generateRSS: true,
    generateSitemap: true,
    structuredData: true,
  },
  features: {
    search: true,
    relatedPosts: true,
    readingProgress: true,
    tableOfContents: true,
    shareButtons: true,
    darkMode: true,
    scheduling: true,
    revisionHistory: true,
    imageOptimization: true,
  },
});
