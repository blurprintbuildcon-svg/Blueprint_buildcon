'use client';

import React from 'react';
import { ArrowRight, MapPin, Building, Sparkles } from 'lucide-react';
import { CityDetail } from '@/data/cityData';

interface CityLocalitiesSectionProps {
  city: CityDetail;
  onSelectLocality?: (locality: string) => void;
}

export default function CityLocalitiesSection({ city, onSelectLocality }: CityLocalitiesSectionProps) {
  const handleLocalityClick = (locality: string) => {
    if (onSelectLocality) {
      onSelectLocality(locality);
    }

    // Smooth scroll to the hero consultation form
    const formElement = document.getElementById('expert-consultation-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Flash highlight the card
      formElement.classList.add('ring-4', 'ring-[#0052FF]/50');
      setTimeout(() => {
        formElement.classList.remove('ring-4', 'ring-[#0052FF]/50');
      }, 1500);
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header (matching reference Image 2) */}
        <div className="mb-8 sm:mb-12 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Where in {city.name} are you building?
          </h2>
          <p className="mt-2 text-base sm:text-lg text-slate-500 font-normal">
            Pick your area to see local projects, pricing and site teams.
          </p>
        </div>

        {/* Localities Grid (matching reference Image 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 md:gap-5">
          {city.localities.map((locality) => (
            <div
              key={locality}
              onClick={() => handleLocalityClick(locality)}
              className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#0052FF]/60 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer select-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-[#0052FF] transition-colors" />
                <span className="text-base sm:text-lg font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                  {locality}
                </span>
              </div>

              {/* Circular Orange Arrow Button (matching reference Image 2) */}
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-blue-50 text-[#0052FF] border border-blue-100/80 transition-all duration-200 group-hover:bg-[#0052FF] group-hover:text-white group-hover:scale-110 shrink-0">
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner note */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <MapPin size={18} className="text-[#0052FF] shrink-0" />
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Building in another locality in {city.name} or suburbs? We cover all registered municipal & suburban development plots.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleLocalityClick(city.name)}
            className="text-xs sm:text-sm font-bold text-[#0052FF] hover:text-[#0042EC] whitespace-nowrap underline underline-offset-4 cursor-pointer"
          >
            Check My Specific Location &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}

