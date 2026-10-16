'use client';

import React from 'react';
import Image from 'next/image';
import { Truck, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/config/app';
import { CartItem } from '@/types';

interface CheckoutOrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string | null;
  deliveryFee: number;
  grandTotal: number;
  isSubmitting: boolean;
}

export function CheckoutOrderSummary({
  items,
  subtotal,
  discount,
  couponCode,
  deliveryFee,
  grandTotal,
  isSubmitting,
}: CheckoutOrderSummaryProps) {
  return (
    <div className="card-lux p-6 border border-noir-800 bg-noir-900/60 sticky top-28 space-y-6">
      <h2 className="font-serif text-xl font-medium text-noir-100 pb-3 border-b border-noir-800">
        Order Summary ({items.length} items)
      </h2>

      {/* Item list */}
      <div className="max-h-64 overflow-y-auto divide-y divide-noir-800/60 pr-1">
        {items.map((item) => (
          <div key={item.id} className="py-3 flex items-center gap-3 first:pt-0">
            <div className="relative w-12 h-14 rounded bg-noir-950 overflow-hidden shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-medium text-noir-100 line-clamp-1">{item.name}</h4>
              <p className="text-[11px] text-noir-400 font-mono">
                {item.size} &times; {item.quantity}
              </p>
            </div>
            <span className="font-mono text-xs font-medium text-gold-300">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Calculations */}
      <div className="pt-4 border-t border-noir-800 space-y-2 text-xs">
        <div className="flex justify-between text-noir-300">
          <span>Subtotal</span>
          <span className="font-mono text-noir-100">{formatPrice(subtotal)}</span>
        </div>
        {couponCode && (
          <div className="flex justify-between text-gold-400">
            <span>Promo ({couponCode})</span>
            <span className="font-mono">-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-noir-300">
          <span>Shipping Fee</span>
          <span className="font-mono text-noir-100">
            {deliveryFee === 0 ? (
              <span className="text-gold-400 font-medium">Free Delivery</span>
            ) : (
              formatPrice(deliveryFee)
            )}
          </span>
        </div>
        <div className="flex justify-between text-base font-medium text-noir-50 pt-3 border-t border-noir-800">
          <span className="font-serif text-lg">Total Amount</span>
          <span className="font-mono text-lg text-gold-300 font-bold">
            {formatPrice(grandTotal)}
          </span>
        </div>
      </div>

      {/* Submit CTA */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-gold py-3.5 text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? (
          <span>Securing Your Flacons...</span>
        ) : (
          <>
            <span>Place Order &bull; {formatPrice(grandTotal)}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-[10px] text-noir-500 font-mono pt-2">
        <Truck className="w-3.5 h-3.5 text-gold-400" />
        <span>Nationwide delivery with secure courier tracking</span>
      </div>
    </div>
  );
}
