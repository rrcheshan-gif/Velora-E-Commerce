'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Truck,
  Search,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  ShieldCheck,
  AlertCircle,
  Headphones,
  ArrowRight,
} from 'lucide-react';
import { Order } from '@/types';

function TrackingContent() {
  const searchParams = useSearchParams();
  const queryOrderId = searchParams.get('orderId') || '';

  const { orders, getOrderById } = useAuth();
  const { formatPrice } = useCurrency();

  const [inputVal, setInputVal] = useState(queryOrderId || (orders[0]?.orderNumber || 'VEL-982140'));
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (queryOrderId) {
      const match = getOrderById(queryOrderId);
      if (match) {
        setSearchedOrder(match);
        setHasSearched(true);
      }
    } else if (orders.length > 0) {
      setSearchedOrder(orders[0]);
      setHasSearched(true);
    }
  }, [queryOrderId, getOrderById, orders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const match = getOrderById(inputVal.trim());
    setSearchedOrder(match || null);
  };

  const statusStepMap: Record<string, number> = {
    confirmed: 1,
    processing: 2,
    shipped: 3,
    in_transit: 4,
    out_for_delivery: 5,
    delivered: 6,
  };

  const currentStep = searchedOrder ? statusStepMap[searchedOrder.status] || 3 : 1;

  const STEPS = [
    { label: 'Confirmed', desc: 'Authorized' },
    { label: 'Atelier Prep', desc: 'Gift boxed' },
    { label: 'Dispatched', desc: 'Air cargo' },
    { label: 'Customs', desc: 'Pre-cleared' },
    { label: 'Out for Delivery', desc: 'Courier en route' },
    { label: 'Delivered', desc: 'Signed' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-velora-gold-50 border border-velora-gold-200 text-xs font-semibold tracking-widest text-velora-gold-700 uppercase">
          <Truck className="w-3.5 h-3.5" />
          <span>Real-Time Global Transit</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-velora-black">
          Track Your Consignment
        </h1>
        <p className="text-sm text-neutral-500 leading-relaxed">
          Monitor your shipment milestones with live satellite carrier telemetry from the European ateliers to your doorstep.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="pt-4 max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              required
              placeholder="Order Number (e.g. VEL-982140)"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-mono uppercase focus:outline-none focus:border-velora-black focus:bg-white shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-velora-black hover:bg-neutral-800 text-white font-semibold uppercase tracking-wider text-xs rounded-xl transition-colors shadow-sm"
          >
            Track
          </button>
        </form>

        {/* Quick Demo Fill Buttons */}
        {orders.length > 0 && (
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 pt-2">
            <span>Quick test:</span>
            {orders.slice(0, 2).map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setInputVal(o.orderNumber);
                  setSearchedOrder(o);
                  setHasSearched(true);
                }}
                className="font-mono text-velora-gold-700 font-semibold hover:underline bg-velora-gold-50 px-2 py-0.5 rounded"
              >
                {o.orderNumber}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Section */}
      {searchedOrder ? (
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-card space-y-8 p-6 sm:p-10">
          {/* Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-100 gap-4">
            <div>
              <div className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-1">
                Consignment Reference
              </div>
              <h2 className="font-mono text-2xl font-bold text-velora-black">
                {searchedOrder.orderNumber}
              </h2>
              <div className="text-xs text-neutral-500 mt-1 flex items-center gap-2">
                <span>Carrier: <strong>{searchedOrder.carrier}</strong></span>
                <span>•</span>
                <span>Tracking: <code className="font-mono">{searchedOrder.trackingNumber}</code></span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full font-bold uppercase tracking-wider text-[11px] inline-block mb-1">
                {searchedOrder.status.replace('_', ' ')}
              </span>
              <div className="text-xs text-neutral-500">
                Estimated Delivery: <strong className="text-velora-black">{searchedOrder.estimatedDelivery || 'October 24, 2026'}</strong>
              </div>
            </div>
          </div>

          {/* Progress Bar Stepper */}
          <div className="py-4">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-4 left-6 right-6 h-0.5 bg-neutral-200 -z-0">
                <div
                  className="h-full bg-velora-gold-500 transition-all duration-700"
                  style={{
                    width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {/* Stepper Dots */}
              <div className="flex justify-between relative z-10">
                {STEPS.map((step, idx) => {
                  const stepNumber = idx + 1;
                  const isCompleted = stepNumber < currentStep;
                  const isCurrent = stepNumber === currentStep;

                  return (
                    <div key={idx} className="flex flex-col items-center text-center max-w-[80px]">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-xs ${
                          isCompleted
                            ? 'bg-velora-gold-500 text-white'
                            : isCurrent
                            ? 'bg-velora-black text-white ring-4 ring-velora-gold-200 animate-pulse'
                            : 'bg-white border-2 border-neutral-300 text-neutral-400'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : stepNumber}
                      </div>
                      <span className="text-[11px] font-bold text-velora-black mt-2 leading-tight">
                        {step.label}
                      </span>
                      <span className="text-[9px] text-neutral-400 hidden sm:block mt-0.5">
                        {step.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Timeline Events */}
          <div className="bg-neutral-50/70 rounded-xl p-6 border border-neutral-200 space-y-4">
            <h3 className="font-serif text-sm font-bold text-velora-black">Transit Telemetry Log</h3>
            <div className="space-y-4 text-xs">
              {searchedOrder.timeline && searchedOrder.timeline.length > 0 ? (
                searchedOrder.timeline.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                        event.completed ? 'bg-velora-gold-500' : 'bg-neutral-300'
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-velora-black">{event.title}</strong>
                        <span className="text-[11px] text-neutral-400 font-mono">{event.timestamp}</span>
                      </div>
                      <p className="text-neutral-600 mt-0.5">{event.description}</p>
                      {event.location && (
                        <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-0.5">
                          <MapPin className="w-3 h-3 text-neutral-400" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-neutral-500">Live courier updates are processing.</div>
              )}
            </div>
          </div>

          {/* Consignment Contents Card */}
          <div className="space-y-4 pt-4 border-t border-neutral-100">
            <h3 className="font-serif text-sm font-bold text-velora-black">Consignment Inventory</h3>
            <div className="divide-y divide-neutral-100">
              {searchedOrder.items.map((it) => (
                <div key={it.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 rounded-md bg-neutral-100 relative overflow-hidden shrink-0 border border-neutral-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={it.product.images[0]}
                        alt={it.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-velora-black block">{it.product.name}</span>
                      <span className="text-neutral-400 text-[11px]">
                        Qty: {it.quantity} {it.selectedSize && `• ${it.selectedSize}`} {it.selectedColor && `• ${it.selectedColor}`}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-velora-black">{formatPrice(it.product.price * it.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Concierge Assistance */}
          <div className="p-4 bg-velora-cream/50 rounded-xl border border-velora-gold-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-velora-gold-600" />
              <span>Questions regarding this transit? Connect directly with your assigned concierge.</span>
            </div>
            <Link
              href="/contact"
              className="px-4 py-2 bg-velora-black text-white hover:bg-neutral-800 rounded-lg font-semibold shrink-0"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-200 p-8 space-y-4">
          <AlertCircle className="w-10 h-10 text-neutral-400 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-velora-black">
            Order Reference Not Found
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            We could not locate an active consignment matching &quot;{inputVal}&quot;. Please check the reference number on your confirmation receipt.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => {
                if (orders[0]) {
                  setInputVal(orders[0].orderNumber);
                  setSearchedOrder(orders[0]);
                }
              }}
              className="px-4 py-2 bg-velora-black text-white text-xs font-semibold rounded-lg"
            >
              Load Demo Consignment ({orders[0]?.orderNumber || 'VEL-982140'})
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-neutral-400">Loading courier tracking...</div>}>
      <TrackingContent />
    </Suspense>
  );
}
