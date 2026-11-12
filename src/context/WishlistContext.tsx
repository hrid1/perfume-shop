'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { usePersistentState } from '@/hooks/usePersistentState';
import { isArray } from '@/lib/storage';
import { WishlistItem, Product } from '@/types';
import { useToast } from './ToastContext';

interface WishlistContextType {
  items: WishlistItem[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeItem: (productId: string) => void;
  totalItems: number;
  count: number;
  isLoaded: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const isWishlistItems = isArray<WishlistItem>;

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems, isLoaded] = usePersistentState<WishlistItem[]>(
    'wishlist',
    [],
    isWishlistItems
  );
  const { success, info } = useToast();

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.productId === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      setItems((prev) => prev.filter((item) => item.productId !== product.id));
      info(`Removed ${product.name} from wishlist`);
    } else {
      const newItem: WishlistItem = {
        id: `wish-${product.id}`,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        image: product.images[0],
        price: product.price,
        discountPrice: product.discountPrice,
        addedAt: new Date().toISOString(),
      };
      setItems((prev) => [...prev, newItem]);
      success(`Saved ${product.name} to wishlist`);
    }
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        isInWishlist,
        toggleWishlist,
        removeItem,
        totalItems: items.length,
        count: items.length,
        isLoaded,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
