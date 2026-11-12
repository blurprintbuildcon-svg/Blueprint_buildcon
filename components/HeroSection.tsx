'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';

export default function HeroSection() {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure autoplay on mount across all browsers and devices
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted by device power saving mode
      });
    }
  }, []);

  return (
    <section
      id="home"
      onClick={() => setIsFormOpen(true)}
      role="button"
      tabIndex={0}
      aria-label="Click to open free consultation enquiry"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsFormOpen(true);
        }
      }}
      className="relative flex min-h-[75vh] sm:min-h-[85vh] lg:min-h-screen items-end justify-center overflow-hidden bg-brand-navy pb-12 sm:pb-16 lg:pb-20 pt-20 cursor-pointer group select-none"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Soft bottom vignette to enhance bottom text contrast while keeping upper video clear */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/25 to-black/15 pointer-events-none" />
      </div>

      {/* Hero Headline - Positioned Below with Compact Line Spacing */}
      <div className="container relative z-20 mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-5xl"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] sm:leading-[1.15] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            India’s Most Trusted Tech-Driven Construction Partner for
            <span className="block">
              Homes <span className="text-sky-400">and Commercial Spaces</span>
            </span>
          </h1>

          {/* Interactive Click Indicator */}
          <div className="mt-4 sm:mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-all group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:scale-105 shadow-lg">
            <span>Click anywhere to start consultation</span>
            <ArrowRight size={14} className="text-sky-300 group-hover:text-white transition-colors" />
          </div>
        </motion.div>
      </div>

      <ConsultationModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </section>
  );
}
