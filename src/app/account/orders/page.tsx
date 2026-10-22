'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Package, Truck, ArrowLeft, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

export default function OrderHistoryPage() {
  const { orders, isAuthenticated } = useAuth();
  const { formatPrice } = useCurrency();
  const [filter, setFilter] = useState<string>('all');

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Patron Access Required</h2>
        <p className="text-xs text-neutral-500">Please sign in to view your consignment history.</p>
        <Link
          href="/auth/login"
          className="inline-block px-6 py-2.5 bg-velora-black text-white text-xs font-semibold uppercase tracking-wider rounded-md"
        >
          Sign In Now
        </Link>
      </div>
    );
  }

  const filteredOrders = orders.filter((o) => {
    if (filter === 'all') return true;
    return o.status === filter;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb / Back */}
      <div className="mb-6">
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-velora-black font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Account Overview</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-velora-black">
            Order & Consignment History
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Official records of your international acquisitions and real-time transit status
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg text-xs">
          {['all', 'in_transit', 'confirmed', 'delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-md font-medium capitalize transition-all ${
                filter === st
                  ? 'bg-white text-velora-black shadow-xs font-bold'
                  : 'text-neutral-500 hover:text-velora-black'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-neutral-50 rounded-2xl p-8 space-y-4">
          <Package className="w-10 h-10 text-neutral-400 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-velora-black">No consignments found</h3>
          <p className="text-xs text-neutral-500">There are no orders matching the selected filter.</p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2.5 bg-velora-black text-white text-xs font-semibold uppercase tracking-wider rounded-md"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-subtle hover:border-neutral-300 transition-all"
            >
              {/* Order Card Header */}
              <div className="p-5 bg-neutral-50 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase font-semibold">
                      Order Reference
                    </span>
                    <span className="font-mono font-bold text-sm text-velora-black">{order.orderNumber}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase font-semibold">
                      Date Dispatched
                    </span>
                    <span className="font-medium text-neutral-700">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-neutral-400 block text-[10px] uppercase font-semibold">
                      Total Billed
                    </span>
                    <span className="font-serif font-bold text-sm text-velora-black">
                      {formatPrice(order.totalUSD)}
                    </span>
                  </div>

                  <span className="px-3 py-1 bg-velora-gold-100 text-velora-gold-800 border border-velora-gold-300 rounded-full font-semibold uppercase tracking-wider text-[10px]">
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Items in Order */}
              <div className="p-5 sm:p-6 divide-y divide-neutral-100">
                {order.items.map((it) => (
                  <div key={it.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-14 rounded-md bg-neutral-100 relative overflow-hidden shrink-0 border border-neutral-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={it.product.images[0]}
                          alt={it.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/product/${it.product.slug}`}
                          className="font-semibold text-velora-black hover:text-velora-gold-600 block line-clamp-1"
                        >
                          {it.product.name}
                        </Link>
                        <div className="text-[11px] text-neutral-400 mt-0.5">
                          Quantity: {it.quantity} {it.selectedSize && `• ${it.selectedSize}`} {it.selectedColor && `• ${it.selectedColor}`}
                        </div>
                      </div>
                    </div>

                    <div className="font-bold text-velora-black">
                      {formatPrice(it.product.price * it.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-velora-cream/40 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-neutral-500">
                  <Truck className="w-4 h-4 text-velora-gold-600" />
                  <span>
                    Carrier: <strong>{order.carrier}</strong> • Tracking #{order.trackingNumber}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/tracking?orderId=${order.orderNumber}`}
                    className="px-4 py-2 bg-velora-black text-white hover:bg-neutral-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Truck className="w-3.5 h-3.5 text-velora-gold-400" />
                    <span>Track Consignment</span>
                  </Link>

                  <Link
                    href={`/checkout/success?orderId=${order.orderNumber}`}
                    className="px-3.5 py-2 bg-white border border-neutral-300 text-neutral-700 hover:text-velora-black rounded-lg text-xs font-semibold"
                  >
                    View Receipt
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
