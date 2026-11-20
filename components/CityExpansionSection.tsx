'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';

const CITIES = [
  { name: 'Bengaluru', image: '/Bengaluru.png' },
  { name: 'Hyderabad', image: '/Hyderabad.png' },
  { name: 'Chennai', image: '/Chennai.png' },
  { name: 'New Delhi', image: '/New Delhi.png' },
  { name: 'Mumbai', image: '/Mumbai.png' },
  { name: 'Pune', image: '/pune.png' },
  { name: 'Ahmedabad', image: '/Ahmedabad.png' },
  { name: 'Jaipur', image: '/Jaipur.png' },
  { name: 'Kolkata', image: '/Kolkata.png' },
  { name: 'Kochi', image: '/Kochi.png' },
  { name: 'Goa', image: '/Goa.png' },
  { name: 'Indore', image: '/Indore.png' },
  { name: 'Lucknow', image: '/Lucknow.png' },
  { name: 'Bhubaneswar', image: '/Bhubaneswar.png' },
  { name: 'Guwahati', image: '/Guwahati.png' },
  { name: 'Patna', image: '/patna.png' },
  { name: 'Raipur', image: '/Raipur.png' },
  { name: 'Surat', image: '/surat.png' },
];

export default function CityExpansionSection() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'reverse'>('forward');
  const [isPaused, setIsPaused] = useState(false);
  const [isBoosted, setIsBoosted] = useState(false);
  const boostTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDirectionChange = (newDirection: 'forward' | 'reverse') => {
    setDirection(newDirection);
    setIsPaused(false);

    // Provide a responsive speed boost effect for 1.2s on click
    setIsBoosted(true);
    if (boostTimeoutRef.current) {
      clearTimeout(boostTimeoutRef.current);
    }
    boostTimeoutRef.current = setTimeout(() => {
      setIsBoosted(false);
    }, 1200);
  };

  useEffect(() => {
    return () => {
      if (boostTimeoutRef.current) {
        clearTimeout(boostTimeoutRef.current);
      }
    };
  }, []);

  const handleCityClick = (cityName: string) => {
    setSelectedCity(cityName);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blueprint_selected_city', cityName);
      window.dispatchEvent(new CustomEvent('city-selected', { detail: cityName }));
    }
    const slug = cityName.toLowerCase().trim().replace(/\s+/g, '-');
    router.push(`/location/${slug}`);
  };

  const renderCityCard = (city: { name: string; image: string }, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${city.name}`}
      onClick={() => handleCityClick(city.name)}
      className="flex-shrink-0 w-[210px] sm:w-[240px] md:w-[260px] group cursor-pointer text-left select-none"
    >
      {/* Full-bleed Card Container - 100% Filled Image Without Extra Space */}
      <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-slate-300">
        <Image
          src={city.image}
          alt={`${city.name} city skyline`}
          fill
          sizes="(max-width: 640px) 210px, 260px"
          className="object-cover transition-transform duration-500 group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* City Name with Right Chevron below card */}
      <div className="mt-3 flex items-center gap-1 px-1">
        <span className="text-base sm:text-lg font-bold text-slate-900 transition-colors group-hover:text-[#0052FF]">
          {city.name}
        </span>
        <ChevronRight
          size={18}
          className="text-[#0052FF] transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </div>
  );

  return (
    <section className="py-14 sm:py-20 bg-white overflow-hidden border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header with Title Centered and Navigation Direction Arrows */}
        <div className="relative mb-8 sm:mb-12">
          <div className="text-center max-w-2xl lg:max-w-3xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy tracking-tight">
              <span className="animate-word-highlight" style={{ animationDelay: '0s', animationDuration: '5s' }}>Building</span>{' '}
              <span className="animate-word-highlight" style={{ animationDelay: '1s', animationDuration: '5s' }}>Better,</span>{' '}
              <span className="animate-word-highlight" style={{ animationDelay: '2s', animationDuration: '5s' }}>City</span>{' '}
              <span className="animate-word-highlight" style={{ animationDelay: '3s', animationDuration: '5s' }}>by</span>{' '}
              <span className="animate-word-highlight" style={{ animationDelay: '4s', animationDuration: '5s' }}>City.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-500 max-w-xl mx-auto">
              From landmark residences to commercial hubs, explore where BluePrint BuildCon is shaping modern construction across India.
            </p>
          </div>

          {/* Left and Right Navigation Buttons to control sliding direction & speed */}
          <div className="flex items-center justify-center md:justify-end gap-2.5 mt-5 md:mt-0 md:absolute md:right-0 md:bottom-0 shrink-0">
            <button
              type="button"
              onClick={() => handleDirectionChange('reverse')}
              aria-label="Slide continuous reverse"
              title="Slide in reverse"
              className={`h-11 w-11 sm:h-12 sm:w-12 rounded-full border flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                direction === 'reverse'
                  ? 'border-[#0052FF] bg-blue-50 text-[#0052FF] shadow-sm ring-2 ring-blue-100'
                  : 'border-slate-300 bg-white text-brand-navy hover:bg-slate-50 hover:border-slate-400 shadow-sm'
              }`}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => handleDirectionChange('forward')}
              aria-label="Slide continuous forward"
              title="Slide forward"
              className={`h-11 w-11 sm:h-12 sm:w-12 rounded-full border flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                direction === 'forward'
                  ? 'border-[#0052FF] bg-blue-50 text-[#0052FF] shadow-sm ring-2 ring-blue-100'
                  : 'border-slate-300 bg-white text-brand-navy hover:bg-slate-50 hover:border-slate-400 shadow-sm'
              }`}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Continuous Auto-Scrolling Slider (Pauses on Hover / Touch) */}
        <div
          className="relative max-w-full overflow-hidden py-4 select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Subtle edge gradient fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-20 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Marquee Track */}
          <div
            className="flex animate-continuous-scroll w-max"
            style={{
              animationDuration: isBoosted ? '16s' : '50s',
              animationDirection: direction === 'reverse' ? 'reverse' : 'normal',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {/* Primary Set */}
            <div className="flex shrink-0 gap-4 sm:gap-6 pr-4 sm:pr-6">
              {CITIES.map((city) => renderCityCard(city, 'primary'))}
            </div>

            {/* Seamless Duplicate Set for Infinite Continuous Scrolling */}
            <div className="flex shrink-0 gap-4 sm:gap-6 pr-4 sm:pr-6" aria-hidden="true">
              {CITIES.map((city) => renderCityCard(city, 'duplicate'))}
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Modal pre-filled with the clicked city */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialLocation={selectedCity}
      />
    </section>
  );
}
