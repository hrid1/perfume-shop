'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/config/app';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const currentPrice = product.discountPrice || product.price;
  const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.price);
  const discountAmount = hasDiscount ? product.price - (product.discountPrice || 0) : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to the first size variant
    if (product.sizes.length > 0) {
      addItem(product, product.sizes[0], 1);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group card-lux flex flex-col justify-between overflow-hidden relative border border-noir-800/80 bg-noir-900/60 hover:border-gold-400/40 transition-all duration-300">
      {/* Top Badges & Wishlist Button */}
      <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1 pointer-events-auto">
          {hasDiscount && (
            <span className="px-2 py-0.5 rounded-full bg-gold-400 text-noir-950 font-bold text-[10px] uppercase tracking-wider shadow-md">
              Save {formatPrice(discountAmount)}
            </span>
          )}
          {product.featured && (
            <span className="px-2 py-0.5 rounded-full bg-noir-950/80 border border-gold-400/30 text-gold-300 font-mono text-[9px] uppercase tracking-wider backdrop-blur-sm">
              Featured
            </span>
          )}
          {product.bestSeller && (
            <span className="px-2 py-0.5 rounded-full bg-noir-950/80 border border-noir-700 text-noir-200 font-mono text-[9px] uppercase tracking-wider backdrop-blur-sm">
              Bestseller
            </span>
          )}
        </div>

        <button
          onClick={handleToggleWishlist}
          className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isFavorited
              ? 'bg-gold-400 text-noir-950 scale-110 shadow-lg'
              : 'bg-noir-950/60 text-noir-300 hover:text-gold-300 hover:bg-noir-900'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Image Area */}
      <Link href={`/perfume/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-noir-950">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.85] contrast-[1.12]"
        />
        {/* Subtle Dark Vignette & Gold Tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-transparent to-transparent opacity-80" />

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleQuickAdd}
            className="w-full btn-gold py-2.5 text-xs font-medium flex items-center justify-center gap-2 shadow-xl"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag &bull; {product.sizes[0]?.size || 'Bottle'}</span>
          </button>
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-noir-400 mb-1.5">
            <span className="uppercase tracking-widest font-mono text-[10px] text-gold-400/90">
              {product.fragranceFamily} &bull; {product.concentration}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-gold-300">
              <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
              <span>{product.rating}</span>
              <span className="text-noir-500 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          <Link href={`/perfume/${product.slug}`} className="block group-hover:text-gold-200 transition-colors">
            <h3 className="font-serif text-lg font-medium text-noir-100 line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-noir-400 line-clamp-1 mt-0.5">{product.brand}</p>

          <p className="text-[11px] text-noir-400 italic line-clamp-1 mt-2 font-serif text-noir-300/80">
            &ldquo;{product.scentDescription}&rdquo;
          </p>
        </div>

        {/* Price & Variant Pill */}
        <div className="pt-3 mt-3 border-t border-noir-800/80 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-bold text-gold-300">
              {formatPrice(currentPrice)}
            </span>
            {hasDiscount && (
              <span className="font-mono text-xs text-noir-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono text-noir-400 px-2 py-0.5 rounded bg-noir-800/60 border border-noir-700/50">
            {product.sizes[0]?.size || '50ml'}
          </span>
        </div>
      </div>
    </div>
  );
}
