'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function CheckoutHeader() {
  return (
    <div className="mb-8">
      <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-gold-400 mb-2">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>SECURE BANGLADESH CHECKOUT</span>
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-noir-50">
        Complete Your Order
      </h1>
    </div>
  );
}
