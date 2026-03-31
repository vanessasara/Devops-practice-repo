'use client';

import { useState } from 'react';
import { ShoppingCart, Minus, Plus, Heart } from 'lucide-react';
import type { Product } from '@/lib/types/sanity';

interface AddToCartSectionProps {
  product: Product;
}

export default function AddToCartSection({ product }: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Cart functionality will be implemented later
    console.log(`Adding ${quantity}x ${product.name} to cart`);
    alert(`Added ${quantity}x ${product.name} to cart!`);
  };

  const canAddToCart = product.stockStatus === 'in-stock' || product.stockStatus === 'low-stock' || product.stockStatus === 'preorder';

  return (
    <div className="space-y-4">
      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <h3 className="font-semibold text-furniture-charcoal mb-3">Color</h3>
          <div className="flex gap-3">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className="relative w-10 h-10 rounded-full border-2 border-furniture-gray-300 hover:border-furniture-charcoal transition-colors"
                style={{ backgroundColor: color.hex || '#ccc' }}
                title={color.name}
              >
                <span className="sr-only">{color.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      {canAddToCart && (
        <div>
          <h3 className="font-semibold text-furniture-charcoal mb-3">Quantity</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center border-2 border-furniture-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="p-3 hover:bg-furniture-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-6 font-semibold text-furniture-charcoal">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
                className="p-3 hover:bg-furniture-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm text-furniture-gray-600">
              Max 10 per order
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          className="flex-1 btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-5 h-5 mr-2 inline-block" />
          {product.stockStatus === 'preorder' ? 'Pre-order Now' : 'Add to Cart'}
        </button>

        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`p-4 rounded-lg border-2 transition-all ${
            isWishlisted
              ? 'border-furniture-terracotta bg-furniture-terracotta text-white'
              : 'border-furniture-gray-300 hover:border-furniture-terracotta'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Out of Stock Message */}
      {product.stockStatus === 'out-of-stock' && (
        <div className="p-4 bg-furniture-gray-100 rounded-lg">
          <p className="text-furniture-gray-700 font-medium">
            This item is currently out of stock. Contact us to check availability.
          </p>
        </div>
      )}
    </div>
  );
}
