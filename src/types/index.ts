export interface ProductVariantColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  author: string;
  country: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // base USD price
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  categoryId: string;
  categoryName: string;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  images: string[];
  variants?: {
    sizes?: string[];
    colors?: ProductVariantColor[];
  };
  specs?: Record<string, string>;
  highlights?: string[];
  sku: string;
  reviews?: Review[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique item id (combines productId + variant)
  productId: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  exchangeRate: number; // rate relative to 1 USD
  symbolPosition: 'prefix' | 'suffix';
  decimalDigits: number;
}

export interface ShippingMethod {
  id: string;
  name: string;
  carrier: string;
  estimatedDays: string;
  costUSD: number;
  freeAboveUSD?: number;
  description: string;
}

export interface DiscountCoupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number; // e.g. 15 for 15% or 25 for $25 off
  minOrderUSD: number;
  description: string;
}

export interface Address {
  id: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface OrderTimelineItem {
  status: string;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  location?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'in_transit' | 'out_for_delivery' | 'delivered';
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    shippingAddress: Address;
  };
  items: CartItem[];
  shippingMethod: ShippingMethod;
  subtotalUSD: number;
  discountUSD: number;
  couponCode?: string;
  shippingCostUSD: number;
  taxUSD: number;
  totalUSD: number;
  paymentMethod: {
    type: 'credit_card' | 'apple_pay' | 'paypal' | 'google_pay';
    last4?: string;
    brand?: string;
  };
  currency: string;
  currencyRate: number;
  timeline: OrderTimelineItem[];
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  phoneNumber?: string;
  addresses: Address[];
  memberSince: string;
  vipTier?: 'Member' | 'Gold' | 'Platinum' | 'Diamond';
}

export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  currency: string;
  continent: string;
  shippingAvailable: boolean;
}
