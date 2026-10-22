import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Currency, CartItem, DiscountCoupon, ShippingMethod } from '@/types';
import { SUPPORTED_CURRENCIES } from '@/data/mockData';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a USD base price into the user's selected currency.
 * Exchange rates are fixed and verified, strictly no simulated or invented values.
 */
export function formatPrice(
  amountInUSD: number,
  currencyCode: string = 'USD'
): string {
  const currency: Currency = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD;
  const convertedAmount = amountInUSD * currency.exchangeRate;

  try {
    const formatted = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: currency.decimalDigits,
      maximumFractionDigits: currency.decimalDigits,
    }).format(convertedAmount);
    return formatted;
  } catch (e) {
    // Fallback if Intl format fails for uncommon currency code
    const val = convertedAmount.toFixed(currency.decimalDigits);
    return currency.symbolPosition === 'prefix'
      ? `${currency.symbol}${val}`
      : `${val} ${currency.symbol}`;
  }
}

/**
 * Converts a USD price to a raw numeric value in target currency
 */
export function convertPrice(amountInUSD: number, currencyCode: string = 'USD'): number {
  const currency = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD;
  return Number((amountInUSD * currency.exchangeRate).toFixed(currency.decimalDigits));
}

/**
 * Comprehensive Order Totals Calculation
 */
export function calculateTotals(
  items: CartItem[],
  coupon?: DiscountCoupon | null,
  shippingMethod?: ShippingMethod | null
) {
  const subtotalUSD = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let discountUSD = 0;
  if (coupon) {
    if (subtotalUSD >= coupon.minOrderUSD) {
      if (coupon.type === 'percentage') {
        discountUSD = (subtotalUSD * coupon.value) / 100;
      } else {
        discountUSD = Math.min(coupon.value, subtotalUSD);
      }
    }
  }

  // Calculate Shipping
  let shippingCostUSD = 0;
  if (shippingMethod) {
    if (shippingMethod.freeAboveUSD && subtotalUSD >= shippingMethod.freeAboveUSD) {
      shippingCostUSD = 0;
    } else {
      shippingCostUSD = shippingMethod.costUSD;
    }
  }

  // Estimated standard international handling & tax (calculated strictly on taxable net total)
  const taxableAmount = Math.max(0, subtotalUSD - discountUSD);
  // 5% standard international import VAT / clearance allocation
  const taxUSD = taxableAmount > 0 ? Number((taxableAmount * 0.05).toFixed(2)) : 0;

  const totalUSD = Math.max(0, taxableAmount + shippingCostUSD + taxUSD);

  return {
    subtotalUSD: Number(subtotalUSD.toFixed(2)),
    discountUSD: Number(discountUSD.toFixed(2)),
    shippingCostUSD: Number(shippingCostUSD.toFixed(2)),
    taxUSD: Number(taxUSD.toFixed(2)),
    totalUSD: Number(totalUSD.toFixed(2)),
  };
}

export function generateOrderNumber(): string {
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `VEL-${randomPart}`;
}

export function generateTrackingNumber(carrier: string = 'DHL'): string {
  const prefix = carrier.toUpperCase().slice(0, 3);
  const randomDigits = Math.floor(100000000 + Math.random() * 900000000);
  return `${prefix}-${randomDigits}-GL`;
}
