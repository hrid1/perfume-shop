'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Category, Product } from '@/types';

interface CategoriesSectionProps {
  categories: Category[];
  products: Product[];
}

export function CategoriesSection({
  categories,
  products,
}: CategoriesSectionProps) {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-normal text-cream-50">
          Product Categories ({categories.length})
        </h1>
        <p className="text-xs text-noir-400 mt-1">
          High-level olfactory groupings configured in NOIRÉ.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const productCount = products.filter((p) => p.category === cat.slug).length;

          return (
            <div
              key={cat.id}
              className="bg-noir-900/80 text-cream-50 rounded-2xl p-6 shadow-lg border border-noir-800 hover:border-gold-500/30 transition-all backdrop-blur-sm"
            >
              <h3 className="font-serif text-xl font-bold text-cream-50">{cat.name}</h3>
              <p className="text-xs text-noir-400 font-mono mt-1">Slug: /{cat.slug}</p>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-noir-800 text-xs">
                <span className="text-noir-300 font-medium">{productCount} Products cataloged</span>
                <Link
                  href={`/catalog?category=${cat.slug}`}
                  className="text-gold-400 hover:text-gold-300 flex items-center gap-1 font-semibold transition-colors"
                >
                  <span>Browse</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
