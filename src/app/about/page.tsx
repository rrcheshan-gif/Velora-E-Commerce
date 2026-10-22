import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Globe2,
  Gem,
  Award,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-velora-noir text-white overflow-hidden py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=2000&q=80"
            alt="Artisanal leathercraft"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30 brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-velora-black via-velora-black/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-velora-gold-400/30 text-xs font-semibold tracking-widest text-velora-gold-300 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-velora-gold-400" />
            <span>The Maison & Philosophy</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight">
            Everything You Love, <br />
            <span className="italic text-velora-gold-300">in One Place.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            VELORA was conceived to bridge the divide between world-class artisanal craftsmanship and effortless international shopping.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-velora-gold-600">
              Our Genesis
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-velora-black leading-tight">
              An International Sanctuary of Craft & Discretion
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              In an era dominated by transient fast fashion and disposable consumer goods, VELORA was created as an antidote: a curated luxury destination where every garment, timepiece, acoustical monitor, and home object is held to the highest standard of permanence.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We partner directly with multi-generational workshops in Biella, Florence, Geneva, Kyoto, and Provence, cutting out intermediary markups while preserving the time-honored techniques of hand-stitching, precision turning, and sustainable organic botanical harvesting.
            </p>
          </div>

          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card border border-neutral-100">
            <Image
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80"
              alt="Atelier craft"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="bg-velora-cream/60 py-16 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-velora-black">140+</div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mt-2">
                Countries Served
              </div>
            </div>
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-velora-black">100%</div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mt-2">
                Provenance Certified
              </div>
            </div>
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-velora-black">99.8%</div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mt-2">
                Customs Pre-Cleared
              </div>
            </div>
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-velora-black">24/7</div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mt-2">
                VIP Concierge Access
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-velora-gold-600">
            Foundational Tenets
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-velora-black mt-1">
            The Pillars of VELORA
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-lg bg-velora-gold-50 flex items-center justify-center text-velora-gold-600">
              <Gem className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-velora-black">Artisanal Mastery</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              We reject mass factory homogenization. Every piece is sourced from specialized master ateliers whose crafts span generations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-lg bg-velora-gold-50 flex items-center justify-center text-velora-gold-600">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-velora-black">Borderless Logistics</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              True luxury is effortless. We absorb import complexities, pre-clear duties, and deliver directly across global thresholds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-lg bg-velora-gold-50 flex items-center justify-center text-velora-gold-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-velora-black">Unbending Integrity</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Every shipment is backed by a 30-day effortless return guarantee with complimentary courier doorstep collection.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-lg bg-velora-gold-50 flex items-center justify-center text-velora-gold-600">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-velora-black">Conscious Permanence</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Organic, cruelty-free, and FSC-certified materials that reduce footprint while elevating tactile indulgence.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-velora-black">
          Experience Everyday Refinement
        </h2>
        <p className="text-xs text-neutral-500 max-w-md mx-auto">
          Explore our seasonal edits and discover why patrons across 140 countries entrust their lifestyle to VELORA.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-velora-black hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-widest rounded-md shadow-md transition-colors"
        >
          <span>Shop All Collections</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
