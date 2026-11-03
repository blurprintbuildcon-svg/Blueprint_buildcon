'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  PhoneCall,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ConstructionJourneySectionProps {
  cityName?: string;
  onBookClick?: () => void;
}

export default function ConstructionJourneySection({
  cityName = 'your city',
  onBookClick,
}: ConstructionJourneySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 360; // Card width + gap
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(checkScroll, 350);
  };

  const scrollToForm = () => {
    if (onBookClick) {
      onBookClick();
      return;
    }
    const formElement = document.getElementById('expert-consultation-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      formElement.classList.add('ring-4', 'ring-[#0052FF]/50');
      setTimeout(() => {
        formElement.classList.remove('ring-4', 'ring-[#0052FF]/50');
      }, 1500);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#080B11] text-white overflow-hidden border-b border-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Row: Title & Subtitle on Left, Left/Right Navigation Buttons on Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-400 text-xs sm:text-sm font-semibold mb-3 border border-white/15">
              <Sparkles size={14} />
              <span>The Transparent Blueprint Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              How Your Home Gets Built in {cityName}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              From your very first 20-minute consultation call to receiving the keys with a 10-year warranty — 7 clear, tracked steps.
            </p>
          </div>

          {/* Left and Right Scroll Navigation Buttons */}
          <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll steps left"
              className={`h-11 w-11 sm:h-12 sm:w-12 rounded-full border flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 shadow-md active:scale-95 cursor-pointer'
                  : 'border-white/10 bg-white/5 text-white/30 cursor-not-allowed opacity-40'
              }`}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll steps right"
              className={`h-11 w-11 sm:h-12 sm:w-12 rounded-full border flex items-center justify-center transition-all ${
                canScrollRight
                  ? 'border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 shadow-md active:scale-95 cursor-pointer'
                  : 'border-white/10 bg-white/5 text-white/30 cursor-not-allowed opacity-40'
              }`}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* All 7 Cards in One Line (Horizontal Scroll) */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* STEP 01 */}
          <div className="shrink-0 w-[290px] sm:w-[330px] md:w-[350px] group rounded-3xl bg-[#0F141E] border border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
            <div>
              <span className="text-4xl sm:text-5xl font-black text-white tracking-wider block mb-2 font-mono">
                01
              </span>
              <p className="text-sm sm:text-base font-normal text-slate-200 leading-relaxed min-h-[48px]">
                Fill out a short form and our team will call you within 20 minutes to begin.
              </p>
            </div>

            {/* Step 01 Graphic: Phone mockup displaying consultation form */}
            <div className="mt-6 relative pt-4 flex justify-center">
              <div className="relative w-[210px] sm:w-[220px] rounded-t-[30px] bg-slate-900 border-t-[5px] border-x-[5px] border-slate-700 shadow-2xl p-3 pb-6">
                <div className="w-14 h-2.5 bg-black rounded-full mx-auto mb-2.5" />
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2.5">
                  <span className="text-[10px] font-bold text-white tracking-wide">BluePrint BuildCon</span>
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px]">
                    <PhoneCall size={9} />
                  </div>
                </div>

                <div className="space-y-1.5 bg-slate-950/80 p-2.5 rounded-xl border border-white/5">
                  <p className="text-[10px] font-bold text-white">Talk to Our Expert</p>
                  <div className="h-5 rounded bg-slate-800/80 border border-slate-700/60 px-2 flex items-center text-[8px] text-slate-400">
                    Name
                  </div>
                  <div className="h-5 rounded bg-slate-800/80 border border-slate-700/60 px-2 flex items-center text-[8px] text-slate-400">
                    🇮🇳 +91 Mobile
                  </div>
                  <div className="h-5 rounded bg-slate-800/80 border border-slate-700/60 px-2 flex items-center justify-between text-[8px] text-slate-300">
                    <span>{cityName}</span>
                    <ChevronRight size={9} className="text-slate-500" />
                  </div>
                  <div className="h-6 rounded-md bg-[#0052FF] text-white flex items-center justify-center text-[8px] font-bold shadow-xs">
                    Book Free Consultation
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 02 */}
          <div className="shrink-0 w-[290px] sm:w-[330px] md:w-[350px] group rounded-3xl bg-[#0F141E] border border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
            <div>
              <span className="text-4xl sm:text-5xl font-black text-white tracking-wider block mb-2 font-mono">
                02
              </span>
              <p className="text-sm sm:text-base font-normal text-slate-200 leading-relaxed min-h-[48px]">
                Meet our technical expert and architect to discuss your needs and receive an initial quotation.
              </p>
            </div>

            {/* Step 02 Graphic: Architect & client meeting */}
            <div className="mt-6 relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 bg-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80"
                alt="Technical expert and architect discussing floor plan"
                fill
                unoptimized
                sizes="(max-width: 768px) 300px, 350px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-200 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                  Architectural Review
                </span>
                <span className="text-[11px] font-bold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-500/30">
                  Instant Quote
                </span>
              </div>
            </div>
          </div>

          {/* STEP 03 */}
          <div className="shrink-0 w-[290px] sm:w-[330px] md:w-[350px] group rounded-3xl bg-[#0F141E] border border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
            <div>
              <span className="text-4xl sm:text-5xl font-black text-white tracking-wider block mb-2 font-mono">
                03
              </span>
              <p className="text-sm sm:text-base font-normal text-slate-200 leading-relaxed min-h-[48px]">
                Pay a small token to confirm your booking and start pre-construction work.
              </p>
            </div>

            {/* Step 03 Graphic: Phone mockup with verified payment & calendar badge */}
            <div className="mt-6 relative pt-4 flex justify-center">
              <div className="relative w-[210px] sm:w-[220px] rounded-t-[30px] bg-gradient-to-b from-[#1C1613] to-slate-950 border-t-[5px] border-x-[5px] border-[#0052FF]/40 shadow-2xl p-4 pb-8 text-center">
                <div className="absolute -top-2.5 -right-1.5 bg-[#0052FF] text-white p-2 rounded-xl shadow-lg border-2 border-white/20 animate-pulse">
                  <Calendar size={15} />
                </div>

                <div className="w-14 h-2.5 bg-black rounded-full mx-auto mb-4" />

                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 border border-blue-400/40 flex items-center justify-center mx-auto mb-2.5">
                  <CheckCircle2 size={26} />
                </div>

                <p className="text-[11px] text-slate-400">Booking Confirmed</p>
                <p className="text-sm font-extrabold text-white mt-0.5">Token Received</p>
                <p className="text-[9px] text-emerald-400 mt-1 font-mono">Soil Test & Survey Dispatched</p>
              </div>
            </div>
          </div>

          {/* STEP 04 */}
          <div className="shrink-0 w-[290px] sm:w-[330px] md:w-[350px] group rounded-3xl bg-[#0F141E] border border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
            <div>
              <span className="text-4xl sm:text-5xl font-black text-white tracking-wider block mb-2 font-mono">
                04
              </span>
              <p className="text-sm sm:text-base font-normal text-slate-200 leading-relaxed min-h-[48px]">
                We survey your site, run tests, and create drawings and 3D models for your review.
              </p>
            </div>

            {/* Step 04 Graphic: Architect presenting 3D model */}
            <div className="mt-6 relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 bg-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
                alt="3D model and architectural blueprints on laptop"
                fill
                unoptimized
                sizes="(max-width: 768px) 300px, 350px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-200 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                  Soil & Site Survey
                </span>
                <span className="text-[11px] font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                  3D Render Ready
                </span>
              </div>
            </div>
          </div>

          {/* STEP 05 */}
          <div className="shrink-0 w-[290px] sm:w-[330px] md:w-[350px] group rounded-3xl bg-[#0F141E] border border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
            <div>
              <span className="text-4xl sm:text-5xl font-black text-white tracking-wider block mb-2 font-mono">
                05
              </span>
              <p className="text-sm sm:text-base font-normal text-slate-200 leading-relaxed min-h-[48px]">
                Sign a transparent contract with clear timelines and milestone-based payments.
              </p>
            </div>

            {/* Step 05 Graphic: Contract Agreement Clipboard */}
            <div className="mt-6 relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 bg-gradient-to-br from-[#1C1814] to-[#120F0D] p-3.5 flex flex-col justify-between">
              <div className="bg-slate-100 text-slate-900 rounded-xl p-3 shadow-xl border-t-4 border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-300 pb-1.5 mb-1.5">
                  <div className="flex items-center gap-1">
                    <FileText size={12} className="text-[#0052FF]" />
                    <span className="text-[10px] font-black tracking-wider uppercase text-slate-800">
                      Contract Agreement
                    </span>
                  </div>
                  <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">
                    Escrow Protected
                  </span>
                </div>
                <div className="space-y-0.5 text-[8px] text-slate-600 font-mono">
                  <p>• Fixed Timeline with Delay Penalty</p>
                  <p>• Itemized BOQ: No Cost Escalation</p>
                  <p>• Funds released on Milestone Approval</p>
                </div>
                <div className="mt-2 pt-1 border-t border-slate-200 flex items-center justify-between text-[8px] text-slate-500 italic">
                  <span>Signature: Verified ✓</span>
                  <span className="font-bold text-[#0052FF]">BluePrint</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                <span>Legal Certainty</span>
                <span className="text-emerald-400 font-bold">Zero Hidden Costs</span>
              </div>
            </div>
          </div>

          {/* STEP 06 */}
          <div className="shrink-0 w-[290px] sm:w-[330px] md:w-[350px] group rounded-3xl bg-[#0F141E] border border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
            <div>
              <span className="text-4xl sm:text-5xl font-black text-white tracking-wider block mb-2 font-mono">
                06
              </span>
              <p className="text-sm sm:text-base font-normal text-slate-200 leading-relaxed min-h-[48px]">
                Construction begins with daily quality checks and full progress tracking on our app.
              </p>
            </div>

            {/* Step 06 Graphic: Mobile app showing daily progress */}
            <div className="mt-6 relative pt-4 flex justify-center">
              <div className="relative w-[210px] sm:w-[220px] rounded-t-[30px] bg-slate-900 border-t-[5px] border-x-[5px] border-slate-700 shadow-2xl p-2.5 pb-6">
                <div className="w-14 h-2.5 bg-black rounded-full mx-auto mb-2" />
                
                <div className="text-[9px] font-bold text-slate-300 pb-1 border-b border-slate-800 flex justify-between items-center">
                  <span>Recent Updates</span>
                  <span className="text-[7px] bg-emerald-500/20 text-emerald-400 px-1 py-0.5 rounded font-mono">Live</span>
                </div>

                <div className="mt-2 rounded-xl bg-slate-950 p-2 border border-slate-800">
                  <div className="relative h-14 rounded-lg overflow-hidden mb-1.5 bg-slate-800">
                    <Image
                      src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=400&q=80"
                      alt="Construction site flooring progress"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <p className="text-[9px] font-bold text-white">Bathroom Flooring</p>
                  <p className="text-[7.5px] text-emerald-400 font-semibold mt-0.5">
                    Completed at 12:05pm • Sun, 14th Sept
                  </p>
                  <p className="text-[7.5px] text-slate-400 mt-0.5">
                    Checked by Senior Site Engineer (Audit #312 passed)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 07 (Matching reference Image 5) */}
          <div className="shrink-0 w-[290px] sm:w-[330px] md:w-[350px] group rounded-3xl bg-[#0F141E] border border-cyan-500/30 overflow-hidden flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:border-cyan-400/70 hover:shadow-2xl hover:shadow-cyan-500/15">
            <div>
              <span className="text-4xl sm:text-5xl font-black text-cyan-400 tracking-wider block mb-2 font-mono">
                07
              </span>
              <p className="text-sm sm:text-base font-normal text-slate-200 leading-relaxed min-h-[48px]">
                After final checks, your home is handed over with a 10-year warranty.
              </p>
            </div>

            {/* Step 07 Graphic: Modern Villa with glowing neon cyan shield and "10" */}
            <div className="mt-6 relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950 border border-cyan-500/40 flex items-center justify-center">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=85"
                alt="Modern luxury villa with 10 year structural warranty"
                fill
                unoptimized
                sizes="(max-width: 768px) 300px, 350px"
                className="object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

              {/* Glowing Neon Cyan Shield Graphic */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="relative w-20 h-24 sm:w-24 sm:h-28 flex items-center justify-center">
                  <svg
                    viewBox="0 0 100 120"
                    className="absolute inset-0 w-full h-full filter drop-shadow-[0_0_12px_rgba(6,182,212,0.95)]"
                  >
                    <path
                      d="M 50,5 L 90,25 C 90,75 50,115 50,115 C 50,115 10,75 10,25 Z"
                      fill="rgba(6, 182, 212, 0.12)"
                      stroke="#22D3EE"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="relative z-10 text-3xl sm:text-4xl font-black text-white tracking-tighter drop-shadow-md">
                    10
                  </span>
                </div>

                <p className="mt-1 text-xs font-bold text-cyan-300 tracking-wider uppercase">
                  10-Year Warranty
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Call to Action Bar */}
        <div className="mt-10 rounded-2xl bg-white/5 border border-white/10 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Ready to begin your construction journey in {cityName}?</p>
              <p className="text-xs text-slate-400">Join 10,000+ happy families building with BluePrint BuildCon.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={scrollToForm}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0052FF] hover:bg-[#0042EC] text-white font-bold text-sm sm:text-base transition-colors shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Book Free Consultation</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
