'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star } from 'lucide-react';
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

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    <div className="group flex flex-col">
      {/* ── IMAGE ── */}
      <Link
        href={`/perfume/${product.slug}`}
        className="relative block aspect-[2/3] overflow-hidden bg-noir-900"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950/60 via-transparent to-transparent" />

        {/* Wishlist — always visible, top-right */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${
            isFavorited
              ? 'bg-gold-400 text-noir-950'
              : 'bg-noir-950/40 text-white/60 hover:text-white hover:bg-noir-950/70 backdrop-blur-sm'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Sale badge — top-left, only when discounted */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 z-20 px-2 py-[3px] text-[9px] font-semibold uppercase tracking-[0.12em] bg-gold-400 text-noir-950">
            Sale
          </span>
        )}

        {/* Quick Add — slides up from bottom on hover */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            onClick={handleQuickAdd}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-noir-950/90 backdrop-blur-sm text-white/90 text-[11px] font-medium tracking-[0.14em] uppercase hover:bg-gold-400 hover:text-noir-950 transition-colors duration-200"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Bag
          </button>
        </div>
      </Link>

      {/* ── INFO ── */}
      <div className="pt-3.5 flex flex-col gap-[3px]">
        {/* Brand */}
        <p className="text-[10px] uppercase tracking-[0.16em] text-noir-500 font-medium">
          {product.brand}
        </p>

        {/* Name */}
        <Link href={`/perfume/${product.slug}`}>
          <h3 className="font-serif text-[15px] leading-snug text-noir-100 line-clamp-1 group-hover:text-gold-300 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 pt-0.5">
          <Star className="w-2.5 h-2.5 fill-gold-400 text-gold-400" />
          <span className="text-[11px] text-noir-300">{product.rating}</span>
          <span className="text-[10px] text-noir-600">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 pt-1">
          <span className="text-sm font-semibold text-gold-300 font-mono tracking-tight">
            {formatPrice(currentPrice)}
          </span>
          {hasDiscount && (
            <span className="text-[11px] text-noir-600 line-through font-mono">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
