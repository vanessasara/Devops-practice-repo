'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { aboutContent } from '@/lib/data/about-content';

export default function CompanyStory() {
  return (
    <section className="section-spacing bg-furniture-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-2 text-furniture-charcoal mb-8">
              {aboutContent.companyStory.title}
            </h2>

            <div className="space-y-6">
              {aboutContent.companyStory.paragraphs.map((paragraph, index) => (
                <p key={index} className="body-base text-furniture-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Pull Quote */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 pl-6 border-l-4 border-furniture-terracotta"
            >
              <p className="text-xl md:text-2xl font-playfair italic text-furniture-charcoal">
                {aboutContent.companyStory.pullQuote}
              </p>
            </motion.div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large Image */}
              <div className="col-span-2 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80"
                  alt="Furniture craftsmanship and design process"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Small Images */}
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&q=80"
                  alt="Quality materials and details"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80"
                  alt="Showroom interior design"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-furniture-sage rounded-full opacity-20 blur-3xl -z-10" />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-furniture-terracotta rounded-full opacity-20 blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
