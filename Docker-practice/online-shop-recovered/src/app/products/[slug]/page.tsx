import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Check, Truck, Shield, RefreshCcw } from 'lucide-react';
import { getProductBySlug, getAllProductSlugs } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import ProductImageGallery from '@/components/ProductImageGallery';
import AddToCartSection from '@/components/AddToCartSection';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found - Sony Interior',
    };
  }

  const imageUrl = product.mainImage
    ? urlFor(product.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title: `${product.name} - Sony Interior`,
    description: product.shortDescription || product.metadata?.description || `Buy ${product.name} at Sony Interior. Quality furniture with modern design.`,
    keywords: product.metadata?.keywords || [product.name, 'furniture', 'modern design'],
    openGraph: {
      title: product.name,
      description: product.shortDescription || '',
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const stockStatusInfo = {
    'in-stock': { text: 'In Stock', color: 'text-furniture-sage', icon: Check },
    'low-stock': { text: 'Low Stock - Order Soon', color: 'text-furniture-gold', icon: Check },
    'out-of-stock': { text: 'Out of Stock', color: 'text-furniture-gray-500', icon: null },
    'preorder': { text: 'Available for Pre-order', color: 'text-furniture-terracotta', icon: Check },
  };

  const stockInfo = stockStatusInfo[product.stockStatus];

  return (
    <main>
      {/* Breadcrumb */}
      <section className="bg-furniture-gray-50 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-furniture-gray-600 hover:text-furniture-terracotta transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-furniture-gray-400" />
            <Link href="/products" className="text-furniture-gray-600 hover:text-furniture-terracotta transition-colors">
              Products
            </Link>
            <ChevronRight className="w-4 h-4 text-furniture-gray-400" />
            <span className="text-furniture-charcoal font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="section-spacing">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <ProductImageGallery product={product} />

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category */}
              {product.category && typeof product.category !== 'string' && (
                <p className="text-sm text-furniture-gray-500 uppercase tracking-wide">
                  {product.category.name}
                </p>
              )}

              {/* Product Name */}
              <h1 className="heading-1 text-furniture-charcoal">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-furniture-charcoal">
                  ${product.price.toLocaleString()}
                </span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-2xl text-furniture-gray-400 line-through">
                      ${product.compareAtPrice.toLocaleString()}
                    </span>
                    <span className="px-3 py-1 bg-furniture-terracotta text-white text-sm font-semibold rounded-full">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {stockInfo.icon && <stockInfo.icon className={`w-5 h-5 ${stockInfo.color}`} />}
                <span className={`font-medium ${stockInfo.color}`}>
                  {stockInfo.text}
                </span>
              </div>

              {/* Short Description */}
              {product.shortDescription && (
                <p className="body-large text-furniture-gray-700">
                  {product.shortDescription}
                </p>
              )}

              {/* Add to Cart */}
              <AddToCartSection product={product} />

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-furniture-gray-200">
                <div className="text-center">
                  <Truck className="w-8 h-8 mx-auto mb-2 text-furniture-terracotta" />
                  <p className="text-sm text-furniture-gray-600">Free Shipping</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-furniture-terracotta" />
                  <p className="text-sm text-furniture-gray-600">5-Year Warranty</p>
                </div>
                <div className="text-center">
                  <RefreshCcw className="w-8 h-8 mx-auto mb-2 text-furniture-terracotta" />
                  <p className="text-sm text-furniture-gray-600">Easy Returns</p>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4 pt-6 border-t border-furniture-gray-200">
                {product.dimensions && (
                  <div>
                    <h3 className="font-semibold text-furniture-charcoal mb-2">Dimensions</h3>
                    <p className="text-furniture-gray-700">
                      W: {product.dimensions.width}{product.dimensions.unit} ×
                      H: {product.dimensions.height}{product.dimensions.unit} ×
                      D: {product.dimensions.depth}{product.dimensions.unit}
                    </p>
                  </div>
                )}

                {product.materials && product.materials.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-furniture-charcoal mb-2">Materials</h3>
                    <p className="text-furniture-gray-700">{product.materials.join(', ')}</p>
                  </div>
                )}

                {product.sku && (
                  <div>
                    <h3 className="font-semibold text-furniture-charcoal mb-2">SKU</h3>
                    <p className="text-furniture-gray-700">{product.sku}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Full Description & Additional Info */}
          {(product.description || product.careInstructions || product.warranty) && (
            <div className="mt-16 max-w-4xl">
              <div className="border-t border-furniture-gray-200 pt-8">
                {product.description && (
                  <div className="mb-8">
                    <h2 className="heading-3 text-furniture-charcoal mb-4">Description</h2>
                    <div className="prose prose-furniture max-w-none text-furniture-gray-700">
                      {/* Portable text will be rendered here - simplified for now */}
                      <p>Full product description from Sanity will appear here.</p>
                    </div>
                  </div>
                )}

                {product.careInstructions && (
                  <div className="mb-8">
                    <h2 className="heading-4 text-furniture-charcoal mb-3">Care Instructions</h2>
                    <p className="text-furniture-gray-700">{product.careInstructions}</p>
                  </div>
                )}

                {product.warranty && (
                  <div>
                    <h2 className="heading-4 text-furniture-charcoal mb-3">Warranty</h2>
                    <p className="text-furniture-gray-700">{product.warranty}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
