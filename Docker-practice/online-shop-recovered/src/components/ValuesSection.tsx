'use client';

import { motion } from 'framer-motion';
import { Truck, Shield, RefreshCcw, Leaf } from 'lucide-react';

const VALUES = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Complimentary delivery on all orders over $500',
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: '5-year warranty on all furniture pieces',
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free return policy',
  },
  {
    icon: Leaf,
    title: 'Sustainable',
    description: 'Eco-friendly materials and ethical sourcing',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function ValuesSection() {
  return (
    <section className="section-spacing bg-white border-y border-furniture-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="text-center group"
              >
                {/* Icon */}
                <div className="mx-auto w-16 h-16 rounded-full bg-furniture-beige flex items-center justify-center mb-4 group-hover:bg-furniture-sage transition-colors duration-300">
                  <Icon className="w-8 h-8 text-furniture-charcoal group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="heading-6 text-furniture-charcoal mb-2">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="body-small text-furniture-gray-600">
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
