'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { formatPrice } from '@/config/app';

interface CheckoutOrderSuccessProps {
  fullName: string;
  orderNumber: string;
  paymentMethod: string;
  isDhakaCity: boolean;
  grandTotal: number;
}

export function CheckoutOrderSuccess({
  fullName,
  orderNumber,
  paymentMethod,
  isDhakaCity,
  grandTotal,
}: CheckoutOrderSuccessProps) {
  return (
    <div className="container-lux py-16 max-w-2xl text-center animate-fade-in">
      <div className="card-lux p-8 sm:p-12 border border-gold-400/40 bg-noir-900 shadow-2xl relative">
        <div className="w-16 h-16 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mx-auto mb-6 text-gold-300">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-400 block mb-2">
          ORDER CONFIRMED
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-noir-50 mb-2">
          Thank You, {fullName || 'Valued Client'}
        </h1>
        <p className="text-sm text-noir-300 mb-6 font-light">
          Your haute fragrance allocation is now being prepared with signature ebony velvet packaging and wax seal.
        </p>

        <div className="bg-noir-950 p-4 rounded-xl border border-noir-800 text-left space-y-2 mb-8 text-xs">
          <div className="flex justify-between">
            <span className="text-noir-400">Order Number:</span>
            <span className="font-mono text-gold-300 font-bold">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-noir-400">Payment Method:</span>
            <span className="font-mono uppercase text-noir-200">
              {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod.toUpperCase()} (Simulated)
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-noir-400">Estimated Delivery:</span>
            <span className="text-noir-200">
              {isDhakaCity ? '2–3 business days (Dhaka Express)' : '3–5 business days'}
            </span>
          </div>
          <div className="flex justify-between border-t border-noir-800 pt-2 text-sm font-medium">
            <span className="text-noir-200">Total Charged:</span>
            <span className="font-mono text-gold-300 font-bold">{formatPrice(grandTotal)}</span>
          </div>
        </div>

        <Link href="/catalog" className="btn-gold text-xs px-8 py-3.5 tracking-wider">
          Continue Discovering Fragrances
        </Link>
      </div>
    </div>
  );
}
