import type { MetadataRoute } from 'next';
import { config } from '@/config/app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/account', '/login', '/checkout/', '/wishlist/', '/order-confirmed'],
    },
    sitemap: `${config.siteUrl}/sitemap.xml`,
  };
}
