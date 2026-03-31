import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import AboutPreview from '@/components/AboutPreview';
import ZoomParallax from '@/components/ZoomParallax';
import CategoriesShowcase from '@/components/CategoriesShowcase';
import ValuesSection from '@/components/ValuesSection';
import NewsletterSection from '@/components/NewsletterSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <AboutPreview />
      <ZoomParallax />
      <CategoriesShowcase />
      <ValuesSection />
      <NewsletterSection />
    </main>
  );
}
