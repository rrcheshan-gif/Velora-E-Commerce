'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const discountPercentage =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Pick first variant if exists
    const defaultSize = product.variants?.sizes?.[0];
    const defaultColor = product.variants?.colors?.[0]?.name;

    addItem(product, 1, defaultSize, defaultColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <div
      className={`group relative flex flex-col bg-white rounded-lg border border-neutral-100/80 overflow-hidden transition-all duration-300 hover:shadow-card hover:border-neutral-200 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/5] w-full bg-neutral-100 overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {discountPercentage && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-velora-black text-white rounded">
              -{discountPercentage}%
            </span>
          )}
          {product.isBestSeller && !discountPercentage && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-velora-gold-500 text-white rounded shadow-sm">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-velora-black border border-neutral-200 rounded">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
            isFavorited
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 hover:bg-white text-neutral-600 hover:text-velora-black backdrop-blur-sm'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isFavorited ? 'fill-rose-600 scale-110' : ''
            }`}
          />
        </button>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10 hidden sm:block">
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-widest rounded shadow-lg flex items-center justify-center gap-2 transition-all ${
              added
                ? 'bg-emerald-700 text-white'
                : 'bg-velora-black/90 hover:bg-black text-white backdrop-blur-md'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : product.inStock ? (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-velora-gold-400" />
                <span>Quick Add</span>
              </>
            ) : (
              <span>Out of Stock</span>
            )}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Color Swatches */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
            <span className="uppercase tracking-wider hover:text-velora-gold-600 transition-colors">
              {product.categoryName}
            </span>

            {/* Color Swatch dots */}
            {product.variants?.colors && (
              <div className="flex items-center gap-1">
                {product.variants.colors.slice(0, 3).map((col) => (
                  <span
                    key={col.name}
                    title={col.name}
                    className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                    style={{ backgroundColor: col.hex }}
                  />
                ))}
                {product.variants.colors.length > 3 && (
                  <span className="text-[9px] text-neutral-400 font-medium">
                    +{product.variants.colors.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block group/link">
            <h3 className="font-serif text-sm font-semibold text-velora-black group-hover/link:text-velora-gold-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Tagline */}
          <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Rating and Price */}
        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3.5 h-3.5 fill-velora-gold-500 text-velora-gold-500" />
            <span className="font-semibold text-velora-black">{product.rating.toFixed(1)}</span>
            <span className="text-neutral-400 text-[11px]">({product.reviewCount})</span>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1.5">
              {product.compareAtPrice && (
                <span className="text-xs text-neutral-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              <span className="font-semibold text-sm text-velora-black">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Quick Add Button */}
        <div className="sm:hidden mt-3">
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className="w-full py-2 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-velora-gold-400" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
}
