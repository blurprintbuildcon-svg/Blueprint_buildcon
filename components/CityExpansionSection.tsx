'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    const cardWidth = 260; // Card width + gap
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(checkScroll, 350);
  };

  const handleCityClick = (cityName: string) => {
    setSelectedCity(cityName);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blueprint_selected_city', cityName);
      window.dispatchEvent(new CustomEvent('city-selected', { detail: cityName }));
    }
    const slug = cityName.toLowerCase().trim().replace(/\s+/g, '-');
    router.push(`/location/${slug}`);
  };

  return (
    <section className="py-14 sm:py-20 bg-white overflow-hidden border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header with Title on Left and Navigation Arrows on Right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy tracking-tight">
              Building Better, City by City.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl">
              From landmark residences to commercial hubs, explore where BluePrint BuildCon is shaping modern construction across India.
            </p>
          </div>

          {/* Left and Right Navigation Buttons */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`h-11 w-11 sm:h-12 sm:w-12 rounded-full border flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'border-slate-300 bg-white text-brand-navy hover:bg-slate-50 hover:border-slate-400 shadow-sm active:scale-95 cursor-pointer'
                  : 'border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`h-11 w-11 sm:h-12 sm:w-12 rounded-full border flex items-center justify-center transition-all ${
                canScrollRight
                  ? 'border-slate-300 bg-white text-brand-navy hover:bg-slate-50 hover:border-slate-400 shadow-sm active:scale-95 cursor-pointer'
                  : 'border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Scrollable City Cards Row */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {CITIES.map((city) => (
            <div
              key={city.name}
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
                <span className="text-base sm:text-lg font-bold text-amber-600 transition-colors group-hover:text-amber-700">
                  {city.name}
                </span>
                <ChevronRight
                  size={18}
                  className="text-amber-600 transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </div>
          ))}
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

