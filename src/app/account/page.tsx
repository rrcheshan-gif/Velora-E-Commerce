'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useWishlist } from '@/context/WishlistContext';
import {
  Package,
  MapPin,
  Heart,
  User as UserIcon,
  LogOut,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Crown,
} from 'lucide-react';
import { SUPPORTED_COUNTRIES } from '@/data/mockData';

export default function AccountPage() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    logout,
    orders,
    addresses,
    addAddress,
    removeAddress,
    setDefaultAddress,
  } = useAuth();
  const { formatPrice, currentCurrency } = useCurrency();
  const { itemCount: wishlistCount } = useWishlist();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'preferences'>('overview');
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  // New Address form state
  const [newFullName, setNewFullName] = useState(user?.fullName || '');
  const [newAddressLine1, setNewAddressLine1] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPostalCode, setNewPostalCode] = useState('');
  const [newCountry, setNewCountry] = useState('United States');
  const [newPhone, setNewPhone] = useState(user?.phoneNumber || '');

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Patron Access Required</h2>
        <p className="text-xs text-neutral-500">Please sign in to access your private account dossier.</p>
        <Link
          href="/auth/login"
          className="inline-block px-6 py-2.5 bg-velora-black text-white text-xs font-semibold uppercase tracking-wider rounded-md"
        >
          Sign In Now
        </Link>
      </div>
    );
  }

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressLine1 || !newCity) return;
    addAddress({
      fullName: newFullName,
      addressLine1: newAddressLine1,
      city: newCity,
      state: newState,
      postalCode: newPostalCode,
      country: newCountry,
      phone: newPhone,
      isDefault: addresses.length === 0,
    });
    setShowAddAddressModal(false);
    setNewAddressLine1('');
    setNewCity('');
    setNewPostalCode('');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* User Header Profile Card */}
      <div className="bg-velora-noir text-white rounded-2xl p-6 sm:p-10 border border-velora-darkborder mb-10 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-velora-gold-400 to-velora-gold-600 p-0.5 shrink-0 shadow-gold">
              <div className="w-full h-full rounded-full bg-velora-black flex items-center justify-center text-velora-gold-300 font-serif text-2xl font-bold">
                {user.fullName.charAt(0)}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                  {user.fullName}
                </h1>
                <span className="px-2.5 py-0.5 bg-velora-gold-500/20 text-velora-gold-300 border border-velora-gold-400/30 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Crown className="w-3 h-3 text-velora-gold-400" />
                  <span>{user.vipTier || 'Diamond'} Tier</span>
                </span>
              </div>
              <p className="text-xs text-neutral-400">{user.email}</p>
              <p className="text-[11px] text-neutral-500">
                Patron Member Since {user.memberSince} • 24/7 Dedicated Concierge Assigned
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar (3 cols) */}
        <div className="lg:col-span-3 space-y-1.5">
          {[
            { id: 'overview', label: 'Account Overview', icon: UserIcon },
            { id: 'orders', label: `Order History (${orders.length})`, icon: Package },
            { id: 'addresses', label: `Saved Addresses (${addresses.length})`, icon: MapPin },
            { id: 'wishlist', label: `Curated Wishlist (${wishlistCount})`, icon: Heart, href: '/wishlist' },
          ].map((tab) => {
            const Icon = tab.icon;
            if (tab.href) {
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-neutral-400" />
                    <span>{tab.label}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </Link>
              );
            }

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-velora-black text-white shadow-sm'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display (9 cols) */}
        <div className="lg:col-span-9">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="text-xs text-neutral-500 mb-1">Lifetime Orders</div>
                  <div className="font-serif text-2xl font-bold text-velora-black">{orders.length}</div>
                  <Link href="/account/orders" className="text-[11px] text-velora-gold-600 font-semibold mt-2 inline-block hover:underline">
                    View consignments →
                  </Link>
                </div>

                <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="text-xs text-neutral-500 mb-1">Active Wishlist</div>
                  <div className="font-serif text-2xl font-bold text-velora-black">{wishlistCount}</div>
                  <Link href="/wishlist" className="text-[11px] text-velora-gold-600 font-semibold mt-2 inline-block hover:underline">
                    View saved pieces →
                  </Link>
                </div>

                <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="text-xs text-neutral-500 mb-1">Primary Settlement</div>
                  <div className="font-serif text-2xl font-bold text-velora-black">{currentCurrency.code}</div>
                  <span className="text-[11px] text-neutral-400 mt-2 block">
                    {currentCurrency.name}
                  </span>
                </div>
              </div>

              {/* Latest Consignment */}
              {orders.length > 0 && (
                <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <h3 className="font-serif text-base font-bold text-velora-black">
                      Most Recent Consignment
                    </h3>
                    <Link
                      href={`/tracking?orderId=${orders[0].orderNumber}`}
                      className="text-xs font-semibold text-velora-gold-600 hover:underline"
                    >
                      Track Order #{orders[0].orderNumber} →
                    </Link>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="font-bold text-velora-black">{orders[0].orderNumber}</div>
                      <div className="text-neutral-500 text-[11px] mt-0.5">
                        Placed on {new Date(orders[0].date).toLocaleDateString()} • {orders[0].items.length} items
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full font-semibold uppercase tracking-wider text-[10px]">
                        {orders[0].status.replace('_', ' ')}
                      </span>
                      <span className="font-bold font-serif text-sm text-velora-black">
                        {formatPrice(orders[0].totalUSD)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ORDERS LIST */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <h2 className="font-serif text-xl font-bold text-velora-black">
                  Your Consignments ({orders.length})
                </h2>
                <Link
                  href="/tracking"
                  className="text-xs font-semibold text-velora-gold-600 hover:underline"
                >
                  Universal Courier Lookup →
                </Link>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 bg-neutral-50 rounded-xl">
                  <p className="text-xs text-neutral-500">You haven&apos;t placed any orders yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4 shadow-subtle hover:border-neutral-300 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100 text-xs">
                        <div>
                          <span className="font-bold text-velora-black font-mono text-sm">{order.orderNumber}</span>
                          <span className="text-neutral-400 mx-2">•</span>
                          <span className="text-neutral-500">{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-0.5 bg-neutral-100 text-neutral-700 rounded-full font-semibold uppercase tracking-wider text-[10px]">
                            {order.status.replace('_', ' ')}
                          </span>
                          <span className="font-serif font-bold text-base text-velora-black">
                            {formatPrice(order.totalUSD)}
                          </span>
                        </div>
                      </div>

                      <div className="divide-y divide-neutral-100">
                        {order.items.map((it) => (
                          <div key={it.id} className="py-2.5 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded bg-neutral-100 relative overflow-hidden shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={it.product.images[0]}
                                  alt={it.product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <span className="font-semibold text-velora-black block">{it.product.name}</span>
                                <span className="text-neutral-400 text-[11px]">Qty: {it.quantity}</span>
                              </div>
                            </div>
                            <span className="font-medium text-velora-black">{formatPrice(it.product.price * it.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="text-neutral-500">
                          Carrier: <strong className="text-velora-black">{order.carrier}</strong>
                        </span>
                        <Link
                          href={`/tracking?orderId=${order.orderNumber}`}
                          className="px-3.5 py-1.5 bg-velora-black text-white rounded-md text-xs font-semibold hover:bg-neutral-800 transition-colors"
                        >
                          Track Consignment
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <h2 className="font-serif text-xl font-bold text-velora-black">
                  Saved Delivery Addresses ({addresses.length})
                </h2>
                <button
                  onClick={() => setShowAddAddressModal(true)}
                  className="px-4 py-2 bg-velora-black text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-neutral-800 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-5 rounded-xl border relative flex flex-col justify-between ${
                      addr.isDefault
                        ? 'border-velora-gold-400 bg-velora-gold-50/20'
                        : 'border-neutral-200 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-velora-black">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 bg-velora-gold-500 text-white rounded text-[10px] font-bold uppercase tracking-wider">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {addr.addressLine1}
                        {addr.addressLine2 && <>, {addr.addressLine2}</>}
                        <br />
                        {addr.city}, {addr.state} {addr.postalCode}
                        <br />
                        {addr.country}
                        <br />
                        Phone: {addr.phone}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                      {!addr.isDefault ? (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-velora-gold-700 hover:underline font-semibold"
                        >
                          Make Default
                        </button>
                      ) : (
                        <span className="text-emerald-700 flex items-center gap-1 font-medium text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Primary Dispatch
                        </span>
                      )}

                      <button
                        onClick={() => removeAddress(addr.id)}
                        className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Address Modal */}
              {showAddAddressModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                  <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
                    <h3 className="font-serif text-lg font-bold text-velora-black">
                      Add International Shipping Address
                    </h3>
                    <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-neutral-600 font-medium mb-1">Recipient Name</label>
                        <input
                          type="text"
                          required
                          value={newFullName}
                          onChange={(e) => setNewFullName(e.target.value)}
                          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-600 font-medium mb-1">Country</label>
                        <select
                          value={newCountry}
                          onChange={(e) => setNewCountry(e.target.value)}
                          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                        >
                          {SUPPORTED_COUNTRIES.map((c) => (
                            <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-neutral-600 font-medium mb-1">Street Address</label>
                        <input
                          type="text"
                          required
                          value={newAddressLine1}
                          onChange={(e) => setNewAddressLine1(e.target.value)}
                          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-neutral-600 font-medium mb-1">City</label>
                          <input
                            type="text"
                            required
                            value={newCity}
                            onChange={(e) => setNewCity(e.target.value)}
                            className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-neutral-600 font-medium mb-1">State</label>
                          <input
                            type="text"
                            value={newState}
                            onChange={(e) => setNewState(e.target.value)}
                            className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-neutral-600 font-medium mb-1">Postal Code</label>
                          <input
                            type="text"
                            required
                            value={newPostalCode}
                            onChange={(e) => setNewPostalCode(e.target.value)}
                            className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-neutral-600 font-medium mb-1">Phone</label>
                        <input
                          type="tel"
                          required
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                        />
                      </div>
                      <div className="pt-2 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddAddressModal(false)}
                          className="px-4 py-2 border rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-velora-black text-white rounded-lg font-semibold"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
