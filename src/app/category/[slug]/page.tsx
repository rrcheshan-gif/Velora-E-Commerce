'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const category = CATEGORIES.find((c) => c.slug === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter((p) => p.categoryId === category.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400">
        <Link href="/" className="hover:text-velora-black transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/categories" className="hover:text-velora-black transition-colors">Categories</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-velora-black font-semibold">{category.name}</span>
      </nav>

      {/* Category Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-neutral-900 text-white min-h-[260px] sm:min-h-[320px] flex items-center p-8 sm:p-14 shadow-card">
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

        <div className="relative z-10 max-w-xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-velora-gold-400">
            {category.itemCount} Curated Pieces
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            {category.name}
          </h1>
          <p className="text-sm text-neutral-300 font-light leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div>
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-100">
          <h2 className="font-serif text-xl font-bold text-velora-black">
            Available Creations ({categoryProducts.length})
          </h2>
          <Link
            href="/categories"
            className="text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-velora-black flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </Link>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-16 bg-neutral-50 rounded-xl">
            <p className="text-sm text-neutral-500">More pieces arriving shortly in this category.</p>
            <Link
              href="/shop"
              className="inline-block mt-4 px-6 py-2.5 bg-velora-black text-white text-xs font-semibold uppercase tracking-wider rounded-md"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
