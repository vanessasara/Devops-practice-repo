import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const QUICK_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Contact', href: '/contact' },
];

const CUSTOMER_SERVICE = [
  { name: 'Shipping Info', href: '/shipping' },
  { name: 'Returns & Exchanges', href: '/returns' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Terms & Conditions', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-furniture-charcoal text-furniture-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: About */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-playfair font-bold">
                Sony <span className="text-furniture-terracotta">Interior</span>
              </h3>
            </Link>
            <p className="body-small text-furniture-cream/80 leading-relaxed">
              Crafting exceptional furniture with timeless design and modern
              craftsmanship since 2002. Transform your space with pieces that
              inspire.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 pt-4">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-furniture-terracotta" />
                <span className="text-furniture-cream/80">
                  3252 Winding Way<br />
                  Willowbrook, CA 90210
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-furniture-terracotta" />
                <a
                  href="tel:+12345678900"
                  className="text-furniture-cream/80 hover:text-furniture-terracotta transition-colors"
                >
                  +1 (234) 567-8900
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-furniture-terracotta" />
                <a
                  href="mailto:studio@sonyinterior.com"
                  className="text-furniture-cream/80 hover:text-furniture-terracotta transition-colors"
                >
                  studio@sonyinterior.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="heading-6 text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="body-small text-furniture-cream/80 hover:text-furniture-terracotta transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h4 className="heading-6 text-white mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {CUSTOMER_SERVICE.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="body-small text-furniture-cream/80 hover:text-furniture-terracotta transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div>
            <h4 className="heading-6 text-white mb-4">Stay Connected</h4>
            <p className="body-small text-furniture-cream/80 mb-4">
              Subscribe to our newsletter for exclusive offers and design inspiration.
            </p>

            {/* Newsletter Form */}
            <form className="space-y-3 mb-6">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-lg bg-furniture-gray-800 border border-furniture-gray-700 text-white placeholder:text-furniture-gray-400 focus:outline-none focus:ring-2 focus:ring-furniture-terracotta focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="w-full btn-primary bg-furniture-terracotta hover:bg-furniture-terracotta-light"
              >
                Subscribe
              </button>
            </form>

            {/* Social Links */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-furniture-gray-800 flex items-center justify-center hover:bg-furniture-terracotta transition-colors group"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-furniture-cream group-hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-furniture-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="body-small text-furniture-cream/60 text-center md:text-left">
              © {currentYear} Sony Interior. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-furniture-cream/60 hover:text-furniture-terracotta transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-furniture-cream/60 hover:text-furniture-terracotta transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="text-furniture-cream/60 hover:text-furniture-terracotta transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
