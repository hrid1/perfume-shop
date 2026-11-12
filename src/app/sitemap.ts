import type { MetadataRoute } from 'next';
import { config } from '@/config/app';
import { JOURNAL_POSTS } from '@/data/journalPosts';
import { productsService } from '@/services';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: config.siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${config.siteUrl}/catalog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${config.siteUrl}/quiz`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${config.siteUrl}/journal`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const productPages: MetadataRoute.Sitemap = (await productsService.getActive()).map((product) => ({
    url: `${config.siteUrl}/perfume/${product.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const journalPages: MetadataRoute.Sitemap = JOURNAL_POSTS.map((post) => ({
    url: `${config.siteUrl}/journal/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...journalPages];
}
