'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Search, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { CityDetail } from '@/data/cityData';

interface CityLocalitiesSectionProps {
  city: CityDetail;
  onSelectLocality?: (locality: string) => void;
}

export default function CityLocalitiesSection({ city, onSelectLocality }: CityLocalitiesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const filteredLocalities = useMemo(() => {
    if (!searchQuery.trim()) return city.localities;
    return city.localities.filter((loc) =>
      loc.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  }, [city.localities, searchQuery]);

  const handleLocalityClick = (locality: string) => {
    setSelectedItem(locality);
    if (onSelectLocality) {
      onSelectLocality(locality);
    }

    // Smooth scroll to the hero consultation form
    const formElement = document.getElementById('expert-consultation-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Flash highlight the card
      formElement.classList.add('ring-4', 'ring-brand-orange/50');
      setTimeout(() => {
        formElement.classList.remove('ring-4', 'ring-brand-orange/50');
      }, 1500);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-slate-100">
      {/* Background subtle light grid pattern */}
      <div className="absolute inset-0 bg-blueprint-grid-light opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3 border border-brand-orange/20 shadow-xs">
              <Building2 size={13} className="text-brand-orange" />
              <span>Neighbourhood Coverage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-brand-navy tracking-tight leading-tight">
              Where in {city.name} are you building?
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-500 font-normal max-w-2xl">
              Pick your area to see local projects, pricing and site teams.
            </p>
          </motion.div>

          {/* Quick Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full md:w-72 relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search locality..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/80 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all hover:bg-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </motion.div>
        </div>

        {/* Localities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 md:gap-5">
          {filteredLocalities.map((locality, idx) => {
            const isChosen = selectedItem === locality;
            return (
              <motion.div
                key={locality}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.4) }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                onClick={() => handleLocalityClick(locality)}
                className={`group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border transition-all duration-300 cursor-pointer select-none ${
                  isChosen
                    ? 'border-brand-orange ring-2 ring-brand-orange/30 shadow-md bg-brand-orange/5'
                    : 'border-slate-200/90 hover:border-brand-orange/70 shadow-xs hover:shadow-lg hover:shadow-brand-orange/5'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      isChosen
                        ? 'bg-brand-orange scale-125'
                        : 'bg-slate-300 group-hover:bg-brand-orange group-hover:scale-125'
                    }`}
                  />
                  <div>
                    <span className="text-base sm:text-lg font-bold text-slate-800 group-hover:text-brand-navy transition-colors block leading-snug">
                      {locality}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 group-hover:text-brand-orange transition-colors">
                      Active site team &amp; survey
                    </span>
                  </div>
                </div>

                {/* Circular Orange Arrow Button */}
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 shrink-0 ${
                    isChosen
                      ? 'bg-brand-orange text-white border-brand-orange shadow-md shadow-brand-orange/30 scale-105'
                      : 'bg-brand-orange/10 text-brand-orange border-brand-orange/20 group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange group-hover:shadow-md group-hover:shadow-brand-orange/30 group-hover:scale-110'
                  }`}
                >
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredLocalities.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-sm font-semibold text-slate-700">No locality found matching &ldquo;{searchQuery}&rdquo;</p>
            <p className="text-xs text-slate-500 mt-1">We still construct everywhere in {city.name}. Contact us below.</p>
            <button
              type="button"
              onClick={() => handleLocalityClick(city.name)}
              className="mt-3 px-4 py-2 rounded-xl bg-brand-orange text-white text-xs font-bold hover:bg-brand-orange-hover transition-colors cursor-pointer"
            >
              Consult for {city.name}
            </button>
          </div>
        )}

        {/* Bottom Banner Note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-50 via-brand-orange/5 to-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0">
              <MapPin size={18} />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Building in another locality in <span className="font-bold text-brand-navy">{city.name}</span> or outskirts? We cover all municipal &amp; suburban development plots.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleLocalityClick(city.name)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-orange hover:text-brand-orange-hover whitespace-nowrap group cursor-pointer"
          >
            <span>Choose My Specific Location</span>
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
