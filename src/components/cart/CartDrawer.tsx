'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck, Check } from 'lucide-react';

export function CartDrawer() {
  const {
    items,
    itemCount,
    removeItem,
    updateQuantity,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    subtotalUSD,
    discountUSD,
    totalUSD,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const { formatPrice } = useCurrency();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartDrawerOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 150;
  const progressToFreeShipping = Math.min(100, (subtotalUSD / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalUSD);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-velora-cream/40">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-velora-black" />
              <h2 className="font-serif text-lg font-bold tracking-wide text-velora-black">
                Your Shopping Bag ({itemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-neutral-400 hover:text-velora-black rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-velora-gold-50/50 px-5 py-3 border-b border-velora-gold-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-velora-black">
                {subtotalUSD >= FREE_SHIPPING_THRESHOLD ? (
                  <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Unlocked: Complimentary Global Express Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-velora-black font-semibold">{formatPrice(remainingForFreeShipping)}</strong> more for{' '}
                    <strong className="text-velora-gold-600">Free Express Shipping</strong>
                  </span>
                )}
              </span>
              <span className="text-neutral-500 font-mono text-[11px]">{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-velora-gold-500 to-velora-gold-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-velora-cream flex items-center justify-center mb-4 text-velora-gold-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-velora-black mb-1">
                  Your bag is currently empty
                </h3>
                <p className="text-sm text-neutral-500 max-w-xs mb-6">
                  Explore our curated seasonal collection of fine fashion, audio, horology, and home objects.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="px-6 py-2.5 bg-velora-black text-white text-xs font-semibold uppercase tracking-widest rounded-md hover:bg-neutral-800 transition-colors"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 group">
                  {/* Thumbnail */}
                  <Link
                    href={`/product/${item.product.slug}`}
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="relative w-20 h-24 bg-neutral-100 rounded-md overflow-hidden shrink-0 border border-neutral-100"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="font-serif text-sm font-semibold text-velora-black hover:text-velora-gold-600 transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-rose-600 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variant Badges */}
                      <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
                        {item.selectedSize && (
                          <span className="bg-neutral-100 px-1.5 py-0.5 rounded text-[11px]">
                            {item.selectedSize}
                          </span>
                        )}
                        {item.selectedColor && (
                          <span className="bg-neutral-100 px-1.5 py-0.5 rounded text-[11px]">
                            {item.selectedColor}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity & Unit Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-neutral-200 rounded-md overflow-hidden bg-neutral-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-neutral-200 text-neutral-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-velora-black min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-neutral-200 text-neutral-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-bold text-velora-black">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[11px] text-neutral-400">
                            {formatPrice(item.product.price)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Controls & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-neutral-50/70 space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. VELORA10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs uppercase bg-white border border-neutral-200 rounded-md focus:outline-none focus:border-velora-black"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-800 text-white text-xs font-semibold rounded-md hover:bg-black transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-xs ${
                      promoMessage.isError ? 'text-rose-600' : 'text-emerald-700'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
                {appliedCoupon && !promoMessage && (
                  <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-2.5 py-1.5 rounded border border-emerald-200">
                    <span>
                      Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.description})
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Subtotal & Totals */}
              <div className="space-y-1.5 text-xs text-neutral-600 pt-2 border-t border-neutral-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-velora-black">{formatPrice(subtotalUSD)}</span>
                </div>
                {discountUSD > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>VIP Promotion Discount</span>
                    <span>-{formatPrice(discountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="text-neutral-500">
                    {subtotalUSD >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="text-emerald-700 font-semibold">Free</span>
                    ) : (
                      'Calculated at checkout'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-velora-black pt-2 border-t border-neutral-200">
                  <span>Estimated Total</span>
                  <span className="font-serif text-base text-velora-gold-600">
                    {formatPrice(totalUSD)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full py-3.5 px-4 bg-velora-black text-white hover:bg-neutral-800 font-semibold text-xs uppercase tracking-widest rounded-md flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-velora-gold-400" />
                  <span>Secure International Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full py-2.5 px-4 bg-white border border-neutral-300 text-velora-black hover:bg-neutral-100 font-semibold text-xs uppercase tracking-widest rounded-md flex items-center justify-center transition-colors"
                >
                  View Full Cart & Summary
                </Link>
              </div>

              <div className="text-[10px] text-center text-neutral-400 flex items-center justify-center gap-3">
                <span>🔒 256-Bit SSL Encryption</span>
                <span>•</span>
                <span>30-Day Global Returns</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
