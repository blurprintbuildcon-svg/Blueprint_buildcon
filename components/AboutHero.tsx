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
    <section ref={heroRef} className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-brand-navy pt-32 text-white lg:min-h-[680px]">
      <img
        ref={imageRef}
        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=85&w=2200"
        alt="Construction team reviewing plans on a building site"
        className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover will-change-transform"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,18,39,0.94)_0%,rgba(10,18,39,0.72)_42%,rgba(10,18,39,0.18)_100%)]" />
      <div className="container mx-auto w-full px-4 pb-20 md:px-6 lg:pb-28">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-brand-orange">
            About Blueprint Build Con
          </p>
          <h1 className="max-w-2xl text-5xl font-bold leading-[0.98] md:text-7xl">
            We build the places where life moves forward.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/80 md:text-lg">
            From the first line on a drawing to the final handover, our people bring clarity, craft, and care to every build.
          </p>
          <Link
            href="#our-work"
            className="mt-9 inline-flex items-center border border-brand-orange bg-brand-orange px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-transparent"
          >
            Explore our work
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 hidden h-28 w-28 border-l border-t border-white/20 bg-brand-orange/90 lg:block" />
    </section>
  );
}