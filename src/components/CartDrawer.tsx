'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/config/app';
import { useOverlay } from '@/hooks/useOverlay';
import { OrderTotals } from '@/components/order';

export function CartDrawer() {
  const {
    items,
    selectedItems,
    toggleItemSelection,
    removeItem,
    updateQuantity,
    isCartOpen,
    closeCart,
    totalItems,
    subtotal,
    discount,
    couponCode,
    couponError,
    getMaxQuantity,
    deliveryFee,
    total,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
  } = useCart();

  useOverlay(isCartOpen, closeCart);

  const progressPercent = Math.min(
    100,
    Math.round(((freeDeliveryThreshold - amountNeededForFreeDelivery) / freeDeliveryThreshold) * 100)
  );

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
        role="dialog"
        aria-modal="true"
        aria-label="Your scent bag"
        className={`relative w-full max-w-md bg-noir-950 border-l border-noir-800 text-noir-50 flex flex-col h-full shadow-[-10px_0_35px_rgba(0,0,0,0.85)] z-10 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
            <span className="text-[10px] text-noir-500">
              {selectedItems.length} selected
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close bag"
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
              <Link
                href="/catalog"
                onClick={closeCart}
                className="btn-gold text-xs tracking-wider"
              >
                Explore Catalog
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 flex gap-4 first:pt-0">
                <input
                  type="checkbox"
                  checked={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
                  onChange={(event) => toggleItemSelection(item.id, event.target.checked)}
                  aria-label={`Select ${item.name} for checkout`}
                  className="mt-1 h-4 w-4 shrink-0 accent-gold-400 cursor-pointer"
                />
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
                        aria-label={`Remove ${item.name} from bag`}
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
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="p-1 hover:text-gold-400 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-mono">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= getMaxQuantity(item)}
                        aria-label={`Increase quantity of ${item.name}`}
                        title={
                          item.quantity >= getMaxQuantity(item)
                            ? `Only ${getMaxQuantity(item)} available`
                            : undefined
                        }
                        className="p-1 hover:text-gold-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-inherit"
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
            {couponCode && couponError && (
              <p className="text-[11px] text-amber-300/90 bg-amber-500/10 border border-amber-500/20 rounded px-3 py-2">
                {couponCode}: {couponError}
              </p>
            )}

            <OrderTotals
              subtotal={subtotal}
              discount={discount}
              couponCode={couponCode}
              deliveryFee={deliveryFee}
              total={total}
              deliveryLabel="Estimated Delivery"
              totalLabel="Grand Total"
            />

            {/* CTA Button */}
            <Link
              href="/checkout"
              onClick={(event) => {
                if (selectedItems.length === 0) {
                  event.preventDefault();
                  return;
                }
                closeCart();
              }}
              aria-disabled={selectedItems.length === 0}
              tabIndex={selectedItems.length === 0 ? -1 : undefined}
              className={`w-full btn-gold py-3 text-center flex items-center justify-center gap-2 mt-2 group ${
                selectedItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>{selectedItems.length === 0 ? 'Select products to continue' : 'Proceed to Checkout'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
