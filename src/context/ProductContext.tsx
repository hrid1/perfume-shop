'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '@/types';
import { productsService } from '@/services';
import { isArray, readStorage, writeStorage } from '@/lib/storage';
import { useToast } from './ToastContext';

interface ProductContextValue {
  products: Product[];
  isLoaded: boolean;
  addProduct: (product: Product) => { success: boolean; message: string };
}

const ProductContext = createContext<ProductContextValue | undefined>(undefined);
const isList = isArray<Product>;

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const [customProducts, setCustomProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    let cancelled = false;

    // Admin-created products only exist in this browser until a backend is connected.
    const saved = readStorage('customProducts', isList);

    productsService
      .getAll()
      .then((loaded) => {
        if (!cancelled) setCatalogProducts(loaded);
      })
      .catch((err) => {
        console.error('Failed to load products', err);
        if (!cancelled) error('Could not load the catalog. Please refresh the page.');
      })
      .finally(() => {
        if (cancelled) return;
        if (saved) setCustomProducts(saved);
        setIsLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [error]);

  const products = useMemo(
    () => [...catalogProducts, ...customProducts],
    [catalogProducts, customProducts]
  );

  const addProduct = (product: Product) => {
    if (products.some((item) => item.slug === product.slug)) {
      const message = 'A product with this URL slug already exists';
      error(message);
      return { success: false, message };
    }

    const updatedProducts = [...customProducts, product];
    if (!writeStorage('customProducts', updatedProducts)) {
      const message = 'Product could not be saved in this browser';
      error(message);
      return { success: false, message };
    }

    setCustomProducts(updatedProducts);
    success(`${product.name} added to the catalog`);
    return { success: true, message: 'Product added successfully' };
  };

  return (
    <ProductContext.Provider value={{ products, isLoaded, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
