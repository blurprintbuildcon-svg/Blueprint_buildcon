'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';

const heroVideos = [
  { src: '/hero-video.mp4', label: 'Homes & Commercial Spaces' },
  { src: '/hero-video-2.mp4', label: 'Commercial & Mall Spaces' },
  { src: '/hero-video-3.mp4', label: 'Residential Spaces' },
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
        className="relative flex min-h-[75vh] sm:min-h-[85vh] lg:min-h-screen items-end justify-center overflow-hidden bg-brand-navy pb-12 sm:pb-16 lg:pb-20 pt-20 cursor-pointer group select-none"
      >
        {/* Background Videos (Sequential Playback with Smooth Cross-Fade) */}
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
                  <span className="block min-h-[1.15em] overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                      {currentVideoIndex === 0 && (
                        <motion.span
                          key="homes"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                          className="inline-block"
                        >
                          Homes <span className="text-sky-400">and Commercial Spaces</span>
                        </motion.span>
                      )}
                      {currentVideoIndex === 1 && (
                        <motion.span
                          key="malls"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                          className="inline-block"
                        >
                          Commercial <span className="text-sky-400">and Mall Spaces</span>
                        </motion.span>
                      )}
                      {currentVideoIndex === 2 && (
                        <motion.span
                          key="residential"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                          className="inline-block"
                        >
                          Residential <span className="text-sky-400">Spaces</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </h1>

                {/* Interactive Click Indicator */}
                <div className="mt-4 sm:mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-all group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:scale-105 shadow-lg">
                  <span>Click anywhere to start consultation</span>
                  <ArrowRight size={14} className="text-sky-300 group-hover:text-white transition-colors" />
                </div>

                {/* Sequential Video Progress Indicators */}
                <div className="mt-5 flex items-center justify-center gap-2">
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
                          ? 'w-8 bg-sky-400'
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
