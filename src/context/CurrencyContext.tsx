'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency } from '@/types';
import { SUPPORTED_CURRENCIES } from '@/data/mockData';
import { formatPrice as formatPriceUtil, convertPrice as convertPriceUtil } from '@/lib/utils';

interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrencyCode: (code: string) => void;
  formatPrice: (amountInUSD: number) => string;
  convertPrice: (amountInUSD: number) => number;
  availableCurrencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_STORAGE_KEY = 'velora_preferred_currency';

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currencyCode, setCurrencyCodeState] = useState<string>('USD');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (saved && SUPPORTED_CURRENCIES[saved]) {
        setCurrencyCodeState(saved);
      }
    } catch (e) {
      // LocalStorage access fallback
    }
  }, []);

  const setCurrencyCode = (code: string) => {
    if (SUPPORTED_CURRENCIES[code]) {
      setCurrencyCodeState(code);
      try {
        localStorage.setItem(CURRENCY_STORAGE_KEY, code);
      } catch (e) {}
    }
  };

  const currentCurrency = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD;

  const formatPrice = (amountInUSD: number): string => {
    // If not mounted yet (SSR), return default USD to prevent hydration mismatch
    const activeCurrency = mounted ? currentCurrency.code : 'USD';
    return formatPriceUtil(amountInUSD, activeCurrency);
  };

  const convertPrice = (amountInUSD: number): number => {
    const activeCurrency = mounted ? currentCurrency.code : 'USD';
    return convertPriceUtil(amountInUSD, activeCurrency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency,
        setCurrencyCode,
        formatPrice,
        convertPrice,
        availableCurrencies: Object.values(SUPPORTED_CURRENCIES),
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
