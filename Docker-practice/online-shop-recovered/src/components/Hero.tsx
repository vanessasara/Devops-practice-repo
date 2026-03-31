'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroImage1 from '@/assets/heroImage3.png';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      tl.from(headlineRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
      })
      .from(subheadlineRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
      }, '-=0.6')
      .from(ctaRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
      }, '-=0.4');

      // Parallax effect on background image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-furniture-charcoal"
    >
      {/* Background Image with Parallax */}
      <div ref={imageRef} className="absolute inset-0 w-full h-[120%]">
        <Image
          src={HeroImage1}
          alt="Elegant modern furniture interior design"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-furniture-charcoal/90 via-furniture-charcoal/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full max-w-3xl">
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="heading-1 text-white mb-6 md:mb-8"
          >
            Transform Your Space
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="body-large text-furniture-cream/90 mb-8 md:mb-12 max-w-2xl"
          >
            Discover timeless furniture pieces crafted with exceptional quality and
            sophisticated design. Elevate your home with Sony Interior's curated
            collection of modern essentials.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <Link href="/products" className="btn-primary text-lg px-8 py-4">
              Explore Collection
            </Link>
            <Link href="/about" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-furniture-charcoal">
              Our Story
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-furniture-cream/60">
            <span className="text-sm font-medium uppercase tracking-wider">Scroll</span>
            <div className="w-px h-12 bg-furniture-cream/30 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
