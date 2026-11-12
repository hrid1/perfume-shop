import { productsService } from '@/services';
import { ProductShowcaseSection } from './ProductShowcaseSection';

export async function BestSellersSection() {
  const products = await productsService.getBestSellers(4);

  return (
    <ProductShowcaseSection
      eyebrow="Customer Favorites"
      title="Best Sellers"
      action={{ href: '/catalog?filter=bestseller', label: 'View All Best Sellers' }}
      products={products}
      priorityCount={2}
    />
  );
}
