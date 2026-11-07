'use client';

import Link from 'next/link';
import { ProductDetailClient } from './ProductDetailClient';
import { useProducts } from '@/context/ProductContext';

export function ProductDetailLookup({ slug }: { slug: string }) {
  const { products, isLoaded } = useProducts();
  const product = products.find((item) => item.slug === slug);

  if (product) return <ProductDetailClient product={product} />;

  return (
    <div className="container-lux py-20 text-center">
      {isLoaded ? (
        <>
          <h1 className="font-serif text-3xl text-cream-50">Fragrance not found</h1>
          <Link href="/catalog" className="mt-4 inline-block text-sm text-gold-300 hover:text-gold-200">
            Browse the collection
          </Link>
        </>
      ) : (
        <p className="text-noir-400">Loading fragrance details...</p>
      )}
    </div>
  );
}
