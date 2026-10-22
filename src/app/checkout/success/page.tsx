'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import {
  CheckCircle,
  Truck,
  Printer,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'VEL-984210';
  const { getOrderById, orders } = useAuth();
  const { formatPrice } = useCurrency();

  const currentOrder = getOrderById(orderId) || orders[0];

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Success Hero */}
      <div className="text-center space-y-4 mb-12">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm animate-in zoom-in">
          <CheckCircle className="w-8 h-8" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-velora-gold-600">
          Payment Authorized & Confirmed
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-velora-black">
          Thank You For Your Acquisition
        </h1>
        <p className="text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed">
          Your order has been officially received by the VELORA International atelier. A confirmation receipt and courier tracking dossier have been dispatched to your email.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden mb-8">
        {/* Header bar */}
        <div className="p-6 bg-velora-cream/50 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
              Consignment Reference
            </div>
            <div className="font-mono text-xl font-bold text-velora-black">
              {currentOrder ? currentOrder.orderNumber : orderId}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 hover:text-velora-black rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>

            <Link
              href={`/tracking?orderId=${currentOrder ? currentOrder.orderNumber : orderId}`}
              className="px-4 py-2 bg-velora-black text-white hover:bg-neutral-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Truck className="w-4 h-4 text-velora-gold-400" />
              <span>Live Consignment Tracking</span>
            </Link>
          </div>
        </div>

        {/* Order Details Body */}
        {currentOrder && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs pb-6 border-b border-neutral-100">
              <div>
                <span className="text-neutral-400 block mb-1">Recipient Destination</span>
                <strong className="text-velora-black block font-semibold">
                  {currentOrder.customer.fullName}
                </strong>
                <span className="text-neutral-600 block mt-0.5">
                  {currentOrder.customer.shippingAddress.addressLine1}
                </span>
                <span className="text-neutral-600 block">
                  {currentOrder.customer.shippingAddress.city},{' '}
                  {currentOrder.customer.shippingAddress.country}
                </span>
              </div>

              <div>
                <span className="text-neutral-400 block mb-1">Shipping Transit</span>
                <strong className="text-velora-black block font-semibold">
                  {currentOrder.shippingMethod.name}
                </strong>
                <span className="text-neutral-600 block mt-0.5">
                  Carrier: {currentOrder.carrier}
                </span>
                <span className="text-neutral-600 block">
                  Tracking: <code className="font-mono">{currentOrder.trackingNumber}</code>
                </span>
              </div>

              <div>
                <span className="text-neutral-400 block mb-1">Payment Method</span>
                <strong className="text-velora-black block font-semibold">
                  Visa Infinite (Ending in 4242)
                </strong>
                <span className="text-emerald-700 block mt-0.5 font-medium">
                  Status: Settled & Cleared
                </span>
              </div>
            </div>

            {/* Items Summary */}
            <div className="space-y-4">
              <h3 className="font-serif text-sm font-bold text-velora-black">Purchased Pieces</h3>
              <div className="divide-y divide-neutral-100">
                {currentOrder.items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-neutral-100 relative overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-velora-black">{item.product.name}</div>
                        <div className="text-[11px] text-neutral-400">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="font-bold text-velora-black">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total breakdown */}
            <div className="pt-4 border-t border-neutral-100 max-w-xs ml-auto space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>{formatPrice(currentOrder.subtotalUSD)}</span>
              </div>
              {currentOrder.discountUSD > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span>-{formatPrice(currentOrder.discountUSD)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span>
                  {currentOrder.shippingCostUSD === 0
                    ? 'Free'
                    : formatPrice(currentOrder.shippingCostUSD)}
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Pre-Cleared Duties & Tax</span>
                <span>{formatPrice(currentOrder.taxUSD)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-velora-black pt-2 border-t border-neutral-200">
                <span>Total Paid</span>
                <span className="font-serif text-velora-gold-600">
                  {formatPrice(currentOrder.totalUSD)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/shop"
          className="px-8 py-3 bg-velora-black text-white hover:bg-neutral-800 text-xs font-semibold uppercase tracking-widest rounded-lg flex items-center gap-2 transition-colors"
        >
          <ShoppingBag className="w-4 h-4 text-velora-gold-400" />
          <span>Continue Shopping</span>
        </Link>

        <Link
          href="/account/orders"
          className="px-8 py-3 bg-white border border-neutral-300 text-velora-black hover:bg-neutral-50 text-xs font-semibold uppercase tracking-widest rounded-lg flex items-center gap-2 transition-colors"
        >
          <span>View All Orders In Account</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-neutral-400">Loading receipt...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
