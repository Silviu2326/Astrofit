export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  attributes: {
    size?: string;
    color?: string;
    material?: string;
    [key: string]: string | undefined;
  };
  price: number;
  compareAtPrice?: number;
  stock: number;
  lowStockThreshold: number;
  image?: string;
  barcode?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  tags: string[];
  basePrice: number;
  variants: ProductVariant[];
  images: string[];
  status: 'draft' | 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  seoTitle?: string;
  seoDescription?: string;
  brand?: string;
  vendor?: string;
}

export type ProductCategory =
  | 'apparel'
  | 'accessories'
  | 'supplements'
  | 'equipment'
  | 'digital'
  | 'other';

export interface InventoryMovement {
  id: string;
  variantId: string;
  productId: string;
  type: 'sale' | 'restock' | 'adjustment' | 'return';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason?: string;
  createdAt: Date;
  createdBy: string;
}

export interface ProductFilters {
  search?: string;
  category?: ProductCategory;
  status?: Product['status'];
  tags?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  inStock?: boolean;
  lowStock?: boolean;
}

export interface ProductStats {
  totalProducts: number;
  activeProducts: number;
  draftProducts: number;
  archivedProducts: number;
  totalVariants: number;
  lowStockVariants: number;
  outOfStockVariants: number;
  totalInventoryValue: number;
}
