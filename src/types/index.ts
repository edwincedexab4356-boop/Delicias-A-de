export type CategoryId = 'all' | 'mariscos' | 'pescados' | 'bandejas' | 'pollo';

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  iconName: string;
  sectionNumber: string;
  image: string;
  originalImage?: string;
  isAiEnhanced?: boolean;
  subtitle?: string;
}

export interface ProductOption {
  label: string;
  price?: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'mariscos' | 'pescados' | 'bandejas' | 'pollo';
  price: number;
  priceType?: 'fixed' | 'by_size';
  requiresPriceConfirmation?: boolean;
  preparationOptions?: string[];
  description: string;
  image: string;
  badge?: string;
  prepTime?: string;
  servings?: string;
  ingredients?: string[];
  allergens?: string[];
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPreparation?: string;
  itemPrice: number;
  requiresPriceConfirmation?: boolean;
  specialInstructions?: string;
}

export interface OrderDetails {
  customerName: string;
  diningOption: 'dine-in' | 'takeout';
  tableOrAddress: string;
  notes?: string;
}
