'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Pause, Play } from 'lucide-react';
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

export default function HeroSection() {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [showingBranches, setShowingBranches] = useState(false);
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [isBranchSlideshowPaused, setIsBranchSlideshowPaused] = useState(false);
  const [cityImageUnavailable, setCityImageUnavailable] = useState(false);

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
  const currentCity = branchCities[currentCityIndex];

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('hero-branches-visibility', { detail: showingBranches }));

    return () => {
      window.dispatchEvent(new CustomEvent('hero-branches-visibility', { detail: false }));
    };
  }, [showingBranches]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!showingBranches) {
        if (currentImageIndex === heroImages.length - 1) {
          setShowingBranches(true);
          setCurrentCityIndex(0);
          setCityImageUnavailable(false);
        } else {
          setCurrentImageIndex((prev) => prev + 1);
        }
      } else if (!isBranchSlideshowPaused) {
        if (currentCityIndex === branchCities.length - 1) {
          setShowingBranches(false);
          setCurrentImageIndex(0);
        } else {
          setCurrentCityIndex((prev) => prev + 1);
          setCityImageUnavailable(false);
        }
      }
    }, showingBranches ? 5000 : 6000);

    return () => clearInterval(timer);
  }, [currentCityIndex, currentImageIndex, heroImages.length, isBranchSlideshowPaused, showingBranches]);

  return (
    <section
      id="home"
      className={`relative flex min-h-screen items-center overflow-hidden pt-20 ${
        showingBranches ? 'bg-slate-100' : 'bg-brand-charcoal'
      }`}
    >
      <div className="absolute inset-0 z-0">
        {!showingBranches && (
          <>
            <div className="absolute inset-0 z-10 bg-brand-navy/70 mix-blend-multiply" />
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
                className="absolute inset-0 h-full w-full object-cover"
              />
            ))}
          </>
        )}
      </div>

      {showingBranches ? (
        <div className="container relative z-20 mx-auto px-4 py-8 md:px-6 md:py-10">
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
              className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/80 sm:rounded-3xl"
              aria-roledescription="carousel"
              aria-label="Upcoming branch locations"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-sky-200 via-blue-100 to-amber-100 sm:aspect-[2.6/1]">
                {!cityImageUnavailable && (
                  <Image
                    key={currentCity.image}
                    src={currentCity.image}
                    alt={`${currentCity.name} city skyline`}
                    fill
                    sizes="(max-width: 768px) 100vw, 1024px"
                    className="object-cover"
                    onError={() => setCityImageUnavailable(true)}
                  />
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
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow transition hover:bg-white sm:left-5 sm:h-11 sm:w-11"
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
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow transition hover:bg-white sm:right-5 sm:h-11 sm:w-11"
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
                  <button
                    type="button"
                    onClick={() => setIsBranchSlideshowPaused((paused) => !paused)}
                    aria-label={isBranchSlideshowPaused ? 'Play city slideshow' : 'Pause city slideshow'}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    {isBranchSlideshowPaused ? (
                      <Play size={15} aria-hidden="true" />
                    ) : (
                      <Pause size={15} aria-hidden="true" />
                    )}
                  </button>
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
                        className={`h-2.5 rounded-full transition-all ${
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

            <div className="mt-4 flex items-center justify-center gap-2" aria-label="Hero slide navigation">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to hero slide ${index + 1}`}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setShowingBranches(false);
                  }}
                  className="h-2 w-2 rounded-full bg-slate-300 transition hover:bg-slate-500"
                />
              ))}
              <button
                type="button"
                aria-label="Show upcoming branches"
                aria-current="true"
                onClick={() => {
                  setCurrentCityIndex(0);
                  setCityImageUnavailable(false);
                }}
                className="h-2 w-8 rounded-full bg-brand-orange"
              />
            </div>
          </div>
        </div>
      ) : (
      <div className="container relative z-20 mx-auto px-4 py-12 md:px-6 lg:py-24">
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
                {Array.from({ length: heroImages.length + 1 }, (_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    aria-label={dotIdx === heroImages.length ? 'Show upcoming branches' : `Go to slide ${dotIdx + 1}`}
                    onClick={() => {
                      if (dotIdx === heroImages.length) {
                        setCurrentCityIndex(0);
                        setCityImageUnavailable(false);
                        setShowingBranches(true);
                      } else {
                        setCurrentImageIndex(dotIdx);
                      }
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      (showingBranches && dotIdx === heroImages.length) ||
                      (!showingBranches && currentImageIndex === dotIdx)
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
      )}

      {/* REPLACED MODAL FORM (MATCHES SCREENSHOT 1 & 2 UI WITH CIVIL CONSTRUCTION FIELDS) */}
      <ConsultationModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </section>
  );
}
