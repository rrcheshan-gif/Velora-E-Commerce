'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { useCurrency } from '@/context/CurrencyContext';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export function Footer() {
  const { currentCurrency } = useCurrency();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-velora-black text-neutral-300 pt-16 pb-12 border-t border-velora-darkborder">
      {/* Upper Trust Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-velora-gold-500/30 flex items-center justify-center shrink-0 text-velora-gold-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide">Worldwide Express Delivery</h4>
              <p className="text-xs text-neutral-400 mt-1">Pre-cleared customs to over 140 countries with real-time satellite tracking.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-velora-gold-500/30 flex items-center justify-center shrink-0 text-velora-gold-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide">Authenticity Guaranteed</h4>
              <p className="text-xs text-neutral-400 mt-1">Direct from master ateliers with certificates of provenance and serial stamps.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-velora-gold-500/30 flex items-center justify-center shrink-0 text-velora-gold-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide">30-Day Effortless Returns</h4>
              <p className="text-xs text-neutral-400 mt-1">Complimentary international courier pick-ups for exchanges and full refunds.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-velora-gold-500/30 flex items-center justify-center shrink-0 text-velora-gold-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide">24/7 Global VIP Concierge</h4>
              <p className="text-xs text-neutral-400 mt-1">Dedicated luxury advisors on WhatsApp, phone, and secure encrypted messaging.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand & Newsletter Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Logo variant="light" size="lg" />
            <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
              VELORA is an international luxury marketplace curating everyday essentials across high fashion, cutting-edge acoustic engineering, refined living, and timeless personal care.
            </p>
            <p className="text-xs text-velora-gold-400 font-serif italic tracking-wide">
              &quot;Everything You Love, in One Place.&quot;
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-2">
                Join the VELORA Privilège Club
              </h4>
              <p className="text-xs text-neutral-400 mb-3">
                Receive private previews of limited edition drops and 10% off your initial acquisition.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 bg-white/5 border border-emerald-500/40 rounded-lg text-emerald-400 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Welcome to Privilège. Your invitation and private code have been dispatched.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your VIP email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/15 px-3.5 py-2.5 rounded-md text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-velora-gold-400"
                  />
                  <button
                    type="submit"
                    className="bg-velora-gold-500 hover:bg-velora-gold-400 text-velora-black font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-md transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Nav Links (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Collections */}
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
                Collections
              </h5>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li><Link href="/category/fashion-accessories" className="hover:text-white transition-colors">Fashion & Accessories</Link></li>
                <li><Link href="/category/electronics-gadgets" className="hover:text-white transition-colors">Electronics & Audio</Link></li>
                <li><Link href="/category/home-living" className="hover:text-white transition-colors">Home & Living Sanctuary</Link></li>
                <li><Link href="/category/beauty-personal-care" className="hover:text-white transition-colors">Clean Botanical Beauty</Link></li>
                <li><Link href="/category/sports-outdoor" className="hover:text-white transition-colors">Sports & Alpine Gear</Link></li>
                <li><Link href="/category/toys-games" className="hover:text-white transition-colors">Heirloom Games & Chess</Link></li>
                <li><Link href="/category/travel-accessories" className="hover:text-white transition-colors">Aviation Luggage & Transit</Link></li>
                <li><Link href="/category/lifestyle-products" className="hover:text-white transition-colors">Fine Stationery & Horology</Link></li>
              </ul>
            </div>

            {/* Column 2: Client Care */}
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
                Client Care
              </h5>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li><Link href="/tracking" className="text-velora-gold-300 hover:underline">Track Your Consignment</Link></li>
                <li><Link href="/policies/shipping" className="hover:text-white transition-colors">Shipping & Delivery Policy</Link></li>
                <li><Link href="/policies/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact VIP Concierge</Link></li>
                <li><Link href="/account/orders" className="hover:text-white transition-colors">Order History & Invoices</Link></li>
                <li><Link href="/wishlist" className="hover:text-white transition-colors">Curated Wishlist</Link></li>
              </ul>
            </div>

            {/* Column 3: The Maison & Legal */}
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
                The Maison & Legal
              </h5>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About VELORA</Link></li>
                <li><Link href="/policies/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/policies/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/account" className="hover:text-white transition-colors">Customer Portal</Link></li>
                <li><Link href="/auth/login" className="hover:text-white transition-colors">VIP Member Sign In</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright, Payment Icons, Currency info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} VELORA International Inc. All rights reserved.</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-neutral-400">
              <Lock className="w-3 h-3 text-emerald-500" />
              Secured by Stripe International
            </span>
          </div>

          {/* Payment Providers Visual Badges */}
          <div className="flex items-center gap-2 text-neutral-400">
            <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono border border-white/10">VISA</span>
            <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono border border-white/10">Mastercard</span>
            <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono border border-white/10">AMEX</span>
            <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono border border-white/10">Apple Pay</span>
            <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono border border-white/10">PayPal</span>
            <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono border border-white/10">Google Pay</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Settlement Currency: <strong className="text-white">{currentCurrency.code} ({currentCurrency.symbol})</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
