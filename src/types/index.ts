export type CategoryType = 'rings' | 'earrings' | 'solitaires' | 'mangalsutras' | 'necklaces' | 'bracelets';

export type GoldKarat = '14KT' | '18KT' | '22KT';
export type MetalColor = 'Yellow' | 'Rose' | 'White';
export type DiamondClarity = 'IJ-SI' | 'GH-VS' | 'VVS-EF';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  city: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: CategoryType;
  subCategory: string;
  basePrice: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  images: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
  isTryAtHome?: boolean;
  dispatchTime: string; // e.g. "Express 24-48 Hours"
  defaultKarat: GoldKarat;
  defaultColor: MetalColor;
  defaultClarity: DiamondClarity;
  diamondCarat: number;
  diamondCount: number;
  goldWeightGrams: number;
  makingCharges: number;
  description: string;
  certifications: string[];
  reviews: Review[];
  tags: string[];
}

export interface CartItem {
  id: string; // composite key: `${product.id}-${karat}-${color}-${clarity}-${ringSize}`
  product: Product;
  selectedKarat: GoldKarat;
  selectedColor: MetalColor;
  selectedClarity: DiamondClarity;
  selectedRingSize?: number;
  quantity: number;
  finalPrice: number;
}

export interface TryAtHomeBooking {
  bookingId: string;
  productIds: string[];
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  date: string;
  slot: string;
  createdAt: string;
  status: 'Confirmed' | 'Consultant Assigned' | 'Out for Visit' | 'Completed';
}

export interface OrderTrackingStage {
  title: string;
  subtitle: string;
  completed: boolean;
  timestamp?: string;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  gst: number;
  shipping: number;
  total: number;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: string;
  stages: OrderTrackingStage[];
  createdAt: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  pincode: string;
  phone: string;
  timings: string;
  featuredServices: string[];
  image: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  value: number;
  minSpend?: number;
  description: string;
}
