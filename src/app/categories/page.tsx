'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/products';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-velora-gold-50 border border-velora-gold-200 text-xs font-semibold tracking-widest text-velora-gold-700 uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The VELORA Curations</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-velora-black">
          Categories of Refinement
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          From double-faced Mongolian cashmere to audiophile acoustics and sanctuary stonework, explore our 8 cornerstone international collections.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((category) => (
          <div key={category.id} className="flex flex-col space-y-3">
            <CategoryCard category={category} aspectRatio="portrait" />
            <div className="px-1 flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-mono">{category.itemCount} items listed</span>
              <Link
                href={`/category/${category.slug}`}
                className="font-semibold text-velora-black hover:text-velora-gold-600 flex items-center gap-1 group"
              >
                <span>View Edit</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Expansion Notice for Store Administrator */}
      <div className="mt-20 p-8 rounded-2xl bg-velora-cream/60 border border-velora-gold-200 text-center max-w-2xl mx-auto space-y-3">
        <h3 className="font-serif text-lg font-bold text-velora-black">
          Expanding Catalog Architecture
        </h3>
        <p className="text-xs text-neutral-600 leading-relaxed">
          VELORA is architected with a decoupled, dynamic category management model. Store administrators can introduce new worldwide departments, sub-collections, and seasonal capsule lines without altering layout schemas.
        </p>
        <Link
          href="/shop"
          className="inline-block pt-2 text-xs font-bold uppercase tracking-wider text-velora-gold-700 hover:underline"
        >
          Explore All Products in Store →
        </Link>
      </div>
    </div>
  );
}
