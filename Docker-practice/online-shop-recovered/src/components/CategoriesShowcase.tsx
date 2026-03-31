'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    name: 'Sofas & Sectionals',
    slug: 'sofas',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  },
  {
    name: 'Dining Tables',
    slug: 'dining-tables',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
  },
  {
    name: 'Chairs & Seating',
    slug: 'chairs',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
  },
  {
    name: 'Beds & Mattresses',
    slug: 'beds',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
  },
  {
    name: 'Lighting',
    slug: 'lighting',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80',
  },
  {
    name: 'Storage & Shelving',
    slug: 'storage',
    image: 'https://images.unsplash.com/photo-1594026111900-7d2b6abf89e0?w=800&q=80',
  },
];

export default function CategoriesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for category cards
      gsap.from(cardsRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="section-spacing bg-furniture-beige">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="heading-2 text-furniture-charcoal mb-4">
            Shop by Category
          </h2>
          <p className="body-base text-furniture-gray-600 max-w-2xl mx-auto">
            Explore our curated collections designed for every room in your home
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category, index) => (
            <div key={category.slug} ref={addToRefs}>
              <Link
                href={`/products?category=${category.slug}`}
                className="group block relative aspect-[4/3] rounded-xl overflow-hidden"
              >
                {/* Background Image */}
                <Image
                  src={category.image}
                  alt={`${category.name} furniture collection`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-furniture-charcoal/80 via-furniture-charcoal/40 to-transparent group-hover:from-furniture-charcoal/70 transition-all duration-500" />

                {/* Category Name */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="heading-4 text-white text-center px-4 transform group-hover:scale-110 transition-transform duration-500">
                    {category.name}
                  </h3>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
