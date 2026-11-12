'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Coupon } from '@/types';
import { COUPONS } from '@/data/mockData';
import { useToast } from './ToastContext';

interface CouponContextValue {
  coupons: Coupon[];
  isLoaded: boolean;
  addCoupon: (coupon: Coupon) => { success: boolean; message: string };
  markCouponUsed: (code: string) => void;
}

const CouponContext = createContext<CouponContextValue | undefined>(undefined);
const STORAGE_KEY = 'noire_perfumes_custom_coupons_v1';

export function CouponProvider({ children }: { children: React.ReactNode }) {
  const [customCoupons, setCustomCoupons] = useState<Coupon[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (!Array.isArray(parsed)) {
          throw new Error('Saved coupon data is not a list');
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCustomCoupons(parsed as Coupon[]);
      }
    } catch (loadError) {
      console.error('Failed to load custom coupons', loadError);
      error('Saved coupons could not be loaded');
    } finally {
      setIsLoaded(true);
    }
  }, [error]);

  const coupons = useMemo(() => [...COUPONS, ...customCoupons], [customCoupons]);

  const addCoupon = useCallback((coupon: Coupon) => {
    if (coupons.some((item) => item.code.toUpperCase() === coupon.code.toUpperCase())) {
      const message = 'A coupon with this code already exists';
      error(message);
      return { success: false, message };
    }

    const updatedCoupons = [...customCoupons, coupon];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCoupons));
    } catch (saveError) {
      console.error('Failed to save coupon', saveError);
      const message = 'Coupon could not be saved in this browser';
      error(message);
      return { success: false, message };
    }

    setCustomCoupons(updatedCoupons);
    success(`${coupon.code} coupon created`);
    return { success: true, message: 'Coupon created successfully' };
  }, [coupons, customCoupons, error, success]);

  const markCouponUsed = useCallback((code: string) => {
    const updatedCoupons = customCoupons.map((coupon) =>
      coupon.code === code
        ? { ...coupon, usedCount: Math.min(coupon.usageLimit, coupon.usedCount + 1) }
        : coupon
    );
    if (updatedCoupons.every((coupon, index) => coupon === customCoupons[index])) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCoupons));
      setCustomCoupons(updatedCoupons);
    } catch (saveError) {
      console.error('Failed to update coupon usage', saveError);
      error('Coupon usage could not be recorded');
    }
  }, [customCoupons, error]);

  return (
    <CouponContext.Provider value={{ coupons, isLoaded, addCoupon, markCouponUsed }}>
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
