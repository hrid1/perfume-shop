'use client';

import React from 'react';
import { Coupon } from '@/types';
import { formatPrice } from '@/config/app';

interface CouponsSectionProps {
  coupons: Coupon[];
}

export function CouponsSection({ coupons }: CouponsSectionProps) {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-normal text-cream-50">
          Promotional Coupons ({coupons.length})
        </h1>
        <p className="text-xs text-noir-400 mt-1">
          Active promotional discount codes for boutique clients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {coupons.map((cpn) => (
          <div
            key={cpn.code}
            className="bg-noir-900/80 text-cream-50 rounded-2xl p-6 shadow-lg border border-noir-800 hover:border-gold-500/30 transition-all flex flex-col justify-between backdrop-blur-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-bold px-3 py-1 bg-gold-500/15 text-gold-300 rounded-lg border border-gold-500/30">
                  {cpn.code}
                </span>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>
              <p className="text-xs text-noir-400 mb-1">Promo Code &bull; Valid for boutique orders</p>
              <p className="font-serif text-2xl font-bold text-cream-50">
                {cpn.type === 'percentage'
                  ? `${cpn.value}% OFF`
                  : `৳${cpn.value} OFF`}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-noir-800 text-xs text-noir-400 flex items-center justify-between">
              <span>Min order: {formatPrice(cpn.minOrder)}</span>
              <span className="font-mono">Used: {cpn.usedCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
