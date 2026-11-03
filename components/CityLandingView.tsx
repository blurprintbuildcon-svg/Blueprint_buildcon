'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  PhoneCall,
  MapPin,
  Building2,
  ChevronDown,
  HelpCircle,
  FileCheck,
  ArrowRight,
  Home,
  Briefcase,
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
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  return (
    <div className="bg-white">
      {/* City Breadcrumb */}
      <div className="bg-slate-100/70 border-b border-slate-200/60 py-2.5 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-slate-900 transition-colors flex items-center gap-1">
            <Home size={13} />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-slate-500">Locations</span>
          <span>/</span>
          <span className="text-[#F95700] font-bold">{city.name}</span>
        </div>
      </div>

      {/* 1. Hero Section (matching reference Image 1) */}
      <CityHero
        city={city}
        selectedLocality={selectedLocality}
        onLocalitySelect={handleLocalitySelect}
      />

      {/* 2. Localities Grid Section (matching reference Image 2) */}
      <CityLocalitiesSection
        city={city}
        onSelectLocality={handleLocalitySelect}
      />

      {/* 3. The 7-Step Construction Journey (matching reference Images 3, 4, 5) */}
      <ConstructionJourneySection cityName={city.name} />

      {/* 4. Why Choose BluePrint BuildCon in this City */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Homeowners in {city.name} Trust Us
            </h2>
            <p className="mt-2 text-base text-slate-500">
              Guaranteed quality, zero delays, and transparent contracts with every home we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {city.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F95700] flex items-center justify-center font-bold text-lg mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {idx === 0 && 'Rigorous Quality Checks'}
                  {idx === 1 && 'Escrow Price Guarantee'}
                  {idx === 2 && '10-Year Warranty'}
                  {idx === 3 && 'In-House Experts'}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>

          {/* City Stats Snapshot */}
          <div className="mt-12 rounded-3xl bg-slate-900 text-white p-6 sm:p-10 flex flex-wrap items-center justify-around gap-6 border border-slate-800">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-black text-[#F95700]">{city.projectsCompleted}</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Homes Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-black text-white">{city.rating.split(' ')[0]}</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{city.rating.split(' ')[1] || 'Rating'}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">10-Year</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Structural Warranty</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-black text-cyan-400">430+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Quality Inspection Points</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. City Specific Frequently Asked Questions */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions in {city.name}
            </h2>
            <p className="mt-2 text-base text-slate-500">
              Clear answers regarding pricing, approvals, soil testing, and construction timelines.
            </p>
          </div>

          <div className="space-y-3.5">
            {cityFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all bg-white hover:border-slate-300"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer font-bold text-slate-900 text-base sm:text-lg"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`text-[#F95700] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick CTA Bottom */}
          <div className="mt-12 text-center p-8 rounded-3xl bg-orange-50 border border-orange-200">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Still have questions about building in {city.name}?
            </h3>
            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
              Our {city.name} project managers and architects are ready to assist with customized estimates and site surveys.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const formElement = document.getElementById('expert-consultation-card');
                  if (formElement) formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="px-6 py-3 rounded-xl bg-[#F95700] hover:bg-[#E04E00] text-white font-bold text-sm sm:text-base shadow-md transition-colors"
              >
                Talk to Our {city.name} Expert
              </button>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-300 shadow-xs transition-colors"
              >
                Visit Our Office
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

