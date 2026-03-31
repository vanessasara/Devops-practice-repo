'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { aboutContent } from '@/lib/data/about-content';

export default function AboutHero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-furniture-charcoal">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?w=1600&q=80"
          alt="Sony Interior showroom and craftsmanship"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-furniture-charcoal/70 via-furniture-charcoal/50 to-furniture-charcoal/80" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full max-w-3xl">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-furniture-cream/80 mb-6"
          >
            <Link href="/" className="hover:text-furniture-terracotta transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-furniture-cream">About</span>
          </motion.nav>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="heading-1 text-white mb-4"
          >
            {aboutContent.hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="body-large text-furniture-cream/90"
          >
            {aboutContent.hero.subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
