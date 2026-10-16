import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/mockData';
import { ProductDetailClient } from './ProductDetailClient';

// This route uses client-side context (cart, wishlist) via localStorage,
// so it must not be prerendered at build time.
export const instant = false;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) return notFound();

  return (
    <Suspense
      fallback={
        <div className="container-lux py-20 text-center text-noir-400 font-mono">
          Loading fragrance details…
        </div>
      }
    >
      <ProductDetailClient product={product} />
    </Suspense>
  );
}
