import { Suspense } from 'react';
import { PRODUCTS } from '@/data/mockData';
import { ProductDetailClient } from './ProductDetailClient';
import { ProductDetailLookup } from './ProductDetailLookup';

// This route uses client-side context (cart, wishlist) via localStorage,
// so it must not be prerendered at build time.
export const instant = false;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  return (
    <Suspense
      fallback={
        <div className="container-lux py-20 text-center text-noir-400 font-mono">
          Loading fragrance details…
        </div>
      }
    >
      {product ? (
        <ProductDetailClient product={product} />
      ) : (
        <ProductDetailLookup slug={slug} />
      )}
    </Suspense>
  );
}
