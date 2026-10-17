'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';

export function WishlistEmptyState() {
  return (
    <div className="py-20 md:py-28 text-center max-w-md mx-auto px-4">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-noir-900 border border-noir-800 shadow-xl flex items-center justify-center text-gold-400">
        <Heart className="w-7 h-7 stroke-[1.5]" />
      </div>

      <span className="text-xs uppercase tracking-widest text-gold-400 font-medium mb-3 block">
        Personal Collection
      </span>

      <h2 className="font-serif text-2xl md:text-3xl text-noir-50 font-medium mb-3">
        Your Wishlist is Empty
      </h2>

      <p className="text-sm text-noir-400 mb-8 leading-relaxed">
        Save your favorite fragrances here to revisit or purchase later.
      </p>

      <Link
        href="/catalog"
        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gold-400 hover:bg-gold-300 text-noir-950 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-gold-500/20 active:scale-95"
      >
        <span>Discover Fragrances</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
