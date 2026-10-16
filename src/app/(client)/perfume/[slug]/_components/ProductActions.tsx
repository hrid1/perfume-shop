'use client';

import React from 'react';
import {
  Star,
  Sparkles,
  Check,
  ShoppingBag,
  Zap,
  Heart,
  Minus,
  Plus,
} from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { formatPrice } from '@/config/app';

interface ProductActionsProps {
  product: Product;
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  addedToCart: boolean;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  currentPrice: number;
  originalPrice: number;
  hasDiscount: boolean;
}

export function ProductActions({
  product,
  selectedVariant,
  onSelectVariant,
  quantity,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
  addedToCart,
  isFavorited,
  onToggleFavorite,
  currentPrice,
  originalPrice,
  hasDiscount,
}: ProductActionsProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Brand & Name */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold-400">
            {product.brand}
          </span>
          {product.bestSeller && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-[10px] font-mono uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5" /> Best Seller
            </span>
          )}
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-noir-50 leading-tight">
          {product.name}
        </h1>
        <p className="font-serif italic text-noir-300/80 text-sm mt-2 leading-relaxed">
          &ldquo;{product.scentDescription}&rdquo;
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= Math.round(product.rating)
                  ? 'fill-gold-400 text-gold-400'
                  : 'fill-noir-700 text-noir-700'
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-sm font-bold text-gold-300">{product.rating}</span>
        <span className="text-xs text-noir-400">{product.reviewCount} reviews</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="font-mono text-3xl font-bold text-gold-300">
          {formatPrice(currentPrice)}
        </span>
        {hasDiscount && (
          <>
            <span className="font-mono text-lg text-noir-500 line-through">
              {formatPrice(originalPrice)}
            </span>
            <span className="text-xs font-mono bg-gold-400/10 text-gold-300 border border-gold-400/30 px-2 py-0.5 rounded-full">
              Save {formatPrice(originalPrice - currentPrice)}
            </span>
          </>
        )}
      </div>

      <div className="h-px bg-gradient-to-r from-noir-800 via-gold-400/20 to-noir-800" />

      {/* Size Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-noir-200 uppercase tracking-wider">Size</span>
          <span className="text-xs text-noir-400 font-mono">{selectedVariant.size} selected</span>
        </div>
        <div className="flex gap-3 flex-wrap">
          {product.sizes.map((variant) => {
            const vPrice = variant.discountPrice || variant.price;
            const isSelected = selectedVariant.id === variant.id;
            const outOfStock = variant.stock === 0;
            return (
              <button
                key={variant.id}
                onClick={() => {
                  if (!outOfStock) onSelectVariant(variant);
                }}
                disabled={outOfStock}
                className={`relative px-5 py-2.5 rounded-xl border text-sm font-mono transition-all duration-200 cursor-pointer ${
                  outOfStock
                    ? 'border-noir-800 text-noir-600 cursor-not-allowed opacity-50'
                    : isSelected
                    ? 'border-gold-400 bg-gold-400/10 text-gold-300 shadow-[0_0_15px_rgba(212,168,78,0.2)]'
                    : 'border-noir-700 bg-noir-900/60 text-noir-300 hover:border-noir-500 hover:text-noir-100'
                }`}
              >
                <span className="font-semibold">{variant.size}</span>
                <span className="block text-[10px] mt-0.5 opacity-75">{formatPrice(vPrice)}</span>
                {isSelected && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gold-400 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-noir-950" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-noir-200 uppercase tracking-wider">Quantity</span>
          <span className="text-xs font-mono">
            {selectedVariant.stock > 0 ? (
              <span className="text-green-400">{selectedVariant.stock} in stock</span>
            ) : (
              <span className="text-red-400">Out of stock</span>
            )}
          </span>
        </div>
        <div className="flex items-center bg-noir-900 border border-noir-700 rounded-xl overflow-hidden w-fit">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="w-11 h-11 flex items-center justify-center text-noir-300 hover:text-gold-300 hover:bg-noir-800 transition-colors cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-mono text-base font-bold text-noir-100 border-x border-noir-700">
            {quantity}
          </span>
          <button
            onClick={() => onQuantityChange(Math.min(selectedVariant.stock, quantity + 1))}
            className="w-11 h-11 flex items-center justify-center text-noir-300 hover:text-gold-300 hover:bg-noir-800 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={onAddToCart}
          disabled={selectedVariant.stock === 0}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-medium text-sm uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
            addedToCart
              ? 'bg-green-500/10 border-green-500/40 text-green-400'
              : 'bg-noir-900 border-noir-700 text-noir-100 hover:border-gold-400/50 hover:text-gold-300 hover:bg-gold-400/5'
          }`}
        >
          {addedToCart ? (
            <><Check className="w-4 h-4" /> Added to Bag</>
          ) : (
            <><ShoppingBag className="w-4 h-4" /> Add to Cart</>
          )}
        </button>
        <button
          onClick={onBuyNow}
          disabled={selectedVariant.stock === 0}
          className="flex-1 btn-gold py-3.5 text-sm cursor-pointer"
        >
          <Zap className="w-4 h-4" />
          Buy Now
        </button>
        <button
          onClick={onToggleFavorite}
          className={`w-12 h-12 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer ${
            isFavorited
              ? 'border-gold-400 bg-gold-400/10 text-gold-400'
              : 'border-noir-700 bg-noir-900 text-noir-400 hover:border-noir-500 hover:text-noir-200'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  );
}
