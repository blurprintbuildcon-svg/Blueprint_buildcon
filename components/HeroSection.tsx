'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import Link from 'next/link';
import ConsultationModal from '@/components/ConsultationModal';

const branchCities = [
  { name: 'Ahmedabad', image: '/Ahmedabad.png' },
  { name: 'Bengaluru', image: '/Bengaluru.png' },
  { name: 'Bhubaneswar', image: '/Bhubaneswar.png' },
  { name: 'Chennai', image: '/Chennai.png' },
  { name: 'Goa', image: '/Goa.png' },
  { name: 'Guwahati', image: '/Guwahati.png' },
  { name: 'Hyderabad', image: '/Hyderabad.png' },
  { name: 'Indore', image: '/Indore.png' },
  { name: 'Jaipur', image: '/Jaipur.png' },
  { name: 'Kochi', image: '/Kochi.png' },
  { name: 'Kolkata', image: '/Kolkata.png' },
  { name: 'Lucknow', image: '/Lucknow.png' },
  { name: 'Mumbai', image: '/Mumbai.png' },
  { name: 'New Delhi', image: '/New Delhi.png' },
  { name: 'Surat', image: '/surat.png' },
  { name: 'Patna', image: '/patna.png' },
  { name: 'Pune', image: '/pune.png' },
  { name: 'Raipur', image: '/Raipur.png' },
];

const houseImages = [
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    title: 'Luxury Architectural Villa',
    subtitle: 'Bespoke Residential Civil Engineering',
  },
  {
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85',
    title: 'Contemporary Modern Estate',
    subtitle: 'Turnkey Luxury Living & Construction',
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    title: 'Premium Urban Architecture',
    subtitle: 'Precision Blueprints & 3D Execution',
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85',
    title: 'Modern Dream Residence',
    subtitle: 'End-to-End Civil & Interior Handover',
  },
];

