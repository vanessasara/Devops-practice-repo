'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { aboutContent } from '@/lib/data/about-content';

export default function ShowroomSection() {
  const { showroom } = aboutContent;

  return (
    <section className="section-spacing bg-furniture-beige">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="heading-2 text-furniture-charcoal mb-4">
            {showroom.title}
          </h2>
          <p className="body-base text-furniture-gray-600 max-w-2xl mx-auto">
            {showroom.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-furniture-gray-300">
              {/* Placeholder for map - user will add actual map later */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-furniture-gray-200 to-furniture-gray-300">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-furniture-gray-500" />
                  <p className="text-furniture-gray-600 font-medium">
                    Interactive map will be embedded here
                  </p>
                  <p className="text-sm text-furniture-gray-500 mt-2">
                    Google Maps or similar service
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Address */}
            <div className="card-base p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-furniture-terracotta/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-furniture-terracotta" />
                </div>
                <div>
                  <h3 className="heading-6 text-furniture-charcoal mb-2">Address</h3>
                  <p className="body-base text-furniture-gray-700">
                    {showroom.address.street}<br />
                    {showroom.address.city}, {showroom.address.state} {showroom.address.zip}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="card-base p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-furniture-sage/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-furniture-sage" />
                </div>
                <div>
                  <h3 className="heading-6 text-furniture-charcoal mb-2">Phone</h3>
                  <a
                    href={`tel:${showroom.contact.phone.replace(/\s+/g, '')}`}
                    className="body-base text-furniture-gray-700 hover:text-furniture-terracotta transition-colors"
                  >
                    {showroom.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-furniture-gold/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-furniture-gold" />
                </div>
                <div>
                  <h3 className="heading-6 text-furniture-charcoal mb-2">Email</h3>
                  <a
                    href={`mailto:${showroom.contact.email}`}
                    className="body-base text-furniture-gray-700 hover:text-furniture-terracotta transition-colors"
                  >
                    {showroom.contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="card-base p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-furniture-beige flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-furniture-charcoal" />
                </div>
                <div className="flex-1">
                  <h3 className="heading-6 text-furniture-charcoal mb-3">Opening Hours</h3>
                  <div className="space-y-2">
                    {showroom.hours.map((schedule, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center body-small"
                      >
                        <span className="text-furniture-gray-600">{schedule.days}</span>
                        <span className="text-furniture-charcoal font-medium">{schedule.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full btn-primary group">
              Get Directions
              <ExternalLink className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
