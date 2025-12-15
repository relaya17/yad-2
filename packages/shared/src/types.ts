export type Language = 'he' | 'ar' | 'ru';

export type ListingStatus = 'active' | 'sold' | 'cancelled';

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  specialDeal: boolean;
  city: string;
  images: string[];
  createdAt: string | Date;
}

export interface ListingsQuery {
  category?: string;
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  specialOnly?: boolean;
  sort?: 'newest' | 'priceAsc' | 'priceDesc';
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  city: string;
  role: 'user' | 'admin';
}


