'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import ConsultationModal from '@/components/ConsultationModal';

export default function HeroSection() {
  const [isFormOpen, setIsFormOpen] = useState(true);

  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
      alt: 'Luxury Modern Architecture and Construction',
    },
    {
      url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=85&w=1600',
      alt: 'Commercial Civil Engineering and Construction Site',
    },
    {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600',
      alt: 'Contemporary Urban Residence Project',
    },
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600',
      alt: 'Bespoke Premium Villa and Landscaping',
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-charcoal">
      {/* 4 Sliding Background Images (6s interval) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-navy/70 mix-blend-multiply z-10" />
        {heroImages.map((img, idx) => (
          <motion.img
            key={img.url}
            src={img.url}
            alt={img.alt}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{
              opacity: currentImageIndex === idx ? 1 : 0,
              scale: currentImageIndex === idx ? 1 : 1.05,
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20 py-12 lg:py-24">
        <div className="max-w-3xl">
          {/* Hero Content */}
          <div className="lg:col-span-7 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Build Your Dream.<br />
                <span className="text-brand-orange">We&apos;ll Build It Right.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl leading-relaxed">
                End-to-end construction solutions designed around your vision, budget and timeline — from the first blueprint to the final handover.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(true)}
                  className="px-8 py-3.5 bg-brand-orange text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 flex items-center cursor-pointer"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <Link
                  href="/services"
                  className="px-8 py-3.5 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 backdrop-blur-sm transition-all border border-white/20"
                >
                  Explore Our Services
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/20">
                {[
                  'Transparent Pricing',
                  'Quality Construction',
                  'Professional Team',
                  'End-to-End Support',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center text-sm font-medium text-slate-200">
                    <CheckCircle2 className="text-brand-orange w-4 h-4 mr-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Slide Indicators */}
              <div className="flex items-center gap-2 pt-6">
                {heroImages.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    onClick={() => setCurrentImageIndex(dotIdx)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentImageIndex === dotIdx
                        ? 'w-8 bg-brand-orange'
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* REPLACED MODAL FORM (MATCHES SCREENSHOT 1 & 2 UI WITH CIVIL CONSTRUCTION FIELDS) */}
      <ConsultationModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </section>
  );
}
