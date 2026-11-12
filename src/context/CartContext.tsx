'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product, ProductVariant } from '@/types';
import { config, formatPrice } from '@/config/app';
import { usePersistentState } from '@/hooks/usePersistentState';
import { isArray } from '@/lib/storage';
import {
  calcCouponDiscount,
  calcOrderTotals,
  getCouponProblem,
  getEffectivePrice,
} from '@/lib/pricing';
import { useToast } from './ToastContext';
import { useCoupons } from './CouponContext';
import { useProducts } from './ProductContext';

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
  /** Why the applied coupon currently gives no discount (e.g. minimum not met), or null. */
  couponError: string | null;
  discount: number;
  /** Most units of this line that can be ordered (variant stock). */
  getMaxQuantity: (item: CartItem) => number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  subtotal: number;
  /** Totals below assume Dhaka city delivery; checkout recalculates for the chosen address. */
  total: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
}

interface StoredCoupon {
  code: string;
  discount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const isCartItems = isArray<CartItem>;
const isIdList = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((id) => typeof id === 'string');
const isStoredCoupon = (value: unknown): value is StoredCoupon | null =>
  value === null ||
  (typeof value === 'object' && typeof (value as StoredCoupon).code === 'string');

/** Cap used when a cart line's product can't be found (e.g. catalog still loading). */
const FALLBACK_MAX_QUANTITY = 99;

/** Stable id per product + size, so repeat adds merge into one line. */
const cartItemId = (productId: string, variantId: string) => `${productId}-${variantId}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = usePersistentState<CartItem[]>('cart', [], isCartItems);
  const [selectedItemIds, setSelectedItemIds] = usePersistentState<string[]>(
    'cartSelection',
    [],
    isIdList
  );
  const [storedCoupon, setStoredCoupon] = usePersistentState<StoredCoupon | null>(
    'cartCoupon',
    null,
    isStoredCoupon
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { success, error } = useToast();
  const { coupons, isLoaded: couponsLoaded } = useCoupons();
  const { products } = useProducts();

  const getMaxQuantity = (item: CartItem) => {
    const variant = products
      .find((product) => product.id === item.productId)
      ?.sizes.find((v) => v.id === item.variantId);
    return variant ? variant.stock : FALLBACK_MAX_QUANTITY;
  };

  const addItem = (product: Product, variant: ProductVariant, quantity = 1) => {
    const matches = (item: CartItem) =>
      item.productId === product.id && item.variantId === variant.id;
    const existing = items.find(matches);
    // Older carts used timestamped ids, so reuse an existing line's id when there is one.
    const itemId = existing?.id ?? cartItemId(product.id, variant.id);

    const inBag = existing?.quantity ?? 0;
    const addable = Math.min(quantity, variant.stock - inBag);
    if (addable <= 0) {
      error(
        variant.stock <= 0
          ? `${product.name} (${variant.size}) is out of stock`
          : `Only ${variant.stock} of ${product.name} (${variant.size}) available, and all are in your bag`
      );
      return;
    }

    setItems((prev) => {
      if (prev.some(matches)) {
        return prev.map((item) =>
          matches(item) ? { ...item, quantity: item.quantity + addable } : item
        );
      }
      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        image: product.images[0],
        size: variant.size,
        variantId: variant.id,
        price: getEffectivePrice(variant),
        quantity: addable,
      };
      return [...prev, newItem];
    });
    setSelectedItemIds((prev) => (prev.includes(itemId) ? prev : [...prev, itemId]));

    if (addable < quantity) {
      error(`Only ${variant.stock} available, so ${addable} added to your bag`);
    } else {
      success(`Added ${product.name} (${variant.size}) to your bag`);
    }
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
    const line = items.find((item) => item.id === itemId);
    const max = line ? getMaxQuantity(line) : FALLBACK_MAX_QUANTITY;
    if (quantity > max) {
      error(`Only ${max} available for this size`);
      quantity = max;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setSelectedItemIds([]);
    setStoredCoupon(null);
  };

  const completeCheckout = () => {
    const remainingItems = items.filter((item) => !selectedItemIds.includes(item.id));
    setItems(remainingItems);
    setSelectedItemIds(remainingItems.map((item) => item.id));
    setStoredCoupon(null);
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
  const selectedTotalItems = selectedItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const couponCode = storedCoupon?.code ?? null;
  const appliedCoupon = coupons.find((coupon) => coupon.code === couponCode);
  // Re-check the applied coupon on every change (selection, quantity, expiry) so a discount
  // never applies when it shouldn't, and the customer is told why.
  const couponError =
    couponCode && couponsLoaded ? getCouponProblem(appliedCoupon, subtotal) : null;
  let discount = 0;
  if (couponCode && !couponsLoaded) {
    // Brief window on page load before coupons arrive: show the last known discount.
    discount = Math.min(storedCoupon?.discount ?? 0, subtotal);
  } else if (appliedCoupon && !couponError) {
    discount = calcCouponDiscount(appliedCoupon, subtotal);
  }

  const applyCoupon = (code: string) => {
    const fail = (message: string) => {
      error(message);
      return { success: false, message };
    };

    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode);

    if (selectedItems.length === 0) {
      return fail('Select at least one product before applying a promo code');
    }
    if (!found) return fail('Invalid promo code');
    const problem = getCouponProblem(found, subtotal);
    if (problem) return fail(problem);

    const calculatedDiscount = calcCouponDiscount(found, subtotal);
    setStoredCoupon({ code: found.code, discount: calculatedDiscount });
    success(`Applied ${found.code} (${formatPrice(calculatedDiscount)} OFF)`);
    return { success: true, message: 'Coupon applied successfully' };
  };

  const removeCoupon = () => {
    setStoredCoupon(null);
    success('Coupon removed');
  };

  const { deliveryFee, total, amountNeededForFreeDelivery } = calcOrderTotals({
    subtotal,
    discount,
    itemCount: selectedTotalItems,
  });

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
        couponError,
        discount,
        getMaxQuantity,
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
        freeDeliveryThreshold: config.delivery.freeDeliveryThreshold,
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
