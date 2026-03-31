'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    // Simulate API call - will be implemented later
    setTimeout(() => {
      setStatus('success');
      setEmail('');

      // Reset after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section className="section-spacing bg-gradient-to-br from-furniture-charcoal to-furniture-navy">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icon */}
          <div className="mx-auto w-16 h-16 rounded-full bg-furniture-terracotta/20 flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-furniture-terracotta" />
          </div>

          {/* Headline */}
          <h2 className="heading-2 text-white mb-4">
            Stay Inspired
          </h2>

          {/* Subtext */}
          <p className="body-large text-furniture-cream/80 mb-8">
            Get design tips, exclusive offers, and early access to new collections
            delivered straight to your inbox.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 input-base bg-white"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                className="btn-primary bg-furniture-terracotta hover:bg-furniture-terracotta-light whitespace-nowrap disabled:opacity-50"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-furniture-sage-light font-medium"
              >
                ✓ Thank you for subscribing!
              </motion.p>
            )}

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-furniture-terracotta-light font-medium"
              >
                Please enter a valid email address
              </motion.p>
            )}
          </form>

          {/* Privacy Note */}
          <p className="caption text-furniture-cream/60 mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
