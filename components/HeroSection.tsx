'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';

const heroVideos = [
  {
    src: '/construction_2.mp4',
    label: 'Homes & Commercial Spaces',
    prefix: 'Homes',
    highlight: 'and Commercial Spaces',
  },
  {
    src: '/construction.mp4',
    label: 'Turnkey Construction Projects',
    prefix: 'Turnkey',
    highlight: 'Construction Projects',
  },
  {
    src: '/school_construction.mp4',
    label: 'Institutional & School Spaces',
    prefix: 'Institutional',
    highlight: '& School Spaces',
  },
];

export default function HeroSection() {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Play active video and pause inactive ones when index switches
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === currentVideoIndex) {
        video.currentTime = 0;
        video.play().catch(() => {
          // Autoplay may be restricted by device power saving mode
        });
      } else {
        video.pause();
      }
    });
  }, [currentVideoIndex]);

  // Initial autoplay on mount
  useEffect(() => {
    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      firstVideo.play().catch(() => { });
    }
  }, []);

  const handleVideoEnded = useCallback((endedIndex: number) => {
    setCurrentVideoIndex((prev) => {
      if (prev === endedIndex) {
        return (prev + 1) % heroVideos.length;
      }
      return prev;
    });
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
      className="relative flex min-h-[75vh] sm:min-h-[85vh] lg:min-h-screen items-end justify-center overflow-hidden bg-brand-navy pb-4 sm:pb-6 lg:pb-8 pt-24 sm:pt-28 cursor-pointer group select-none"
    >
      {/* Background Videos (Starts from top behind glossy navbar) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {heroVideos.map((vid, idx) => (
          <video
            key={vid.src}
            ref={(el) => {
              videoRefs.current[idx] = el;
            }}
            autoPlay={idx === 0}
            muted
            playsInline
            preload="auto"
            onEnded={() => handleVideoEnded(idx)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${currentVideoIndex === idx ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <source src={vid.src} type="video/mp4" />
          </video>
        ))}

        {/* Top soft translucent wash to ensure navbar glass contrast + bottom vignette for headline readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/25 via-transparent to-black/75 pointer-events-none" />
      </div>

      {/* Hero Headline - Fully Visible Across All Screen Sizes */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-5xl"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[44px] font-extrabold tracking-tight text-white leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            <span className="block">
              India’s Most Trusted Tech-Driven Construction Partner for
            </span>
            <span className="block mt-1 sm:mt-1.5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={heroVideos[currentVideoIndex]?.src || currentVideoIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="inline-block"
                >
                  {heroVideos[currentVideoIndex]?.prefix}{' '}
                  <span className="text-[#00D2FF]">
                    {heroVideos[currentVideoIndex]?.highlight}
                  </span>
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Interactive Click Indicator Button - Solid Blue matching user reference */}
          <div className="mt-2.5 sm:mt-3 inline-flex items-center gap-2 rounded-full bg-[#0052FF] hover:bg-[#0042EC] px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95">
            <span>Click anywhere to start consultation</span>
            <ArrowRight size={14} className="text-white transition-transform group-hover:translate-x-1" />
          </div>

          {/* Sequential Video Progress Indicators */}
          <div className="mt-2.5 sm:mt-3 flex items-center justify-center gap-2">
            {heroVideos.map((vid, dotIdx) => (
              <button
                key={vid.src}
                type="button"
                aria-label={`Switch to ${vid.label}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentVideoIndex(dotIdx);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${currentVideoIndex === dotIdx
                  ? 'w-8 bg-[#0052FF]'
                  : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
              />
            ))}
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
