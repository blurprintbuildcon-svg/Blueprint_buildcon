'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  Pause,
  Play,
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
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps = [
    { id: 1, label: '01 Consultation' },
    { id: 2, label: '02 Architecture & 3D' },
    { id: 3, label: '03 Booking Token' },
    { id: 4, label: '04 Soil & Testing' },
    { id: 5, label: '05 Escrow Contract' },
    { id: 6, label: '06 Live Tracking' },
    { id: 7, label: '07 10-Yr Handover' },
  ];

  // Sync ref with state for RAF loop
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Continuous auto-sliding animation with requestAnimationFrame
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    const speed = 38; // Pixels per second: smooth, comfortable reading speed

    const animate = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const container = scrollRef.current;
      if (container && !isPausedRef.current) {
        const singleSetWidth = container.scrollWidth / 2;

        container.scrollLeft += speed * delta;

        // Infinite wrap without any visual jump
        if (container.scrollLeft >= singleSetWidth) {
          container.scrollLeft -= singleSetWidth;
        }

        // Calculate approximate active step (0-6)
        const cardWidth = 360;
        const currentMod = container.scrollLeft % singleSetWidth;
        const index = Math.min(Math.floor(currentMod / cardWidth), steps.length - 1);
        setActiveStepIndex(index);
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [steps.length]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    // Pause temporarily when user clicks arrows
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3500);

    const cardWidth = 360;
    const singleSetWidth = container.scrollWidth / 2;

    if (direction === 'left') {
      if (container.scrollLeft <= cardWidth) {
        container.scrollLeft += singleSetWidth;
      }
      container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    } else {
      if (container.scrollLeft >= singleSetWidth) {
        container.scrollLeft -= singleSetWidth;
      }
      container.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  const scrollToStep = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4000);

    const cardWidth = 360;
    container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    setActiveStepIndex(index);
  };

  const scrollToForm = () => {
    if (onBookClick) {
      onBookClick();
      return;
    }
    const formElement = document.getElementById('expert-consultation-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      formElement.classList.add('ring-4', 'ring-brand-orange/50');
      setTimeout(() => {
        formElement.classList.remove('ring-4', 'ring-brand-orange/50');
      }, 1500);
    }
  };

  // Render a step card component
  const renderCard = (stepNum: number, uniqueKey: string) => {
    switch (stepNum) {
      case 1:
        return (
          <div
            key={uniqueKey}
            className="shrink-0 w-[295px] sm:w-[335px] md:w-[355px] group rounded-3xl bg-[#0e1834]/85 border border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:border-brand-orange/60 hover:bg-[#121f42] hover:shadow-2xl hover:shadow-brand-orange/15 select-none"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-wider font-mono">
                  01
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/15 px-2 py-0.5 rounded-full border border-brand-orange/30">
                  Step 1
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Tell us what you want</h3>
              <p className="text-xs sm:text-sm font-normal text-slate-300 leading-relaxed min-h-[44px]">
                Fill out a simple form and get in touch with our team within 20 minutes to begin.
              </p>
            </div>

            <div className="mt-6 relative pt-3 flex justify-center">
              <div className="relative w-[210px] sm:w-[220px] rounded-t-[28px] bg-slate-900 border-t-[4px] border-x-[4px] border-slate-700 shadow-2xl p-3 pb-6 group-hover:border-brand-orange/40 transition-colors">
                <div className="w-12 h-2 bg-black rounded-full mx-auto mb-2.5" />
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
                  <div className="h-6 rounded-md bg-brand-orange text-white flex items-center justify-center text-[8px] font-bold shadow-xs">
                    Book Free Consultation
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div
            key={uniqueKey}
            className="shrink-0 w-[295px] sm:w-[335px] md:w-[355px] group rounded-3xl bg-[#0e1834]/85 border border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:border-brand-orange/60 hover:bg-[#121f42] hover:shadow-2xl hover:shadow-brand-orange/15 select-none"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-wider font-mono">
                  02
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/15 px-2 py-0.5 rounded-full border border-brand-orange/30">
                  Step 2
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Meet our architects &amp; engineers</h3>
              <p className="text-xs sm:text-sm font-normal text-slate-300 leading-relaxed min-h-[44px]">
                Discuss floor plans, material options, and see 3D architectural renders.
              </p>
            </div>

            <div className="mt-6 relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 bg-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80"
                alt="Technical expert and architect discussing floor plan"
                fill
                unoptimized
                sizes="(max-width: 768px) 300px, 350px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-200 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                  Architectural Review
                </span>
                <span className="text-[11px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                  Instant Quote
                </span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div
            key={uniqueKey}
            className="shrink-0 w-[295px] sm:w-[335px] md:w-[355px] group rounded-3xl bg-[#0e1834]/85 border border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:border-brand-orange/60 hover:bg-[#121f42] hover:shadow-2xl hover:shadow-brand-orange/15 select-none"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-wider font-mono">
                  03
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/15 px-2 py-0.5 rounded-full border border-brand-orange/30">
                  Step 3
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Confirm booking &amp; start work</h3>
              <p className="text-xs sm:text-sm font-normal text-slate-300 leading-relaxed min-h-[44px]">
                Pay a small token to confirm your booking and start pre-construction testing.
              </p>
            </div>

            <div className="mt-6 relative pt-3 flex justify-center">
              <div className="relative w-[210px] sm:w-[220px] rounded-t-[28px] bg-gradient-to-b from-[#1C1613] to-slate-950 border-t-[4px] border-x-[4px] border-brand-orange/40 shadow-2xl p-4 pb-8 text-center group-hover:border-brand-orange transition-colors">
                <div className="absolute -top-2.5 -right-1.5 bg-brand-orange text-white p-2 rounded-xl shadow-lg border border-white/20">
                  <Calendar size={14} />
                </div>
                <div className="w-12 h-2 bg-black rounded-full mx-auto mb-3" />
                <div className="w-11 h-11 rounded-full bg-blue-500/20 text-blue-400 border border-blue-400/40 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 size={24} />
                </div>
                <p className="text-[11px] text-slate-400">Booking Confirmed</p>
                <p className="text-sm font-extrabold text-white mt-0.5">Token Received</p>
                <p className="text-[9px] text-emerald-400 mt-1 font-mono">Soil Test &amp; Survey Dispatched</p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div
            key={uniqueKey}
            className="shrink-0 w-[295px] sm:w-[335px] md:w-[355px] group rounded-3xl bg-[#0e1834]/85 border border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:border-brand-orange/60 hover:bg-[#121f42] hover:shadow-2xl hover:shadow-brand-orange/15 select-none"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-wider font-mono">
                  04
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/15 px-2 py-0.5 rounded-full border border-brand-orange/30">
                  Step 4
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Site survey, tests &amp; 3D renders</h3>
              <p className="text-xs sm:text-sm font-normal text-slate-300 leading-relaxed min-h-[44px]">
                We survey your site, run soil tests, and create drawings and 3D models for review.
              </p>
            </div>

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
                  Soil &amp; Site Survey
                </span>
                <span className="text-[11px] font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                  3D Render Ready
                </span>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div
            key={uniqueKey}
            className="shrink-0 w-[295px] sm:w-[335px] md:w-[355px] group rounded-3xl bg-[#0e1834]/85 border border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:border-brand-orange/60 hover:bg-[#121f42] hover:shadow-2xl hover:shadow-brand-orange/15 select-none"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-wider font-mono">
                  05
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/15 px-2 py-0.5 rounded-full border border-brand-orange/30">
                  Step 5
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Sign escrow contract</h3>
              <p className="text-xs sm:text-sm font-normal text-slate-300 leading-relaxed min-h-[44px]">
                Sign a transparent contract with clear timelines and milestone-based payments.
              </p>
            </div>

            <div className="mt-6 relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 bg-gradient-to-br from-[#1C1814] to-[#120F0D] p-3.5 flex flex-col justify-between">
              <div className="bg-slate-100 text-slate-900 rounded-xl p-3 shadow-xl border-t-4 border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-300 pb-1.5 mb-1.5">
                  <div className="flex items-center gap-1">
                    <FileText size={12} className="text-brand-orange" />
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
                  <span className="font-bold text-brand-orange">BluePrint</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                <span>Legal Certainty</span>
                <span className="text-emerald-400 font-bold">Zero Hidden Costs</span>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div
            key={uniqueKey}
            className="shrink-0 w-[295px] sm:w-[335px] md:w-[355px] group rounded-3xl bg-[#0e1834]/85 border border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:border-brand-orange/60 hover:bg-[#121f42] hover:shadow-2xl hover:shadow-brand-orange/15 select-none"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-wider font-mono">
                  06
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/15 px-2 py-0.5 rounded-full border border-brand-orange/30">
                  Step 6
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Track construction in real-time</h3>
              <p className="text-xs sm:text-sm font-normal text-slate-300 leading-relaxed min-h-[44px]">
                Construction begins with daily quality checks and full progress tracking on our app.
              </p>
            </div>

            <div className="mt-6 relative pt-3 flex justify-center">
              <div className="relative w-[210px] sm:w-[220px] rounded-t-[28px] bg-slate-900 border-t-[4px] border-x-[4px] border-slate-700 shadow-2xl p-2.5 pb-6">
                <div className="w-12 h-2 bg-black rounded-full mx-auto mb-2" />
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
                  <p className="text-[9px] font-bold text-white">Structural Concreting</p>
                  <p className="text-[7.5px] text-emerald-400 font-semibold mt-0.5">
                    Completed at 12:05pm • Today
                  </p>
                  <p className="text-[7.5px] text-slate-400 mt-0.5">
                    Checked by Senior Engineer (Audit #312 passed)
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div
            key={uniqueKey}
            className="shrink-0 w-[295px] sm:w-[335px] md:w-[355px] group rounded-3xl bg-[#0e1834]/85 border border-cyan-500/40 overflow-hidden flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 select-none"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl sm:text-5xl font-black text-cyan-400 tracking-wider font-mono">
                  07
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  Step 7
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Move in on time with 10-Yr Warranty</h3>
              <p className="text-xs sm:text-sm font-normal text-slate-300 leading-relaxed min-h-[44px]">
                Final inspection, deep cleaning, and key handover with comprehensive 10-year warranty.
              </p>
            </div>

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
        );

      default:
        return null;
    }
  };

  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-b from-[#0a1227] via-[#090f20] to-[#060a17] text-white overflow-hidden border-t border-b border-slate-800/80">
      {/* Top Ambient Glow & Light Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[350px] bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/15 text-brand-orange text-xs sm:text-sm font-bold uppercase tracking-wider mb-3.5 border border-brand-orange/30 backdrop-blur-md shadow-xs">
              <Sparkles size={14} className="text-brand-orange" />
              <span>The Transparent Blueprint Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              How Your Home Gets Built in {cityName}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl font-normal">
              From your initial consultation call to receiving the keys with a 10-year warranty — 100% transparent and tracked.
            </p>
          </motion.div>

          {/* Navigation Controls & Live Auto-Slide Status */}
          <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
            {/* Hover to pause pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 backdrop-blur-sm select-none">
              <span className={`w-2 h-2 rounded-full transition-colors ${isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
              <span className="hidden sm:inline font-medium">
                {isPaused ? 'Paused (hovered)' : 'Auto-sliding'}
              </span>
              <span className="sm:hidden font-medium">
                {isPaused ? 'Paused' : 'Auto'}
              </span>
            </div>

            {/* Left and Right Manual Arrow Buttons */}
            <button
              type="button"
              onClick={() => handleManualScroll('left')}
              aria-label="Scroll steps left"
              className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-white/20 bg-white/10 text-white hover:bg-brand-orange hover:border-brand-orange shadow-md active:scale-95 cursor-pointer flex items-center justify-center transition-all"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => handleManualScroll('right')}
              aria-label="Scroll steps right"
              className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-white/20 bg-white/10 text-white hover:bg-brand-orange hover:border-brand-orange shadow-md active:scale-95 cursor-pointer flex items-center justify-center transition-all"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Step Jump Pills (Quick Navigation) */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
          {steps.map((st, i) => (
            <button
              key={st.id}
              type="button"
              onClick={() => scrollToStep(i)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeStepIndex === i
                  ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/30'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Continuous Auto-Scrolling Slider Track (Pauses when cursor hovers over it) */}
        <div
          className="relative max-w-full overflow-hidden py-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
            pauseTimeoutRef.current = setTimeout(() => {
              setIsPaused(false);
            }, 1500);
          }}
        >
          {/* Subtle edge gradient fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#0a1227] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#090f20] to-transparent z-10" />

          {/* Horizontal scroll container with duplicate cards for infinite seamless sliding */}
          <div
            ref={scrollRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
          >
            {/* Primary Set of 7 Cards */}
            {[1, 2, 3, 4, 5, 6, 7].map((num) => renderCard(num, `primary-${num}`))}

            {/* Seamless Duplicate Set for Infinite Continuous Auto-Slide */}
            {[1, 2, 3, 4, 5, 6, 7].map((num) => renderCard(num, `duplicate-${num}`))}
          </div>
        </div>

        {/* Bottom Call to Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xl"
        >
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange/20 text-brand-orange border border-brand-orange/30 flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-base font-extrabold text-white">Ready to build your dream home in {cityName}?</p>
              <p className="text-xs sm:text-sm text-slate-400">Talk with our construction experts today for a free consultation and customized estimate.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={scrollToForm}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange via-orange-500 to-brand-orange-hover hover:from-brand-orange-hover hover:to-orange-700 text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/40 flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-[0.99]"
          >
            <span>Book Free Consultation</span>
            <ArrowRight size={17} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
