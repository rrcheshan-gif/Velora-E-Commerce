import React from 'react';
import Link from 'next/link';

export default function TermsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="border-b border-neutral-100 pb-8 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-widest text-velora-gold-600">
          Governance & International Protocols
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-velora-black">
          Terms & Conditions of Sale
        </h1>
        <p className="text-xs text-neutral-400">
          Last updated: October 2026 • Governing international transactions through VELORA International
        </p>
      </div>

      <div className="prose prose-neutral max-w-none text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-8">
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-velora-black">1. Preamble & Scope of Agreement</h2>
          <p>
            These Terms of Service govern the sale of products and digital engagement between VELORA International Inc. (&quot;VELORA&quot;, &quot;the Maison&quot;, &quot;we&quot;) and patrons accessing our online marketplace worldwide. By placing an order or registering a patron account, you agree to be bound unconditionally by these terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-velora-black">2. Multi-Currency Pricing & Verification</h2>
          <p>
            Prices displayed in local currencies (such as USD, EUR, GBP, JPY, CAD, AUD, AED, CHF, SGD) reflect official verified exchange conversions. All final totals, discounts, shipping charges, and applicable import VAT are calculated and validated on our secure servers prior to checkout authorization. We reserve the right to rectify typographical pricing errors before order fulfillment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-velora-black">3. Order Formation & Acceptance</h2>
          <p>
            Receipt of an electronic order reference number does not signify our final acceptance of an acquisition. VELORA reserves the right to decline or cancel consignments in the event of stock unavailability, suspicious unauthorized card usage, or inability to pre-clear customs with carrier hubs. In any such circumstance, any authorized funds are reversed immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-velora-black">4. Intellectual Property & Brand Rights</h2>
          <p>
            The VELORA name, diamond facet monogram, website typography, imagery, product taglines (&quot;Everything You Love, in One Place&quot;), and software architecture are protected under international trademark, copyright, and patent conventions. Unauthorized reproduction or scraping is strictly prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-velora-black">5. Dispute Resolution & Governing Law</h2>
          <p>
            Any dispute arising out of international purchases shall be resolved through confidential arbitration administered by the International Chamber of Commerce (ICC) or competent commercial courts in Geneva, Switzerland, without regard to conflict of law principles.
          </p>
        </section>
      </div>

      <div className="pt-8 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
        <Link href="/policies/privacy" className="text-velora-gold-700 font-semibold hover:underline">
          View Privacy Policy
        </Link>
        <Link href="/contact" className="text-velora-black font-semibold hover:underline">
          Contact Legal Counsel
        </Link>
      </div>
    </div>
  );
}
