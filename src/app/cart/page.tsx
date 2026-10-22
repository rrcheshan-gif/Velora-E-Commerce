'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { SHIPPING_METHODS } from '@/data/mockData';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Truck,
  RotateCcw,
} from 'lucide-react';

export default function CartPage() {
  const {
    items,
    itemCount,
    removeItem,
    updateQuantity,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    selectedShippingMethod,
    setSelectedShippingMethod,
    subtotalUSD,
    discountUSD,
    shippingCostUSD,
    taxUSD,
    totalUSD,
  } = useCart();

  const { formatPrice } = useCurrency();
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ text: string; isError: boolean } | null>(null);

  const FREE_SHIPPING_THRESHOLD = 150;
  const progressToFreeShipping = Math.min(100, (subtotalUSD / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalUSD);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback({ text: res.message, isError: !res.success });
    if (res.success) {
      setCouponInput('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-velora-cream mx-auto flex items-center justify-center text-velora-gold-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-velora-black">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-neutral-500 max-w-md mx-auto">
          Explore our international marketplace for exceptional cashmere, acoustic monitors, luxury horology, and interior objects.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-velora-black text-white hover:bg-neutral-800 text-xs font-semibold uppercase tracking-widest rounded-md transition-colors"
        >
          <span>Discover Collections</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Title */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-100">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-velora-black">
            Shopping Bag
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your international order
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-neutral-400 hover:text-rose-600 transition-colors"
        >
          Clear all items
        </button>
      </div>

      {/* Free Shipping Progress Alert */}
      <div className="mb-8 p-4 bg-velora-gold-50/60 rounded-xl border border-velora-gold-200">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-medium text-velora-black">
            {subtotalUSD >= FREE_SHIPPING_THRESHOLD ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                You have qualified for Complimentary Worldwide Express Shipping!
              </span>
            ) : (
              <span>
                Add <strong className="font-bold text-velora-black">{formatPrice(remainingForFreeShipping)}</strong> more to unlock{' '}
                <strong className="text-velora-gold-700">Free Worldwide Express Shipping</strong>
              </span>
            )}
          </span>
          <span className="font-mono text-xs text-neutral-500">{Math.round(progressToFreeShipping)}%</span>
        </div>
        <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-velora-gold-500 to-velora-gold-400 rounded-full transition-all duration-500"
            style={{ width: `${progressToFreeShipping}%` }}
          />
        </div>
      </div>

      {/* Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Items List (8 cols) */}
        <div className="lg:col-span-8 divide-y divide-neutral-100">
          {items.map((item) => (
            <div key={item.id} className="py-6 first:pt-0 flex gap-5 group">
              {/* Product Thumbnail */}
              <Link
                href={`/product/${item.product.slug}`}
                className="relative w-24 h-32 sm:w-28 sm:h-36 bg-neutral-100 rounded-lg overflow-hidden shrink-0 border border-neutral-100"
              >
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  sizes="120px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Info & Quantity */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                        {item.product.categoryName}
                      </span>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="font-serif text-base sm:text-lg font-bold text-velora-black hover:text-velora-gold-600 block line-clamp-1 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                    </div>

                    <div className="text-right">
                      <div className="font-serif text-base font-bold text-velora-black">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-xs text-neutral-400">
                          {formatPrice(item.product.price)} each
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Selected Variants */}
                  <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500">
                    {item.selectedSize && (
                      <span className="bg-neutral-100 px-2 py-0.5 rounded text-[11px]">
                        Size: {item.selectedSize}
                      </span>
                    )}
                    {item.selectedColor && (
                      <span className="bg-neutral-100 px-2 py-0.5 rounded text-[11px]">
                        Color: {item.selectedColor}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Quantity & Delete */}
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center border border-neutral-200 rounded-md overflow-hidden bg-neutral-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-neutral-200 text-neutral-600"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-velora-black min-w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-neutral-200 text-neutral-600"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-neutral-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Shipping Method Selector inside Cart */}
          <div className="pt-8">
            <h3 className="font-serif text-base font-bold text-velora-black mb-3">
              Select International Shipping Option
            </h3>
            <div className="space-y-3">
              {SHIPPING_METHODS.map((method) => {
                const isFree = method.freeAboveUSD && subtotalUSD >= method.freeAboveUSD;
                const cost = isFree ? 0 : method.costUSD;
                const isSelected = selectedShippingMethod.id === method.id;

                return (
                  <label
                    key={method.id}
                    onClick={() => setSelectedShippingMethod(method)}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-velora-black bg-velora-cream/40 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={isSelected}
                        onChange={() => setSelectedShippingMethod(method)}
                        className="text-velora-black focus:ring-0 w-4 h-4"
                      />
                      <div>
                        <div className="text-xs font-bold text-velora-black">{method.name}</div>
                        <div className="text-[11px] text-neutral-500">{method.carrier} • {method.estimatedDays}</div>
                      </div>
                    </div>
                    <div className="text-right font-serif font-bold text-xs">
                      {cost === 0 ? (
                        <span className="text-emerald-700">Free</span>
                      ) : (
                        <span>{formatPrice(cost)}</span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200/80 space-y-6 sticky top-24">
            <h2 className="font-serif text-lg font-bold text-velora-black pb-4 border-b border-neutral-200">
              Order Summary
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-velora-gold-600" />
                <span>Promotional or VIP Code</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. VELORA10"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs uppercase bg-white border border-neutral-300 rounded-md focus:outline-none focus:border-velora-black"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-md hover:bg-black transition-colors"
                >
                  Apply
                </button>
              </div>

              {couponFeedback && (
                <p
                  className={`text-xs ${
                    couponFeedback.isError ? 'text-rose-600' : 'text-emerald-700'
                  }`}
                >
                  {couponFeedback.text}
                </p>
              )}

              {appliedCoupon && !couponFeedback && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-2 rounded border border-emerald-200">
                  <span>
                    Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.description})
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Totals Breakdown */}
            <div className="space-y-3 text-xs text-neutral-600 pt-4 border-t border-neutral-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-velora-black">{formatPrice(subtotalUSD)}</span>
              </div>

              {discountUSD > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>VIP Discount</span>
                  <span>-{formatPrice(discountUSD)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping ({selectedShippingMethod.name})</span>
                <span className="font-semibold text-velora-black">
                  {shippingCostUSD === 0 ? (
                    <span className="text-emerald-700">Free</span>
                  ) : (
                    formatPrice(shippingCostUSD)
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Import Clearance & VAT (5%)</span>
                <span className="font-semibold text-velora-black">{formatPrice(taxUSD)}</span>
              </div>

              <div className="flex justify-between items-baseline text-base font-bold text-velora-black pt-4 border-t border-neutral-200">
                <span>Total Amount</span>
                <span className="font-serif text-2xl text-velora-gold-600">
                  {formatPrice(totalUSD)}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <div className="space-y-3 pt-2">
              <Link
                href="/checkout"
                className="w-full py-4 px-6 bg-velora-black hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-widest rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-velora-gold-400" />
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/shop"
                className="w-full py-2.5 text-center text-xs text-neutral-500 hover:text-velora-black block font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Trust Assurances */}
            <div className="pt-4 border-t border-neutral-200 space-y-2 text-[11px] text-neutral-500">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Customs pre-cleared before border crossing</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                <span>30-Day international doorstep returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
