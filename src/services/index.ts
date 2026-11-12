/**
 * Data-access layer. Every read of products, categories and coupons goes through here,
 * so connecting a real backend means changing only these implementations — not pages.
 *
 * Today they read in-memory mock data; later each method becomes a fetch/DB query.
 * Methods are async on purpose so callers already handle the network-shaped API.
 */
import { CATEGORIES, COUPONS, PRODUCTS } from '@/data/mockData';
import type { Category, Coupon, Product } from '@/types';
import { searchProducts } from '@/lib/search';

const isActive = (product: Product) => product.status === 'active';

export const productsService = {
  /** Every product, including drafts — for admin views. */
  async getAll(): Promise<Product[]> {
    return PRODUCTS;
  },

  /** Products visible on the storefront. */
  async getActive(): Promise<Product[]> {
    return PRODUCTS.filter(isActive);
  },

  async getBySlug(slug: string): Promise<Product | undefined> {
    return PRODUCTS.find((p) => p.slug === slug && isActive(p));
  },

  async getByCategory(category: string): Promise<Product[]> {
    return PRODUCTS.filter((p) => p.category === category && isActive(p));
  },

  async getBestSellers(limit = 4): Promise<Product[]> {
    return PRODUCTS.filter((p) => p.bestSeller && isActive(p)).slice(0, limit);
  },

  async getTrending(limit = 4): Promise<Product[]> {
    return PRODUCTS.filter((p) => p.trending && isActive(p)).slice(0, limit);
  },

  async search(query: string): Promise<Product[]> {
    return searchProducts(PRODUCTS.filter(isActive), query);
  },
};

export const categoriesService = {
  async getAll(): Promise<Category[]> {
    return CATEGORIES;
  },
};

export const couponsService = {
  async getAll(): Promise<Coupon[]> {
    return COUPONS;
  },
};
