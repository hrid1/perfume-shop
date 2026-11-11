import type { MetadataRoute } from 'next';
import { config } from '@/config/app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/account/', '/checkout/', '/wishlist/'],
    },
    sitemap: `${config.siteUrl}/sitemap.xml`,
  };
}
