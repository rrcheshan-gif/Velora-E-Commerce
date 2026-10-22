import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/products';
import { VALID_COUPONS, SHIPPING_METHODS } from '@/data/mockData';
import { CartItem } from '@/types';
import { generateOrderNumber, generateTrackingNumber } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, couponCode, shippingMethodId, customer, currencyCode = 'USD', paymentMethod: clientPaymentMethod } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Cannot checkout with an empty shopping bag.' },
        { status: 400 }
      );
    }

    // 1. Server-side product price verification and stock validation
    let serverSubtotalUSD = 0;
    const validatedItems: CartItem[] = [];

    for (const clientItem of items) {
      const dbProduct = PRODUCTS.find((p) => p.id === clientItem.productId);
      if (!dbProduct) {
        return NextResponse.json(
          { error: `Product ${clientItem.productId} was not found in our catalog.` },
          { status: 400 }
        );
      }

      if (!dbProduct.inStock) {
        return NextResponse.json(
          { error: `Product "${dbProduct.name}" is currently sold out.` },
          { status: 400 }
        );
      }

      const qty = Math.max(1, Math.min(clientItem.quantity, dbProduct.stockCount));
      serverSubtotalUSD += dbProduct.price * qty;

      validatedItems.push({
        id: clientItem.id,
        productId: dbProduct.id,
        product: dbProduct,
        quantity: qty,
        selectedSize: clientItem.selectedSize,
        selectedColor: clientItem.selectedColor,
      });
    }

    // 2. Server-side Coupon validation
    let discountUSD = 0;
    let appliedCoupon = null;

    if (couponCode) {
      const code = String(couponCode).toUpperCase().trim();
      const coupon = VALID_COUPONS[code];
      if (coupon && serverSubtotalUSD >= coupon.minOrderUSD) {
        appliedCoupon = coupon;
        if (coupon.type === 'percentage') {
          discountUSD = (serverSubtotalUSD * coupon.value) / 100;
        } else {
          discountUSD = Math.min(coupon.value, serverSubtotalUSD);
        }
      }
    }

    // 3. Server-side Shipping method validation
    const shipping =
      SHIPPING_METHODS.find((s) => s.id === shippingMethodId) || SHIPPING_METHODS[0];

    let shippingCostUSD = shipping.costUSD;
    if (shipping.freeAboveUSD && serverSubtotalUSD >= shipping.freeAboveUSD) {
      shippingCostUSD = 0;
    }

    // 4. Tax / Customs Clearance calculation (5%)
    const taxableBase = Math.max(0, serverSubtotalUSD - discountUSD);
    const taxUSD = taxableBase > 0 ? Number((taxableBase * 0.05).toFixed(2)) : 0;
    const totalUSD = Number((taxableBase + shippingCostUSD + taxUSD).toFixed(2));

    const orderNumber = generateOrderNumber();
    const trackingNumber = generateTrackingNumber(shipping.carrier);

    const order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toISOString(),
      status: 'confirmed',
      trackingNumber,
      carrier: shipping.carrier,
      estimatedDelivery: shipping.estimatedDays,
      customer: {
        fullName: customer?.fullName || 'Valued Patron',
        email: customer?.email || 'patron@velora-vip.com',
        phone: customer?.phone || '+1 555-0192',
        shippingAddress: customer?.shippingAddress,
      },
      items: validatedItems,
      shippingMethod: shipping,
      subtotalUSD: Number(serverSubtotalUSD.toFixed(2)),
      discountUSD: Number(discountUSD.toFixed(2)),
      couponCode: appliedCoupon?.code,
      shippingCostUSD,
      taxUSD,
      totalUSD,
      paymentMethod: clientPaymentMethod || {
        type: 'credit_card',
        last4: '4242',
        brand: 'Visa Infinite',
        title: 'Credit / Debit Card',
        details: 'Ending in •••• 4242',
      },
      currency: currencyCode,
      currencyRate: 1.0,
      timeline: [
        {
          status: 'confirmed',
          title: 'Order Confirmed',
          description: 'Payment authorized and receipt generated.',
          timestamp: new Date().toLocaleString(),
          completed: true,
          location: customer?.shippingAddress?.city || 'International Hub',
        },
        {
          status: 'processing',
          title: 'Artisanal Preparation',
          description: 'Items being carefully gift boxed in champagne gold wrapping.',
          timestamp: 'Scheduled within 12 hours',
          completed: false,
        },
      ],
    };

    return NextResponse.json({
      success: true,
      order,
      stripePaymentIntent: {
        clientSecret: `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`,
        status: 'succeeded',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Checkout processing failure';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
