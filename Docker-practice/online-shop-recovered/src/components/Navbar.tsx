'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll for background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.nav
        initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        animate={{
          backgroundColor: isScrolled
            ? 'rgba(250, 248, 243, 0.95)'
            : 'rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-md shadow-sm' : ''
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <h1
                className={`text-2xl font-playfair font-bold transition-colors duration-300 ${
                  isScrolled
                    ? 'text-furniture-charcoal'
                    : 'text-white'
                }`}
              >
                Sony <span className="text-furniture-terracotta">Interior</span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group"
                >
                  <span
                    className={`font-medium transition-colors duration-300 ${
                      isScrolled
                        ? 'text-furniture-charcoal hover:text-furniture-terracotta'
                        : 'text-white hover:text-furniture-cream'
                    }`}
                  >
                    {link.name}
                  </span>
                  {/* Active Indicator & Hover Line */}
                  <span
                    className={`absolute left-0 right-0 bottom-0 h-0.5 transform origin-left transition-all duration-300 ${
                      isActive(link.href)
                        ? 'scale-x-100 bg-furniture-terracotta'
                        : 'scale-x-0 group-hover:scale-x-100'
                    } ${
                      isScrolled
                        ? 'bg-furniture-terracotta'
                        : 'bg-white'
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                className={`p-2 rounded-full transition-colors duration-300 ${
                  isScrolled
                    ? 'hover:bg-furniture-gray-100 text-furniture-charcoal'
                    : 'hover:bg-white/10 text-white'
                }`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded-full transition-colors duration-300 relative ${
                  isScrolled
                    ? 'hover:bg-furniture-gray-100 text-furniture-charcoal'
                    : 'hover:bg-white/10 text-white'
                }`}
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {/* Cart count badge (placeholder) */}
                <span className="absolute top-0 right-0 w-4 h-4 bg-furniture-terracotta text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                isScrolled
                  ? 'text-furniture-charcoal hover:bg-furniture-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-furniture-charcoal/80 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-furniture-cream z-50 md:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-furniture-gray-200">
                  <h2 className="text-xl font-playfair font-bold text-furniture-charcoal">
                    Sony <span className="text-furniture-terracotta">Interior</span>
                  </h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-furniture-gray-100 text-furniture-charcoal"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-6">
                  <ul className="space-y-2">
                    {NAV_LINKS.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                            isActive(link.href)
                              ? 'bg-furniture-terracotta text-white'
                              : 'text-furniture-charcoal hover:bg-furniture-gray-100'
                          }`}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Actions */}
                <div className="p-6 border-t border-furniture-gray-200 space-y-3">
                  <button className="w-full btn-outline text-furniture-charcoal border-furniture-charcoal hover:bg-furniture-charcoal hover:text-white">
                    <Search className="w-5 h-5 mr-2 inline-block" />
                    Search Products
                  </button>
                  <button className="w-full btn-primary">
                    <ShoppingCart className="w-5 h-5 mr-2 inline-block" />
                    View Cart (0)
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
