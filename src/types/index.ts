export type Gender = 'men' | 'women' | 'unisex';
export type Concentration = 'EDP' | 'EDT' | 'Parfum' | 'Attar' | 'EDC';
export type FragranceFamily = 'Fresh' | 'Woody' | 'Floral' | 'Sweet' | 'Spicy' | 'Citrus' | 'Aquatic' | 'Oriental';
export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';
export type Occasion = 'Office' | 'Daily' | 'Date' | 'Party' | 'Special Occasion' | 'Evening';
export type Sillage = 'Subtle' | 'Moderate' | 'Strong' | 'Very Strong' | 'Varies';
export type ProductStatus = 'active' | 'draft' | 'archived';
export type OrderStatus = 'placed' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned';
export type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'card';

export interface ProductVariant {
  id: string;
  size: string;                  // "50ml", "100ml", "12ml", "5×2ml"
  price: number;
  discountPrice?: number;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;              // category slug: 'men', 'women', 'unisex', 'attar', 'discovery-sets'
  gender: Gender;
  price: number;                 // base price (smallest size)
  discountPrice?: number;
  images: string[];
  videoUrl?: string;
  sizes: ProductVariant[];
  stock: number;
  fragranceFamily: FragranceFamily;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  concentration: Concentration;
  longevity: string;             // e.g. "8-10 hours"
  sillage: Sillage;
  occasions: Occasion[];
  seasons: Season[];
  rating: number;                // 0-5
  reviewCount: number;
  description: string;
  scentDescription: string;      // italic poetic description: "How does it smell?"
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  trending: boolean;
  status: ProductStatus;
  createdAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  gender?: Gender;
  productCount?: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;                // 1-5
  title?: string;
  comment: string;
  verified: boolean;
  images?: string[];
  longevityRating?: number;
  sillageRating?: number;
  scentRating?: number;
  valueRating?: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface Address {
  id: string;
  label: string;                 // Home, Office
  fullName: string;
  phone: string;
  division: string;
  district: string;
  area: string;
  fullAddress: string;
  instructions?: string;
  isDefault: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  size: string;
  variantId: string;
  price: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  couponCode?: string;
  discount: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  discountPrice?: number;
  addedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;           // e.g. "NR-2025-XXXX"
  userId?: string;
  customer: { name: string; phone: string; email?: string };
  items: OrderItem[];
  address: Omit<Address, 'id' | 'isDefault' | 'label'>;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'failed';
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  couponCode?: string;
  status: OrderStatus;
  estimatedDelivery: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;                 // percentage or fixed amount in BDT
  minOrder: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  active: boolean;
}

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: {
    label: string;
    value: string;
    description?: string;
    icon?: string;
  }[];
}

export interface QuizAnswer {
  questionId: string;
  value: string;
}

export interface QuizResult {
  answers: QuizAnswer[];
  recommendedProductIds: string[];
}
