import Link from 'next/link';
import { Search } from 'lucide-react';

export default function ProductNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-2xl">
        <div className="w-24 h-24 rounded-full bg-furniture-beige flex items-center justify-center mx-auto mb-8">
          <Search className="w-12 h-12 text-furniture-gray-400" />
        </div>

        <h1 className="heading-1 text-furniture-charcoal mb-4">
          Product Not Found
        </h1>

        <p className="body-large text-furniture-gray-600 mb-8">
          Sorry, we couldn't find the product you're looking for. It may have been
          removed or the link might be incorrect.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="btn-primary">
            Browse All Products
          </Link>
          <Link href="/" className="btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
