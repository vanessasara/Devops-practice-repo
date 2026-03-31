'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types/sanity';
import { urlFor } from '@/lib/sanity/image';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const imageUrl = product.mainImage
    ? urlFor(product.mainImage).width(600).quality(85).url()
    : '/placeholder-product.jpg';

  const stockStatusColors = {
    'in-stock': 'text-furniture-sage bg-furniture-sage/10',
    'low-stock': 'text-furniture-gold bg-furniture-gold/10',
    'out-of-stock': 'text-furniture-gray-500 bg-furniture-gray-100',
    'preorder': 'text-furniture-terracotta bg-furniture-terracotta/10',
  };

  return (
    <Link href={`/products/${product.slug.current}`} className="group block">
      <div className="card-elevated overflow-hidden h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-furniture-gray-100">
          <Image
            src={imageUrl}
            alt={product.mainImage?.alt || product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
          />

          {/* Sale Badge */}
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-furniture-terracotta text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
              {discount}% OFF
            </div>
          )}

          {/* Stock Status Badge */}
          {product.stockStatus !== 'in-stock' && (
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium z-10 ${stockStatusColors[product.stockStatus]}`}>
              {product.stockStatus === 'low-stock' && 'Low Stock'}
              {product.stockStatus === 'out-of-stock' && 'Out of Stock'}
              {product.stockStatus === 'preorder' && 'Pre-order'}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Category */}
          {product.category && typeof product.category !== 'string' && (
            <p className="text-sm text-furniture-gray-500 mb-2">
              {product.category.name}
            </p>
          )}

          {/* Product Name */}
          <h3 className="heading-6 text-furniture-charcoal mb-3 group-hover:text-furniture-terracotta transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-3 mt-auto">
            <span className="text-2xl font-bold text-furniture-charcoal">
              ${product.price.toLocaleString()}
            </span>
            {product.compareAtPrice && (
              <span className="text-lg text-furniture-gray-400 line-through">
                ${product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Quick View Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="mt-4 w-full btn-outline opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => {
              e.preventDefault();
              // Quick view functionality can be added later
            }}
          >
            Quick View
          </motion.button>
        </div>
      </div>
    </Link>
  );
}
