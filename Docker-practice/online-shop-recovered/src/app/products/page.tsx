import { Metadata } from 'next';
import { getAllProducts } from '@/lib/sanity/queries';
import ProductCard from '@/components/ProductCard';
import { Package } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Products - Sony Interior | Modern Furniture Collection',
  description: 'Browse our complete collection of modern furniture. From sofas and dining tables to bedroom essentials and lighting, find quality pieces for every room.',
  keywords: 'furniture collection, modern furniture, sofas, dining tables, bedroom furniture, home decor',
};

export const revalidate = 3600; // Revalidate every hour

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-furniture-beige py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="heading-1 text-furniture-charcoal mb-4">
              Our Collection
            </h1>
            <p className="body-large text-furniture-gray-700">
              Discover our curated selection of modern furniture designed to transform
              your space. Each piece combines timeless elegance with exceptional quality.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-spacing">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <>
              {/* Products Count */}
              <div className="mb-8 flex items-center justify-between">
                <p className="text-furniture-gray-600">
                  Showing <span className="font-semibold text-furniture-charcoal">{products.length}</span> products
                </p>
                {/* Sort/Filter options can be added here later */}
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {products.map((product, index) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    priority={index < 4} // Prioritize first 4 images
                  />
                ))}
              </div>
            </>
          ) : (
            /* Empty State */
            <EmptyState />
          )}
        </div>
      </section>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-24 h-24 rounded-full bg-furniture-beige flex items-center justify-center mb-6">
        <Package className="w-12 h-12 text-furniture-gray-400" />
      </div>
      <h2 className="heading-3 text-furniture-charcoal mb-4 text-center">
        No Products Available
      </h2>
      <p className="body-base text-furniture-gray-600 text-center max-w-md mb-8">
        We're currently updating our collection. Please check back soon or contact us
        for more information about available products.
      </p>
      <div className="flex gap-4">
        <a href="/" className="btn-primary">
          Back to Home
        </a>
        <a href="/contact" className="btn-outline">
          Contact Us
        </a>
      </div>
    </div>
  );
}
