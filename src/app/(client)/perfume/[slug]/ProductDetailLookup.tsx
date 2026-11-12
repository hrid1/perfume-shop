'use client';

import { ProductDetailClient } from './ProductDetailClient';
import { useProducts } from '@/context/ProductContext';
import { SearchX } from 'lucide-react';
import { ButtonLink, EmptyState, PageLoader } from '@/components/ui';

export function ProductDetailLookup({ slug }: { slug: string }) {
  const { products, isLoaded } = useProducts();
  const product = products.find((item) => item.slug === slug);

  if (product) return <ProductDetailClient product={product} />;

  if (!isLoaded) return <PageLoader message="Loading fragrance details..." />;

  return (
    <EmptyState
      className="container-lux py-20"
      icon={SearchX}
      title="Fragrance not found"
      description="This fragrance may have been removed or the link is incorrect."
      actions={<ButtonLink href="/catalog">Browse the collection</ButtonLink>}
    />
  );
}
