'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Order, Address } from '@/types';
import { DEMO_USER } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  register: (fullName: string, email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (orderId: string) => Order | undefined;
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'velora_user_session_v1';
const ORDERS_STORAGE_KEY = 'velora_user_orders_v1';

// Initial preloaded realistic order history for demo account
const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ord-velora-98214',
    orderNumber: 'VEL-982140',
    date: '2026-10-18T14:32:00Z',
    status: 'in_transit',
    trackingNumber: 'DHL-894172849-GL',
    carrier: 'DHL Global Express Priority',
    estimatedDelivery: 'Oct 24, 2026',
    customer: {
      fullName: 'Alexander Wright',
      email: 'alexander.wright@velora-vip.com',
      phone: '+1 (555) 382-9014',
      shippingAddress: DEMO_USER.addresses[0],
    },
    items: [
      {
        id: 'ord-item-1',
        productId: 'prod-001',
        product: {
          id: 'prod-001',
          slug: 'sovereign-cashmere-trench-coat',
          name: 'The Sovereign Cashmere Trench',
          tagline: 'Hand-tailored Double-Faced Mongolian Cashmere',
          description: '',
          price: 890,
          rating: 4.9,
          reviewCount: 48,
          categoryId: 'fashion-accessories',
          categoryName: 'Fashion & Accessories',
          inStock: true,
          stockCount: 14,
          images: [
            'https://images.unsplash.com/photo-1539533018447-63fcce667883?auto=format&fit=crop&w=1000&q=80',
          ],
          sku: 'VEL-FASH-001-CSH',
        },
        quantity: 1,
        selectedSize: 'US 40 / L',
        selectedColor: 'Camel Gold',
      },
      {
        id: 'ord-item-2',
        productId: 'prod-006',
        product: {
          id: 'prod-006',
          slug: 'lor-rose-botanical-face-elixir',
          name: "L'Or Rose Botanical Face Elixir",
          tagline: '24K Gold Micro-Flakes',
          description: '',
          price: 135,
          rating: 4.9,
          reviewCount: 91,
          categoryId: 'beauty-personal-care',
          categoryName: 'Beauty & Personal Care',
          inStock: true,
          stockCount: 45,
          images: [
            'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
          ],
          sku: 'VEL-BEAU-006-ELX',
        },
        quantity: 1,
      },
    ],
    shippingMethod: {
      id: 'express-courier',
      name: 'VELORA Express Priority',
      carrier: 'DHL Express',
      estimatedDays: '2 - 4 Business Days',
      costUSD: 35,
      description: 'Air Priority International',
    },
    subtotalUSD: 1025,
    discountUSD: 102.5,
    couponCode: 'VELORA10',
    shippingCostUSD: 35,
    taxUSD: 46.12,
    totalUSD: 1003.62,
    paymentMethod: {
      type: 'credit_card',
      last4: '4242',
      brand: 'Visa Infinite',
    },
    currency: 'USD',
    currencyRate: 1.0,
    timeline: [
      {
        status: 'confirmed',
        title: 'Order Confirmed',
        description: 'Payment authorized and order sent to Florence concierge atelier.',
        timestamp: 'Oct 18, 2026 - 14:32 EST',
        completed: true,
        location: 'New York, USA',
      },
      {
        status: 'processing',
        title: 'Artisanal Packaging & Inspection',
        description: 'Passed 12-point quality review and wrapped in signature champagne box.',
        timestamp: 'Oct 19, 2026 - 09:15 EST',
        completed: true,
        location: 'Florence, Italy',
      },
      {
        status: 'shipped',
        title: 'Dispatched via Air Courier',
        description: 'Departed Malpensa International Airport Hub (MXP).',
        timestamp: 'Oct 20, 2026 - 22:40 CET',
        completed: true,
        location: 'Milan, Italy',
      },
      {
        status: 'in_transit',
        title: 'Customs Cleared & In Transit',
        description: 'Import clearance completed at JFK International Airport.',
        timestamp: 'Oct 21, 2026 - 18:20 EST',
        completed: true,
        location: 'Jamaica, NY, USA',
      },
      {
        status: 'out_for_delivery',
        title: 'Out for Courier Delivery',
        description: 'Assigned to private courier for scheduled white-glove arrival.',
        timestamp: 'Oct 24, 2026 - Estimated',
        completed: false,
        location: 'Manhattan, NY',
      },
      {
        status: 'delivered',
        title: 'Delivered & Signed',
        description: 'Package handed directly to customer.',
        timestamp: 'Pending',
        completed: false,
      },
    ],
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(DEMO_USER);
  const [orders, setOrders] = useState<Order[]>(INITIAL_DEMO_ORDERS);
  const [addresses, setAddresses] = useState<Address[]>(DEMO_USER.addresses);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (e) {
      console.error('Error loading auth state:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {}
  }, [user, orders, isLoaded]);

  const login = async (email: string): Promise<{ success: boolean; message?: string }> => {
    // Graceful hybrid auth: logs in as existing user or initializes session
    const loggedUser: User = {
      ...DEMO_USER,
      email: email || DEMO_USER.email,
      fullName: email.split('@')[0].replace('.', ' ').toUpperCase() || DEMO_USER.fullName,
    };
    setUser(loggedUser);
    setAddresses(loggedUser.addresses);
    return { success: true };
  };

  const register = async (fullName: string, email: string): Promise<{ success: boolean; message?: string }> => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      fullName,
      email,
      memberSince: 'October 2026',
      vipTier: 'Member',
      addresses: [],
    };
    setUser(newUser);
    setAddresses([]);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  };

  const addOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(
      (o) =>
        o.id === orderId ||
        o.orderNumber.toLowerCase() === orderId.toLowerCase() ||
        o.trackingNumber.toLowerCase() === orderId.toLowerCase()
    );
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...address,
      id: `addr-${Date.now()}`,
    };
    setAddresses((prev) => [newAddr, ...prev]);
  };

  const removeAddress = (addressId: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== addressId));
  };

  const setDefaultAddress = (addressId: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === addressId,
      }))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        orders,
        addOrder,
        getOrderById,
        addresses,
        addAddress,
        removeAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
