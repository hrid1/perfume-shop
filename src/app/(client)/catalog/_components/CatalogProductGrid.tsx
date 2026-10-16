'use client';

import React from 'react';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';

interface CatalogProductGridProps {
  products: Product[];
  highlightSlug?: string | null;
  onResetFilters: () => void;
}

export function CatalogProductGrid({
  products,
  highlightSlug,
  onResetFilters,
}: CatalogProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="lg:col-span-3 py-20 text-center rounded-2xl bg-noir-900/40 border border-noir-800 p-8">
        <p className="font-serif text-2xl text-noir-200 mb-2">
          No olfactory creations match your filter criteria.
        </p>
        <p className="text-xs text-noir-400 mb-6">
          Try loosening your price bounds, searching another term, or selecting a different category.
        </p>
        <button onClick={onResetFilters} className="btn-gold text-xs px-6 py-2.5 cursor-pointer">
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className={
            highlightSlug === product.slug
              ? 'ring-2 ring-gold-400 rounded-xl overflow-hidden'
              : ''
          }
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
