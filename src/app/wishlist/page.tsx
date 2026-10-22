'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/product/ProductCard';
import { Heart, Trash2, ShoppingBag, ArrowRight, Share2, Check } from 'lucide-react';

export default function WishlistPage() {
  const { items, itemCount, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const [copied, setCopied] = useState(false);

  const handleShareWishlist = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleMoveAllToBag = () => {
    items.forEach((item) => {
      addItem(item.product, 1);
    });
  };

  if (itemCount === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mx-auto">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-velora-black">
          Your Wishlist is Empty
        </h1>
        <p className="text-sm text-neutral-500 max-w-sm mx-auto">
          Save the garments, horology, and interior designs that capture your imagination to revisit or acquire later.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-velora-black text-white hover:bg-neutral-800 text-xs font-semibold uppercase tracking-widest rounded-md transition-colors"
        >
          <span>Discover The Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Wishlist Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-neutral-100 gap-4">
        <div>
          <div className="text-xs uppercase font-semibold tracking-widest text-velora-gold-600 mb-1">
            Curated Selections
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-velora-black">
            My Wishlist ({itemCount})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShareWishlist}
            className="px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-neutral-200 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Wishlist</span>
              </>
            )}
          </button>

          <button
            onClick={handleMoveAllToBag}
            className="px-4 py-2 bg-velora-black hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-velora-gold-400" />
            <span>Move All to Bag</span>
          </button>

          <button
            onClick={clearWishlist}
            className="p-2 text-neutral-400 hover:text-rose-600 transition-colors"
            title="Clear entire wishlist"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <ProductCard key={item.productId} product={item.product} />
        ))}
      </div>
    </div>
  );
}
