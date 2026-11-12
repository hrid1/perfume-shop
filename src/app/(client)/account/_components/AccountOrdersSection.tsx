'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  CreditCard,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { formatPrice } from '@/config/app';
import type { Order } from '@/types';
import {
  formatOrderDate,
  paymentMethodLabel,
  statusMeta,
  trackingStepIndex,
  TRACKING_STEPS,
} from './orderUtils';

interface AccountOrdersSectionProps {
  orders: Order[];
  isLoaded: boolean;
}

export function AccountOrdersSection({ orders, isLoaded }: AccountOrdersSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sortedOrders = useMemo(() => {
    return [...orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [orders]);

  if (!isLoaded) {
    return (
      <div className="card-lux p-6 border border-noir-800 bg-noir-900/80 animate-pulse">
        <div className="h-6 w-40 bg-noir-800 rounded mb-4" />
        <div className="h-4 w-64 bg-noir-800/70 rounded mb-8" />
        <div className="space-y-4">
          <div className="h-28 bg-noir-950 border border-noir-800 rounded-xl" />
          <div className="h-28 bg-noir-950 border border-noir-800 rounded-xl" />
        </div>
      </div>
    );
  }

  if (sortedOrders.length === 0) {
    return (
      <div className="card-lux p-6 md:p-8 border border-noir-800 bg-noir-900/80 animate-fade-in">
        <div className="py-16 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-noir-950 border border-noir-800 flex items-center justify-center mx-auto mb-5 text-gold-400/80">
            <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-2xl text-noir-50 font-medium mb-2">No Orders Yet</h3>
          <p className="text-sm text-noir-400 leading-relaxed mb-7">
            Orders placed with this email will appear here. Your fragrance journey is waiting to
            begin.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gold-400 hover:bg-gold-300 text-noir-950 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-gold-500/20"
          >
            <span>Discover Fragrances</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-end justify-between gap-4 pb-4 border-b border-noir-800">
        <div>
          <h3 className="font-serif text-xl font-semibold text-cream-50">Order History</h3>
          <p className="text-xs text-noir-400 mt-1">
            {sortedOrders.length} {sortedOrders.length === 1 ? 'order' : 'orders'} placed with this
            account.
          </p>
        </div>
        <Link
          href="/catalog"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-gold-400 hover:text-gold-300 transition-colors"
        >
          <span>Shop Again</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {sortedOrders.map((order) => {
        const isExpanded = expandedId === order.id;
        const meta = statusMeta(order.status);
        const activeStep = trackingStepIndex(order.status);
        const isClosed = order.status === 'cancelled' || order.status === 'returned';

        return (
          <div
            key={order.id}
            className="card-lux border border-noir-800 bg-noir-900/80 overflow-hidden"
          >
            <div className="p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-sm font-semibold text-cream-50 tracking-wide">
                      {order.orderNumber}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${meta.className}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                      {meta.label}
                    </span>
                  </div>
                  <p className="text-xs text-noir-500 mt-1.5">
                    Placed {formatOrderDate(order.createdAt)} · {order.items.length}{' '}
                    {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-noir-500">Total</p>
                  <p className="font-serif text-lg font-bold text-gold-300">
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <div className="flex -space-x-3">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div
                      key={`${item.productId}-${index}`}
                      className="relative w-11 h-14 rounded-lg overflow-hidden border border-noir-700 bg-noir-950 shrink-0"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-cream-100 truncate">
                    {order.items[0]?.name ?? 'Fragrance'}
                  </p>
                  <p className="text-xs text-noir-400">
                    {order.items[0]?.size} × {order.items[0]?.quantity}
                    {order.items.length > 1 ? ` + ${order.items.length - 1} more` : ''}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : order.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-noir-700 text-xs font-medium text-noir-300 hover:text-gold-300 hover:border-gold-400/40 transition-colors cursor-pointer shrink-0"
                >
                  <span>{isExpanded ? 'Hide' : 'Details'}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {isExpanded && (
              <div className="border-t border-noir-800 bg-noir-950/60 p-5 md:p-6 space-y-6">
                {isClosed ? (
                  <div className="rounded-xl border border-rose-500/25 bg-rose-500/5 p-4">
                    <p className="text-sm font-medium text-rose-300">
                      This order was {order.status}.
                    </p>
                    <p className="text-xs text-noir-400 mt-1">
                      If you have questions, please contact our concierge for assistance.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-noir-500 mb-3">
                      Delivery Progress
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {TRACKING_STEPS.map((step, index) => {
                        const isComplete = index <= activeStep;
                        return (
                          <div key={step} className="text-center">
                            <div
                              className={`w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center border ${
                                isComplete
                                  ? 'bg-gold-400/20 border-gold-400/40 text-gold-300'
                                  : 'bg-noir-900 border-noir-700 text-noir-500'
                              }`}
                            >
                              {isComplete ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <span className="text-[10px] font-mono">{index + 1}</span>
                              )}
                            </div>
                            <p
                              className={`text-[10px] ${
                                isComplete ? 'text-cream-100' : 'text-noir-500'
                              }`}
                            >
                              {step}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    {order.estimatedDelivery && (
                      <p className="text-[11px] text-noir-400 mt-3 flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-gold-400" />
                        <span>Estimated delivery: {order.estimatedDelivery}</span>
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-noir-500 mb-2">
                    Items
                  </p>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={`${item.productId}-${index}`} className="flex items-center gap-3">
                        <div className="relative w-12 h-16 rounded-lg overflow-hidden border border-noir-800 bg-noir-950 shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-cream-100 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-noir-500">
                            {item.size} · Qty {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-serif font-semibold text-gold-300 whitespace-nowrap">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl bg-noir-900 border border-noir-800 p-4">
                    <p className="text-[10px] uppercase tracking-wider text-noir-500 mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-400" />
                      <span>Delivery Address</span>
                    </p>
                    <p className="text-sm font-medium text-cream-100">
                      {order.address.fullName || order.customer.name}
                    </p>
                    <p className="text-xs text-noir-300 leading-relaxed mt-0.5">
                      {order.address.fullAddress}
                    </p>
                    <p className="text-xs text-noir-500 mt-0.5">
                      {order.address.area}, {order.address.district}, {order.address.division}
                    </p>
                    <p className="text-xs text-noir-300 mt-2 flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-gold-400" />
                      <span className="font-mono">
                        {order.address.phone || order.customer.phone}
                      </span>
                    </p>
                  </div>

                  <div className="rounded-xl bg-noir-900 border border-noir-800 p-4">
                    <p className="text-[10px] uppercase tracking-wider text-noir-500 mb-2 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-gold-400" />
                      <span>Payment</span>
                    </p>
                    <p className="text-sm font-medium text-cream-100">
                      {paymentMethodLabel(order.paymentMethod)}
                    </p>
                    <p className="text-xs text-noir-400 mt-0.5 capitalize">
                      Payment status: {order.paymentStatus}
                    </p>
                    <p className="text-xs text-noir-500 mt-1">
                      {order.paymentMethod === 'cod'
                        ? 'Amount due upon delivery.'
                        : 'Payment received and verified.'}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-noir-900 border border-noir-800 p-4 space-y-1.5 text-xs">
                  <div className="flex justify-between text-noir-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-noir-200">{formatPrice(order.subtotal)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>
                        Discount
                        {order.couponCode ? ` (${order.couponCode})` : ''}
                      </span>
                      <span className="font-mono">-{formatPrice(order.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-noir-400">
                    <span>Delivery</span>
                    <span className="font-mono text-noir-200">
                      {order.deliveryFee === 0 ? 'Free' : formatPrice(order.deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-noir-800 text-sm">
                    <span className="font-medium text-cream-100">Total</span>
                    <span className="font-serif text-lg font-bold text-gold-300">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/order-confirmed?orderNumber=${encodeURIComponent(order.orderNumber)}`}
                    className="btn-gold text-xs px-5 py-2.5 tracking-wider"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>View Receipt</span>
                  </Link>
                  <Link
                    href="/catalog"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-noir-700 text-xs font-medium text-noir-300 hover:text-cream-50 hover:border-noir-500 transition-colors"
                  >
                    <span>Continue Shopping</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
