'use client';

import { useEffect, useRef } from 'react';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  compact?: boolean;
};

  export default function PageHero({ eyebrow, title, description, image, imageAlt, compact = false }: PageHeroProps) {
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
          className={`relative isolate flex items-end overflow-hidden bg-brand-navy text-white ${compact
              ? 'min-h-[280px] md:min-h-[320px] lg:min-h-[360px] pt-24 pb-8 md:pt-28 md:pb-12'
              : 'min-h-140 lg:min-h-170 pt-32 pb-20 lg:pb-28'
            }`}
        >
          <img
            ref={imageRef}
            src={image}
            alt={imageAlt}
            className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover will-change-transform"
          />
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,18,39,0.92)_0%,rgba(10,18,39,0.68)_48%,rgba(10,18,39,0.25)_100%)]" />
              <div className="container mx-auto w-full px-4 md:px-6">
                <div className={compact ? 'max-w-2xl' : 'max-w-3xl'}>
                  <p className={`font-bold uppercase tracking-[0.25em] text-[#0052FF] ${compact ? 'mb-2 text-xs md:text-sm' : 'mb-5 text-sm tracking-[0.28em]'}`}>
                    {eyebrow}
                  </p>
                  <h1 className={`font-bold leading-[1.05] tracking-tight ${compact ? 'text-3xl md:text-5xl' : 'text-5xl md:text-7xl leading-[0.98]'}`}>
                    {title}
                  </h1>
                  <p className={`leading-relaxed text-white/85 ${compact ? 'mt-3 text-sm md:text-base max-w-lg' : 'mt-7 text-base md:text-lg max-w-xl'}`}>
                    {description}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 hidden h-20 w-20 border-l border-t border-white/20 bg-[#0052FF]/85 lg:block" />
            </section>
            );
}
