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
  const [isBranchCarouselPaused, setIsBranchCarouselPaused] = useState(false);

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

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const isBranchesSlide = currentSlide === heroImages.length;
  const currentCity = branchCities[currentCityIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentSlide < heroImages.length) {
        setCurrentSlide((prev) => prev + 1);
      } else if (!isBranchCarouselPaused) {
        setCurrentCityIndex((prev) => (prev + 1) % branchCities.length);
      }
    }, 6000);

    return () => clearInterval(timer);
  }, [currentSlide, currentCityIndex, isBranchCarouselPaused, heroImages.length]);

  return (
    <section
      id="home"
      className={`relative flex min-h-screen items-center overflow-hidden pt-20 ${
        isBranchesSlide ? 'bg-slate-100' : 'bg-brand-charcoal'
      }`}
    >
      <div className="absolute inset-0 z-0">
        {!isBranchesSlide && (
          <>
            <div className="absolute inset-0 z-10 bg-brand-navy/70 mix-blend-multiply" />
            {heroImages.map((img, idx) => (
              <motion.img
                key={img.url}
                src={img.url}
                alt={img.alt}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                  opacity: currentSlide === idx ? 1 : 0,
                  scale: currentSlide === idx ? 1 : 1.05,
                }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ))}
          </>
        )}
      </div>

      {isBranchesSlide ? (
        <div className="container relative z-20 mx-auto px-4 py-10 md:px-6 md:py-14">
          <div className="mx-auto max-w-5xl">
            <header className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                <MapPin size={23} aria-hidden="true" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-600">
                Pan-India Expansion
              </p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
                Upcoming Branches
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                We&apos;re growing across India. Explore the cities where we&apos;re planning to welcome you next.
              </p>
            </header>

            <div
              className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/80 sm:rounded-3xl"
              aria-roledescription="carousel"
              aria-label="Upcoming branch locations"
            >
              <div className="relative aspect-[16/10] sm:aspect-[2.1/1]">
                <Image
                  src={currentCity.image}
                  alt={`${currentCity.name} city skyline`}
                  fill
                  sizes="(max-width: 768px) 100vw, 1024px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />

                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm sm:left-6 sm:top-6">
                  {currentCityIndex + 1} / {branchCities.length} cities
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentCityIndex((prev) => (prev - 1 + branchCities.length) % branchCities.length)
                  }
                  aria-label="Show previous city"
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow transition hover:bg-white sm:left-5 sm:h-12 sm:w-12"
                >
                  <ArrowLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentCityIndex((prev) => (prev + 1) % branchCities.length)}
                  aria-label="Show next city"
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow transition hover:bg-white sm:right-5 sm:h-12 sm:w-12"
                >
                  <ArrowRight size={20} aria-hidden="true" />
                </button>

                <div className="absolute inset-x-0 bottom-0 px-6 pb-6 text-center text-white sm:pb-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/85">
                    Expanding Across India
                  </p>
                  <p className="mt-1 text-3xl font-extrabold sm:text-5xl">{currentCity.name}</p>
                </div>
              </div>

              <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-5">
                <div>
                  <h2 className="text-2xl font-bold text-brand-navy">{currentCity.name}</h2>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin size={15} aria-hidden="true" />
                    {currentCity.name}, India
                  </p>
                  <p className="mt-2 text-sm font-semibold text-amber-700">
                    Coming Soon · Stay Updated
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setIsBranchCarouselPaused((paused) => !paused)}
                    aria-label={isBranchCarouselPaused ? 'Play city slideshow' : 'Pause city slideshow'}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    {isBranchCarouselPaused ? (
                      <Play size={16} aria-hidden="true" />
                    ) : (
                      <Pause size={16} aria-hidden="true" />
                    )}
                  </button>
                  <div className="flex max-w-[240px] flex-wrap items-center justify-end gap-1.5">
                    {branchCities.map((city, index) => (
                      <button
                        key={city.name}
                        type="button"
                        onClick={() => setCurrentCityIndex(index)}
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

            <div className="mt-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-600">
                Pan-India Expansion · {branchCities.length} Cities · Stay Updated
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-sky-600"
              >
                Contact Us
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
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
                    onClick={() => setCurrentSlide(dotIdx)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentSlide === dotIdx
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
