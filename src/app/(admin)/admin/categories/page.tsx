'use client';

import { CATEGORIES } from '@/data/mockData';
import { useProducts } from '@/context/ProductContext';
import { CategoriesSection } from '../_components/CategoriesSection';

export default function CategoriesPage() {
  const { products } = useProducts();

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-10">
      <CategoriesSection categories={CATEGORIES} products={products} />
    </div>
  );
}
