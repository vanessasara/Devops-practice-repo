'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Mock data - will be replaced with Sanity data later
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Modern Velvet Sofa',
    price: 1299,
    compareAtPrice: 1599,
    slug: 'modern-velvet-sofa',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  },
  {
    id: '2',
    name: 'Minimalist Dining Table',
    price: 899,
    slug: 'minimalist-dining-table',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
  },
  {
    id: '3',
    name: 'Scandinavian Armchair',
    price: 549,
    slug: 'scandinavian-armchair',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
  },
  {
    id: '4',
    name: 'Walnut Wood Bookshelf',
    price: 749,
    slug: 'walnut-wood-bookshelf',
    image: 'https://images.unsplash.com/photo-1594026111900-7d2b6abf89e0?w=800&q=80',
  },
  {
    id: '5',
    name: 'Contemporary Bed Frame',
    price: 1499,
    slug: 'contemporary-bed-frame',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
  },
  {
    id: '6',
    name: 'Designer Floor Lamp',
    price: 329,
    compareAtPrice: 429,
    slug: 'designer-floor-lamp',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function FeaturedProducts() {
  return (
    <section className="section-spacing bg-furniture-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="heading-2 text-furniture-charcoal mb-4">
            Featured Collection
          </h2>
          <p className="body-base text-furniture-gray-600 max-w-2xl mx-auto">
            Handpicked pieces that define modern elegance and timeless comfort
          </p>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        {/* View All CTA */}
        <div className="text-center mt-12 md:mt-16">
          <Link href="/products" className="btn-primary">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: typeof MOCK_PRODUCTS[0] }) {
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <motion.div variants={cardVariants}>
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="card-elevated overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-furniture-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Sale Badge */}
            {discount > 0 && (
              <div className="absolute top-4 right-4 bg-furniture-terracotta text-white px-3 py-1 rounded-full text-sm font-semibold">
                {discount}% OFF
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6">
            <h3 className="heading-6 text-furniture-charcoal mb-2 group-hover:text-furniture-terracotta transition-colors">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-furniture-charcoal">
                ${product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-furniture-gray-400 line-through">
                  ${product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* CTA Button */}
            <button className="mt-4 w-full btn-outline opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Quick View
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
