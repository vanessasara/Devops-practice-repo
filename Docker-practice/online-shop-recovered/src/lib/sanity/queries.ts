import { client } from './client';
import type { Product, ProductCard, Category } from '@/lib/types/sanity';

// GROQ Query Strings

/**
 * Base product projection with all fields
 */
const productProjection = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  slug,
  description,
  shortDescription,
  price,
  compareAtPrice,
  category->{
    _id,
    name,
    slug
  },
  mainImage{
    asset->{
      _id,
      url
    },
    alt,
    hotspot,
    crop
  },
  images[]{
    asset->{
      _id,
      url
    },
    alt,
    hotspot,
    crop
  },
  dimensions,
  materials,
  colors,
  stockStatus,
  featured,
  sku,
  weight,
  warranty,
  careInstructions,
  metadata
`;

/**
 * Simplified product projection for card displays
 */
const productCardProjection = `
  _id,
  name,
  "slug": slug.current,
  price,
  compareAtPrice,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  "category": category->name,
  stockStatus,
  featured
`;

// GROQ Queries

export const queries = {
  // Get all products
  allProducts: `*[_type == "product"] | order(_createdAt desc) {
    ${productProjection}
  }`,

  // Get featured products
  featuredProducts: `*[_type == "product" && featured == true] | order(_createdAt desc) [0...6] {
    ${productProjection}
  }`,

  // Get single product by slug
  productBySlug: (slug: string) => `*[_type == "product" && slug.current == "${slug}"][0] {
    ${productProjection}
  }`,

  // Get products by category
  productsByCategory: (categorySlug: string) => `*[_type == "product" && category->slug.current == "${categorySlug}"] | order(_createdAt desc) {
    ${productProjection}
  }`,

  // Get all product slugs (for static generation)
  allProductSlugs: `*[_type == "product"] {
    "slug": slug.current
  }`,

  // Get all categories
  allCategories: `*[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    image{
      asset->{
        _id,
        url
      },
      alt
    }
  }`,

  // Get products for card display
  productCards: `*[_type == "product"] | order(_createdAt desc) {
    ${productCardProjection}
  }`,
};

// Data Fetching Functions

/**
 * Fetch all products
 * @returns Array of all products
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await client.fetch<Product[]>(
      queries.allProducts,
      {},
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );
    return products || [];
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
}

/**
 * Fetch featured products
 * @returns Array of featured products (max 6)
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await client.fetch<Product[]>(
      queries.featuredProducts,
      {},
      {
        next: { revalidate: 3600 },
      }
    );
    return products || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

/**
 * Fetch single product by slug
 * @param slug - Product slug
 * @returns Single product or null
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const product = await client.fetch<Product>(
      queries.productBySlug(slug),
      {},
      {
        next: { revalidate: 3600 },
      }
    );
    return product || null;
  } catch (error) {
    console.error(`Error fetching product with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetch products by category
 * @param categorySlug - Category slug
 * @returns Array of products in category
 */
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const products = await client.fetch<Product[]>(
      queries.productsByCategory(categorySlug),
      {},
      {
        next: { revalidate: 3600 },
      }
    );
    return products || [];
  } catch (error) {
    console.error(`Error fetching products for category "${categorySlug}":`, error);
    return [];
  }
}

/**
 * Fetch all product slugs for static generation
 * @returns Array of slug strings
 */
export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const results = await client.fetch<{ slug: string }[]>(
      queries.allProductSlugs,
      {},
      {
        next: { revalidate: 86400 }, // Revalidate once per day
      }
    );
    return results?.map((r) => r.slug) || [];
  } catch (error) {
    console.error('Error fetching product slugs:', error);
    return [];
  }
}

/**
 * Fetch all categories
 * @returns Array of all categories
 */
export async function getAllCategories(): Promise<Category[]> {
  try {
    const categories = await client.fetch<Category[]>(
      queries.allCategories,
      {},
      {
        next: { revalidate: 3600 },
      }
    );
    return categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Fetch products in card format for listings
 * @returns Array of simplified product cards
 */
export async function getProductCards(): Promise<ProductCard[]> {
  try {
    const products = await client.fetch<ProductCard[]>(
      queries.productCards,
      {},
      {
        next: { revalidate: 3600 },
      }
    );
    return products || [];
  } catch (error) {
    console.error('Error fetching product cards:', error);
    return [];
  }
}

/**
 * Search products by name or description
 * @param searchTerm - Search query
 * @returns Array of matching products
 */
export async function searchProducts(searchTerm: string): Promise<Product[]> {
  try {
    const query = `*[_type == "product" && (
      name match "${searchTerm}*" ||
      shortDescription match "${searchTerm}*"
    )] | order(_score desc) {
      ${productProjection}
    }`;

    const products = await client.fetch<Product[]>(query, {}, { next: { revalidate: 60 } });
    return products || [];
  } catch (error) {
    console.error(`Error searching products for "${searchTerm}":`, error);
    return [];
  }
}
