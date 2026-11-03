'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  HelpCircle,
  Home,
  ReceiptText,
  Layers3,
  HardHat,
  BadgeCheck,
  Star,
  ChevronsUpDown,
  Building2,
  ArrowRight,
  PhoneCall,
  MapPin,
} from 'lucide-react';
import { CityDetail } from '@/data/cityData';
import CityHero from '@/components/CityHero';
import CityLocalitiesSection from '@/components/CityLocalitiesSection';
import ConstructionJourneySection from '@/components/ConstructionJourneySection';

interface CityLandingViewProps {
  city: CityDetail;
}

export default function CityLandingView({ city }: CityLandingViewProps) {
  const [selectedLocality, setSelectedLocality] = useState<string>('');
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]);

  // Sync city selection with navbar and localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('blueprint_selected_city', city.name);
      window.dispatchEvent(new CustomEvent('city-selected', { detail: city.name }));
    }
  }, [city.name]);

  const handleLocalitySelect = (locality: string) => {
    setSelectedLocality(locality);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const cityFaqs = [
    {
      q: `What is the average cost of house construction in ${city.name}?`,
      a: `In ${city.name}, turnkey construction starts from approximately ${city.avgPrice}. The final price depends on your chosen package (Classic, Premium, or Royale Luxury), soil structure, elevation complexity, and custom interior finishes. We provide an exact itemized Bill of Quantities (BOQ) with zero hidden variations before construction begins.`,
    },
    {
      q: `Do you manage municipal plan sanctions and approvals in ${city.name}?`,
      a: `Yes! Our in-house legal and architectural team coordinates the complete approval process with local civic authorities and municipal bodies in ${city.name}, including structural stability certifications, layout sanctions, electricity and water connections.`,
    },
    {
      q: `How do you ensure construction quality on site in ${city.name}?`,
      a: `Every project goes through 430+ digital quality checks covering excavation, steel rebar tensile testing, concrete cube crushing tests, brickwork alignment, electrical conduits, and anti-leakage waterproofing. You get daily 4K photo and video updates directly on our mobile client portal.`,
    },
    {
      q: `What warranty is provided after project handover?`,
      a: `We provide an industry-leading 10-Year Structural Warranty against cracks, soil settlement, and structural defects, plus 10-year waterproofing guarantees and complimentary scheduled post-handover maintenance visits.`,
    },
    {
      q: `Are payments milestone-based and protected?`,
      a: `Absolutely. You never pay upfront sums for incomplete work. Payments are broken down into transparent milestones tied strictly to physical work completed and verified on your site. You approve each stage before funds are released.`,
    },
  ];

  const allFaqsOpen = openFaqs.length === cityFaqs.length;
  const toggleAllFaqs = () => {
    if (allFaqsOpen) {
      setOpenFaqs([]);
    } else {
      setOpenFaqs(cityFaqs.map((_, i) => i));
    }
  };

  const trustCards = [
    {
      title: 'Rigorous Quality Checks',
      subtitle: '430+ digital checks across excavation, steel, concrete cube tests, and anti-leakage waterproofing.',
      icon: BadgeCheck,
      badge: 'Certified',
    },
    {
      title: 'Escrow Price Guarantee',
      subtitle: 'Zero cost escalation with transparent itemized BOQ contracts and milestone-based escrow payments.',
      icon: ReceiptText,
      badge: 'Protected',
    },
    {
      title: '10-Year Warranty',
      subtitle: 'Comprehensive 10-year structural guarantee, damp-proofing protection, and scheduled post-handover care.',
      icon: ShieldCheck,
      badge: 'Guaranteed',
    },
    {
      title: 'In-House Experts',
      subtitle: 'Full-time licensed architects, structural engineers, and site supervisors — zero contractor outsourcing.',
      icon: HardHat,
      badge: 'Dedicated',
    },
  ];

  return (
    <div className="bg-white text-slate-800">
      {/* City Breadcrumb */}
      <div className="bg-slate-50/80 border-b border-slate-200/60 py-3 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-brand-navy transition-colors flex items-center gap-1">
            <Home size={13} className="text-slate-400" />
            <span>Home</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">Locations</span>
          <span className="text-slate-300">/</span>
          <span className="text-brand-orange font-bold flex items-center gap-1">
            <MapPin size={12} />
            {city.name}
          </span>
        </div>
      </div>

      {/* 1. Hero Section */}
      <CityHero
        city={city}
        selectedLocality={selectedLocality}
        onLocalitySelect={handleLocalitySelect}
      />

      {/* 2. Localities Grid Section */}
      <CityLocalitiesSection
        city={city}
        onSelectLocality={handleLocalitySelect}
      />

      {/* 3. The Construction Journey (Dark Obsidian Section) */}
      <ConstructionJourneySection cityName={city.name} />

      {/* 4. Why Choose BluePrint BuildCon in this City */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-slate-50/70 to-white border-b border-slate-200/80 relative overflow-hidden">
        {/* Subtle Ambient Decorative Glows */}
        <div className="absolute top-0 right-0 -mt-20 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4 border border-brand-orange/15 shadow-sm">
                <Sparkles size={14} className="shrink-0" />
                <span>The Blueprint Standard</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy leading-[1.12] mb-4">
                Why Homeowners in {city.name}{' '}
                <span className="relative inline-block text-brand-orange">
                  Trust Us
                  <span className="absolute -bottom-1.5 left-0 w-full h-1.5 bg-brand-orange/25 rounded-full" />
                </span>
              </h2>

              <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto">
                Guaranteed quality, zero delays, and transparent contracts with every home we build.
              </p>
            </motion.div>
          </div>

          {/* 4 Trust Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {trustCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(10,18,39,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-orange/50 hover:shadow-[0_16px_36px_rgba(10,18,39,0.08)]"
              >
                {/* Top Accent Line on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange to-amber-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white group-hover:scale-105 shadow-sm">
                      <card.icon size={22} strokeWidth={2} />
                    </div>
                    <span className="font-mono text-xs font-bold tracking-wider text-slate-300 transition-colors group-hover:text-brand-orange">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-orange transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {city.features[idx] || card.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {card.badge}
                  </span>
                  <CheckCircle2 size={16} className="text-emerald-500" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* City Stats Snapshot Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-14 rounded-3xl bg-gradient-to-r from-[#0a1227] via-[#0f1a38] to-[#0a1227] text-white p-7 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Glows inside Ribbon */}
            <div className="absolute top-0 left-1/4 w-72 h-36 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-72 h-36 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
              <div className="pt-4 md:pt-0">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-orange tracking-tight">
                  {city.projectsCompleted}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">
                  Homes Completed
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Across {city.name}</p>
              </div>

              <div className="pt-4 md:pt-0 md:pl-6">
                <div className="flex items-center justify-center gap-1.5">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                    {city.rating.split(' ')[0]}
                  </p>
                  <Star size={24} className="text-amber-400 fill-amber-400" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">
                  Verified Rating
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">{city.rating.split('(')[1]?.replace(')', '') || 'Google Verified'}</p>
              </div>

              <div className="pt-4 md:pt-0 md:pl-6">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-400 tracking-tight">
                  10-Year
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">
                  Structural Warranty
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Legal Guarantee Bond</p>
              </div>

              <div className="pt-4 md:pt-0 md:pl-6">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-cyan-400 tracking-tight">
                  430+
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">
                  Quality Audit Points
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Tracked on Mobile App</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 5. City Specific Frequently Asked Questions */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        {/* Subtle Decorative Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          
          {/* Header */}
          <div className="text-center mb-12 sm:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4 border border-brand-orange/15 shadow-sm">
                <HelpCircle size={14} className="shrink-0" />
                <span>Clear &amp; Transparent Answers</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy tracking-tight mb-4">
                Frequently Asked Questions in {city.name}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                Clear answers regarding pricing, approvals, soil testing, and construction timelines.
              </p>

              {/* Expand / Collapse All Button */}
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={toggleAllFaqs}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:border-brand-orange/40 hover:text-brand-orange transition-all shadow-xs cursor-pointer"
                >
                  <ChevronsUpDown size={14} />
                  <span>{allFaqsOpen ? 'Collapse All Questions' : 'Expand All Questions'}</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* FAQ Accordion Items */}
          <div className="space-y-4">
            {cityFaqs.map((faq, i) => {
              const isOpen = openFaqs.includes(i);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
                    isOpen
                      ? 'border-brand-orange/60 shadow-md ring-1 ring-brand-orange/20'
                      : 'border-slate-200/90 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer font-bold text-brand-navy text-base sm:text-lg group"
                  >
                    <span className="group-hover:text-brand-orange transition-colors">
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-brand-orange text-white rotate-180 shadow-sm'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-brand-orange/10 group-hover:text-brand-orange'
                      }`}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/40">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Quick CTA Bottom Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 text-center p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-brand-orange/10 via-orange-50/40 to-slate-50 border border-brand-orange/25 shadow-sm relative overflow-hidden"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-12 right-12 h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent" />

            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight">
              Still have questions about building in {city.name}?
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-2.5 max-w-lg mx-auto leading-relaxed">
              Our {city.name} project managers and architects are available Monday through Saturday for customized estimates, floor plan ideas, and free site surveys.
            </p>
            
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => {
                  const formElement = document.getElementById('expert-consultation-card');
                  if (formElement) formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="group relative overflow-hidden px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-orange-hover text-white font-bold text-sm sm:text-base shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/35 transition-all duration-300 active:scale-[0.99] flex items-center gap-2 cursor-pointer"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
                <PhoneCall size={16} />
                <span>Talk to Our {city.name} Expert</span>
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-brand-navy font-bold text-sm sm:text-base border border-slate-300 shadow-xs hover:border-brand-navy/40 transition-all duration-200"
              >
                Visit Our Office
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
