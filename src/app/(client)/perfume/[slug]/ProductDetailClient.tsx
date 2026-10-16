'use client';

import React, { useState } from 'react';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import {
  ProductBreadcrumb,
  ProductGallery,
  ProductActions,
  ProductTrustBadges,
  ProductFragranceSpecs,
  ProductNotesPyramid,
  ProductStory,
} from './_components';

interface Props {
  product: Product;
}

export function ProductDetailClient({ product }: Props) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const currentPrice = selectedVariant.discountPrice || selectedVariant.price;
  const originalPrice = selectedVariant.price;
  const hasDiscount =
    selectedVariant.discountPrice != null &&
    selectedVariant.discountPrice < selectedVariant.price;
  const discountPct = hasDiscount
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant, quantity);
  };

  const categoryLabel =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <div className="container-lux py-8 md:py-12 animate-fade-in">
      <ProductBreadcrumb
        category={product.category}
        categoryLabel={categoryLabel}
        productName={product.name}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
        <ProductGallery
          product={product}
          activeImage={activeImage}
          onSelectImage={setActiveImage}
          isFavorited={isFavorited}
          onToggleFavorite={() => toggleWishlist(product)}
          hasDiscount={hasDiscount}
          discountPct={discountPct}
        />

        <div className="flex flex-col gap-6">
          <ProductActions
            product={product}
            selectedVariant={selectedVariant}
            onSelectVariant={setSelectedVariant}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            addedToCart={addedToCart}
            isFavorited={isFavorited}
            onToggleFavorite={() => toggleWishlist(product)}
            currentPrice={currentPrice}
            originalPrice={originalPrice}
            hasDiscount={hasDiscount}
          />

          <ProductTrustBadges />

          <ProductFragranceSpecs product={product} />

          <ProductNotesPyramid product={product} />

          <ProductStory description={product.description} />
        </div>
      </div>
    </div>
  );
}
