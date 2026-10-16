import { PRODUCTS } from '@/data/mockData';
import { Product } from '@/types';

export const productsService = {
  async search(query: string): Promise<Product[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    
    return PRODUCTS.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchFamily = p.fragranceFamily.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchTopNotes = p.topNotes?.some((n) => n.toLowerCase().includes(q));
      const matchMiddleNotes = p.middleNotes?.some((n) => n.toLowerCase().includes(q));
      const matchBaseNotes = p.baseNotes?.some((n) => n.toLowerCase().includes(q));

      return (
        matchName ||
        matchBrand ||
        matchFamily ||
        matchCategory ||
        matchTopNotes ||
        matchMiddleNotes ||
        matchBaseNotes
      );
    });
  },

  async getAll(): Promise<Product[]> {
    return PRODUCTS;
  },

  async getBySlug(slug: string): Promise<Product | undefined> {
    return PRODUCTS.find((p) => p.slug === slug);
  },

  async getByCategory(category: string): Promise<Product[]> {
    return PRODUCTS.filter((p) => p.category === category);
  },
};
