'use client';

import React from 'react';
import { CreditCard } from 'lucide-react';
import { PaymentMethod } from '@/types';

interface CheckoutPaymentSelectionProps {
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
}

export function CheckoutPaymentSelection({
  paymentMethod,
  onPaymentMethodChange,
}: CheckoutPaymentSelectionProps) {
  return (
    <div className="card-lux p-6 border border-noir-800 bg-noir-900/60">
      <h2 className="font-serif text-xl font-medium text-noir-100 mb-2 pb-2 border-b border-noir-800">
        3. Payment Selection
      </h2>
      <p className="text-[11px] text-gold-400 font-mono mb-4">
        Note: Payment processing is simulated for demonstration. No real money will be charged.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* bKash */}
        <label
          className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
            paymentMethod === 'bkash'
              ? 'border-pink-500 bg-pink-950/20'
              : 'border-noir-800 bg-noir-950/50 hover:border-noir-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              value="bkash"
              checked={paymentMethod === 'bkash'}
              onChange={() => onPaymentMethodChange('bkash')}
              className="accent-pink-500"
            />
            <div>
              <span className="font-bold text-pink-400 text-sm block">bKash</span>
              <span className="text-[11px] text-noir-400">Direct mobile payment</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 text-[10px] font-mono">
            Instant
          </span>
        </label>

        {/* Nagad */}
        <label
          className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
            paymentMethod === 'nagad'
              ? 'border-orange-500 bg-orange-950/20'
              : 'border-noir-800 bg-noir-950/50 hover:border-noir-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              value="nagad"
              checked={paymentMethod === 'nagad'}
              onChange={() => onPaymentMethodChange('nagad')}
              className="accent-orange-500"
            />
            <div>
              <span className="font-bold text-orange-400 text-sm block">Nagad</span>
              <span className="text-[11px] text-noir-400">Post Office Digital Wallet</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 text-[10px] font-mono">
            Instant
          </span>
        </label>

        {/* Cash on Delivery */}
        <label
          className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
            paymentMethod === 'cod'
              ? 'border-emerald-500 bg-emerald-950/20'
              : 'border-noir-800 bg-noir-950/50 hover:border-noir-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => onPaymentMethodChange('cod')}
              className="accent-emerald-500"
            />
            <div>
              <span className="font-bold text-emerald-400 text-sm block">Cash on Delivery</span>
              <span className="text-[11px] text-noir-400">Pay when flacon arrives</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
            COD
          </span>
        </label>

        {/* Card */}
        <label
          className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
            paymentMethod === 'card'
              ? 'border-gold-400 bg-gold-400/10'
              : 'border-noir-800 bg-noir-950/50 hover:border-noir-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => onPaymentMethodChange('card')}
              className="accent-gold-400"
            />
            <div>
              <span className="font-bold text-gold-300 text-sm block">Credit / Debit Card</span>
              <span className="text-[11px] text-noir-400">Visa, Mastercard, Amex</span>
            </div>
          </div>
          <CreditCard className="w-4 h-4 text-gold-400" />
        </label>
      </div>
    </div>
  );
}
