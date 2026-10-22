import React from 'react';
import Link from 'next/link';
import { Truck, Globe, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="border-b border-neutral-100 pb-8 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-widest text-velora-gold-600">
          International Trade & Logistics
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-velora-black">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs text-neutral-400">
          Last revised: October 2026 • Effective across all 140+ supported global jurisdictions
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
          <Truck className="w-5 h-5 text-velora-gold-600" />
          <h3 className="font-serif font-bold text-sm text-velora-black">Delivered Duty Paid (DDP)</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            All tariffs and local import VAT are calculated and pre-cleared. No surprise fees upon courier arrival.
          </p>
        </div>
        <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
          <Globe className="w-5 h-5 text-velora-gold-600" />
          <h3 className="font-serif font-bold text-sm text-velora-black">Complimentary Over $150</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Standard tracked global shipping is fully subsidized on orders exceeding $150 USD equivalent.
          </p>
        </div>
        <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
          <ShieldCheck className="w-5 h-5 text-velora-gold-600" />
          <h3 className="font-serif font-bold text-sm text-velora-black">Signature Transit Guarantee</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Every shipment is insured for its full declared value with required adult signature upon delivery.
          </p>
        </div>
      </div>

      {/* Detailed Policy Text */}
      <div className="prose prose-neutral max-w-none text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-8">
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-velora-black">1. Shipping Speeds & Rates</h2>
          <p>
            VELORA partners exclusively with premier tier-one logistics carriers including DHL Express, FedEx International Priority, and dedicated metropolitan White-Glove couriers. All dispatches originate from our centralized hubs in Florence (Italy), London (UK), and New York (USA).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-neutral-200 text-xs">
              <thead>
                <tr className="bg-neutral-100 font-semibold text-velora-black">
                  <th className="p-3 border border-neutral-200">Service Level</th>
                  <th className="p-3 border border-neutral-200">Transit Duration</th>
                  <th className="p-3 border border-neutral-200">Base Cost (USD)</th>
                  <th className="p-3 border border-neutral-200">Carrier Partners</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="p-3 font-semibold">Standard Global Tracked</td>
                  <td className="p-3">6 – 10 Business Days</td>
                  <td className="p-3">$15.00 (Free over $150)</td>
                  <td className="p-3">DHL Global Mail, Royal Mail, USPS</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">VELORA Express Priority</td>
                  <td className="p-3">2 – 4 Business Days</td>
                  <td className="p-3">$35.00</td>
                  <td className="p-3">FedEx International Priority, DHL Express</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">White-Glove VIP Courier</td>
                  <td className="p-3">1 – 2 Business Days</td>
                  <td className="p-3">$75.00</td>
                  <td className="p-3">VELORA Private Concierge Fleet</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-velora-black">2. Customs, Import Duties & Taxes</h2>
          <p>
            To uphold our brand promise of frictionless luxury, all international consignments are settled on a <strong>Delivered Duty Paid (DDP)</strong> schedule. At checkout, our international trade calculation engine assesses applicable regional tariffs and import taxes based on the destination territory. VELORA assumes responsibility for clearing goods through border inspection. Patrons will never be solicited for additional payments by couriers upon arrival.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-velora-black">3. Dispatch Windows & Tracking</h2>
          <p>
            In-stock creations are verified, delicately wrapped in signature velvet boxes, and handed over to international couriers within 24 business hours of payment authorization. You will receive an immediate automated confirmation email containing a direct satellite tracking URL. Real-time milestones can also be monitored at any hour via our <Link href="/tracking" className="text-velora-gold-700 underline font-semibold">Order Tracking Portal</Link>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-velora-black">4. Insurance & Loss Protection</h2>
          <p>
            Every consignment dispatched by VELORA carries comprehensive, 100% loss-and-damage indemnity. In the rare circumstance of in-transit damage or delayed clearance, our concierge will issue an immediate replacement piece from our vault or execute an expedited full refund upon notification.
          </p>
        </section>
      </div>

      <div className="pt-8 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
        <span>Questions regarding your destination? Contact <Link href="/contact" className="text-velora-black font-semibold underline">Client Concierge</Link>.</span>
        <Link href="/policies/returns" className="text-velora-gold-700 font-semibold hover:underline">
          View Returns & Refund Policy →
        </Link>
      </div>
    </div>
  );
}
