'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import { SUPPORTED_COUNTRIES } from '@/data/mockData';
import { Globe, ChevronDown, Sparkles } from 'lucide-react';

export function AnnouncementBar() {
  const { currentCurrency, setCurrencyCode, availableCurrencies } = useCurrency();
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  return (
    <aside aria-label="Store announcement" className="bg-velora-black text-white text-xs border-b border-velora-darkborder py-2 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Global Shipping Badge */}
        <div className="hidden lg:flex items-center gap-2 text-neutral-300">
          <Sparkles className="w-3.5 h-3.5 text-velora-gold-400" />
          <span>Worldwide Express Courier • Guaranteed Customs Clearance</span>
        </div>

        {/* Center: Main Promotion */}
        <div className="flex-1 text-center font-medium tracking-wide">
          <span className="text-neutral-300">Complimentary Global Shipping on Orders Over $150</span>
          <span className="hidden sm:inline mx-2 text-velora-gold-400">|</span>
          <span className="text-velora-gold-400 font-semibold">
            Use code <span className="underline decoration-velora-gold-400 underline-offset-2">VELORA10</span> for 10% Off
          </span>
        </div>

        {/* Right: Currency & International Selector */}
        <div className="relative flex items-center gap-4">
          <Link
            href="/tracking"
            className="hidden md:inline-block text-neutral-300 hover:text-velora-gold-400 transition-colors"
          >
            Track Order
          </Link>

          <button
            onClick={() => setShowCurrencyModal(!showCurrencyModal)}
            className="flex items-center gap-1.5 text-neutral-300 hover:text-velora-gold-400 transition-colors py-0.5 px-2 rounded hover:bg-white/5"
            aria-label="Select Currency"
          >
            <Globe className="w-3.5 h-3.5 text-velora-gold-400" />
            <span className="font-medium tracking-wider">{currentCurrency.code} ({currentCurrency.symbol})</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </button>

          {/* Currency Dropdown Popover */}
          {showCurrencyModal && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowCurrencyModal(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-64 bg-velora-noir border border-velora-darkborder rounded-lg shadow-floating p-3 z-50 text-white animate-in fade-in duration-150">
                <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-2 pb-1 border-b border-velora-darkborder">
                  Select Currency
                </div>
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {availableCurrencies.map((curr) => {
                    const country = SUPPORTED_COUNTRIES.find((c) => c.currency === curr.code);
                    return (
                      <button
                        key={curr.code}
                        onClick={() => {
                          setCurrencyCode(curr.code);
                          setShowCurrencyModal(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors ${
                          currentCurrency.code === curr.code
                            ? 'bg-velora-gold-500/20 text-velora-gold-300 font-medium'
                            : 'hover:bg-white/5 text-neutral-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{country?.flag || '🌐'}</span>
                          <span>{curr.name}</span>
                        </span>
                        <span className="font-semibold text-neutral-400">
                          {curr.code} ({curr.symbol})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
