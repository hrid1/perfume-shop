'use client';

import React, { useState } from 'react';
import { Check, CheckCircle2, Copy, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui';

interface OrderConfirmedHeroProps {
  orderNumber: string;
  customerName: string;
}

export function OrderConfirmedHero({ orderNumber, customerName }: OrderConfirmedHeroProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); the number is still visible.
    }
  };

  return (
    <Card tone="success" className="p-8 md:p-12 shadow-2xl relative overflow-hidden mb-8 text-center">
      <div className="absolute top-0 right-0 w-72 h-72 bg-gold-400/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-mono uppercase tracking-[0.2em] mb-4">
        <Sparkles className="w-3.5 h-3.5 text-gold-400" />
        <span>Order Confirmed & Allocated</span>
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-noir-50 mb-3 tracking-tight">
        Thank You, {customerName || 'Valued Client'}
      </h1>
      <p className="text-sm sm:text-base text-noir-300 max-w-xl mx-auto mb-6 font-light leading-relaxed">
        Your fragrance order has been received. Our Dhaka concierge team is preparing your
        selection with our signature ebony velvet packaging and wax seal.
      </p>

      <div className="inline-flex items-center gap-3 bg-noir-900/90 border border-noir-700/80 px-5 py-2.5 rounded-full text-xs">
        <span className="text-noir-400">Order Reference:</span>
        <span className="font-mono font-bold text-gold-300 text-sm tracking-wider">{orderNumber}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-noir-400 hover:text-gold-300 transition-colors p-1 flex items-center gap-1 cursor-pointer"
          title="Copy Order Reference"
          aria-label="Copy order reference"
        >
          {copied ? (
            <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
              <Check className="w-3.5 h-3.5" /> Copied
            </span>
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </Card>
  );
}
