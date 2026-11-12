import React from 'react';
import { formatPrice } from '@/config/app';
import { cn } from '@/lib/cn';

interface OrderTotalsProps {
  subtotal: number;
  discount: number;
  couponCode?: string | null;
  deliveryFee: number;
  total: number;
  deliveryLabel?: string;
  totalLabel?: string;
  /** "lg" makes the total line more prominent (checkout, receipts). */
  size?: 'sm' | 'lg';
  className?: string;
}

/** Subtotal → discount → delivery → total breakdown shared by cart, checkout and receipts. */
export function OrderTotals({
  subtotal,
  discount,
  couponCode,
  deliveryFee,
  total,
  deliveryLabel = 'Delivery',
  totalLabel = 'Total',
  size = 'sm',
  className,
}: OrderTotalsProps) {
  return (
    <div className={cn('space-y-2 text-xs', className)}>
      <div className="flex justify-between text-noir-400">
        <span>Subtotal</span>
        <span className="font-mono text-noir-100">{formatPrice(subtotal)}</span>
      </div>

      {discount > 0 && (
        <div className="flex justify-between text-emerald-400">
          <span className="flex items-center gap-1.5">
            <span>Discount</span>
            {couponCode && (
              <span className="font-mono text-[10px] bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-500/30">
                {couponCode}
              </span>
            )}
          </span>
          <span className="font-mono">-{formatPrice(discount)}</span>
        </div>
      )}

      <div className="flex justify-between text-noir-400">
        <span>{deliveryLabel}</span>
        <span className="font-mono text-noir-100">
          {deliveryFee === 0 ? (
            <span className="text-gold-400 font-medium uppercase tracking-wider text-[11px]">Free</span>
          ) : (
            formatPrice(deliveryFee)
          )}
        </span>
      </div>

      <div className="flex justify-between items-baseline pt-3 border-t border-noir-800">
        <span className={cn('font-medium text-noir-50', size === 'lg' ? 'font-serif text-lg' : 'text-sm')}>
          {totalLabel}
        </span>
        <span
          className={cn(
            'font-mono text-gold-300 font-bold',
            size === 'lg' ? 'text-xl' : 'text-base'
          )}
        >
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
}
