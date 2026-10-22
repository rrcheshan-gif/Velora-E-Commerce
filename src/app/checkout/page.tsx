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
} from 'lucide-react';

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

  const [paymentType, setPaymentType] = useState<'card' | 'apple_pay' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardName, setCardName] = useState('Alexander Wright');

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

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        items,
        couponCode: appliedCoupon?.code,
        shippingMethodId: selectedShippingMethod.id,
        currencyCode: currentCurrency.code,
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
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-4">
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
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-4">
            <h2 className="font-serif text-lg font-bold text-velora-black flex items-center justify-between">
              <span>2. Shipping Destination</span>
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
                          ? 'border-velora-black bg-velora-cream/40'
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

          {/* 3. International Payment Provider Architecture */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-velora-black">
                3. Secure Payment Method
              </h2>
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Stripe International Architecture</span>
              </div>
            </div>

            {/* Payment Method Switcher Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-neutral-100 rounded-xl">
              <button
                type="button"
                onClick={() => setPaymentType('card')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  paymentType === 'card'
                    ? 'bg-white text-velora-black shadow-xs'
                    : 'text-neutral-500 hover:text-velora-black'
                }`}
              >
                Credit / Debit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentType('apple_pay')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  paymentType === 'apple_pay'
                    ? 'bg-white text-velora-black shadow-xs'
                    : 'text-neutral-500 hover:text-velora-black'
                }`}
              >
                Apple / Google Pay
              </button>
              <button
                type="button"
                onClick={() => setPaymentType('paypal')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  paymentType === 'paypal'
                    ? 'bg-white text-velora-black shadow-xs'
                    : 'text-neutral-500 hover:text-velora-black'
                }`}
              >
                PayPal Express
              </button>
            </div>

            {paymentType === 'card' && (
              <div className="space-y-4 pt-2 text-xs">
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 font-medium mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black font-mono"
                    />
                    <CreditCard className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-600 font-medium mb-1">Expiry Date (MM/YY)</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-600 font-medium mb-1">Security Code (CVC)</label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black font-mono"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 flex items-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>PCI-DSS Level 1 Encrypted: Raw card details are strictly tokenized by payment gateways and never touch our servers.</span>
                </p>
              </div>
            )}

            {paymentType === 'apple_pay' && (
              <div className="py-6 text-center space-y-2 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="text-xs text-neutral-600">
                  Touch ID / Face ID authentication will trigger when submitting.
                </span>
                <div className="font-semibold text-xs text-velora-black">
                  Biometric 1-Click Pay Ready
                </div>
              </div>
            )}

            {paymentType === 'paypal' && (
              <div className="py-6 text-center space-y-2 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="text-xs text-neutral-600">
                  You will be securely redirected to PayPal for international token clearance.
                </span>
                <div className="font-semibold text-xs text-velora-black">
                  PayPal Buyer Protection Active
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Review & Placement (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 space-y-6 sticky top-24">
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

              <div className="text-[11px] text-neutral-400 text-right">
                Settled in {currentCurrency.code} with guaranteed fixed conversion
              </div>
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
                  <span>Authorize & Place Order • {formatPrice(totalUSD)}</span>
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
