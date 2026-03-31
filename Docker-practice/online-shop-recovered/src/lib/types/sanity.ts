// Sanity Image Types
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

// Portable Text Types (for rich text content)
export interface PortableTextBlock {
  _type: 'block';
  _key: string;
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
  children: Array<{
    _type: 'span';
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _type: string;
    _key: string;
    [key: string]: any;
  }>;
}

// Category Types
export interface Category {
  _id: string;
  _type: 'category';
  _createdAt: string;
  _updatedAt: string;
  name: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  description?: string;
  image?: SanityImage;
}

// Product Dimensions
export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
  unit: 'inches' | 'cm';
}

// Product Color
export interface ProductColor {
  name: string;
  hex?: string;
  swatch?: SanityImage;
}

// Stock Status
export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock' | 'preorder';

// Product SEO Metadata
export interface ProductMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: SanityImage;
}

// Main Product Interface
export interface Product {
  _id: string;
  _type: 'product';
  _createdAt: string;
  _updatedAt: string;
  name: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  description?: PortableTextBlock[];
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  category?: Category | string; // Can be populated or just reference
  mainImage: SanityImage;
  images?: SanityImage[];
  dimensions?: ProductDimensions;
  materials?: string[];
  colors?: ProductColor[];
  stockStatus: StockStatus;
  featured?: boolean;
  sku?: string;
  weight?: number;
  warranty?: string;
  careInstructions?: string;
  metadata?: ProductMetadata;
}

// Simplified Product (for listings)
export interface ProductCard {
  _id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  mainImage: SanityImage;
  category?: string;
  stockStatus: StockStatus;
  featured?: boolean;
}

// Product with populated category
export interface ProductWithCategory extends Omit<Product, 'category'> {
  category?: Category;
}

// Query result types
export interface ProductsQueryResult {
  products: Product[];
  total: number;
}

// Filter options
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  materials?: string[];
  colors?: string[];
  stockStatus?: StockStatus[];
  featured?: boolean;
}
