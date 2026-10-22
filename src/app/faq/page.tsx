'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Search,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Headphones,
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'ordering' | 'shipping' | 'authenticity' | 'returns';
}

const FAQ_LIST: FAQItem[] = [
  {
    category: 'ordering',
    question: 'How does international multi-currency pricing work?',
    answer:
      'VELORA operates with a verified fixed foreign exchange model. You can view prices and settle orders in USD, EUR, GBP, JPY, CAD, AUD, AED, CHF, and SGD. What you see at checkout is the exact amount charged—there are zero hidden foreign transaction markups or surprise conversions.',
  },
  {
    category: 'ordering',
    question: 'Which payment methods are accepted internationally?',
    answer:
      'We accept Visa, Mastercard, American Express, Apple Pay, Google Pay, and PayPal Express. All transactions are protected by 256-bit SSL encryption and processed via Stripe Level 1 PCI-compliant international payment infrastructure. We never store raw payment details on our servers.',
  },
  {
    category: 'ordering',
    question: 'How do I apply promotional and VIP discount codes?',
    answer:
      'During bag review or checkout, enter your code (such as VELORA10 for 10% off or GOLD20 for 20% off orders over $200) into the promo field and click Apply. The server instantly verifies minimum order amounts and calculates your net savings before payment authorization.',
  },
  {
    category: 'shipping',
    question: 'Will I be charged import duties or customs tariffs on arrival?',
    answer:
      'No. VELORA operates on a Delivered Duty Paid (DDP) basis worldwide. Customs clearance, import VAT, and tariffs are calculated and settled prior to departure. You will never receive a surprise invoice from customs at your doorstep.',
  },
  {
    category: 'shipping',
    question: 'What are the delivery estimates for my country?',
    answer:
      'Standard Global Air takes 6 to 10 business days (complimentary on orders over $150). Express Priority Air via DHL/FedEx arrives in 2 to 4 business days. White-Glove VIP delivery offers scheduled 1 to 2 business day personalized delivery in major metropolitan centers.',
  },
  {
    category: 'shipping',
    question: 'How do I track my active consignment in real time?',
    answer:
      'Visit our Order Tracking page (/tracking) and input your Order Reference (e.g., VEL-982140) or tracking number. You will see a live satellite timeline from atelier dispatch to customs clearance and final doorstep delivery.',
  },
  {
    category: 'authenticity',
    question: 'Are all products certified authentic?',
    answer:
      'Yes, unconditionally. Every timepiece, leather piece, audio instrument, and wellness formulation is acquired directly from our partnered master ateliers in Italy, Switzerland, Japan, and France. Each piece arrives with an individualized certificate of provenance and serial stamp.',
  },
  {
    category: 'returns',
    question: 'What is the VELORA 30-day return policy?',
    answer:
      'We offer a frictionless 30-day global return and exchange window. If any creation does not meet your discerning expectations, our VIP concierge will schedule a complimentary DHL or FedEx courier pickup from your home or office. Refunds are returned to the original payment method within 48 hours of inspection.',
  },
  {
    category: 'returns',
    question: 'How do I initiate a doorstep return or exchange?',
    answer:
      'Sign into your customer account, navigate to Order History, select the consignment, and click "Request Doorstep Return". Alternatively, email concierge@velora-international.com with your Order Reference, and an advisor will arrange the return docket immediately.',
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const filteredFaqs = FAQ_LIST.filter((faq) => {
    if (activeCategory !== 'all' && faq.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-velora-gold-50 border border-velora-gold-200 text-xs font-semibold tracking-widest text-velora-gold-700 uppercase">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge & Inquiries</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-velora-black">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-neutral-500 max-w-lg mx-auto">
          Comprehensive guidance on our international logistics, payment security, bespoke atelier standards, and returns.
        </p>

        {/* Search Input */}
        <div className="relative max-w-md mx-auto pt-4">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 mt-2" />
          <input
            type="text"
            placeholder="Search questions (e.g. duties, returns, tracking)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:border-velora-black focus:bg-white shadow-xs"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 text-xs">
        {[
          { id: 'all', label: 'All Topics' },
          { id: 'ordering', label: 'Ordering & Multi-Currency' },
          { id: 'shipping', label: 'Customs & Shipping' },
          { id: 'authenticity', label: 'Provenance & Quality' },
          { id: 'returns', label: 'Returns & Exchanges' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-colors ${
              activeCategory === tab.id
                ? 'bg-velora-black text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-neutral-50 rounded-xl text-xs text-neutral-500">
            No inquiries match your search. Contact our VIP concierge below.
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = expandedIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-subtle transition-colors"
              >
                <button
                  onClick={() => setExpandedIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-bold text-velora-black hover:text-velora-gold-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-velora-gold-600' : 'text-neutral-400'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Concierge Support Banner */}
      <div className="bg-velora-cream/60 p-8 rounded-2xl border border-velora-gold-200 text-center space-y-3">
        <Headphones className="w-8 h-8 text-velora-gold-600 mx-auto" />
        <h3 className="font-serif text-lg font-bold text-velora-black">
          Need Personalized Assistance?
        </h3>
        <p className="text-xs text-neutral-600 max-w-md mx-auto">
          Our global client care advisors are standing by 24 hours a day to assist with bespoke requirements, corporate gifting, or expedited logistics.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-velora-black hover:bg-neutral-800 text-white rounded-md text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <span>Contact VIP Concierge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
