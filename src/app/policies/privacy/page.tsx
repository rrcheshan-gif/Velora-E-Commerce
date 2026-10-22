import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Eye, Key } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="border-b border-neutral-100 pb-8 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-widest text-velora-gold-600">
          Trust & Confidentiality
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-velora-black">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-400">
          Effective date: October 2026 • Compliant with GDPR (EU), CCPA (USA), and Swiss Federal Data Protection Act (FADP)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
          <Lock className="w-5 h-5 text-velora-gold-600" />
          <h3 className="font-serif font-bold text-sm text-velora-black">Zero Raw Card Storage</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Payment card details are tokenized strictly through Stripe PCI-DSS Level 1 compliant gateways.
          </p>
        </div>
        <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
          <Eye className="w-5 h-5 text-velora-gold-600" />
          <h3 className="font-serif font-bold text-sm text-velora-black">No Third-Party Sale</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            We will never sell, rent, or trade your patron profile or order history to data brokers.
          </p>
        </div>
        <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
          <Key className="w-5 h-5 text-velora-gold-600" />
          <h3 className="font-serif font-bold text-sm text-velora-black">Right to Erasure</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Request complete deletion of your account dossier and historical logs at any time.
          </p>
        </div>
      </div>

      <div className="prose prose-neutral max-w-none text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-8">
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-velora-black">1. Information We Collect</h2>
          <p>
            When you interact with the VELORA platform, create a patron account, or place a consignment order, we collect:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Personal Identity:</strong> Full name, billing and physical shipping addresses, contact telephone, and email.</li>
            <li><strong>Transaction Records:</strong> Products acquired, variant specifications, currency preferences, and order timestamps.</li>
            <li><strong>Technical Telemetry:</strong> Anonymized browser identifiers, operating system, and IP address for fraud mitigation.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-velora-black">2. How We Safeguard Payment Information</h2>
          <p>
            In strict compliance with international security standards, VELORA <strong>never stores, sees, or logs raw credit card numbers or security CVV codes</strong>. All payment submissions are encrypted in transit via Transport Layer Security (TLS 1.3) and dispatched straight to accredited payment processors (Stripe, Apple Pay, PayPal). Processors return an encrypted token validating the transaction.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-velora-black">3. Purpose of Processing</h2>
          <p>
            Your information is processed exclusively to fulfill international order contracts, clear cross-border customs declarations with carrier authorities (DHL/FedEx), combat payment fraud, and deliver personalized VIP concierge communications when subscribed.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-velora-black">4. Your International Rights</h2>
          <p>
            Under European GDPR and California CCPA frameworks, patrons possess the absolute right to inspect their personal data file, rectify inaccuracies, or exercise the &quot;Right to be Forgotten&quot;. To execute a data privacy request, contact our Data Protection Officer at <code className="font-mono">privacy@velora-international.com</code>.
          </p>
        </section>
      </div>

      <div className="pt-8 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
        <Link href="/policies/terms" className="text-velora-gold-700 font-semibold hover:underline">
          View Terms & Conditions →
        </Link>
        <Link href="/contact" className="text-velora-black font-semibold hover:underline">
          Contact Legal Desk
        </Link>
      </div>
    </div>
  );
}
