'use client';

import React, { useState } from 'react';
import { Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/config/app';

/**
 * Promo code entry for checkout. Rendered inside the checkout <form>, so it
 * can't be a <form> itself — Enter is handled manually to avoid submitting the order.
 */
export function CheckoutCouponField() {
  const { couponCode, couponError, discount, applyCoupon, removeCoupon } = useCart();
  const [couponInput, setCouponInput] = useState('');

  const handleApply = () => {
    if (!couponInput.trim()) return;
    if (applyCoupon(couponInput).success) setCouponInput('');
  };

  if (couponCode) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between px-3 py-2.5 bg-gold-400/10 border border-gold-400/30 rounded text-xs">
          <div className="flex items-center gap-1.5 text-gold-300 font-mono">
            <Tag className="w-3.5 h-3.5" />
            <span>{couponCode}</span>
            {!couponError && <span className="text-gold-200">(-{formatPrice(discount)})</span>}
          </div>
          <button
            type="button"
            onClick={removeCoupon}
            className="text-noir-400 hover:text-noir-100 text-[11px] underline"
          >
            Remove
          </button>
        </div>
        {couponError && (
          <p role="status" className="text-[11px] text-amber-300/90">
            {couponError}. No discount is applied right now.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Promo code (e.g. WELCOME10)"
        aria-label="Promo code"
        value={couponInput}
        onChange={(e) => setCouponInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleApply();
          }
        }}
        className="flex-1 bg-noir-950 border border-noir-800 px-3 py-2 text-xs rounded text-noir-200 placeholder:text-noir-500 focus:outline-none focus:border-gold-400 uppercase tracking-wider"
      />
      <button
        type="button"
        onClick={handleApply}
        className="px-4 py-2 bg-noir-800 hover:bg-noir-700 border border-noir-700 text-xs font-medium rounded text-gold-300 transition-colors uppercase tracking-wider"
      >
        Apply
      </button>
    </div>
  );
}
