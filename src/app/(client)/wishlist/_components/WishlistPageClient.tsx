'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { WishlistGrid, WishlistEmptyState, WishlistSkeleton } from './index';
import { ChevronRight, ArrowRight } from 'lucide-react';

export function WishlistPageClient() {
  const { items, isLoaded } = useWishlist();

  return (
    <div className="w-full bg-noir-950 text-noir-50 min-h-[calc(100vh-140px)]">
      <div className="container-lux py-8 md:py-14">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-noir-400 mb-8 font-sans">
          <Link href="/" className="hover:text-gold-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-noir-600" />
          <span className="text-gold-400 font-medium">Wishlist</span>
        </nav>

        {/* Page Title & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-noir-800">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold-400 font-medium">
              Saved Items
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-noir-50 mt-1">
              My Wishlist {isLoaded ? `(${items.length})` : ''}
            </h1>
            <p className="text-sm text-noir-400 mt-1.5">
              Fragrances saved to your personal collection.
            </p>
          </div>

          {isLoaded && items.length > 0 && (
            <Link
              href="/catalog"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-medium text-gold-400 hover:text-gold-300 transition-colors group"
            >
              <span>Explore All Fragrances</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {/* Main Content */}
        {!isLoaded ? (
          <WishlistSkeleton />
        ) : items.length === 0 ? (
          <WishlistEmptyState />
        ) : (
          <WishlistGrid items={items} />
        )}
      </div>
    </div>
  );
}