export default function HeroSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showingBranches, setShowingBranches] = useState(false);
  const [currentHouseIndex, setCurrentHouseIndex] = useState(0);
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [cityImageUnavailable, setCityImageUnavailable] = useState(false);

  const currentCity = branchCities[currentCityIndex];

  // Slideshow: Cycles through all house slides, then shows all 18 branch cities, then loops back
  useEffect(() => {
    // 5.5s per house slide, 3.2s per branch city so users can see each city clearly
    const slideDuration = showingBranches ? 3200 : 5500;

    const timer = setTimeout(() => {
      if (!showingBranches) {
        if (currentHouseIndex >= houseImages.length - 1) {
          setSlideDirection(1);
          setShowingBranches(true);
          setCurrentCityIndex(0);
          setCityImageUnavailable(false);
        } else {
          setSlideDirection(1);
          setCurrentHouseIndex((prev) => prev + 1);
        }
      } else {
        if (currentCityIndex >= branchCities.length - 1) {
          // All 18 cities shown! Transition back to house slides at index 0
          setSlideDirection(1);
          setShowingBranches(false);
          setCurrentHouseIndex(0);
          setCurrentCityIndex(0);
          setCityImageUnavailable(false);
        } else {
          // Advance to next city image (cycles from 0 through 17)
          setCurrentCityIndex((prev) => prev + 1);
          setCityImageUnavailable(false);
        }
      }
    }, slideDuration);

    return () => clearTimeout(timer);
  }, [currentCityIndex, currentHouseIndex, showingBranches]);

  const goToHouse = (index: number) => {
    if (showingBranches) {
      setSlideDirection(-1);
    } else {
      setSlideDirection(index >= currentHouseIndex ? 1 : -1);
    }
    setCurrentHouseIndex(index);
    setShowingBranches(false);
  };

  const goToBranches = () => {
    setSlideDirection(1);
    setCurrentCityIndex(0);
    setCityImageUnavailable(false);
    setShowingBranches(true);
  };

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 1,
    }),
    center: {
      x: '0%',
      opacity: 1,
      transition: {
        x: { type: 'tween' as const, duration: 0.85, ease: [0.25, 1, 0.5, 1] },
        opacity: { duration: 0.3 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 1,
      transition: {
        x: { type: 'tween' as const, duration: 0.85, ease: [0.25, 1, 0.5, 1] },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <section
      id="home"
      className={`relative min-h-screen flex flex-col justify-between overflow-hidden transition-colors duration-500 pt-24 lg:pt-28 pb-12 select-none ${
        showingBranches ? 'bg-slate-100 text-slate-900' : 'bg-slate-900 text-white'
      }`}
    >
      {/* =========================================================================
          BACKGROUND: BRIGHT SLIDING HOUSE IMAGES (Shown when not showing branches)
          ========================================================================= */}
      {!showingBranches && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence initial={false} custom={slideDirection}>
            <motion.div
              key={currentHouseIndex}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={houseImages[currentHouseIndex].url}
                alt={houseImages[currentHouseIndex].title}
                loading="eager"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Natural, Balanced Contrast Overlays (Clean & Bright) */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/55 to-brand-navy/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-brand-navy/30" />
        </div>
      )}

      {/* =========================================================================
          CONTENT: SHOWING PLACES (Upcoming Branches) OR HERO SLIDESHOW
          ========================================================================= */}
      {showingBranches ? (
        <div className="container relative z-20 mx-auto px-4 py-8 md:px-6 md:py-10 my-auto">
          <div className="mx-auto max-w-5xl">
            <header className="mb-5 text-center sm:mb-6">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600 sm:h-11 sm:w-11">
                <MapPin size={21} aria-hidden="true" />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-amber-600">
                Pan-India Expansion
              </p>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
                Upcoming Branches
              </h1>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                We&apos;re growing across India. Explore the cities where we&apos;re planning to welcome you next.
              </p>
            </header>

            <div
              className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200/80 sm:rounded-3xl"
              aria-roledescription="carousel"
              aria-label="Upcoming branch locations"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-sky-200 via-blue-100 to-amber-100 sm:aspect-[2.6/1]">
                {!cityImageUnavailable && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentCity.name}
                      initial={{ opacity: 0.5, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.5 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={currentCity.image}
                        alt={`${currentCity.name} city skyline`}
                        fill
                        sizes="(max-width: 768px) 100vw, 1024px"
                        className="object-cover"
                        priority={currentCityIndex === 0}
                        onError={() => setCityImageUnavailable(true)}
                      />
                    </motion.div>
                  </AnimatePresence>
                )}
                {cityImageUnavailable && (
                  <div
                    className="absolute inset-0 flex items-end justify-center gap-2 px-8 pt-12"
                    aria-label={`${currentCity.name} branch image`}
                    role="img"
                  >
                    {[28, 44, 34, 58, 40, 68, 46, 55, 33, 48, 62, 38, 52].map((height, index) => (
                      <div
                        key={`${currentCity.name}-${index}`}
                        className="w-full max-w-14 rounded-t-md border border-white/50 bg-sky-800/70 shadow-sm"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-slate-700/50 to-transparent" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/5 to-transparent" />

                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm sm:left-5 sm:top-5">
                  {currentCityIndex + 1} / {branchCities.length} cities
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentCityIndex((index) => (index - 1 + branchCities.length) % branchCities.length);
                    setCityImageUnavailable(false);
                  }}
                  aria-label="Show previous city"
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow transition hover:bg-white sm:left-5 sm:h-11 sm:w-11 cursor-pointer"
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentCityIndex((index) => (index + 1) % branchCities.length);
                    setCityImageUnavailable(false);
                  }}
                  aria-label="Show next city"
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow transition hover:bg-white sm:right-5 sm:h-11 sm:w-11 cursor-pointer"
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>

                <div className="absolute inset-x-0 bottom-0 px-6 pb-5 text-center text-white sm:pb-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85 sm:text-xs">
                    Expanding Across India
                  </p>
                  <p className="mt-1 text-3xl font-extrabold sm:text-5xl">{currentCity.name}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
                <div>
                  <h2 className="text-xl font-bold text-brand-navy sm:text-2xl">{currentCity.name}</h2>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500 sm:text-sm">
                    <MapPin size={14} aria-hidden="true" />
                    {currentCity.name}, India
                  </p>
                  <p className="mt-1 text-xs font-semibold text-amber-700 sm:text-sm">
                    Coming Soon · Stay Updated
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <div className="flex max-w-[220px] flex-wrap items-center justify-end gap-1.5">
                    {branchCities.map((city, index) => (
                      <button
                        key={city.name}
                        type="button"
                        onClick={() => {
                          setCurrentCityIndex(index);
                          setCityImageUnavailable(false);
                        }}
                        aria-label={`Show ${city.name}`}
                        aria-current={currentCityIndex === index ? 'true' : undefined}
                        className={`h-2.5 rounded-full transition-all cursor-pointer ${
                          currentCityIndex === index
                            ? 'w-6 bg-sky-500'
                            : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-600 sm:text-xs">
                Pan-India Expansion · {branchCities.length} Cities
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-600 sm:text-sm"
              >
                Contact Us
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="container relative z-10 mx-auto px-4 md:px-6 my-auto">
          <div className="max-w-3xl lg:max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.08] text-white drop-shadow-md">
                Build Your Dream.<br />
                <span className="text-brand-orange">We&apos;ll Build It Right.</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-100 mb-8 max-w-2xl leading-relaxed drop-shadow-sm font-normal">
                End-to-end construction solutions designed around your vision, budget and timeline — from the first blueprint to the final handover.
              </p>

              {/* Quick Project Consultation Accent Pill */}
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 flex items-center gap-2 drop-shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Quick Project Consultation
                </p>
                <p className="text-xs sm:text-sm text-slate-200 drop-shadow-sm">
                  Transparent Estimation • Dedicated Civil Team • 400+ Quality Checks
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(true)}
                  className="px-8 py-3.5 bg-brand-orange text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-500/30 flex items-center cursor-pointer group"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <Link
                  href="/services"
                  className="px-8 py-3.5 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 backdrop-blur-md transition-all border border-white/30 shadow-lg"
                >
                  Explore Our Services
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/25 max-w-3xl">
                {[
                  'Transparent Pricing',
                  'Quality Construction',
                  'Professional Team',
                  'End-to-End Support',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center text-xs sm:text-sm font-semibold text-white drop-shadow-sm">
                    <CheckCircle2 className="text-brand-orange w-4 h-4 mr-2 shrink-0 drop-shadow" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* =========================================================================
          BOTTOM SLIDER INDICATOR (Houses + Upcoming Places)
          ========================================================================= */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 pb-2">
        {/* Bottom Slide Indicators: House Slides + Upcoming Places */}
        <div className="flex items-center justify-center gap-2">
          {houseImages.map((house, idx) => (
            <button
              key={house.title}
              type="button"
              onClick={() => goToHouse(idx)}
              aria-label={`Go to house slide ${idx + 1}: ${house.title}`}
              className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                !showingBranches && currentHouseIndex === idx
                  ? 'w-10 bg-brand-orange shadow-md shadow-brand-orange/50'
                  : showingBranches
                  ? 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  : 'w-2.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}

          {/* Indicator for Upcoming Places / Branches */}
          <button
            type="button"
            onClick={goToBranches}
            aria-label="Show upcoming branches (places)"
            className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer flex items-center justify-center ${
              showingBranches
                ? 'w-10 bg-sky-500 shadow-md shadow-sky-500/50'
                : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        </div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </section>
  );
}