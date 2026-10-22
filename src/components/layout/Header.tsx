'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export function Header() {
  const router = useRouter();
  const { itemCount: cartCount, setIsCartDrawerOpen } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [liveResults, setLiveResults] = useState(PRODUCTS.slice(0, 4));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setLiveResults(PRODUCTS.slice(0, 4));
    } else {
      const q = searchQuery.toLowerCase();
      const filtered = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
      ).slice(0, 5);
      setLiveResults(filtered);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100 py-3'
            : 'bg-white border-b border-neutral-100 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile Menu Toggle & Brand Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-neutral-700 hover:text-velora-black rounded-md hover:bg-neutral-100 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Logo size="md" />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-widest text-neutral-700">
              <Link
                href="/shop"
                className="hover:text-velora-gold-600 transition-colors py-1 relative group"
              >
                Shop All
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-velora-gold-500 transition-all duration-200 group-hover:w-full" />
              </Link>

              {/* Categories Mega Dropdown */}
              <div
                className="relative group py-1"
                onMouseEnter={() => setCategoriesDropdownOpen(true)}
                onMouseLeave={() => setCategoriesDropdownOpen(false)}
              >
                <Link
                  href="/categories"
                  className="flex items-center gap-1 hover:text-velora-gold-600 transition-colors"
                >
                  <span>Categories</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                {categoriesDropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[640px] z-50">
                    <div className="bg-white rounded-xl shadow-floating border border-neutral-100 p-6 grid grid-cols-2 gap-4">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/category/${cat.slug}`}
                          onClick={() => setCategoriesDropdownOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-velora-cream/60 transition-colors group/cat"
                        >
                          <div className="w-12 h-12 rounded-md overflow-hidden relative shrink-0 bg-neutral-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-full h-full object-cover group-hover/cat:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div>
                            <div className="font-serif text-sm font-semibold normal-case text-velora-black group-hover/cat:text-velora-gold-600 transition-colors">
                              {cat.name}
                            </div>
                            <div className="text-[11px] normal-case text-neutral-400 line-clamp-1">
                              {cat.tagline}
                            </div>
                            <div className="text-[10px] text-velora-gold-600 font-medium normal-case mt-0.5">
                              {cat.itemCount} items
                            </div>
                          </div>
                        </Link>
                      ))}

                      <div className="col-span-2 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs normal-case">
                        <span className="text-neutral-500">
                          Handpicked international artisanal collections
                        </span>
                        <Link
                          href="/categories"
                          onClick={() => setCategoriesDropdownOpen(false)}
                          className="font-semibold text-velora-black hover:text-velora-gold-600 flex items-center gap-1"
                        >
                          View All Categories <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/shop?filter=trending"
                className="hover:text-velora-gold-600 transition-colors py-1 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-velora-gold-500" />
                <span>Trending</span>
              </Link>

              <Link
                href="/shop?filter=bestseller"
                className="hover:text-velora-gold-600 transition-colors py-1"
              >
                Best Sellers
              </Link>

              <Link
                href="/shop?filter=new"
                className="hover:text-velora-gold-600 transition-colors py-1"
              >
                New Arrivals
              </Link>

              <Link
                href="/about"
                className="hover:text-velora-gold-600 transition-colors py-1"
              >
                Maison
              </Link>
            </nav>

            {/* Right: Search, Account, Wishlist, Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-neutral-700 hover:text-velora-black rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Search items"
              >
                <Search className="w-4.5 h-4.5" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="p-2 text-neutral-700 hover:text-velora-black rounded-full hover:bg-neutral-100 transition-colors relative"
                aria-label="View wishlist"
              >
                <Heart className="w-4.5 h-4.5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-velora-gold-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-in zoom-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account / User */}
              <Link
                href={isAuthenticated ? '/account' : '/auth/login'}
                className="flex items-center gap-1.5 p-1.5 text-neutral-700 hover:text-velora-black rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="My Account"
              >
                <UserIcon className="w-4.5 h-4.5" />
                {isAuthenticated && (
                  <span className="hidden xl:inline text-xs font-medium text-neutral-600 max-w-[90px] truncate">
                    {user?.fullName.split(' ')[0]}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="p-2 bg-velora-black text-white hover:bg-neutral-800 rounded-full transition-colors relative flex items-center justify-center"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-velora-gold-500 text-white border-2 border-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Instant Search Overlay Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative max-w-3xl mx-auto mt-16 px-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
              <form onSubmit={handleSearchSubmit} className="p-4 border-b border-neutral-100 flex items-center gap-3">
                <Search className="w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search over luxury fashion, watches, audio, home sanctuary..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-base sm:text-lg outline-none bg-transparent text-velora-black placeholder:text-neutral-400"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>

              {/* Live Instant Results */}
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                  {searchQuery.trim() ? `Search Results (${liveResults.length})` : 'Popular Recommendations'}
                </div>

                <div className="divide-y divide-neutral-100">
                  {liveResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="py-3 flex items-center gap-4 hover:bg-neutral-50 px-2 rounded-lg transition-colors group"
                    >
                      <div className="w-14 h-14 rounded-md overflow-hidden relative shrink-0 bg-neutral-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-velora-gold-600 font-medium">
                          {product.categoryName}
                        </div>
                        <div className="font-serif text-sm font-semibold text-velora-black group-hover:text-velora-gold-600 transition-colors">
                          {product.name}
                        </div>
                        <div className="text-xs text-neutral-500 line-clamp-1">{product.tagline}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-velora-black">
                          ${product.price}
                        </div>
                        <div className="text-[11px] text-emerald-600 font-medium">In Stock</div>
                      </div>
                    </Link>
                  ))}
                </div>

                {searchQuery.trim() && (
                  <div className="mt-4 pt-3 border-t border-neutral-100 text-center">
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="text-xs font-semibold uppercase tracking-wider text-velora-black hover:text-velora-gold-600 flex items-center justify-center gap-1 mx-auto"
                    >
                      View all results for &quot;{searchQuery}&quot; <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                <Logo size="md" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-neutral-400 hover:text-velora-black rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-serif font-bold text-velora-black hover:text-velora-gold-600"
                >
                  Shop All Collections
                </Link>
                <Link
                  href="/categories"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-serif font-bold text-velora-black hover:text-velora-gold-600"
                >
                  All Categories
                </Link>
                <div className="pl-4 space-y-2 border-l-2 border-velora-gold-200">
                  {CATEGORIES.slice(0, 5).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-neutral-600 hover:text-velora-black"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/shop?filter=trending"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-serif font-bold text-velora-black hover:text-velora-gold-600"
                >
                  Trending Pieces
                </Link>
                <Link
                  href="/shop?filter=new"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-serif font-bold text-velora-black hover:text-velora-gold-600"
                >
                  New Arrivals
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-serif font-bold text-neutral-600 hover:text-velora-black"
                >
                  About VELORA Maison
                </Link>
                <Link
                  href="/tracking"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-serif font-bold text-neutral-600 hover:text-velora-black"
                >
                  Order Tracking
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 space-y-3">
              <Link
                href={isAuthenticated ? '/account' : '/auth/login'}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 bg-velora-black text-white text-xs font-semibold uppercase tracking-widest rounded-md text-center block"
              >
                {isAuthenticated ? 'My VIP Account' : 'Sign In / Register'}
              </Link>
              <div className="text-center text-xs text-neutral-400">
                Worldwide Customer Concierge 24/7
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
