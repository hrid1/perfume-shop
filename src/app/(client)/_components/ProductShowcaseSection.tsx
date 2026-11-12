import React from 'react';
import type { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeader } from '@/components/ui';

interface ProductShowcaseSectionProps extends React.ComponentProps<typeof SectionHeader> {
  products: Product[];
  /** How many leading cards get image priority (above-the-fold sections). */
  priorityCount?: number;
}

/** Section header + 4-column product grid, used for homepage product rows. */
export function ProductShowcaseSection({
  products,
  priorityCount = 0,
  ...header
}: ProductShowcaseSectionProps) {
  return (
    <section className="w-full">
      <div className="container-lux">
        <SectionHeader {...header} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < priorityCount} />
          ))}
        </div>
      </div>
    </section>
  );
}
