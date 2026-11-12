'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Package,
  Truck,
  Check,
  Copy,
  Printer,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  MapPin,
  Phone,
  CreditCard,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { formatPrice } from '@/config/app';
import type { Order } from '@/types';

function OrderConfirmedContent() {
  const searchParams = useSearchParams();
  const orderNumberParam = searchParams.get('orderNumber');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      // 1. Try to match specific order by orderNumber from history
      const savedHistory = localStorage.getItem('amros_orders_history');
      if (savedHistory && orderNumberParam) {
        const history: Order[] = JSON.parse(savedHistory);
        const match = history.find((o) => o.orderNumber === orderNumberParam);
        if (match) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setOrder(match);
          setIsLoaded(true);
          return;
        }
      }

      // 2. Fallback to last placed order
      const lastOrder = localStorage.getItem('amros_last_order');
      if (lastOrder) {
        const parsed: Order = JSON.parse(lastOrder);
        if (!orderNumberParam || parsed.orderNumber === orderNumberParam) {
          setOrder(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load order from storage', e);
    } finally {
      setIsLoaded(true);
    }
  }, [orderNumberParam]);

  const handleCopyOrderNumber = () => {
    if (!order?.orderNumber) return;
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isLoaded) {
    return (
      <div className="container-lux py-24 text-center">
        <div className="w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-mono text-noir-400">Loading order receipt...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-lux py-24 max-w-xl text-center animate-fade-in">
        <div className="card-lux p-10 border border-noir-800 bg-noir-900/80">
          <div className="w-16 h-16 rounded-full bg-noir-800 border border-noir-700 flex items-center justify-center mx-auto mb-6 text-noir-400">
            <ShoppingBag className="w-8 h-8 stroke-1 text-gold-400/60" />
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-400 block mb-2">
            No Recent Order
          </span>
          <h1 className="font-serif text-3xl font-semibold text-noir-50 mb-3">
            No Active Order Found
          </h1>
          <p className="text-sm text-noir-400 leading-relaxed mb-8">
            We couldn&apos;t locate the requested order details. If you recently placed an order, please check your confirmation SMS or contact our concierge.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/catalog" className="btn-gold text-xs px-8 py-3.5 tracking-wider w-full sm:w-auto">
              <span>Explore Fragrances</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/8801700000000?text=${encodeURIComponent(
                'Hello Amros Perfumes, I have an inquiry about my recent order.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full border border-noir-700 text-xs font-medium text-noir-300 hover:text-gold-300 hover:border-gold-400/40 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Contact Concierge</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Amros Perfumes Concierge! I have placed order #${order.orderNumber} for ${formatPrice(
      order.total
    )}. Recipient: ${order.customer.name} (${order.customer.phone}). Please confirm delivery timing.`
  );

  return (
    <div className="container-lux py-12 md:py-16 max-w-4xl animate-fade-in print:py-4">
      {/* ── Top Success Hero Card ── */}
      <div className="card-lux p-8 md:p-12 border border-gold-400/40 bg-gradient-to-b from-noir-900 via-noir-950 to-noir-950 shadow-2xl relative overflow-hidden mb-8 text-center">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gold-400/5 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Confirmation Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-mono uppercase tracking-[0.2em] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Order Confirmed & Allocated</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-noir-50 mb-3 tracking-tight">
          Thank You, {order.customer.name || 'Valued Client'}
        </h1>
        <p className="text-sm sm:text-base text-noir-300 max-w-xl mx-auto mb-6 font-light leading-relaxed">
          Your fragrance order has been received. Our Dhaka concierge team is preparing your selection with our signature ebony velvet packaging and wax seal.
        </p>

        {/* Order Number Badge */}
        <div className="inline-flex items-center gap-3 bg-noir-900/90 border border-noir-700/80 px-5 py-2.5 rounded-full text-xs">
          <span className="text-noir-400">Order Reference:</span>
          <span className="font-mono font-bold text-gold-300 text-sm tracking-wider">
            {order.orderNumber}
          </span>
          <button
            onClick={handleCopyOrderNumber}
            className="text-noir-400 hover:text-gold-300 transition-colors p-1 flex items-center gap-1 cursor-pointer"
            title="Copy Order Reference"
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
      </div>

      {/* ── Order Status Tracker ── */}
      <div className="card-lux p-6 md:p-8 border border-noir-800 bg-noir-900/80 mb-8 print:hidden">
        <h3 className="text-xs uppercase tracking-[0.18em] text-gold-400 font-semibold mb-6 flex items-center gap-2">
          <span>Delivery Progress</span>
          <span className="h-px bg-noir-800 flex-1" />
          <span className="text-noir-400 font-mono text-[11px] normal-case">
            Est. {order.estimatedDelivery}
          </span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
          {/* Step 1: Placed */}
          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-noir-950 border border-emerald-500/30">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 font-bold text-sm">
              <Check className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-cream-50">Order Received</p>
            <p className="text-[11px] text-emerald-400/90 mt-0.5 font-mono">Confirmed</p>
          </div>

          {/* Step 2: Packaging */}
          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-noir-950 border border-gold-400/40 relative">
            <div className="w-10 h-10 rounded-full bg-gold-400/20 text-gold-300 flex items-center justify-center mb-2 font-bold text-sm relative">
              <Package className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold-400 animate-ping" />
            </div>
            <p className="text-xs font-semibold text-cream-50">Wax Seal & Pack</p>
            <p className="text-[11px] text-gold-300 mt-0.5 font-mono">In Progress</p>
          </div>

          {/* Step 3: Courier */}
          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-noir-950/60 border border-noir-800 opacity-60">
            <div className="w-10 h-10 rounded-full bg-noir-900 text-noir-400 flex items-center justify-center mb-2">
              <Truck className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-noir-300">Handed to Courier</p>
            <p className="text-[11px] text-noir-500 mt-0.5 font-mono">Pending</p>
          </div>

          {/* Step 4: Delivered */}
          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-noir-950/60 border border-noir-800 opacity-60">
            <div className="w-10 h-10 rounded-full bg-noir-900 text-noir-400 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-noir-300">Delivered</p>
            <p className="text-[11px] text-noir-500 mt-0.5 font-mono">Pending</p>
          </div>
        </div>
      </div>

      {/* ── Two Column Details: Receipt & Shipping ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left Column: Items Purchased (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="card-lux p-6 border border-noir-800 bg-noir-900/80">
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
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
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

            {/* Financial Summary */}
            <div className="mt-6 pt-4 border-t border-noir-800 space-y-2 text-xs">
              <div className="flex justify-between text-noir-400">
                <span>Subtotal</span>
                <span className="text-noir-200 font-mono">{formatPrice(order.subtotal)}</span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span className="flex items-center gap-1">
                    <span>Discount</span>
                    {order.couponCode && (
                      <span className="font-mono text-[10px] bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-500/30">
                        {order.couponCode}
                      </span>
                    )}
                  </span>
                  <span className="font-mono">-{formatPrice(order.discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-noir-400">
                <span>Delivery Fee</span>
                <span className="font-mono text-noir-200">
                  {order.deliveryFee === 0 ? (
                    <span className="text-gold-400 font-medium">Free Delivery</span>
                  ) : (
                    formatPrice(order.deliveryFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between items-baseline pt-3 border-t border-noir-800 text-sm">
                <span className="font-medium text-cream-50">Total Amount</span>
                <span className="font-serif text-xl font-bold text-gold-300">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customer & Delivery Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Shipping Address */}
          <div className="card-lux p-6 border border-noir-800 bg-noir-900/80">
            <h3 className="text-xs uppercase tracking-[0.18em] text-gold-400 font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Delivery Destination</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-noir-400 text-[11px]">Recipient Name:</p>
                <p className="font-semibold text-cream-50 text-sm mt-0.5">
                  {order.address.fullName || order.customer.name}
                </p>
              </div>

              <div>
                <p className="text-noir-400 text-[11px]">Contact Phone:</p>
                <p className="font-mono font-medium text-cream-100 mt-0.5 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-gold-400" />
                  <span>{order.address.phone || order.customer.phone}</span>
                </p>
              </div>

              <div>
                <p className="text-noir-400 text-[11px]">Shipping Address:</p>
                <p className="text-noir-200 mt-0.5 leading-relaxed">
                  {order.address.fullAddress}
                </p>
                <p className="text-noir-400 text-[11px] mt-0.5">
                  {order.address.area}, {order.address.district}, {order.address.division}
                </p>
              </div>

              {order.address.instructions && (
                <div className="pt-2 border-t border-noir-800">
                  <p className="text-noir-400 text-[11px]">Special Instructions:</p>
                  <p className="text-noir-300 italic mt-0.5 font-light">
                    &ldquo;{order.address.instructions}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment & Security */}
          <div className="card-lux p-6 border border-noir-800 bg-noir-900/80">
            <h3 className="text-xs uppercase tracking-[0.18em] text-gold-400 font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Payment Details</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-noir-400">Method:</span>
                <span className="px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold uppercase border bg-noir-950 border-noir-700 text-gold-300">
                  {order.paymentMethod === 'cod'
                    ? 'Cash on Delivery'
                    : order.paymentMethod.toUpperCase()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-noir-400">Payment Status:</span>
                <span className="text-emerald-400 font-medium capitalize">
                  {order.paymentMethod === 'cod' ? 'Due upon Delivery' : 'Paid / Verified'}
                </span>
              </div>

              <div className="pt-3 border-t border-noir-800 text-[11px] text-noir-400 leading-relaxed flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {order.paymentMethod === 'cod'
                    ? 'Please keep the exact amount ready in cash when the delivery agent arrives.'
                    : 'Your transaction has been securely processed and confirmed with our concierge.'}
                </span>
              </div>
            </div>
          </div>

          {/* Concierge Support Card */}
          <div className="card-lux p-6 border border-gold-400/20 bg-gradient-to-br from-noir-900 to-noir-950 text-xs">
            <p className="text-gold-300 font-serif text-sm font-semibold mb-1">
              Dhaka Concierge Service
            </p>
            <p className="text-noir-400 mb-4 font-light leading-relaxed">
              Have questions about batch codes or need express delivery adjustment?
            </p>
            <a
              href={`https://wa.me/8801700000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-colors flex items-center justify-center gap-2 font-medium cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom Action Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-noir-800 print:hidden">
        <Link
          href="/catalog"
          className="btn-gold py-3.5 px-8 text-xs tracking-wider flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <span>Continue Discovering Fragrances</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <button
          onClick={handlePrint}
          className="py-3 px-6 rounded-full border border-noir-700 bg-noir-900 text-noir-300 hover:text-cream-50 hover:border-noir-500 text-xs font-medium transition-colors flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
        >
          <Printer className="w-4 h-4 text-gold-400" />
          <span>Print Receipt</span>
        </button>
      </div>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense
      fallback={
        <div className="container-lux py-24 text-center">
          <div className="w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-mono text-noir-400">Loading order receipt...</p>
        </div>
      }
    >
      <OrderConfirmedContent />
    </Suspense>
  );
}
