import type { Order, OrderStatus } from '@/types';
import { isArray, readStorage, writeStorage } from '@/lib/storage';

const isOrderList = isArray<Order>;
const isOrder = (value: unknown): value is Order =>
  typeof value === 'object' && value !== null && 'orderNumber' in value;

export function loadOrderHistory(): Order[] {
  return readStorage('orderHistory', isOrderList) ?? [];
}

/**
 * Readable, practically unique order number, e.g. "AMR-261113-K7Q2XM" (date + 6 random chars).
 * Avoids look-alike characters (0/O, 1/I) so customers can read it out over the phone.
 * The backend should become the source of truth for order numbers once it exists.
 */
export function generateOrderNumber(date: Date = new Date()): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  const suffix = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `AMR-${yy}${mm}${dd}-${suffix}`;
}

/** Persists a newly placed order to history and as the "last order". */
export function saveOrder(order: Order): boolean {
  const savedLast = writeStorage('lastOrder', order);
  const savedHistory = writeStorage('orderHistory', [order, ...loadOrderHistory()]);
  return savedLast && savedHistory;
}

/** Finds an order by number, falling back to the most recent order when no number is given. */
export function findOrder(orderNumber?: string | null): Order | null {
  if (orderNumber) {
    const match = loadOrderHistory().find((order) => order.orderNumber === orderNumber);
    if (match) return match;
  }
  const last = readStorage('lastOrder', isOrder);
  if (last && (!orderNumber || last.orderNumber === orderNumber)) return last;
  return null;
}

// ── Formatting & display helpers ──

export function normalize(value?: string): string {
  return value?.trim().toLowerCase() ?? '';
}

export function filterOrdersForUser(
  orders: Order[],
  user: { id: string; name: string; email: string }
): Order[] {
  const userEmail = normalize(user.email);
  const userName = normalize(user.name);

  return orders.filter((order) => {
    if (order.userId && order.userId === user.id) return true;

    const orderEmail = normalize(order.customer.email);
    if (orderEmail) return orderEmail === userEmail;

    return normalize(order.customer.name) === userName;
  });
}

export function formatOrderDate(value?: string): string {
  if (!value) return 'Date unavailable';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function statusMeta(status: OrderStatus): {
  label: string;
  className: string;
  dot: string;
} {
  switch (status) {
    case 'delivered':
      return {
        label: 'Delivered',
        className: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
        dot: 'bg-emerald-400',
      };
    case 'cancelled':
    case 'returned':
      return {
        label: status === 'cancelled' ? 'Cancelled' : 'Returned',
        className: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
        dot: 'bg-rose-400',
      };
    case 'shipped':
    case 'out_for_delivery':
      return {
        label: status === 'shipped' ? 'Shipped' : 'Out for Delivery',
        className: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
        dot: 'bg-blue-400',
      };
    case 'confirmed':
    case 'processing':
      return {
        label: status === 'confirmed' ? 'Confirmed' : 'Processing',
        className: 'bg-gold-400/15 border-gold-400/30 text-gold-300',
        dot: 'bg-gold-400',
      };
    default:
      return {
        label: 'Placed',
        className: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
        dot: 'bg-amber-400',
      };
  }
}

export function paymentMethodLabel(method: Order['paymentMethod']): string {
  switch (method) {
    case 'cod':
      return 'Cash on Delivery';
    case 'bkash':
      return 'bKash';
    case 'nagad':
      return 'Nagad';
    case 'card':
      return 'Card';
    default:
      return method;
  }
}

export function trackingStepIndex(status: OrderStatus): number {
  switch (status) {
    case 'confirmed':
    case 'processing':
      return 1;
    case 'shipped':
    case 'out_for_delivery':
      return 2;
    case 'delivered':
      return 3;
    default:
      return 0;
  }
}

export const TRACKING_STEPS = ['Placed', 'Processing', 'Shipped', 'Delivered'];
