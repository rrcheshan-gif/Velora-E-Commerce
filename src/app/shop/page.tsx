'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { useCurrency } from '@/context/CurrencyContext';
import {
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  X,
  RotateCcw,
  LayoutGrid,
  Grid3X3,
} from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialFilter = searchParams.get('filter') || 'all';

  const { formatPrice } = useCurrency();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);
  const [gridCols, setGridCols] = useState<'4' | '3'>('4');

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
        return false;
      }

      // Predefined query filters (trending, bestseller, new)
      if (initialFilter === 'trending' && !product.isTrending) return false;
      if (initialFilter === 'bestseller' && !product.isBestSeller) return false;
      if (initialFilter === 'new' && !product.isNewArrival) return false;
      if (initialFilter === 'featured' && !product.isFeatured) return false;

      // Price filter
      if (product.price > maxPrice) return false;

      // Stock filter
      if (inStockOnly && !product.inStock) return false;

      // Search keyword filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.categoryName.toLowerCase().includes(query);
        const matchesTagline = product.tagline.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesTagline) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [selectedCategory, initialFilter, maxPrice, inStockOnly, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSortBy('featured');
    setSearchQuery('');
    setMaxPrice(1500);
    setInStockOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header Banner */}
      <div className="border-b border-neutral-100 pb-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase font-semibold tracking-widest text-velora-gold-600 mb-1">
              The Curated Catalog
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-velora-black">
              All Creations
            </h1>
            <p className="text-sm text-neutral-500 mt-2 max-w-xl">
              Explore fine garments, high-fidelity audio, interior sanctuary objects, and clean botanical wellness crafted across the world.
            </p>
          </div>

          <div className="text-sm text-neutral-400 font-mono">
            Showing <strong className="text-velora-black">{filteredProducts.length}</strong> of{' '}
            <strong className="text-velora-black">{PRODUCTS.length}</strong> creations
          </div>
        </div>
      </div>

      {/* Top Filter and Search Bar Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by name, category, or materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:bg-white focus:border-velora-black transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-velora-black"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right Controls: Sort, Grid Toggle, Mobile Filter Button */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-neutral-100 text-velora-black rounded-lg text-xs font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-xs text-neutral-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-medium text-velora-black outline-none cursor-pointer"
            >
              <option value="featured">Featured & Curated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          {/* Grid Layout Toggle */}
          <div className="hidden sm:flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
            <button
              onClick={() => setGridCols('4')}
              className={`p-2 transition-colors ${
                gridCols === '4' ? 'bg-white text-velora-black shadow-xs font-bold' : 'text-neutral-400'
              }`}
              title="Compact 4 columns"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols('3')}
              className={`p-2 transition-colors ${
                gridCols === '3' ? 'bg-white text-velora-black shadow-xs font-bold' : 'text-neutral-400'
              }`}
              title="Spacious 3 columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filter Panel (Desktop & Mobile Drawer) */}
        <div
          className={`lg:block ${
            showFiltersMobile
              ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto block'
              : 'hidden'
          }`}
        >
          {showFiltersMobile && (
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200 lg:hidden">
              <h3 className="font-serif text-lg font-bold">Filter Collections</h3>
              <button
                onClick={() => setShowFiltersMobile(false)}
                className="p-2 text-neutral-400 hover:text-velora-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="space-y-8 pr-2">
            {/* Category Filter */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-velora-black">
                  Categories
                </h4>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-[11px] text-velora-gold-600 hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-velora-black text-white font-semibold'
                      : 'hover:bg-neutral-100 text-neutral-600'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="font-mono text-[10px]">{PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map((cat) => {
                  const count = PRODUCTS.filter((p) => p.categoryId === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'bg-velora-black text-white font-semibold'
                          : 'hover:bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="font-mono text-[10px]">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="pt-6 border-t border-neutral-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-velora-black">
                  Max Price
                </h4>
                <span className="text-xs font-bold text-velora-gold-600 font-mono">
                  {formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-velora-gold-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1 font-mono">
                <span>{formatPrice(50)}</span>
                <span>{formatPrice(1500)}</span>
              </div>
            </div>

            {/* Stock Availability */}
            <div className="pt-6 border-t border-neutral-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-velora-black mb-3">
                Availability
              </h4>
              <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-neutral-300 text-velora-black focus:ring-0 w-4 h-4"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {/* Reset All Filters Button */}
            <div className="pt-6 border-t border-neutral-100">
              <button
                onClick={resetFilters}
                className="w-full py-2.5 px-3 border border-neutral-300 rounded-lg text-xs font-semibold uppercase tracking-wider text-neutral-700 hover:text-velora-black hover:border-velora-black transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>

            {showFiltersMobile && (
              <button
                onClick={() => setShowFiltersMobile(false)}
                className="w-full py-3 bg-velora-black text-white text-xs font-semibold uppercase tracking-widest rounded-lg mt-4"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            )}
          </div>
        </div>

        {/* Products Grid (3 cols on desktop) */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200 p-8">
              <h3 className="font-serif text-xl font-bold text-velora-black mb-2">
                No matching creations found
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-6">
                Try adjusting your price parameters, clearing active search keywords, or selecting another category.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-velora-black text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-800"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                gridCols === '4' ? 'lg:grid-cols-3 xl:grid-cols-3' : 'lg:grid-cols-2'
              } gap-6`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-neutral-400">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
