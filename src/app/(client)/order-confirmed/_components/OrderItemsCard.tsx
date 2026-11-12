import React from 'react';
import Image from 'next/image';
import type { Order } from '@/types';
import { formatPrice } from '@/config/app';
import { Card } from '@/components/ui';
import { OrderTotals } from '@/components/order';

export function OrderItemsCard({ order }: { order: Order }) {
  return (
    <Card className="p-6">
      <h3 className="font-serif text-lg font-semibold text-cream-50 mb-4 pb-3 border-b border-noir-800 flex items-center justify-between">
        <span>Allocated Fragrances</span>
        <span className="text-xs font-mono text-noir-400 font-normal">
          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
        </span>
      </h3>

      <div className="divide-y divide-noir-800/80">
        {order.items.map((item, idx) => (
          <div key={`${item.productId}-${idx}`} className="py-4 flex gap-4 first:pt-0 last:pb-0">
            <div className="relative w-16 h-20 rounded-lg bg-noir-950 border border-noir-800 overflow-hidden shrink-0">
              <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-base font-medium text-cream-50 leading-snug">
                  {item.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono text-gold-400 bg-gold-400/10 px-2 py-0.5 rounded border border-gold-400/20">
                    {item.size}
                  </span>
                  <span className="text-xs text-noir-400">Qty: {item.quantity}</span>
                </div>
              </div>
              <p className="font-serif font-bold text-sm text-gold-300 mt-2">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <OrderTotals
        className="mt-6 pt-4 border-t border-noir-800"
        size="lg"
        subtotal={order.subtotal}
        discount={order.discount}
        couponCode={order.couponCode}
        deliveryFee={order.deliveryFee}
        total={order.total}
        totalLabel="Total Amount"
      />
    </Card>
  );
}
