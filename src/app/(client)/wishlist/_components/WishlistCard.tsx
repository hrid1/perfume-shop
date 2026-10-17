'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Star, ShoppingBag } from 'lucide-react';
import { WishlistItem, Product } from '@/types';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/config/app';
import { PRODUCTS } from '@/data/mockData';

interface WishlistCardProps {
  item: WishlistItem;
}

export function WishlistCard({ item }: WishlistCardProps) {
  const { removeItem } = useWishlist();
  const { addItem } = useCart();

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeItem(item.productId);
  };

  const handleMoveToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Look up full product in mock catalogue for variants
    const product = PRODUCTS.find(
      (p) => p.id === item.productId || p.slug === item.slug
    );

    if (product && product.sizes && product.sizes.length > 0) {
      addItem(product, product.sizes[0], 1);
    } else {
      // Fallback product structure if not found in catalog
      const fallbackProduct: Product = {
        id: item.productId,
        slug: item.slug,
        name: item.name,
        brand: item.brand,
        category: 'unisex',
        gender: 'unisex',
        price: item.price,
        discountPrice: item.discountPrice,
        images: [item.image],
        sizes: [
          {
            id: `variant-${item.productId}`,
            size: '50ml',
            price: item.price,
            discountPrice: item.discountPrice,
            stock: 10,
            sku: `SKU-${item.productId}`,
          },
        ],
        stock: 10,
        fragranceFamily: 'Woody',
        topNotes: [],
        middleNotes: [],
        baseNotes: [],
        concentration: 'EDP',
        longevity: '8-10 hours',
        sillage: 'Moderate',
        occasions: [],
        seasons: [],
        rating: 5,
        reviewCount: 1,
        description: '',
        scentDescription: '',
        featured: false,
        bestSeller: false,
        newArrival: false,
        trending: false,
        status: 'active',
        createdAt: item.addedAt,
      };
      addItem(fallbackProduct, fallbackProduct.sizes[0], 1);
    }

    // Remove from wishlist after moving to cart
    removeItem(item.productId);
  };

  return (
    <div className="group bg-noir-900 border border-noir-800 hover:border-gold-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col shadow-lg shadow-black/40">
      {/* Product Image Box */}
      <div className="relative aspect-[4/5] bg-noir-950 overflow-hidden">
        <Link href={`/perfume/${item.slug}`} className="block w-full h-full">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir-900 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Remove Button (X) */}
        <button
          onClick={handleRemove}
          aria-label={`Remove ${item.name} from wishlist`}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-noir-950/70 hover:bg-noir-800 active:scale-95 text-noir-300 hover:text-white border border-noir-700/60 backdrop-blur-sm flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md"
        >
          <X className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-noir-900">
        <div>
          {/* Brand */}
          <p className="text-[11px] uppercase tracking-widest text-gold-400/80 font-medium mb-1">
            {item.brand || 'NOIRÉ'}
          </p>

          {/* Name */}
          <Link href={`/perfume/${item.slug}`}>
            <h3 className="font-serif text-lg md:text-xl font-medium text-noir-100 group-hover:text-gold-300 transition-colors line-clamp-1 mb-1.5">
              {item.name}
            </h3>
          </Link>

          {/* View Details link */}
          <Link
            href={`/perfume/${item.slug}`}
            className="inline-flex items-center gap-1.5 text-xs text-noir-400 hover:text-gold-400 transition-colors mb-3"
          >
            <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
            <span>View details</span>
          </Link>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-base md:text-lg font-bold text-noir-50">
              {formatPrice(item.discountPrice || item.price)}
            </span>
            {item.discountPrice && item.discountPrice < item.price && (
              <span className="text-xs text-noir-500 line-through">
                {formatPrice(item.price)}
              </span>
            )}
          </div>
        </div>

        {/* Move to Cart Action Button */}
        <button
          onClick={handleMoveToCart}
          className="w-full py-2.5 px-4 rounded-xl bg-gold-400 hover:bg-gold-300 active:scale-[0.98] text-noir-950 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-gold-500/10 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>Move to Cart</span>
        </button>
      </div>
    </div>
  );
}
