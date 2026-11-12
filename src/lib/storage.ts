/**
 * Single source of truth for everything the storefront keeps in localStorage.
 * Keys that were renamed keep their old name in LEGACY_KEYS so existing
 * visitors don't lose their cart / wishlist / session on upgrade.
 */
export const STORAGE_KEYS = {
  cart: 'amros_cart_v1',
  cartSelection: 'amros_cart_selection_v1',
  cartCoupon: 'amros_cart_coupon_v1',
  wishlist: 'amros_wishlist_v1',
  user: 'amros_user_v1',
  customProducts: 'amros_custom_products_v1',
  customCoupons: 'amros_custom_coupons_v1',
  /** Times each coupon code was redeemed in this browser (covers built-in coupons too). */
  couponUsage: 'amros_coupon_usage_v1',
  orderHistory: 'amros_orders_history',
  lastOrder: 'amros_last_order',
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;

const LEGACY_KEYS: Partial<Record<StorageKey, string>> = {
  cart: 'noire_perfumes_cart_v1',
  cartSelection: 'noire_perfumes_cart_selection_v1',
  cartCoupon: 'noire_perfumes_coupon_v1',
  wishlist: 'noire_perfumes_wishlist_v1',
  user: 'noire_perfumes_user',
  customProducts: 'noire_perfumes_custom_products_v1',
  customCoupons: 'noire_perfumes_custom_coupons_v1',
};

export type Validator<T> = (value: unknown) => value is T;

export const isArray = <T>(value: unknown): value is T[] => Array.isArray(value);

/**
 * Reads and parses a stored value. Returns `undefined` when nothing is stored,
 * the JSON is corrupt, or the value fails validation. Migrates legacy keys.
 */
export function readStorage<T>(key: StorageKey, validate?: Validator<T>): T | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const storageKey = STORAGE_KEYS[key];
    let raw = localStorage.getItem(storageKey);

    const legacyKey = LEGACY_KEYS[key];
    if (raw === null && legacyKey) {
      raw = localStorage.getItem(legacyKey);
      if (raw !== null) {
        localStorage.setItem(storageKey, raw);
        localStorage.removeItem(legacyKey);
      }
    }

    if (raw === null) return undefined;
    const parsed: unknown = JSON.parse(raw);
    if (validate && !validate(parsed)) {
      console.warn(`Ignoring invalid stored value for "${storageKey}"`);
      return undefined;
    }
    return parsed as T;
  } catch (error) {
    console.error(`Failed to read "${key}" from storage`, error);
    return undefined;
  }
}

/** Writes a value (or removes the key for null/undefined). Returns false on failure, e.g. quota exceeded. */
export function writeStorage(key: StorageKey, value: unknown): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const storageKey = STORAGE_KEYS[key];
    if (value === null || value === undefined) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }
    return true;
  } catch (error) {
    console.error(`Failed to write "${key}" to storage`, error);
    return false;
  }
}
