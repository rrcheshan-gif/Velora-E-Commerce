'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, DiscountCoupon, ShippingMethod } from '@/types';
import { calculateTotals } from '@/lib/utils';
import { SHIPPING_METHODS, VALID_COUPONS } from '@/data/mockData';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: DiscountCoupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  selectedShippingMethod: ShippingMethod;
  setSelectedShippingMethod: (method: ShippingMethod) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (isOpen: boolean) => void;
  subtotalUSD: number;
  discountUSD: number;
  shippingCostUSD: number;
  taxUSD: number;
  totalUSD: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'velora_cart_items_v1';
const COUPON_STORAGE_KEY = 'velora_applied_coupon_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<DiscountCoupon | null>(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<ShippingMethod>(SHIPPING_METHODS[0]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(CART_STORAGE_KEY);
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
      const savedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (savedCoupon && VALID_COUPONS[savedCoupon.toUpperCase()]) {
        setAppliedCoupon(VALID_COUPONS[savedCoupon.toUpperCase()]);
      }
    } catch (e) {
      console.error('Error loading cart state:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage whenever items change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart state:', e);
    }
  }, [items, isLoaded]);

  // Save coupon state
  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, appliedCoupon.code);
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {}
  }, [appliedCoupon, isLoaded]);

  const addItem = (product: Product, quantity: number = 1, size?: string, color?: string) => {
    setItems((prevItems) => {
      const uniqueId = `${product.id}-${size || 'nosize'}-${color || 'nocolor'}`;
      const existingIndex = prevItems.findIndex((i) => i.id === uniqueId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + quantity;
        // Limit to available stock
        updated[existingIndex].quantity = Math.min(newQty, product.stockCount);
        return updated;
      } else {
        const newItem: CartItem = {
          id: uniqueId,
          productId: product.id,
          product,
          quantity: Math.min(quantity, product.stockCount),
          selectedSize: size,
          selectedColor: color,
        };
        return [...prevItems, newItem];
      }
    });

    setIsCartDrawerOpen(true);
  };

  const removeItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartItemId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const max = item.product.stockCount;
          return { ...item, quantity: Math.min(quantity, max) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (rawCode: string): { success: boolean; message: string } => {
    const code = rawCode.trim().toUpperCase();
    const coupon = VALID_COUPONS[code];

    if (!coupon) {
      return { success: false, message: 'Invalid promotional code. Please check and try again.' };
    }

    const currentSubtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

    if (currentSubtotal < coupon.minOrderUSD) {
      return {
        success: false,
        message: `Promo code ${code} requires a minimum order of $${coupon.minOrderUSD}. Current subtotal: $${currentSubtotal.toFixed(2)}.`,
      };
    }

    setAppliedCoupon(coupon);
    return {
      success: true,
      message: `Coupon ${code} applied successfully! ${coupon.description}`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const { subtotalUSD, discountUSD, shippingCostUSD, taxUSD, totalUSD } = calculateTotals(
    items,
    appliedCoupon,
    selectedShippingMethod
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        selectedShippingMethod,
        setSelectedShippingMethod,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        subtotalUSD,
        discountUSD,
        shippingCostUSD,
        taxUSD,
        totalUSD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
