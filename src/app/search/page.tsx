'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Search, X, Sparkles } from 'lucide-react';

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [inputVal, setInputVal] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputVal.trim())}`);
    }
  };

  const results = useMemo(() => {
    const q = initialQuery.trim().toLowerCase();
    if (!q) return PRODUCTS;

    return PRODUCTS.filter((p) => {
      const matchText =
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q);

      if (!matchText) return false;
      if (activeCategory !== 'all' && p.categoryId !== activeCategory) return false;

      return true;
    });
  }, [initialQuery, activeCategory]);

  const SUGGESTED_TAGS = ['Cashmere', 'Watch', 'Audio', 'Leather', 'Stone', 'Perfume', 'Luggage'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header and Search Form */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-velora-black">
          Search Collections
        </h1>
        <p className="text-sm text-neutral-500">
          Find your everyday essentials across our global luxury catalog.
        </p>

        <form onSubmit={handleSearchSubmit} className="relative mt-6 max-w-xl mx-auto">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by product name, materials, artisan origin..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full pl-12 pr-28 py-3.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-velora-black focus:bg-white shadow-sm transition-all"
          />
          {inputVal && (
            <button
              type="button"
              onClick={() => setInputVal('')}
              className="absolute right-20 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-velora-black p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-velora-black text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          <span className="text-neutral-400">Popular:</span>
          {SUGGESTED_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setInputVal(tag);
                router.push(`/search?q=${encodeURIComponent(tag)}`);
              }}
              className="px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-neutral-100 gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-velora-black">
            {initialQuery ? (
              <span>
                Search results for &quot;<span className="text-velora-gold-600">{initialQuery}</span>&quot;
              </span>
            ) : (
              <span>Browsing All Curations</span>
            )}
          </h2>
          <span className="text-xs text-neutral-400">{results.length} items found</span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-velora-black text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            All
          </button>
          {['fashion-accessories', 'electronics-gadgets', 'home-living', 'beauty-personal-care'].map((catId) => (
            <button
              key={catId}
              onClick={() => setActiveCategory(catId)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === catId
                  ? 'bg-velora-black text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {catId.split('-')[0].charAt(0).toUpperCase() + catId.split('-')[0].slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or Empty State */}
      {results.length === 0 ? (
        <div className="text-center py-16 bg-neutral-50 rounded-2xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center mx-auto text-neutral-500">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-velora-black">
            No matches found for &quot;{initialQuery}&quot;
          </h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            We couldn&apos;t find an exact match. Try using broader search keywords like &apos;trench&apos;, &apos;watch&apos;, or &apos;audio&apos;.
          </p>
          <button
            onClick={() => {
              setInputVal('');
              router.push('/shop');
            }}
            className="px-6 py-2.5 bg-velora-black text-white text-xs font-semibold uppercase tracking-wider rounded-md"
          >
            Browse Full Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-neutral-400">Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
