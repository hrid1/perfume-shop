'use client';

import React, { ReactNode } from 'react';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import { ProductProvider } from '@/context/ProductContext';
import { CouponProvider } from '@/context/CouponContext';
import { CartDrawer } from '@/components/CartDrawer';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductProvider>
          <CouponProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
                <CartDrawer />
              </WishlistProvider>
            </CartProvider>
          </CouponProvider>
        </ProductProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
