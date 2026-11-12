'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, ProductVariant } from '@/types';
import { config } from '@/config/app';
import { useToast } from './ToastContext';
import { useCoupons } from './CouponContext';

interface CartContextType {
  items: CartItem[];
  selectedItems: CartItem[];
  toggleItemSelection: (itemId: string, selected: boolean) => void;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  completeCheckout: () => void;
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
const CART_SELECTION_STORAGE_KEY = 'noire_perfumes_cart_selection_v1';
const COUPON_STORAGE_KEY = 'noire_perfumes_coupon_v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { success, error } = useToast();
  const { coupons } = useCoupons();

  // Load from LocalStorage
  useEffect(() => {
    let loadedItems: CartItem[] = [];
    try {
      const savedItems = localStorage.getItem(CART_STORAGE_KEY);
      if (savedItems) {
        loadedItems = JSON.parse(savedItems);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(loadedItems);
      }
      setSelectedItemIds(loadedItems.map((item) => item.id));

      const savedSelection = localStorage.getItem(CART_SELECTION_STORAGE_KEY);
      if (savedSelection) {
        const parsedSelection: unknown = JSON.parse(savedSelection);
        if (!Array.isArray(parsedSelection) || parsedSelection.some((id) => typeof id !== 'string')) {
          throw new Error('Saved cart selection is invalid');
        }
        setSelectedItemIds(
          parsedSelection.filter((id: string) => loadedItems.some((item) => item.id === id))
        );
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
      localStorage.setItem(CART_SELECTION_STORAGE_KEY, JSON.stringify(selectedItemIds));
    } catch (e) {
      console.error('Failed to save cart selection', e);
    }
  }, [selectedItemIds, isLoaded]);

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
      const existingItemId = updated[existingIndex].id;
      setSelectedItemIds((prev) =>
        prev.includes(existingItemId) ? prev : [...prev, existingItemId]
      );
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
      setSelectedItemIds((prev) => [...prev, newItem.id]);
    }

    success(`Added ${product.name} (${variant.size}) to your bag`);
    setIsCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    setSelectedItemIds((prev) => prev.filter((id) => id !== itemId));
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
    setSelectedItemIds([]);
    setCouponCode(null);
    setDiscount(0);
  };

  const completeCheckout = () => {
    const remainingItems = items.filter((item) => !selectedItemIds.includes(item.id));
    setItems(remainingItems);
    setSelectedItemIds(remainingItems.map((item) => item.id));
    setCouponCode(null);
    setDiscount(0);
  };

  const toggleItemSelection = (itemId: string, selected: boolean) => {
    setSelectedItemIds((prev) => {
      if (selected) {
        return prev.includes(itemId) ? prev : [...prev, itemId];
      }
      return prev.filter((id) => id !== itemId);
    });
  };

  const selectedItems = items.filter((item) => selectedItemIds.includes(item.id));
  const subtotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const appliedCoupon = coupons.find((coupon) => coupon.code === couponCode);
  const effectiveDiscount = appliedCoupon
    ? subtotal < appliedCoupon.minOrder
      ? 0
      : appliedCoupon.type === 'percentage'
        ? Math.round((subtotal * appliedCoupon.value) / 100)
        : appliedCoupon.value
    : discount;

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode && c.active);

    if (selectedItems.length === 0) {
      const message = 'Select at least one product before applying a promo code';
      error(message);
      return { success: false, message };
    }

    if (!found) {
      error('Invalid promo code');
      return { success: false, message: 'Invalid promo code' };
    }

    if (found.expiryDate && new Date(`${found.expiryDate}T23:59:59`) < new Date()) {
      error('This promo code has expired');
      return { success: false, message: 'This promo code has expired' };
    }

    if (found.usedCount >= found.usageLimit) {
      error('This promo code has reached its usage limit');
      return { success: false, message: 'This promo code has reached its usage limit' };
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
  const selectedTotalItems = selectedItems.reduce((acc, item) => acc + item.quantity, 0);

  // Free delivery logic: if (subtotal - discount) >= 3000 -> 0, otherwise default inside Dhaka ৳60
  const freeDeliveryThreshold = config.delivery.freeDeliveryThreshold;
  const netSubtotal = Math.max(0, subtotal - effectiveDiscount);
  const isFreeDelivery = netSubtotal >= freeDeliveryThreshold && netSubtotal > 0;
  const deliveryFee = selectedTotalItems === 0 ? 0 : isFreeDelivery ? 0 : config.delivery.insideDhaka;
  const total = Math.max(0, netSubtotal + deliveryFee);
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - netSubtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        selectedItems,
        toggleItemSelection,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        completeCheckout,
        couponCode,
        discount: effectiveDiscount,
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
