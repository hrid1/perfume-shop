import { config, formatPrice } from '@/config/app';
import type { Coupon } from '@/types';

type Priced = { price: number; discountPrice?: number };

/** The price a customer actually pays for a product, variant or wishlist item. */
export function getEffectivePrice(item: Priced): number {
  return item.discountPrice || item.price;
}

/** Whole-number discount percentage, or 0 when there's no real discount. */
export function getDiscountPercent(item: Priced): number {
  if (!item.discountPrice || item.discountPrice >= item.price) return 0;
  return Math.round(((item.price - item.discountPrice) / item.price) * 100);
}

export type DeliveryZone = 'insideDhaka' | 'outsideDhaka';

/** Dhaka city delivery applies only to Dhaka district inside Dhaka division. */
export function getDeliveryZone(division: string, district: string): DeliveryZone {
  return division === 'Dhaka' && district === 'Dhaka' ? 'insideDhaka' : 'outsideDhaka';
}

export function getDeliveryFeeForZone(zone: DeliveryZone): number {
  return config.delivery[zone];
}

export function getEstimatedDelivery(zone: DeliveryZone): string {
  return zone === 'insideDhaka'
    ? `${config.delivery.estimatedDays} (Dhaka Express)`
    : `${config.delivery.estimatedDaysOutside} (Nationwide)`;
}

/** Discount a coupon gives on a subtotal; 0 if the minimum order isn't met. Never exceeds the subtotal. */
export function calcCouponDiscount(
  coupon: Pick<Coupon, 'type' | 'value' | 'minOrder'>,
  subtotal: number
): number {
  if (subtotal <= 0 || subtotal < coupon.minOrder) return 0;
  const raw =
    coupon.type === 'percentage' ? Math.round((subtotal * coupon.value) / 100) : coupon.value;
  return Math.min(raw, subtotal);
}

/**
 * Why a coupon can't be used right now, or null when it's valid.
 * Shared by "apply coupon" and the live re-check of an already-applied coupon.
 */
export function getCouponProblem(
  coupon: Coupon | undefined,
  subtotal: number,
  now: Date = new Date()
): string | null {
  if (!coupon || !coupon.active) return 'This promo code is no longer valid';
  if (coupon.expiryDate && new Date(`${coupon.expiryDate}T23:59:59`) < now) {
    return 'This promo code has expired';
  }
  if (coupon.usedCount >= coupon.usageLimit) return 'This promo code has reached its usage limit';
  if (subtotal < coupon.minOrder) {
    return `Add ${formatPrice(coupon.minOrder - subtotal)} more to use ${coupon.code}`;
  }
  return null;
}

export interface OrderTotals {
  netSubtotal: number;
  deliveryFee: number;
  total: number;
  isFreeDelivery: boolean;
  amountNeededForFreeDelivery: number;
}

/**
 * The one place order totals are computed — used by the cart drawer and checkout
 * so both always show the same numbers.
 */
export function calcOrderTotals({
  subtotal,
  discount,
  itemCount,
  zone = 'insideDhaka',
}: {
  subtotal: number;
  discount: number;
  itemCount: number;
  zone?: DeliveryZone;
}): OrderTotals {
  const threshold = config.delivery.freeDeliveryThreshold;
  const netSubtotal = Math.max(0, subtotal - discount);
  const isFreeDelivery = netSubtotal > 0 && netSubtotal >= threshold;
  const deliveryFee = itemCount === 0 || isFreeDelivery ? 0 : getDeliveryFeeForZone(zone);

  return {
    netSubtotal,
    deliveryFee,
    total: netSubtotal + deliveryFee,
    isFreeDelivery,
    amountNeededForFreeDelivery: Math.max(0, threshold - netSubtotal),
  };
}
