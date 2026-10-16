'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export function CheckoutEmptyState() {
  return (
    <div className="container-lux py-20 text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-noir-900 border border-noir-800 flex items-center justify-center mx-auto mb-4 text-noir-500">
        <ShoppingBag className="w-8 h-8 stroke-1 text-gold-400/60" />
      </div>
      <h2 className="font-serif text-2xl font-medium mb-2">Your Bag is Empty</h2>
      <p className="text-xs text-noir-400 mb-6">
        Please add a luxury perfume to your bag before checking out.
      </p>
      <Link href="/catalog" className="btn-gold text-xs px-6 py-3">
        Explore the Catalog
      </Link>
    </div>
  );
}
