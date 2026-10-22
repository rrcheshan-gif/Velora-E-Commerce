'use client';

import React from 'react';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <CartProvider>
        <WishlistProvider>
          <AuthProvider>{children}</AuthProvider>
        </WishlistProvider>
      </CartProvider>
    </CurrencyProvider>
  );
}
