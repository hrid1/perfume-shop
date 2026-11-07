'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '@/types';
import { PRODUCTS } from '@/data/mockData';
import { useToast } from './ToastContext';

interface ProductContextValue {
  products: Product[];
  isLoaded: boolean;
  addProduct: (product: Product) => { success: boolean; message: string };
}

const ProductContext = createContext<ProductContextValue | undefined>(undefined);
const STORAGE_KEY = 'noire_perfumes_custom_products_v1';

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [customProducts, setCustomProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (!Array.isArray(parsed)) {
          throw new Error('Saved product data is not a list');
        }
        setCustomProducts(parsed as Product[]);
      }
    } catch (loadError) {
      console.error('Failed to load custom products', loadError);
      error('Saved products could not be loaded');
    } finally {
      setIsLoaded(true);
    }
  }, [error]);

  const products = useMemo(
    () => [...PRODUCTS, ...customProducts],
    [customProducts]
  );

  const addProduct = (product: Product) => {
    if (products.some((item) => item.slug === product.slug)) {
      const message = 'A product with this URL slug already exists';
      error(message);
      return { success: false, message };
    }

    const updatedProducts = [...customProducts, product];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    } catch (saveError) {
      console.error('Failed to save custom product', saveError);
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
