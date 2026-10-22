# VELORA — Premium Global E-Commerce Platform

> **"Everything You Love, in One Place."**

VELORA is a luxury, international e-commerce experience architected with Next.js (App Router), TypeScript, and Tailwind CSS. It is tailored for worldwide clientele featuring custom champagne gold design aesthetics, multi-currency localization, server-side validated cart & discount calculations, Delivered Duty Paid (DDP) international logistics, and frictionless customer accounts.

---

## Brand Identity & Aesthetic

- **Brand Name:** VELORA
- **Tagline:** *"Everything You Love, in One Place."*
- **Palette:** Obsidian Black (`#0D0D0E`), Deep Noir (`#141416`), Champagne Gold (`#BF9B4A`, `#D4B645`, `#F4ECDC`), and Pearl White (`#FAF8F5`).
- **Typography & Details:** Clean modern typography, generous whitespace, custom geometric diamond monogram icon, subtle animations, and editorial product presentations.

---

## Technology Stack

- **Framework:** Next.js 15 (App Router, Server Components & Client Hooks)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS with custom luxury theme extensions
- **Icons:** Lucide Icons
- **State Management & Persistence:**
  - `CurrencyContext`: Multi-currency conversion with verified exchange rates (USD, EUR, GBP, JPY, CAD, AUD, AED, CHF, SGD)
  - `CartContext`: Persistent shopping bag with live free shipping threshold progress, item variations, and promo validation
  - `WishlistContext`: Client-side persistent wishlist with quick transfer to bag
  - `AuthContext`: VIP Diamond demo account (`Alexander Wright`) + custom registration, persistent orders history, and address book
- **API Architecture:** Next.js Route Handlers (`/api/checkout`) for server-side price validation, stock checks, and coupon verification
- **Payment Architecture:** Stripe Level-1 PCI-DSS tokenized integration architecture with Apple Pay and PayPal support

---

## All 19 Complete Website Pages

| # | Route | Page Name | Description |
|---|---|---|---|
| 1 | `/` | **Home Page** | Announcement bar, hero section, featured categories, trending, best sellers, new arrivals, promotional gold banner, why shop with VELORA, patron reviews, and footer. |
| 2 | `/shop` | **Shop / All Products** | Full catalog with live search, category sidebar, price slider, in-stock toggle, and sorting (price, rating, newness). |
| 3 | `/product/[slug]` | **Product Details** | High-res gallery, color & size variant selectors, stock availability counter, accordion tabs (Story, Specs, Shipping, Reviews), and related creations. |
| 4 | `/categories` & `/category/[slug]` | **Categories** | All 8 cornerstone departments (Fashion, Electronics, Home, Beauty, Sports, Games, Travel, Lifestyle) with dedicated category landing views. |
| 5 | `/search` | **Search Results** | Live instant search with keyword highlighting, category filtering pills, and suggested queries. |
| 6 | `/cart` | **Shopping Cart** | Full bag review, free express shipping progress bar ($150 threshold), shipping rule calculation, promo codes (`VELORA10`, `GOLD20`, `FREESHIP`), and breakdown. |
| 7 | `/checkout` & `/checkout/success` | **Checkout & Invoice** | Multi-step international checkout with address book, country selector, shipping method selection, payment tokenization, and printable confirmation receipt. |
| 8 | `/auth/login` & `/auth/register` | **Client Authentication** | Patron login with 1-click VIP Diamond demo login, register form with newsletter opt-in, and Supabase integration readiness. |
| 9 | `/account` | **Customer Account Portal** | VIP profile card, lifetime order statistics, saved international addresses manager, and account settings. |
| 10 | `/account/orders` | **Order History** | Complete consignment list with status filtering (In Transit, Confirmed, Delivered), items preview, and tracking shortcuts. |
| 11 | `/wishlist` | **Curated Wishlist** | Saved creations with instant "Move to Bag", shareable link generator, and removal tools. |
| 12 | `/about` | **About VELORA** | The Maison's genesis, 4 founding pillars, international metrics (140+ countries), and atelier craftsmanship. |
| 13 | `/contact` | **Contact Concierge** | VIP client channels (24/7 hotline, WhatsApp desk, regional salons in New York, London, Geneva, Tokyo), and interactive inquiry form. |
| 14 | `/faq` | **Frequently Asked Questions** | Searchable accordion covering currency settlement, DDP duties, authenticity guarantees, and returns. |
| 15 | `/policies/shipping` | **Shipping & Delivery Policy** | Comprehensive DDP transit terms, carrier speeds (Standard, Express, White-Glove VIP), and customs clearance guarantees. |
| 16 | `/policies/returns` | **Returns & Refund Policy** | 30-day global doorstep returns policy with complimentary DHL/FedEx courier pickups. |
| 17 | `/policies/privacy` | **Privacy Policy** | GDPR, CCPA, and Swiss FADP compliant personal data and zero-raw-card-storage disclosures. |
| 18 | `/policies/terms` | **Terms of Service** | Governing law, currency terms, and international ICC dispute resolution. |
| 19 | `/tracking` | **Order Tracking Portal** | Live satellite transit stepper (Confirmed → Atelier Prep → Dispatched → Customs → Courier → Delivered) with inventory inspection. |

---

## Active Promotional Codes for Testing

- **`VELORA10`**: 10% off any order (Min $50 spend)
- **`GOLD20`**: 20% off orders over $200
- **`FREESHIP`**: Free standard global shipping ($15 credit, min $75)
- **`WELCOME50`**: $50 credit on orders over $300

---

## Getting Started

From the project root:

```bash
# Start Next.js development server on http://localhost:3000
npm run dev

# Or build and launch the production server
npm run build
npm start
```
