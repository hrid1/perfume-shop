'use client';

import React from 'react';
import { WishlistItem } from '@/types';
import { WishlistCard } from './WishlistCard';

interface WishlistGridProps {
  items: WishlistItem[];
}

export function WishlistGrid({ items }: WishlistGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
      {items.map((item) => (
        <WishlistCard key={item.id || item.productId} item={item} />
      ))}
    </div>
  );
}
