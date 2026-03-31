'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/lib/types/sanity';
import { urlFor } from '@/lib/sanity/image';

interface ProductImageGalleryProps {
  product: Product;
}

export default function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const allImages = product.images && product.images.length > 0
    ? [product.mainImage, ...product.images]
    : [product.mainImage];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = allImages[selectedIndex];

  const mainImageUrl = selectedImage
    ? urlFor(selectedImage).width(800).quality(90).url()
    : '/placeholder-product.jpg';

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-furniture-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={mainImageUrl}
              alt={selectedImage?.alt || product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail Strip */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
          {allImages.map((image, index) => {
            const thumbnailUrl = image
              ? urlFor(image).width(200).quality(80).url()
              : '/placeholder-product.jpg';

            return (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedIndex === index
                    ? 'border-furniture-terracotta shadow-md'
                    : 'border-furniture-gray-200 hover:border-furniture-gray-400'
                }`}
              >
                <Image
                  src={thumbnailUrl}
                  alt={image?.alt || `${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
