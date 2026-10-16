'use client';

import React from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Product } from '@/types';

interface ProductGalleryProps {
  product: Product;
  activeImage: number;
  onSelectImage: (index: number) => void;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  hasDiscount: boolean;
  discountPct: number;
}

export function ProductGallery({
  product,
  activeImage,
  onSelectImage,
  isFavorited,
  onToggleFavorite,
  hasDiscount,
  discountPct,
}: ProductGalleryProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-noir-900 border border-noir-800/80">
        <Image
          src={product.images[activeImage] ?? product.images[0]}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-all duration-500 brightness-90 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.bestSeller && (
            <span className="px-2.5 py-1 rounded-full bg-gold-400 text-noir-950 font-bold text-[10px] uppercase tracking-wider shadow-md">
              Best Seller
            </span>
          )}
          {product.newArrival && (
            <span className="px-2.5 py-1 rounded-full bg-noir-800 border border-gold-400/40 text-gold-300 font-mono text-[10px] uppercase tracking-wider">
              New Arrival
            </span>
          )}
          {hasDiscount && (
            <span className="px-2.5 py-1 rounded-full bg-noir-900/90 border border-noir-700 text-noir-200 font-mono text-[10px] uppercase tracking-wider">
              -{discountPct}% OFF
            </span>
          )}
        </div>

        <button
          onClick={onToggleFavorite}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
            isFavorited
              ? 'bg-gold-400 text-noir-950 shadow-lg scale-110'
              : 'bg-noir-950/60 text-noir-300 hover:text-gold-300 hover:bg-noir-900/80'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>
      </div>

      {product.images.length > 1 && (
        <div className="flex gap-3">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => onSelectImage(i)}
              className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 cursor-pointer ${
                activeImage === i
                  ? 'border-gold-400 shadow-[0_0_12px_rgba(212,168,78,0.35)]'
                  : 'border-noir-800 hover:border-noir-600'
              }`}
            >
              <Image
                src={img}
                alt={`${product.name} view ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
