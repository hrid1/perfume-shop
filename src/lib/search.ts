import type { Product } from '@/types';

/**
 * True when a product matches a free-text query by name, brand, family, category or any note.
 * An empty query matches everything.
 */
export function matchesProductQuery(product: Product, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const fields = [product.name, product.brand, product.fragranceFamily, product.category];
  const notes = [
    ...(product.topNotes ?? []),
    ...(product.middleNotes ?? []),
    ...(product.baseNotes ?? []),
  ];
  return [...fields, ...notes].some((value) => value.toLowerCase().includes(q));
}

export function searchProducts(products: Product[], query: string, limit?: number): Product[] {
  if (!query.trim()) return [];
  const results = products.filter((product) => matchesProductQuery(product, query));
  return limit ? results.slice(0, limit) : results;
}
