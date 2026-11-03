'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Phone,
  User,
  MapPin,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ShieldCheck,
  Building,
  Sparkles,
  ArrowRight,
  Loader2,
  Award,
  Check,
} from 'lucide-react';
import { CityDetail } from '@/data/cityData';
import { openWhatsApp } from '@/lib/whatsapp';

interface CityHeroProps {
  city: CityDetail;
  onLocalitySelect?: (locality: string) => void;
  selectedLocality?: string;
}

export default function CityHero({ city, selectedLocality = '' }: CityHeroProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: selectedLocality || city.name,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Update form location if parent updates selectedLocality
  useEffect(() => {
    if (selectedLocality) {
      setFormData((prev) => ({ ...prev, location: selectedLocality }));
    }
  }, [selectedLocality]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        location: `${formData.location}, ${city.name}`,
        projectType: 'Turnkey Residential / Villa Construction',
        propertyStatus: 'Plot Owned / Exploring Construction',
        budget: '₹30 Lakhs – ₹1 Crore',
        service: 'End-to-End Civil & Architectural Construction',
        message: `Booked free consultation from ${city.name} landing page. Preferred locality: ${formData.location}`,
      };

      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit enquiry. Please try again.');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again or WhatsApp us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppChat = () => {
    const text = `Hi BluePrint BuildCon! I am interested in building a home in ${city.name} (${formData.location || city.name}). Please share cost estimation and consultation details. Name: ${formData.name || 'Client'}, Phone: ${formData.phone || 'N/A'}`;
    openWhatsApp(text);
  };

  return (
    <section className="relative w-full min-h-[660px] lg:min-h-[740px] overflow-hidden flex items-center py-12 lg:py-20 border-b border-slate-200/80 bg-brand-gray/50">
      {/* Background Architectural Photo with Refined Multi-Stop Vignette */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={city.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85'}
          alt={`Construction Company in ${city.name}`}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center lg:object-[center_35%]"
        />

        {/* Soft multi-layered gradient backdrop for perfect legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 md:via-white/85 md:to-transparent lg:from-white/98 lg:via-white/80 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40 lg:from-white/60" />

        {/* Subtle warm architectural ambient blur matching overall website */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Badges, Metrics & Value Props */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Top Tag Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 border border-brand-orange/20 shadow-xs backdrop-blur-md w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange" />
              </span>
              <MapPin size={14} className="text-brand-orange" />
              <span>Top-Rated Construction Company in {city.name}</span>
            </motion.div>
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[56px] font-extrabold text-brand-navy tracking-tight leading-[1.12]">
              Construction Company <br className="hidden sm:inline" />
              <span className="text-brand-orange">in {city.name}</span>
            </h1>

            {/* Sub-headline stats badge */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight">
                {city.homesCount}
              </span>
              <span className="text-slate-300 font-light text-2xl">|</span>
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight">
                {city.citiesCount}
              </span>
            </div>

            {/* Subtitle description */}
            <p className="mt-3.5 text-sm sm:text-base md:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
              India’s trusted tech-driven construction partner. End-to-end turnkey civil construction, 3D architectural design, and 430+ digital quality checks.
            </p>

            {/* 3 Value Cards */}
            <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5 max-w-xl">
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2 text-emerald-600 mb-1.5">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <ShieldCheck size={16} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">On-Time</span>
                </div>
                <p className="text-sm font-extrabold text-brand-navy">100% Guaranteed</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Delay penalty clause</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-brand-orange/40 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2 text-brand-orange mb-1.5">
                  <div className="p-1.5 rounded-lg bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <Award size={16} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Warranty</span>
                </div>
                <p className="text-sm font-extrabold text-brand-navy">10-Year Quality</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Structural & damp-proof</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all col-span-2 sm:col-span-1 group"
              >
                <div className="flex items-center gap-2 text-blue-600 mb-1.5">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Sparkles size={16} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Live Tracking</span>
                </div>
                <p className="text-sm font-extrabold text-brand-navy">430+ Checks</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{city.activeSites}</p>
              </motion.div>
            </div>

            {/* Quick trust markers row */}
            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-emerald-600" />
                Zero Cost Escalation
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-emerald-600" />
                Milestone Escrow Security
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-emerald-600" />
                Free Soil & Site Survey
              </span>
            </div>
          </motion.div>

          {/* Right Column: "Talk to Our Expert" Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 w-full"
          >
            <div
              id="expert-consultation-card"
              className="relative bg-white/98 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(10,18,39,0.14)] border border-white/90 ring-1 ring-slate-900/5 transition-all duration-300"
            >
              {/* Top brand accent bar */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent rounded-full" />

              {/* Card Header */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl sm:text-[28px] font-extrabold text-brand-navy tracking-tight">
                  Talk to Our Expert
                </h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/80 shadow-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Online
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mb-5 leading-relaxed">
                Get an instant estimate, floor plan ideas, and dedicated engineer callback within 20 minutes.
              </p>

              {isSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy">Consultation Booked!</h3>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">
                    Thank you, <span className="font-semibold text-brand-navy">{formData.name}</span>. Our senior {city.name} project expert will call you on <span className="font-semibold text-brand-navy">{formData.phone}</span> within 20 minutes.
                  </p>
                  
                  <div className="pt-2 flex flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={handleWhatsAppChat}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md shadow-emerald-600/20 active:scale-[0.99] cursor-pointer"
                    >
                      <MessageCircle size={18} />
                      <span>Chat on WhatsApp Directly</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({ name: '', phone: '', location: city.name });
                      }}
                      className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2 cursor-pointer pt-1"
                    >
                      Book another consultation
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Input: Name */}
                  <div>
                    <label htmlFor="client-name" className="sr-only">
                      Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User size={18} />
                      </div>
                      <input
                        id="client-name"
                        type="text"
                        required
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300/90 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange text-sm sm:text-base font-medium transition-all bg-slate-50/70 hover:bg-white"
                      />
                    </div>
                  </div>

                  {/* Input: +91 Phone Number */}
                  <div>
                    <label htmlFor="client-phone" className="sr-only">
                      Phone Number
                    </label>
                    <div className="relative flex rounded-xl border border-slate-300/90 overflow-hidden focus-within:ring-2 focus-within:ring-brand-orange/30 focus-within:border-brand-orange transition-all bg-slate-50/70 hover:bg-white">
                      <div className="flex items-center gap-1.5 px-3.5 bg-slate-100/90 border-r border-slate-200 text-slate-700 text-sm font-semibold select-none">
                        <span className="text-base">🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <input
                        id="client-phone"
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setFormData({ ...formData, phone: val });
                        }}
                        className="w-full px-3.5 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm sm:text-base font-medium bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Input: Location of your Plot - City* */}
                  <div>
                    <label htmlFor="client-location" className="block text-xs font-semibold text-slate-600 mb-1">
                      Location of your Plot - City*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <MapPin size={18} />
                      </div>
                      <select
                        id="client-location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full pl-10 pr-8 py-3.5 rounded-xl border border-slate-300/90 text-slate-900 text-sm sm:text-base font-medium bg-slate-50/70 hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all appearance-none cursor-pointer"
                      >
                        <option value={city.name}>{city.name} (All Regions)</option>
                        {city.localities.map((loc) => (
                          <option key={loc} value={`${loc}, ${city.name}`}>
                            {loc}, {city.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full overflow-hidden py-4 px-6 rounded-xl bg-gradient-to-r from-brand-orange via-orange-500 to-brand-orange-hover hover:from-brand-orange-hover hover:to-orange-700 text-white font-bold text-base sm:text-lg transition-all duration-300 shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/40 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {/* Button shimmer light reflection */}
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span>Submitting Details...</span>
                        </>
                      ) : (
                        <>
                          <span>Book Free Consultation</span>
                          <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Privacy & Guarantee Disclaimers */}
                  <div className="pt-1 text-center space-y-1.5">
                    <p className="text-[11px] text-slate-500">
                      🔒 100% Privacy Guarantee • Zero Spam • Free Plot Inspection
                    </p>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      By submitting, you agree to our{' '}
                      <Link href="/privacy-policy" className="text-brand-orange underline hover:text-brand-orange-hover">
                        privacy policy
                      </Link>
                      , allowing us to use your information as outlined.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
