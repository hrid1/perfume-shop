import type { MetadataRoute } from 'next';
import { config } from '@/config/app';
import { JOURNAL_POSTS } from '@/data/journalPosts';
import { PRODUCTS } from '@/data/mockData';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: config.siteUrl, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${config.siteUrl}/catalog`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${config.siteUrl}/journal`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const productPages: MetadataRoute.Sitemap = PRODUCTS.filter(
    (product) => product.status === 'active',
  ).map((product) => ({
    url: `${config.siteUrl}/perfume/${product.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const journalPages: MetadataRoute.Sitemap = JOURNAL_POSTS.map((post) => ({
    url: `${config.siteUrl}/journal/${post.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...journalPages];
}
