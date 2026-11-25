'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  compact?: boolean;
  fullHeight?: boolean;
  ctaText?: string;
  ctaHref?: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  compact = false,
  fullHeight = false,
  ctaText,
  ctaHref,
}: PageHeroProps) {
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
    <section
      ref={heroRef}
      className={`relative isolate flex items-end overflow-hidden bg-brand-navy text-white ${
        compact
          ? 'min-h-[280px] md:min-h-[320px] lg:min-h-[360px] pt-24 pb-8 md:pt-28 md:pb-12'
          : fullHeight
          ? 'min-h-screen pt-36 sm:pt-44 pb-20 sm:pb-28 lg:pb-32'
          : 'min-h-140 lg:min-h-170 pt-32 pb-20 lg:pb-28'
      }`}
    >
      <img
        ref={imageRef}
        src={image}
        alt={imageAlt}
        className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover will-change-transform"
      />
      <div className="container mx-auto w-full px-4 md:px-6">
        <div className={`${compact ? 'max-w-2xl' : fullHeight ? 'max-w-4xl' : 'max-w-3xl'} drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]`}>
          <p
            className={`font-bold uppercase tracking-[0.25em] text-[#38bdf8] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${
              compact
                ? 'mb-2 text-xs md:text-sm'
                : fullHeight
                ? 'mb-5 text-sm sm:text-base tracking-[0.28em]'
                : 'mb-5 text-sm tracking-[0.28em]'
            }`}
          >
            {eyebrow}
          </p>
          <h1
            className={`font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] ${
              compact
                ? 'text-3xl md:text-5xl leading-[1.05]'
                : fullHeight
                ? 'text-5xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.04] max-w-4xl'
                : 'text-5xl md:text-7xl leading-[0.98]'
            }`}
          >
            {title}
          </h1>
          <p
            className={`leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] ${
              compact
                ? 'mt-3 text-sm md:text-base max-w-lg'
                : fullHeight
                ? 'mt-7 text-lg sm:text-xl lg:text-2xl max-w-3xl'
                : 'mt-7 text-base md:text-lg max-w-xl'
            }`}
          >
            {description}
          </p>
          {ctaText && ctaHref && (
            <Link
              href={ctaHref}
              className="mt-10 inline-flex items-center rounded-xl bg-[#0052FF] hover:bg-[#0041CC] px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-[0.16em] text-white shadow-xl shadow-black/40 transition-all hover:scale-105 active:scale-95"
            >
              {ctaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
