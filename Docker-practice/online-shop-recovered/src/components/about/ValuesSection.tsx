'use client';

import { motion } from 'framer-motion';
import { Hammer, Leaf, Sparkles, Heart } from 'lucide-react';
import { aboutContent } from '@/lib/data/about-content';

const ICON_MAP = {
  hammer: Hammer,
  leaf: Leaf,
  sparkles: Sparkles,
  heart: Heart,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
      ease: 'easeOut' as const,
    },
  },
};

export default function ValuesSection() {
  return (
    <section className="section-spacing bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="heading-2 text-furniture-charcoal mb-4">
            Our Values
          </h2>
          <p className="body-base text-furniture-gray-600 max-w-2xl mx-auto">
            Four pillars that guide every decision we make and every piece we create
          </p>
        </div>

        {/* Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {aboutContent.values.map((value) => {
            const Icon = ICON_MAP[value.icon as keyof typeof ICON_MAP];
            return (
              <motion.div
                key={value.title}
                variants={cardVariants}
                className="card-base p-8 group hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-furniture-beige flex items-center justify-center mb-6 group-hover:bg-furniture-terracotta transition-colors duration-300">
                  <Icon className="w-8 h-8 text-furniture-charcoal group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="heading-5 text-furniture-charcoal mb-4">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="body-small text-furniture-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
