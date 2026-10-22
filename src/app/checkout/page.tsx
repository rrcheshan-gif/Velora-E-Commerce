'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAuth } from '@/context/AuthContext';
import { SUPPORTED_COUNTRIES, SHIPPING_METHODS } from '@/data/mockData';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Truck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Building2,
  Calendar,
  Smartphone,
  Banknote,
  Copy,
  Check,
} from 'lucide-react';

type PaymentMethodType =
  | 'card'
  | 'apple_pay'
  | 'paypal'
  | 'klarna'
  | 'bank_wire'
  | 'cash_on_delivery';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotalUSD,
    discountUSD,
    shippingCostUSD,
    taxUSD,
    totalUSD,
    appliedCoupon,
    selectedShippingMethod,
    setSelectedShippingMethod,
    clearCart,
  } = useCart();

  const { formatPrice, currentCurrency } = useCurrency();
  const { user, addOrder } = useAuth();

  const [email, setEmail] = useState(user?.email || 'alexander.wright@velora-vip.com');
  const [fullName, setFullName] = useState(user?.fullName || 'Alexander Wright');
  const [phone, setPhone] = useState(user?.phoneNumber || '+1 (555) 382-9014');
  const [addressLine1, setAddressLine1] = useState(user?.addresses[0]?.addressLine1 || '740 Park Avenue');
  const [addressLine2, setAddressLine2] = useState(user?.addresses[0]?.addressLine2 || 'Penthouse B');
  const [city, setCity] = useState(user?.addresses[0]?.city || 'New York');
  const [state, setState] = useState(user?.addresses[0]?.state || 'NY');
  const [postalCode, setPostalCode] = useState(user?.addresses[0]?.postalCode || '10021');
  const [selectedCountry, setSelectedCountry] = useState(user?.addresses[0]?.country || 'United States');

  // Checkout Payment Methods
  const [paymentType, setPaymentType] = useState<PaymentMethodType>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardName, setCardName] = useState('Alexander Wright');
  const [saveCard, setSaveCard] = useState(true);
  const [copiedIban, setCopiedIban] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Your shopping bag is empty</h2>
        <p className="text-sm text-neutral-500">Add pieces to your bag before checking out.</p>
        <Link
          href="/shop"
          className="inline-block mt-4 px-6 py-2.5 bg-velora-black text-white text-xs font-semibold uppercase tracking-wider rounded-md"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Format 4 installment payments for Klarna & PayPal
  const installmentAmountUSD = totalUSD / 4;

  const handleCopyIban = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText('CH9300240240123456789');
      setCopiedIban(true);
      setTimeout(() => setCopiedIban(false), 2000);
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 16) val = val.slice(0, 16);
    // Format in groups of 4
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Determine clean payment details based on method
    let paymentDetails = {
      type: 'credit_card' as const,
      last4: cardNumber.replace(/\D/g, '').slice(-4) || '4242',
      brand: 'Visa Infinite',
      title: 'Credit / Debit Card',
      details: 'Ending in •••• 4242',
    };

    if (paymentType === 'apple_pay') {
      paymentDetails = {
        type: 'apple_pay' as const,
        last4: '8812',
        brand: 'Apple Pay Biometric',
        title: 'Apple Pay / Google Pay',
        details: 'Biometric 1-Touch Authorization',
      };
    } else if (paymentType === 'paypal') {
      paymentDetails = {
        type: 'paypal' as const,
        last4: '',
        brand: 'PayPal Verified',
        title: 'PayPal Express',
        details: '4 Bi-Weekly Installments / PayPal Balance',
      };
    } else if (paymentType === 'klarna') {
      paymentDetails = {
        type: 'klarna' as const,
        last4: '',
        brand: 'Klarna Pay Later',
        title: 'Klarna Pay in 4',
        details: `4 interest-free payments of ${formatPrice(installmentAmountUSD)}`,
      };
    } else if (paymentType === 'bank_wire') {
      paymentDetails = {
        type: 'bank_wire' as const,
        last4: '5678',
        brand: 'UBS Private Banking SWIFT',
        title: 'VIP Direct Bank Wire',
        details: 'IBAN: CH93 0024 0240 1234 5678 9 (Geneva)',
      };
    } else if (paymentType === 'cash_on_delivery') {
      paymentDetails = {
        type: 'cash_on_delivery' as const,
        last4: '',
        brand: 'Concierge COD',
        title: 'White-Glove Cash on Delivery',
        details: 'Pay upon in-person inspection at doorstep',
      };
    }

    try {
      const payload = {
        items,
        couponCode: appliedCoupon?.code,
        shippingMethodId: selectedShippingMethod.id,
        currencyCode: currentCurrency.code,
        paymentMethod: paymentDetails,
        customer: {
          fullName,
          email,
          phone,
          shippingAddress: {
            fullName,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country: selectedCountry,
            phone,
          },
        },
      };

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Checkout failed. Please inspect details.');
      }

      // Add to persistent orders history
      addOrder(data.order);
      // Empty the shopping bag
      clearCart();

      // Redirect to confirmation page
      router.push(`/checkout/success?orderId=${data.order.orderNumber}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred during order authorization';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Checkout Header */}
      <div className="pb-6 mb-8 border-b border-neutral-100 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-velora-gold-600">
            Secure Settlement
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-velora-black mt-1">
            International Checkout
          </h1>
        </div>

        <div className="flex items-center gap-2 text-neutral-500 text-xs">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span className="hidden sm:inline">256-Bit Encrypted International Checkout</span>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-8 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Checkout Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Contact Information */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-4 shadow-subtle">
            <h2 className="font-serif text-lg font-bold text-velora-black flex items-center justify-between">
              <span>1. Contact & Consignment Details</span>
              <span className="text-xs font-sans font-normal text-neutral-400">Step 1 of 3</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-neutral-600 font-medium mb-1">Email for Courier Updates</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-medium mb-1">Mobile Phone (Courier SMS)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black"
                />
              </div>
            </div>
          </div>

          {/* 2. Destination Address */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-4 shadow-subtle">
            <h2 className="font-serif text-lg font-bold text-velora-black flex items-center justify-between">
              <span>2. Shipping Destination & Speed</span>
              <span className="text-xs font-sans font-normal text-neutral-400">Step 2 of 3</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-600 font-medium mb-1">Recipient Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-medium mb-1">Country / Territory</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black font-medium"
                >
                  {SUPPORTED_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.flag} {c.name} ({c.currency})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-600 font-medium mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 740 Park Avenue"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-medium mb-1">Apartment, Suite, Unit (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Penthouse B"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">State / Province</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Service Selector */}
            <div className="pt-4 border-t border-neutral-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-velora-black mb-2">
                Select Shipping Transit Speed
              </label>
              <div className="space-y-2">
                {SHIPPING_METHODS.map((method) => {
                  const isFree = method.freeAboveUSD && subtotalUSD >= method.freeAboveUSD;
                  const cost = isFree ? 0 : method.costUSD;
                  const isSelected = selectedShippingMethod.id === method.id;

                  return (
                    <label
                      key={method.id}
                      onClick={() => setSelectedShippingMethod(method)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-velora-black bg-velora-cream/40 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="checkoutShipping"
                          checked={isSelected}
                          onChange={() => setSelectedShippingMethod(method)}
                          className="text-velora-black focus:ring-0"
                        />
                        <div>
                          <div className="text-xs font-bold text-velora-black">{method.name}</div>
                          <div className="text-[11px] text-neutral-500">{method.carrier} • {method.estimatedDays}</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold">
                        {cost === 0 ? <span className="text-emerald-700">Complimentary</span> : formatPrice(cost)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Comprehensive International Payment Methods */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-6 shadow-subtle">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <h2 className="font-serif text-lg font-bold text-velora-black">
                  3. Select Payment Method
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Choose your preferred global payment settlement option
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Stripe Encrypted</span>
              </div>
            </div>

            {/* Payment Method Selector Grid (6 Options) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: 'card',
                  title: 'Credit / Debit Card',
                  subtitle: 'Visa, MC, Amex',
                  badge: 'Instant',
                  icon: CreditCard,
                },
                {
                  id: 'apple_pay',
                  title: 'Apple / Google Pay',
                  subtitle: 'Biometric 1-Touch',
                  badge: 'Fastest',
                  icon: Smartphone,
                },
                {
                  id: 'paypal',
                  title: 'PayPal & Pay in 4',
                  subtitle: 'Buyer Protection',
                  badge: 'Popular',
                  icon: CheckCircle2,
                },
                {
                  id: 'klarna',
                  title: 'Klarna / Afterpay',
                  subtitle: '4 Interest-Free',
                  badge: '0% APR',
                  icon: Calendar,
                },
                {
                  id: 'bank_wire',
                  title: 'VIP Bank Wire',
                  subtitle: 'SWIFT / IBAN',
                  badge: 'High Value',
                  icon: Building2,
                },
                {
                  id: 'cash_on_delivery',
                  title: 'Cash on Delivery',
                  subtitle: 'White-Glove In-Person',
                  badge: 'Concierge',
                  icon: Banknote,
                },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentType === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentType(m.id as PaymentMethodType)}
                    className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-velora-black bg-velora-cream/40 shadow-sm ring-1 ring-velora-black'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isSelected
                            ? 'bg-velora-black text-white'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600">
                        {m.badge}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-velora-black leading-tight">
                        {m.title}
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5 truncate">
                        {m.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* METHOD 1: CREDIT / DEBIT CARD */}
            {paymentType === 'card' && (
              <div className="space-y-6 pt-2 text-xs">
                {/* Interactive Visual Luxury Card Preview */}
                <div className="relative aspect-[1.8/1] max-w-sm mx-auto rounded-2xl bg-gradient-to-tr from-velora-noir via-neutral-900 to-velora-black text-white p-6 shadow-floating border border-velora-gold-500/30 overflow-hidden">
                  {/* Subtle Gold Shimmer Accent */}
                  <div className="absolute -top-16 -right-16 w-40 h-40 bg-velora-gold-500/20 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif font-bold tracking-[0.25em] text-sm text-velora-gold-400">
                      VELORA PRIVILÈGE
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400">
                      INTERNATIONAL
                    </span>
                  </div>

                  {/* Metallic Gold Chip */}
                  <div className="w-10 h-7 rounded bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 mb-4 shadow-sm border border-amber-300 flex items-center justify-center">
                    <div className="w-7 h-5 border border-amber-700/40 rounded-sm opacity-50" />
                  </div>

                  {/* Live Card Number */}
                  <div className="font-mono text-base tracking-[0.2em] text-neutral-200 mb-4 font-medium">
                    {cardNumber || '•••• •••• •••• 4242'}
                  </div>

                  {/* Card Bottom: Name, Expiry, Logo */}
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[8px] uppercase tracking-widest text-neutral-400">
                        Cardholder
                      </div>
                      <div className="font-semibold text-xs tracking-wider uppercase text-white truncate max-w-[160px]">
                        {cardName || 'Alexander Wright'}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[8px] uppercase tracking-widest text-neutral-400">
                        Expires
                      </div>
                      <div className="font-mono font-semibold text-xs text-white">
                        {cardExpiry || '12/28'}
                      </div>
                    </div>

                    <div className="font-serif font-bold text-sm tracking-wider text-velora-gold-300">
                      VISA
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-neutral-600 font-medium mb-1">
                      Cardholder Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-600 font-medium mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="4242 4242 4242 4242"
                        className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black font-mono"
                      />
                      <CreditCard className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-600 font-medium mb-1">
                        Expiry Date (MM/YY)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-1">
                        Security Code (CVC)
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="3 or 4 digits"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black font-mono"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 pt-1 text-[11px] text-neutral-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="rounded border-neutral-300 text-velora-black focus:ring-0 w-3.5 h-3.5"
                    />
                    <span>Save card securely to my VIP account with end-to-end tokenization</span>
                  </label>

                  <p className="text-[11px] text-neutral-400 flex items-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      PCI-DSS Level 1 Encrypted: Raw card credentials are tokenized directly by Stripe and never stored in plain text.
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* METHOD 2: APPLE PAY / GOOGLE PAY */}
            {paymentType === 'apple_pay' && (
              <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto shadow-md">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-velora-black">
                    Biometric 1-Touch Express Checkout
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
                    Authorize your acquisition securely with Touch ID or Face ID. Your shipping destination and payment card in Apple Wallet or Google Wallet will be debited seamlessly.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-neutral-200 inline-flex items-center gap-3 text-xs">
                  <span className="font-semibold text-velora-black">Default Wallet Card:</span>
                  <span className="font-mono text-neutral-600">Apple Card (•••• 8812)</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded text-[10px]">
                    Verified
                  </span>
                </div>
              </div>
            )}

            {/* METHOD 3: PAYPAL */}
            {paymentType === 'paypal' && (
              <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-black text-xl italic text-blue-900 tracking-tight">
                      PayPal
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">Express Checkout</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Buyer Protection
                  </span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  You can settle the full amount ({formatPrice(totalUSD)}) or choose <strong>PayPal Pay in 4</strong> to split into 4 interest-free installments of <strong>{formatPrice(installmentAmountUSD)}</strong> without foreign exchange markups.
                </p>

                <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Log in to your PayPal account with 1-click on the authorization screen below.</span>
                </div>
              </div>
            )}

            {/* METHOD 4: KLARNA / AFTERPAY */}
            {paymentType === 'klarna' && (
              <div className="p-6 bg-pink-50/40 rounded-xl border border-pink-200 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-black text-lg text-pink-700 tracking-wider">
                      Klarna.
                    </span>
                    <span className="text-xs text-neutral-600 font-semibold">Pay in 4 Interest-Free Payments</span>
                  </div>
                  <span className="text-[10px] font-bold text-pink-700 bg-pink-100 px-2 py-0.5 rounded-full">
                    0% APR
                  </span>
                </div>

                {/* 4 Installments Visual Timeline */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: '1st Payment', date: 'Due Today', amount: installmentAmountUSD },
                    { label: '2nd Payment', date: 'In 2 Weeks', amount: installmentAmountUSD },
                    { label: '3rd Payment', date: 'In 4 Weeks', amount: installmentAmountUSD },
                    { label: '4th Payment', date: 'In 6 Weeks', amount: installmentAmountUSD },
                  ].map((inst, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white rounded-lg border border-pink-100 text-center shadow-xs"
                    >
                      <div className="text-[10px] font-semibold text-neutral-400 uppercase">
                        {inst.label}
                      </div>
                      <div className="font-serif font-bold text-sm text-velora-black mt-0.5">
                        {formatPrice(inst.amount)}
                      </div>
                      <div className="text-[10px] text-pink-700 font-medium mt-0.5">
                        {inst.date}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-neutral-500 space-y-1">
                  <div>✓ Instant soft decision (no impact to credit score)</div>
                  <div>✓ Automated bi-weekly deductions from your preferred card</div>
                  <div>✓ Manage payments anytime through the Klarna mobile app</div>
                </div>
              </div>
            )}

            {/* METHOD 5: VIP BANK WIRE */}
            {paymentType === 'bank_wire' && (
              <div className="p-6 bg-velora-cream/60 rounded-xl border border-velora-gold-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-velora-gold-200">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-velora-gold-700" />
                    <div>
                      <h3 className="font-serif font-bold text-sm text-velora-black">
                        Maison VELORA Private Client Banking
                      </h3>
                      <div className="text-[11px] text-neutral-500">
                        UBS Switzerland AG • Geneva Headquarters
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-velora-gold-800 bg-velora-gold-100 px-2 py-0.5 rounded-full border border-velora-gold-300">
                    48h Vault Reservation
                  </span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  Upon placing this order, your pieces will be immediately reserved in our central vault for 48 hours. Please remit the total invoice amount via international SWIFT transfer:
                </p>

                <div className="bg-white p-4 rounded-lg border border-neutral-200 space-y-2 text-xs font-mono text-neutral-700">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Beneficiary:</span>
                    <strong className="text-velora-black">VELORA International SA</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">IBAN:</span>
                    <div className="flex items-center gap-1.5">
                      <strong className="text-velora-black">CH93 0024 0240 1234 5678 9</strong>
                      <button
                        type="button"
                        onClick={handleCopyIban}
                        className="text-neutral-400 hover:text-velora-black p-0.5"
                        title="Copy IBAN"
                      >
                        {copiedIban ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">SWIFT / BIC:</span>
                    <strong className="text-velora-black">UBSWCHZH12A</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Transfer Reference:</span>
                    <strong className="text-velora-gold-700">Assigned upon submission</strong>
                  </div>
                </div>
              </div>
            )}

            {/* METHOD 6: CASH ON DELIVERY */}
            {paymentType === 'cash_on_delivery' && (
              <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-neutral-200">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-velora-black">
                      White-Glove Doorstep Inspection & Settlement
                    </h3>
                    <p className="text-[11px] text-neutral-500">
                      Available across all major international metropolitan destinations
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-neutral-600 leading-relaxed">
                  <p>
                    1. <strong>Doorstep Unboxing:</strong> Our uniformed private courier will present the luxury parcel for in-person inspection before payment is finalized.
                  </p>
                  <p>
                    2. <strong>Flexible Settlement:</strong> You may pay the exact balance of <strong>{formatPrice(totalUSD)}</strong> in local cash currency or swipe via the courier’s mobile contactless POS terminal.
                  </p>
                  <p>
                    3. <strong>SMS Authentication:</strong> A secure 4-digit verification code will be dispatched to your mobile phone (<strong>{phone}</strong>) on the morning of scheduled delivery.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Review & Placement (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 space-y-6 sticky top-24 shadow-card">
            <h2 className="font-serif text-lg font-bold text-velora-black pb-3 border-b border-neutral-200 flex items-center justify-between">
              <span>Bag Summary</span>
              <span className="text-xs text-neutral-500 font-sans font-normal">{items.length} items</span>
            </h2>

            {/* Items mini list */}
            <div className="divide-y divide-neutral-200 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-3 first:pt-0 flex gap-3">
                  <div className="relative w-14 h-16 rounded bg-white overflow-hidden shrink-0 border border-neutral-200">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="font-semibold text-velora-black line-clamp-1">{item.product.name}</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      Qty: {item.quantity} {item.selectedSize && `• ${item.selectedSize}`} {item.selectedColor && `• ${item.selectedColor}`}
                    </div>
                    <div className="font-bold text-velora-black mt-1">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-2.5 text-xs text-neutral-600 pt-4 border-t border-neutral-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-velora-black">{formatPrice(subtotalUSD)}</span>
              </div>

              {discountUSD > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>VIP Promotion ({appliedCoupon?.code})</span>
                  <span>-{formatPrice(discountUSD)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping ({selectedShippingMethod.carrier})</span>
                <span className="font-semibold text-velora-black">
                  {shippingCostUSD === 0 ? <span className="text-emerald-700">Free</span> : formatPrice(shippingCostUSD)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Customs Pre-Clearance & VAT (5%)</span>
                <span className="font-semibold text-velora-black">{formatPrice(taxUSD)}</span>
              </div>

              <div className="flex justify-between items-baseline text-base font-bold text-velora-black pt-4 border-t border-neutral-200">
                <span>Grand Total</span>
                <span className="font-serif text-2xl text-velora-gold-600">
                  {formatPrice(totalUSD)}
                </span>
              </div>

              {paymentType === 'klarna' && (
                <div className="text-xs text-pink-700 bg-pink-50 p-2.5 rounded-lg border border-pink-200 font-medium">
                  Or 4 bi-weekly payments of <strong>{formatPrice(installmentAmountUSD)}</strong> with Klarna.
                </div>
              )}

              <div className="text-[11px] text-neutral-400 text-right">
                Settled in {currentCurrency.code} with guaranteed fixed conversion
              </div>
            </div>

            {/* Selected Method Pill in Summary */}
            <div className="p-3 bg-white rounded-xl border border-neutral-200 text-xs flex items-center justify-between">
              <span className="text-neutral-500">Payment:</span>
              <span className="font-semibold text-velora-black capitalize">
                {paymentType.replace(/_/g, ' ')}
              </span>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all ${
                isSubmitting
                  ? 'bg-neutral-400 text-white cursor-not-allowed'
                  : 'bg-velora-black hover:bg-neutral-800 text-white hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <span>Authorizing International Transaction...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-velora-gold-400" />
                  <span>
                    {paymentType === 'bank_wire'
                      ? `Reserve & Generate Wire Invoice • ${formatPrice(totalUSD)}`
                      : paymentType === 'cash_on_delivery'
                      ? `Confirm White-Glove COD Order • ${formatPrice(totalUSD)}`
                      : paymentType === 'klarna'
                      ? `Authorize with Klarna • ${formatPrice(installmentAmountUSD)} Due Today`
                      : `Authorize & Place Order • ${formatPrice(totalUSD)}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Reassurance text */}
            <div className="text-[11px] text-neutral-500 space-y-2 pt-2 border-t border-neutral-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero import tax guarantee at destination country</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Consignment tracking code generated immediately</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-velora-gold-600" />
                <span>Complimentary gift unboxing box with seal</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
