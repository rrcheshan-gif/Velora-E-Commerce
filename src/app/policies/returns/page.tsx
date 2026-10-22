import React from 'react';
import Link from 'next/link';
import { RotateCcw, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="border-b border-neutral-100 pb-8 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-widest text-velora-gold-600">
          Client Satisfaction Promise
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-velora-black">
          Returns & Refund Policy
        </h1>
        <p className="text-xs text-neutral-400">
          Last updated: October 2026 • 30-Day Effortless Global Doorstep Returns
        </p>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
          <RotateCcw className="w-5 h-5 text-velora-gold-600" />
          <h3 className="font-serif font-bold text-sm text-velora-black">30-Day Window</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Initiate a return or size exchange within 30 calendar days of delivery.
          </p>
        </div>
        <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
          <CheckCircle className="w-5 h-5 text-velora-gold-600" />
          <h3 className="font-serif font-bold text-sm text-velora-black">Complimentary Pickup</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            We provide pre-paid international air waybills and schedule doorstep courier pickups.
          </p>
        </div>
        <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
          <ShieldCheck className="w-5 h-5 text-velora-gold-600" />
          <h3 className="font-serif font-bold text-sm text-velora-black">Rapid Restitution</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Refunds are credited to your original payment card within 48 hours of warehouse check.
          </p>
        </div>
      </div>

      <div className="prose prose-neutral max-w-none text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-8">
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-velora-black">1. Eligibility Criteria</h2>
          <p>
            To qualify for a full reimbursement or size/color exchange:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Creations must remain in unworn, unwashed, and undamaged original state.</li>
            <li>All atelier security tags, serialized seals, and authenticity cards must remain intact.</li>
            <li>Items must be repacked in the original VELORA velvet gift box and protective outer carton.</li>
            <li>Custom personalized or bespoke monogrammed pieces cannot be returned unless demonstrably defective upon delivery.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-velora-black">2. How to Request an International Return</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Initiate Online:</strong> Log into your <Link href="/account/orders" className="text-velora-gold-700 underline font-semibold">Account Orders</Link> or email <code className="font-mono">concierge@velora-international.com</code> quoting your Order Reference.
            </li>
            <li>
              <strong>Receive Prepaid Waybill:</strong> Our concierge will generate a digital return docket and customs paperwork within 4 hours.
            </li>
            <li>
              <strong>Doorstep Courier Collection:</strong> Select a convenient 2-hour window for DHL or FedEx to collect the parcel directly from your home or office.
            </li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-velora-black">3. Processing & Refund Timelines</h2>
          <p>
            Upon receipt at our central returns hub, our master inspectors inspect the creation within 24 business hours. Your refund will be approved and released immediately back to the original method of payment (Visa, Mastercard, American Express, Apple Pay, or PayPal). Bank processing typically reflects in your statement within 2 to 5 business days.
          </p>
        </section>
      </div>

      <div className="pt-8 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
        <Link href="/contact" className="text-velora-black font-semibold hover:underline">
          Need assistance with an exchange? Contact Concierge →
        </Link>
        <Link href="/policies/shipping" className="text-velora-gold-700 font-semibold hover:underline">
          Shipping & Delivery Policy
        </Link>
      </div>
    </div>
  );
}
