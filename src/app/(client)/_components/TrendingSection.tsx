import { productsService } from '@/services';
import { ProductShowcaseSection } from './ProductShowcaseSection';

export async function TrendingSection() {
  const products = await productsService.getTrending(4);

  return (
    <ProductShowcaseSection
      eyebrow="Trending Blends"
      title="Popular Fragrances"
      description="The season’s most sought-after perfumes and rare attars."
      action={{ href: '/catalog?filter=trending', label: 'View All Trending' }}
      products={products}
    />
  );
}
