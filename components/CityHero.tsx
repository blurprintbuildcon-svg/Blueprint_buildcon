'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  User,
  MapPin,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ShieldCheck,
  Building,
  Check,
  Sparkles,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { CityDetail } from '@/data/cityData';
import { getWhatsAppNumber, openWhatsApp } from '@/lib/whatsapp';

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
  React.useEffect(() => {
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
    <section className="relative w-full min-h-[620px] lg:min-h-[720px] overflow-hidden flex items-center py-12 lg:py-20 border-b border-slate-200">
      {/* Full Page Hero Banner Image Background */}
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
        
        {/* Soft light multi-stop gradient for clear text readability while showing the full background image */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40 md:via-white/70 md:to-transparent lg:from-white/95 lg:via-white/55 lg:to-transparent" />
        {/* Additional subtle vertical gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/30 lg:from-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle & Value Badges */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* City Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/90 border border-orange-200 text-orange-700 text-xs sm:text-sm font-semibold mb-3.5 backdrop-blur-xs w-fit">
              <MapPin size={14} className="text-[#F95700]" />
              <span>Premier Construction in {city.name}, {city.state}</span>
            </div>
            
            {/* Main Title (matching reference Image 1) */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[56px] font-black text-slate-900 tracking-tight leading-[1.12]">
              Construction Company <br className="hidden sm:inline" />
              <span className="text-[#F95700]">in {city.name}</span>
            </h1>

            {/* Sub-headline stats badge (matching reference Image 1) */}
            <p className="mt-3.5 text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800">
              <span className="text-slate-900">{city.homesCount}</span>
              <span className="mx-3 text-slate-400 font-light">|</span>
              <span className="text-slate-900">{city.citiesCount}</span>
            </p>

            {/* Subtitle description */}
            <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-600 max-w-xl font-medium leading-relaxed">
              India’s trusted tech-driven construction partner. End-to-end turnkey civil construction, 3D architectural design, and 430+ digital quality checks.
            </p>

            {/* Key highlights / Value props row */}
            <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl">
              <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <ShieldCheck size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Warranty</span>
                </div>
                <p className="text-sm font-extrabold text-slate-900">10-Year Structural</p>
              </div>

              <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2 text-[#F95700] mb-1">
                  <Sparkles size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Quality</span>
                </div>
                <p className="text-sm font-extrabold text-slate-900">430+ Audits</p>
              </div>

              <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <Building size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Live Sites</span>
                </div>
                <p className="text-sm font-extrabold text-slate-900">{city.activeSites}</p>
              </div>
            </div>
          </div>

          {/* Right Column: "Talk to Our Expert" Form Card (matching reference Image 1) */}
          <div className="lg:col-span-5 w-full">
            <div
              id="expert-consultation-card"
              className="relative bg-white/98 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80 transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Talk to Our Expert
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Online
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mb-5">
                Get an instant estimate, floor plan ideas, and dedicated engineer callback within 20 minutes.
              </p>

              {isSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Consultation Booked!</h3>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">
                    Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our senior {city.name} project expert will call you on <span className="font-semibold text-slate-900">{formData.phone}</span> within 20 minutes.
                  </p>
                  
                  <div className="pt-2 flex flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={handleWhatsAppChat}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-md shadow-emerald-600/20"
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
                      className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2"
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
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F95700]/30 focus:border-[#F95700] text-sm sm:text-base font-medium transition-all bg-slate-50/70 hover:bg-white"
                      />
                    </div>
                  </div>

                  {/* Input: +91 Phone Number */}
                  <div>
                    <label htmlFor="client-phone" className="sr-only">
                      Phone Number
                    </label>
                    <div className="relative flex rounded-xl border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-[#F95700]/30 focus-within:border-[#F95700] transition-all bg-slate-50/70 hover:bg-white">
                      <div className="flex items-center gap-1.5 px-3 bg-slate-100/90 border-r border-slate-200 text-slate-700 text-sm font-semibold select-none">
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
                        className="w-full pl-10 pr-8 py-3.5 rounded-xl border border-slate-300 text-slate-900 text-sm sm:text-base font-medium bg-slate-50/70 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#F95700]/30 focus:border-[#F95700] transition-all appearance-none cursor-pointer"
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
                      className="w-full py-4 px-6 rounded-xl bg-[#F95700] hover:bg-[#E04E00] text-white font-bold text-base sm:text-lg transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span>Submitting Details...</span>
                        </>
                      ) : (
                        <span>Book Free Consultation</span>
                      )}
                    </button>
                  </div>

                  {/* Privacy Policy Disclaimer (matching reference Image 1) */}
                  <p className="text-[11px] sm:text-xs text-slate-500 text-center leading-relaxed">
                    By submitting, you agree to our{' '}
                    <Link href="/privacy-policy" className="text-orange-600 underline hover:text-orange-700">
                      privacy policy
                    </Link>
                    , allowing us to use your information as outlined.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
