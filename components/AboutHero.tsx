'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AboutHero() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let frameId = 0;

    const updateParallax = () => {
      frameId = 0;
      if (!heroRef.current || !imageRef.current) return;

      const heroTop = heroRef.current.getBoundingClientRect().top;
      const distanceScrolled = Math.max(0, -heroTop);
      imageRef.current.style.transform = `translate3d(0, ${distanceScrolled * 0.16}px, 0) scale(1.1)`;
    };

    const handleScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative isolate flex min-h-screen items-end overflow-hidden bg-brand-navy pt-36 sm:pt-44 pb-20 sm:pb-28 lg:pb-32 text-white">
      <img
        ref={imageRef}
        src="/interior_about.jpg"
        alt="BluePrint BuildCon commercial and residential building construction site"
        className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover will-change-transform"
      />
      <div className="container mx-auto w-full px-4 md:px-6">
        <div className="max-w-4xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
          <p className="mb-5 text-sm sm:text-base font-bold uppercase tracking-[0.28em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            About <span className="text-white">BluePrint</span><span className="text-[#3b82f6]">Build-Con</span>
          </p>
          <h1 className="max-w-4xl text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black leading-[1.04] tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            We build the places where life moves forward.
          </h1>
          <p className="mt-7 max-w-3xl text-lg sm:text-xl lg:text-2xl leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            From the first line on a drawing to the final handover, our people bring clarity, craft, and care to every build.
          </p>
          <Link
            href="#our-work"
            className="mt-10 inline-flex items-center rounded-xl bg-[#0052FF] hover:bg-[#0041CC] px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-[0.16em] text-white shadow-xl shadow-black/40 transition-all hover:scale-105 active:scale-95"
          >
            Explore our work
          </Link>
        </div>
      </div>
    </section>
  );
}
