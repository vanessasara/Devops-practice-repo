import { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import CompanyStory from '@/components/about/CompanyStory';
import ValuesSection from '@/components/about/ValuesSection';
import ShowroomSection from '@/components/about/ShowroomSection';

export const metadata: Metadata = {
  title: 'About Us - Sony Interior | Our Story & Craftsmanship',
  description: 'Discover Sony Interior\'s 20+ year journey crafting exceptional furniture. Learn about our commitment to quality, sustainability, and timeless design.',
  keywords: 'about sony interior, furniture craftsmanship, sustainable furniture, furniture company story, quality furniture maker',
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <CompanyStory />
      <ValuesSection />
      <ShowroomSection />
    </main>
  );
}
