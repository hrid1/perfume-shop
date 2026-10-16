'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ProductBreadcrumbProps {
  category: string;
  categoryLabel: string;
  productName: string;
}

export function ProductBreadcrumb({
  category,
  categoryLabel,
  productName,
}: ProductBreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-noir-400 mb-8 font-mono uppercase tracking-wider flex-wrap">
      <Link href="/" className="hover:text-gold-300 transition-colors">Home</Link>
      <ChevronRight className="w-3 h-3" />
      <Link href="/catalog" className="hover:text-gold-300 transition-colors">Catalog</Link>
      <ChevronRight className="w-3 h-3" />
      <Link
        href={`/catalog?category=${category}`}
        className="hover:text-gold-300 transition-colors"
      >
        {categoryLabel}
      </Link>
      <ChevronRight className="w-3 h-3" />
      <span className="text-gold-400 truncate max-w-[160px]">{productName}</span>
    </nav>
  );
}
