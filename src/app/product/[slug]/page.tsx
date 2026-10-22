'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';
import { ProductCard } from '@/components/product/ProductCard';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  Share2,
  Check,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const product = PRODUCTS.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.variants?.sizes?.[0]
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.variants?.colors?.[0]?.name
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'shipping' | 'reviews'>('description');
  const [copiedShare, setCopiedShare] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  // Related products from same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-velora-black transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link href="/shop" className="hover:text-velora-black transition-colors">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link href={`/category/${product.categoryId}`} className="hover:text-velora-black transition-colors">
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-velora-black font-medium truncate">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Selected Image */}
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-100 shadow-sm">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-all duration-500"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-velora-gold-500 text-white text-[11px] font-bold uppercase tracking-widest rounded shadow-sm">
                Best Seller
              </span>
            )}
            {product.isNewArrival && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md text-velora-black border border-neutral-200 text-[11px] font-bold uppercase tracking-widest rounded shadow-sm">
                New Arrival
              </span>
            )}
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-24 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-velora-gold-500 scale-95 shadow-xs'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Purchasing & Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span className="uppercase tracking-widest font-semibold text-velora-gold-600">
                {product.categoryName}
              </span>
              <span className="font-mono text-[11px]">SKU: {product.sku}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-velora-black leading-tight">
              {product.name}
            </h1>

            <p className="text-sm text-neutral-500 mt-2 italic">
              {product.tagline}
            </p>

            {/* Rating Bar */}
            <div className="flex items-center gap-3 mt-4 pb-6 border-b border-neutral-100">
              <div className="flex items-center gap-1 text-velora-gold-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-velora-gold-500' : 'text-neutral-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-velora-black">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-neutral-400">({product.reviewCount} International Reviews)</span>
            </div>
          </div>

          {/* Price & Stock Display */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-velora-black">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-base text-neutral-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <div className="text-right">
              {product.inStock ? (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock ({product.stockCount} left)
                </span>
              ) : (
                <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-2.5 py-1 rounded-full">
                  Sold Out
                </span>
              )}
            </div>
          </div>

          {/* Color Variant Selector */}
          {product.variants?.colors && (
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-velora-black uppercase tracking-wider">Color:</span>
                <span className="text-neutral-500">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.variants.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                      selectedColor === color.name
                        ? 'border-velora-black scale-110 shadow-sm'
                        : 'border-transparent hover:scale-105'
                    }`}
                    title={color.name}
                  >
                    <span
                      className="w-7 h-7 rounded-full border border-neutral-200 shadow-inner block"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Variant Selector */}
          {product.variants?.sizes && (
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-velora-black uppercase tracking-wider">Size:</span>
                <span className="text-neutral-500">{selectedSize}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.variants.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 text-xs font-semibold rounded-md border text-center transition-all ${
                      selectedSize === size
                        ? 'bg-velora-black text-white border-velora-black shadow-xs'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Action Controls */}
          <div className="space-y-4 pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-4">
              {/* Quantity Picker */}
              <div className="flex items-center border border-neutral-200 rounded-lg p-1 bg-neutral-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-neutral-200 rounded text-neutral-600 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-velora-black">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="p-2 hover:bg-neutral-200 rounded text-neutral-600 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-4 px-6 text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all ${
                  addedNotice
                    ? 'bg-emerald-700 text-white'
                    : 'bg-velora-black hover:bg-neutral-800 text-white hover:shadow-xl'
                }`}
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added To Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-velora-gold-400" />
                    <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                className={`p-4 rounded-lg border transition-colors ${
                  isFavorited
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'border-neutral-200 hover:border-neutral-400 text-neutral-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-600' : ''}`} />
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                aria-label="Share product"
                className="p-4 rounded-lg border border-neutral-200 hover:border-neutral-400 text-neutral-600 transition-colors relative"
              >
                <Share2 className="w-5 h-5" />
                {copiedShare && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap animate-in fade-in">
                    Link copied!
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Value Props Box */}
          <div className="bg-velora-cream/60 rounded-xl p-4 border border-velora-gold-200/50 space-y-3 text-xs text-neutral-700">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-velora-gold-600 shrink-0" />
              <span>Complimentary worldwide express shipping on orders over $150</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-velora-gold-600 shrink-0" />
              <span>Pre-cleared international customs — No surprise tariffs on delivery</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-velora-gold-600 shrink-0" />
              <span>30-Day risk-free return guarantee with courier pickup</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion Tabs Section */}
      <div className="mt-16 sm:mt-24 pt-10 border-t border-neutral-200">
        {/* Tab Headers */}
        <div className="flex items-center gap-6 sm:gap-10 border-b border-neutral-200 pb-4 overflow-x-auto">
          {[
            { id: 'description', label: 'Story & Details' },
            { id: 'specs', label: 'Specifications' },
            { id: 'shipping', label: 'Shipping & Customs' },
            { id: 'reviews', label: `Reviews (${product.reviewCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`font-serif text-sm sm:text-base font-bold pb-2 transition-all relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-velora-black'
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-[-17px] inset-x-0 h-0.5 bg-velora-gold-500" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-8 max-w-4xl">
          {activeTab === 'description' && (
            <div className="space-y-6">
              <p className="text-neutral-600 text-sm leading-relaxed sm:text-base">
                {product.description}
              </p>

              {product.highlights && (
                <div className="space-y-3 pt-4">
                  <h4 className="font-serif font-bold text-sm text-velora-black">Key Highlights</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-neutral-600">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-velora-gold-500 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-4">
              {product.specs ? (
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs sm:text-sm">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="pb-3 border-b border-neutral-100 flex justify-between">
                      <dt className="text-neutral-500 font-medium">{key}</dt>
                      <dd className="font-semibold text-velora-black text-right">{val}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-xs text-neutral-400">Detailed specifications available upon request.</p>
              )}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
              <h4 className="font-serif font-bold text-base text-velora-black">Global Transit Guarantee</h4>
              <p>
                Every VELORA parcel is dispatched with priority courier tracking via FedEx International Priority or DHL Express. Import duties and VAT are pre-cleared at our international fulfillment hubs, guaranteeing zero unexpected import tariffs at your threshold.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-100">
                  <strong className="block text-velora-black mb-1">Standard Global Air</strong>
                  <span className="text-neutral-500 text-xs">6 – 10 Business Days (Complimentary over $150)</span>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-100">
                  <strong className="block text-velora-black mb-1">Priority Air Courier</strong>
                  <span className="text-neutral-500 text-xs">2 – 4 Business Days Worldwide</span>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-100">
                  <strong className="block text-velora-black mb-1">White-Glove VIP</strong>
                  <span className="text-neutral-500 text-xs">1 – 2 Days Scheduled Appointment</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div>
                  <h4 className="font-serif text-lg font-bold text-velora-black">Customer Reviews</h4>
                  <p className="text-xs text-neutral-400">Average rating {product.rating} / 5.0 across {product.reviewCount} verified international orders</p>
                </div>
                <button className="px-4 py-2 border border-neutral-300 text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-50">
                  Write a Review
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-neutral-50 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-velora-gold-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-velora-gold-500" />
                      ))}
                    </div>
                    <span className="text-[11px] text-neutral-400">Verified Buyer • Paris, France</span>
                  </div>
                  <h5 className="font-serif font-bold text-xs text-velora-black">Sensational quality and pristine finish</h5>
                  <p className="text-xs text-neutral-600">The craftsmanship is even more breathtaking in person. Shipped to Europe in 48 hours without any customs delays.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-16 border-t border-neutral-200">
          <div className="mb-8">
            <span className="text-xs uppercase font-semibold tracking-widest text-velora-gold-600">
              Curated Harmonies
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-velora-black mt-1">
              You May Also Appreciate
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
