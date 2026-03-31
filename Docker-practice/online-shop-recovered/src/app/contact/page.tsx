'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Facebook,
  Instagram,
  MapPinIcon,
} from 'lucide-react';
import { contactInfo } from '@/lib/data/contact-info';

type FormData = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitStatus('loading');

    // Simulate API call - will be implemented later
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate success
    console.log('Form data:', data);
    setSubmitStatus('success');
    reset();

    // Reset status after 5 seconds
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-furniture-beige py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="heading-1 text-furniture-charcoal mb-4">
              Get in Touch
            </h1>
            <p className="body-large text-furniture-gray-700">
              Have questions about our furniture or need design advice? We'd love to
              hear from you. Visit our showroom or send us a message.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-3 text-furniture-charcoal mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block font-medium text-furniture-charcoal mb-2"
                  >
                    Name <span className="text-furniture-terracotta">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="input-base"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-furniture-terracotta">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block font-medium text-furniture-charcoal mb-2"
                  >
                    Email <span className="text-furniture-terracotta">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className="input-base"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-furniture-terracotta">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Field (Optional) */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block font-medium text-furniture-charcoal mb-2"
                  >
                    Phone <span className="text-furniture-gray-400 text-sm">(Optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className="input-base"
                    placeholder="+1 (234) 567-8900"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block font-medium text-furniture-charcoal mb-2"
                  >
                    Subject <span className="text-furniture-terracotta">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register('subject', { required: 'Subject is required' })}
                    className="input-base"
                    placeholder="How can we help you?"
                  />
                  {errors.subject && (
                    <p className="mt-2 text-sm text-furniture-terracotta">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block font-medium text-furniture-charcoal mb-2"
                  >
                    Message <span className="text-furniture-terracotta">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters',
                      },
                    })}
                    className="textarea-base"
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-furniture-terracotta">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitStatus === 'loading' ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 inline-block" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-4 bg-furniture-sage/10 border border-furniture-sage rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-furniture-sage flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-furniture-sage">Message sent successfully!</p>
                      <p className="text-sm text-furniture-gray-700 mt-1">
                        We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-4 bg-furniture-terracotta/10 border border-furniture-terracotta rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5 text-furniture-terracotta flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-furniture-terracotta">Failed to send message</p>
                      <p className="text-sm text-furniture-gray-700 mt-1">
                        Please try again or contact us directly via email.
                      </p>
                    </div>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Map and Business Info */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div>
                <h2 className="heading-3 text-furniture-charcoal mb-6">
                  Visit Our Showroom
                </h2>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-furniture-gray-200 to-furniture-gray-300">
                  {/* Placeholder for map - user will add actual map later */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center">
                      <MapPinIcon className="w-16 h-16 mx-auto mb-4 text-furniture-gray-500" />
                      <p className="text-furniture-gray-600 font-medium mb-2">
                        Interactive map will be embedded here
                      </p>
                      <p className="text-sm text-furniture-gray-500">
                        Add Google Maps iframe or similar service
                      </p>
                    </div>
                  </div>
                  {/* User will replace this with actual map embed code */}
                </div>
              </div>

              {/* Business Information Cards */}
              <div className="space-y-4">
                {/* Address */}
                <div className="card-base p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-furniture-terracotta/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-furniture-terracotta" />
                    </div>
                    <div>
                      <h3 className="heading-6 text-furniture-charcoal mb-2">Address</h3>
                      <address className="not-italic body-base text-furniture-gray-700">
                        {contactInfo.address.street}<br />
                        {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
                      </address>
                    </div>
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="card-base p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-furniture-sage/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-furniture-sage" />
                    </div>
                    <div>
                      <h3 className="heading-6 text-furniture-charcoal mb-2">Phone</h3>
                      <a
                        href={`tel:${contactInfo.contact.phoneRaw}`}
                        className="body-base text-furniture-gray-700 hover:text-furniture-terracotta transition-colors"
                      >
                        {contactInfo.contact.phone}
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
                        href={`mailto:${contactInfo.contact.email}`}
                        className="body-base text-furniture-gray-700 hover:text-furniture-terracotta transition-colors"
                      >
                        {contactInfo.contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="card-base p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-furniture-beige flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-furniture-charcoal" />
                    </div>
                    <div className="flex-1">
                      <h3 className="heading-6 text-furniture-charcoal mb-3">Business Hours</h3>
                      <div className="space-y-2">
                        {contactInfo.businessHours.map((schedule, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center body-small"
                          >
                            <span className="text-furniture-gray-600">{schedule.day}</span>
                            <span className="text-furniture-charcoal font-medium">
                              {schedule.hours}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="card-base p-6">
                  <h3 className="heading-6 text-furniture-charcoal mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    <a
                      href={contactInfo.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-furniture-gray-100 hover:bg-furniture-terracotta flex items-center justify-center transition-colors group"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5 text-furniture-charcoal group-hover:text-white" />
                    </a>
                    <a
                      href={contactInfo.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-furniture-gray-100 hover:bg-furniture-terracotta flex items-center justify-center transition-colors group"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5 text-furniture-charcoal group-hover:text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
