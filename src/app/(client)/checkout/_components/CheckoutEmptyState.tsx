'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { ButtonLink, EmptyState } from '@/components/ui';

export function CheckoutEmptyState() {
  return (
    <EmptyState
      className="container-lux py-20"
      icon={ShoppingBag}
      title="Your Bag is Empty"
      description="Please add a luxury perfume to your bag before checking out."
      actions={<ButtonLink href="/catalog">Explore the Catalog</ButtonLink>}
    />
  );
}
