'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPreview() {
  return (
    <section className="section-spacing bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h2 className="heading-2 text-furniture-charcoal mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-furniture-gray-700">
              <p className="body-base">
                At Sony Interior, we believe that exceptional furniture is more than just
                functional pieces—it's an expression of your unique style and a foundation
                for life's most meaningful moments.
              </p>
              <p className="body-base">
                For over two decades, we've been curating and crafting furniture that
                combines timeless design with modern craftsmanship. Each piece in our
                collection is thoughtfully selected to bring both beauty and comfort to your
                home.
              </p>
              <p className="body-base">
                From sustainable materials to expert artisanship, we're committed to
                delivering furniture that stands the test of time—both in style and quality.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/about" className="link-base text-lg font-semibold">
                Learn More About Us →
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?w=800&q=80"
                alt="Sony Interior showroom featuring modern furniture craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Decorative Accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-furniture-terracotta rounded-full opacity-80 blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
