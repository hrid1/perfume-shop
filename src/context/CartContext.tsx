'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, ProductVariant } from '@/types';
import { COUPONS } from '@/data/mockData';
import { config } from '@/config/app';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  couponCode: string | null;
  discount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  subtotal: number;
  total: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'noire_perfumes_cart_v1';
const COUPON_STORAGE_KEY = 'noire_perfumes_coupon_v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { success, error } = useToast();

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(CART_STORAGE_KEY);
      if (savedItems) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(JSON.parse(savedItems));
      }
      const savedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (savedCoupon) {
        const parsed = JSON.parse(savedCoupon);
        setCouponCode(parsed.code);
        setDiscount(parsed.discount);
      }
    } catch (e) {
      console.error('Failed to parse cart storage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (couponCode) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify({ code: couponCode, discount }));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save coupon to storage', e);
    }
  }, [couponCode, discount, isLoaded]);

  const addItem = (product: Product, variant: ProductVariant, quantity = 1) => {
    const existingIndex = items.findIndex(
      (item) => item.productId === product.id && item.variantId === variant.id
    );

    const price = variant.discountPrice || variant.price;

    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += quantity;
      setItems(updated);
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${variant.id}-${Date.now()}`,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        image: product.images[0],
        size: variant.size,
        variantId: variant.id,
        price,
        quantity,
      };
      setItems((prev) => [...prev, newItem]);
    }

    success(`Added ${product.name} (${variant.size}) to your bag`);
    setIsCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    if (item) {
      success(`Removed ${item.name} from bag`);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode(null);
    setDiscount(0);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = COUPONS.find((c) => c.code === cleanCode && c.active);

    if (!found) {
      error('Invalid promo code');
      return { success: false, message: 'Invalid promo code' };
    }

    if (subtotal < found.minOrder) {
      const msg = `Minimum order of ৳${found.minOrder.toLocaleString()} required for ${found.code}`;
      error(msg);
      return { success: false, message: msg };
    }

    let calculatedDiscount = 0;
    if (found.type === 'percentage') {
      calculatedDiscount = Math.round((subtotal * found.value) / 100);
    } else {
      calculatedDiscount = found.value;
    }

    setCouponCode(found.code);
    setDiscount(calculatedDiscount);
    success(`Applied ${found.code} (৳${calculatedDiscount.toLocaleString()} OFF)`);
    return { success: true, message: 'Coupon applied successfully' };
  };

  const removeCoupon = () => {
    setCouponCode(null);
    setDiscount(0);
    success('Coupon removed');
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Free delivery logic: if (subtotal - discount) >= 3000 -> 0, otherwise default inside Dhaka ৳60
  const freeDeliveryThreshold = config.delivery.freeDeliveryThreshold;
  const netSubtotal = Math.max(0, subtotal - discount);
  const isFreeDelivery = netSubtotal >= freeDeliveryThreshold && netSubtotal > 0;
  const deliveryFee = totalItems === 0 ? 0 : isFreeDelivery ? 0 : config.delivery.insideDhaka;
  const total = Math.max(0, netSubtotal + deliveryFee);
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - netSubtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        couponCode,
        discount,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        totalItems,
        subtotal,
        total,
        deliveryFee,
        freeDeliveryThreshold,
        amountNeededForFreeDelivery,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
