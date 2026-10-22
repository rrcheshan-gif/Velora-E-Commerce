'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { GLOBAL_TESTIMONIALS } from '@/data/mockData';
import { ProductCard } from '@/components/product/ProductCard';
import { CategoryCard } from '@/components/ui/CategoryCard';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  RotateCcw,
  Star,
  CheckCircle,
  Gem,
  Award,
} from 'lucide-react';

export default function HomePage() {
  const trendingProducts = PRODUCTS.filter((p) => p.isTrending).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);
  const featuredCategories = CATEGORIES.filter((c) => c.featured).slice(0, 4);

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center bg-velora-noir text-white overflow-hidden">
        {/* Background Hero Image with editorial lighting */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
            alt="VELORA Luxury Essentials"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] opacity-40 brightness-75 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-velora-black via-velora-black/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-velora-black via-transparent to-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-velora-gold-400/30 text-xs font-semibold tracking-widest text-velora-gold-300 uppercase animate-in fade-in">
              <Sparkles className="w-3.5 h-3.5 text-velora-gold-400" />
              <span>International Luxury Collection 2026</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Discover Your Everyday <span className="italic font-normal text-velora-gold-300">Essentials.</span>
            </h1>

            <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-xl">
              Shop quality finds across fashion, technology, home, beauty, and more. Masterfully curated for those who savor uncompromising elegance.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/shop"
                className="px-8 py-4 bg-velora-gold-500 hover:bg-velora-gold-400 text-velora-black font-semibold text-xs uppercase tracking-widest rounded-md shadow-gold transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/categories"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 font-semibold text-xs uppercase tracking-widest rounded-md transition-all duration-300 text-center"
              >
                Explore Collections
              </Link>
            </div>

            {/* Quick Hero Trust Highlights */}
            <div className="pt-8 border-t border-white/15 grid grid-cols-3 gap-4 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-velora-gold-400 shrink-0" />
                <span>Worldwide Free Shipping Over $150</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-velora-gold-400 shrink-0" />
                <span>100% Authenticity Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-velora-gold-400 shrink-0" />
                <span>30-Day Effortless Returns</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-velora-gold-600">
              Meticulously Curated
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-velora-black mt-1">
              Signature Collections
            </h2>
            <p className="text-sm text-neutral-500 mt-2 max-w-xl">
              Explore timeless categories crafted to enrich daily living with poise and purpose.
            </p>
          </div>
          <Link
            href="/categories"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-velora-black hover:text-velora-gold-600 transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} aspectRatio="portrait" />
          ))}
        </div>
      </section>

      {/* 3. Trending Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-velora-gold-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cult Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-velora-black">
              Trending Right Now
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              Most coveted acquisitions across our international patrons this month.
            </p>
          </div>
          <Link
            href="/shop?filter=trending"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-velora-black hover:text-velora-gold-600 transition-colors group"
          >
            <span>View All Trending</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Promotional Banner — The Gold Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-velora-noir text-white overflow-hidden p-8 sm:p-14 lg:p-16 border border-velora-darkborder">
          {/* Subtle Background Pattern & Image */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-35 lg:opacity-60 pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80"
              alt="Horology and craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-velora-noir via-velora-noir/70 to-transparent" />
          </div>

          <div className="relative z-10 max-w-xl space-y-6">
            <span className="px-3 py-1 bg-velora-gold-500/20 text-velora-gold-300 border border-velora-gold-400/40 rounded-full text-[11px] font-semibold uppercase tracking-widest inline-block">
              Exclusive Season Offer
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              The Sovereign Horology & Leather Edit
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Invest in pieces designed to transcend decades. Enjoy an exclusive 20% privilege credit on handcrafted Swiss automatic timepieces and Tuscan calfskin weekenders.
            </p>

            <div className="p-4 bg-white/5 border border-white/10 rounded-xl inline-flex items-center gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">
                  Use Promo Code
                </div>
                <div className="text-xl font-mono font-bold text-velora-gold-400 tracking-wider">
                  GOLD20
                </div>
              </div>
              <div className="h-8 w-px bg-white/15" />
              <div className="text-xs text-neutral-300">
                20% off orders over $200<br />
                <span className="text-[10px] text-neutral-400">Complimentary priority dispatch included</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/shop?filter=featured"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-velora-black hover:bg-velora-gold-100 font-semibold text-xs uppercase tracking-widest rounded-md transition-colors shadow-lg"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-velora-gold-600 mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Time-Tested Excellence</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-velora-black">
              Our Best Sellers
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              The definitive standards of our catalog, awarded 5 stars by thousands worldwide.
            </p>
          </div>
          <Link
            href="/shop?filter=bestseller"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-velora-black hover:text-velora-gold-600 transition-colors group"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-velora-gold-600 mb-1">
              <Gem className="w-3.5 h-3.5" />
              <span>Fresh From The Ateliers</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-velora-black">
              New Arrivals
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              The latest additions to the VELORA international portfolio.
            </p>
          </div>
          <Link
            href="/shop?filter=new"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-velora-black hover:text-velora-gold-600 transition-colors group"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Why Shop with VELORA Section */}
      <section className="bg-velora-cream/50 py-20 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-velora-gold-600">
              The VELORA Difference
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-velora-black mt-2">
              Why Shop With VELORA
            </h2>
            <p className="text-sm text-neutral-500 mt-3 leading-relaxed">
              We eliminate friction from international shopping, delivering bespoke luxury directly to your door with unmatched peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-subtle border border-neutral-100 space-y-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-lg bg-velora-gold-50 border border-velora-gold-200 flex items-center justify-center text-velora-gold-600 mx-auto sm:mx-0">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-velora-black">
                Customs Pre-Cleared Logistics
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Never face unexpected import duty surprise charges at your doorway. All tariffs, customs paperwork, and duties are pre-calculated and cleared through our international courier hubs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-subtle border border-neutral-100 space-y-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-lg bg-velora-gold-50 border border-velora-gold-200 flex items-center justify-center text-velora-gold-600 mx-auto sm:mx-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-velora-black">
                100% Provenance & Serial Validation
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Every timepiece, leather good, and audio masterpiece undergoes rigorous inspection. Shipped with tamper-evident holograms and serialized certificates of origin.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-subtle border border-neutral-100 space-y-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-lg bg-velora-gold-50 border border-velora-gold-200 flex items-center justify-center text-velora-gold-600 mx-auto sm:mx-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-velora-black">
                Effortless 30-Day Doorstep Returns
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                If an acquisition does not meet your discerning standard, our concierge schedules a complimentary doorstep courier pickup at your preferred hour anywhere in the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Customer Reviews (Transparently Identified Demo Content) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-velora-gold-600">
            Patron Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-velora-black mt-2">
            Acclaimed by Worldwide Patrons
          </h2>
          {/* Transparent demo content identifier as requested */}
          <div className="inline-block mt-3 px-3 py-1 bg-neutral-100 text-neutral-500 text-[11px] font-medium rounded-full">
            ℹ️ Verified Customer Impressions — Demo content shown for international presentation
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {GLOBAL_TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-xl border border-neutral-100 shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-velora-gold-500 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-velora-gold-500" />
                  ))}
                </div>
                <h4 className="font-serif font-bold text-sm text-velora-black mb-2">
                  &quot;{review.title}&quot;
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed italic">
                  {review.comment}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-velora-black">{review.author}</div>
                  <div className="text-[11px] text-neutral-400">{review.country}</div>
                </div>
                {review.verifiedPurchase && (
                  <div className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Newsletter Banner (In-Page CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-velora-gold-100 via-velora-gold-50 to-white rounded-2xl p-8 sm:p-14 border border-velora-gold-200 text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-velora-gold-700">
            Privilège Access
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-velora-black">
            Experience VELORA First
          </h2>
          <p className="text-sm text-neutral-600 max-w-lg mx-auto">
            Subscribe to our seasonal gazette for early access to limited capsule editions, private vault sales, and complimentary champagne gifts.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-velora-black hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-widest rounded-md transition-colors"
            >
              <span>Explore The Full Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
