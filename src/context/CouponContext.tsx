'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Coupon } from '@/types';
import { couponsService } from '@/services';
import { isArray, readStorage, writeStorage } from '@/lib/storage';
import { usePersistentState } from '@/hooks/usePersistentState';
import { useToast } from './ToastContext';

interface CouponContextValue {
  /** All coupons with `usedCount` including redemptions made in this browser. */
  coupons: Coupon[];
  isLoaded: boolean;
  addCoupon: (coupon: Coupon) => { success: boolean; message: string };
  markCouponUsed: (code: string) => void;
}

type CouponUsage = Record<string, number>;

const CouponContext = createContext<CouponContextValue | undefined>(undefined);
const isList = isArray<Coupon>;
const isUsageMap = (value: unknown): value is CouponUsage =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  Object.values(value).every((count) => typeof count === 'number');

export function CouponProvider({ children }: { children: React.ReactNode }) {
  const [catalogCoupons, setCatalogCoupons] = useState<Coupon[]>([]);
  const [customCoupons, setCustomCoupons] = useState<Coupon[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [usage, setUsage, usageLoaded] = usePersistentState<CouponUsage>(
    'couponUsage',
    {},
    isUsageMap
  );
  const { success, error } = useToast();

  useEffect(() => {
    let cancelled = false;
    // Admin-created coupons only exist in this browser until a backend is connected.
    const saved = readStorage('customCoupons', isList);

    couponsService
      .getAll()
      .then((loaded) => {
        if (!cancelled) setCatalogCoupons(loaded);
      })
      .catch((err) => console.error('Failed to load coupons', err))
      .finally(() => {
        if (cancelled) return;
        if (saved) setCustomCoupons(saved);
        setIsLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const coupons = useMemo(
    () =>
      [...catalogCoupons, ...customCoupons].map((coupon) => {
        const localUses = usage[coupon.code] ?? 0;
        return localUses ? { ...coupon, usedCount: coupon.usedCount + localUses } : coupon;
      }),
    [catalogCoupons, customCoupons, usage]
  );

  const addCoupon = useCallback((coupon: Coupon) => {
    if (coupons.some((item) => item.code.toUpperCase() === coupon.code.toUpperCase())) {
      const message = 'A coupon with this code already exists';
      error(message);
      return { success: false, message };
    }

    const updatedCoupons = [...customCoupons, coupon];
    if (!writeStorage('customCoupons', updatedCoupons)) {
      const message = 'Coupon could not be saved in this browser';
      error(message);
      return { success: false, message };
    }

    setCustomCoupons(updatedCoupons);
    success(`${coupon.code} coupon created`);
    return { success: true, message: 'Coupon created successfully' };
  }, [coupons, customCoupons, error, success]);

  /** Records one redemption. Works for built-in and admin-created coupons alike. */
  const markCouponUsed = useCallback((code: string) => {
    setUsage((prev) => ({ ...prev, [code]: (prev[code] ?? 0) + 1 }));
  }, [setUsage]);

  return (
    <CouponContext.Provider
      value={{ coupons, isLoaded: isLoaded && usageLoaded, addCoupon, markCouponUsed }}
    >
      {children}
    </CouponContext.Provider>
  );
}

export function useCoupons() {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCoupons must be used within a CouponProvider');
  }
  return context;
}
