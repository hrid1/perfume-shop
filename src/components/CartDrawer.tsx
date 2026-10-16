'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/config/app';

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    isCartOpen,
    closeCart,
    totalItems,
    subtotal,
    discount,
    couponCode,
    applyCoupon,
    removeCoupon,
    deliveryFee,
    total,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Support closing with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  const progressPercent = Math.min(
    100,
    Math.round(((freeDeliveryThreshold - amountNeededForFreeDelivery) / freeDeliveryThreshold) * 100)
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponInput('');
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${
        isCartOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible delay-300'
      }`}
      aria-hidden={!isCartOpen}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isCartOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCart}
      />

      {/* Drawer content - Right side slide-in with luxury easing */}
      <div
        className={`relative w-full max-w-md bg-noir-950 border-l border-noir-800 text-noir-50 flex flex-col h-full shadow-[-10px_0_35px_rgba(0,0,0,0.85),0_0_25px_rgba(212,168,78,0.06)] z-10 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-noir-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-gold-400" />
            <h2 className="font-serif text-xl tracking-wide font-medium">Your Scent Bag</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-noir-800 text-gold-400 border border-gold-400/20">
              {totalItems}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-full text-noir-400 hover:text-noir-100 hover:bg-noir-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-noir-900/90 border-b border-noir-800 px-5 py-3.5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="flex items-center gap-1.5 text-noir-300">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              {amountNeededForFreeDelivery > 0 ? (
                <>
                  Add <strong className="text-gold-300">{formatPrice(amountNeededForFreeDelivery)}</strong> for{' '}
                  <span className="text-gold-400 font-medium">Free Delivery</span>
                </>
              ) : (
                <span className="text-gold-300 font-medium">✨ You unlocked Free Express Delivery!</span>
              )}
            </span>
            <span className="text-noir-400 font-mono text-[11px]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-noir-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200 h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-noir-800/60">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-noir-900 border border-noir-800 flex items-center justify-center mb-4 text-noir-500">
                <ShoppingBag className="w-8 h-8 stroke-1 text-gold-400/60" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-1">Your bag is empty</h3>
              <p className="text-sm text-noir-400 max-w-xs mb-6">
                Discover exceptional haute fragrances to elevate your personal presence.
              </p>
              <button
                onClick={closeCart}
                className="btn-gold text-xs tracking-wider"
              >
                Explore Catalog
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 flex gap-4 first:pt-0">
                <div className="relative w-20 h-24 rounded bg-noir-900 border border-noir-800 overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-serif text-base font-medium text-noir-100 leading-snug">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-noir-500 hover:text-red-400 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-gold-400/80 font-mono mt-0.5">{item.size}</p>
                    <p className="text-xs text-noir-400 mt-0.5">{item.brand}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-noir-900">
                    <div className="flex items-center border border-noir-700 rounded-full bg-noir-900">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-gold-400 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-mono">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-gold-400 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-mono text-sm text-gold-300 font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout CTA */}
        {items.length > 0 && (
          <div className="p-5 border-t border-noir-800 bg-noir-900/60 flex flex-col gap-3">
            {/* Coupon Code */}
            {couponCode ? (
              <div className="flex items-center justify-between px-3 py-2 bg-gold-400/10 border border-gold-400/30 rounded text-xs">
                <div className="flex items-center gap-1.5 text-gold-300 font-mono">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{couponCode}</span>
                  <span className="text-gold-200">(-{formatPrice(discount)})</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-noir-400 hover:text-noir-100 text-[11px] underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. WELCOME10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-noir-950 border border-noir-800 px-3 py-1.5 text-xs rounded text-noir-200 placeholder:text-noir-500 focus:outline-none focus:border-gold-400 uppercase tracking-wider"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-noir-800 hover:bg-noir-700 border border-noir-700 text-xs font-medium rounded text-gold-300 transition-colors uppercase tracking-wider"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-noir-300 pt-2 border-t border-noir-800/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-noir-100">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-gold-400">
                  <span>Promo Discount</span>
                  <span className="font-mono">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="font-mono text-noir-100">
                  {deliveryFee === 0 ? (
                    <span className="text-gold-400 uppercase tracking-wider text-[11px]">Free</span>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-medium text-noir-50 pt-2 border-t border-noir-800">
                <span className="font-serif text-base">Grand Total</span>
                <span className="font-mono text-base text-gold-300 font-bold">{formatPrice(total)}</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full btn-gold py-3 text-center flex items-center justify-center gap-2 mt-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
