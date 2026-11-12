'use client';

import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { ButtonLink, EmptyState } from '@/components/ui';

export function WishlistEmptyState() {
  return (
    <EmptyState
      className="py-20 md:py-28 px-4"
      icon={Heart}
      eyebrow="Personal Collection"
      title="Your Wishlist is Empty"
      description="Save your favorite fragrances here to revisit or purchase later."
      actions={
        <ButtonLink href="/catalog" size="lg">
          <span>Discover Fragrances</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </ButtonLink>
      }
    />
  );
}
