'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { OPERATING_CITIES } from '@/components/LocationSelector';
import ConsultationModal from '@/components/ConsultationModal';

interface CityPackagesSectionProps {
  currentCityName?: string;
  onSelectPackage?: (packageName: string) => void;
}

export default function CityPackagesSection({
  currentCityName = 'Surat',
  onSelectPackage,
}: CityPackagesSectionProps) {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState(currentCityName);

  React.useEffect(() => {
    if (currentCityName) {
      setSelectedCity(currentCityName);
    }
  }, [currentCityName]);
  const [houseType, setHouseType] = useState<'homes' | 'luxury'>('homes');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePackage, setActivePackage] = useState<string>('');

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    const slug = newCity.toLowerCase().trim().replace(/\s+/g, '-');
    router.push(`/location/${slug}`);
  };

  const handleLearnMore = (pkgName: string) => {
    if (onSelectPackage) {
      onSelectPackage(pkgName);
    }
    setActivePackage(pkgName);
    setIsModalOpen(true);
  };

  const standardPackages = [
    {
      id: 'standard',
      name: 'Standard',
      price: '₹2040',
      description:
        'A budget package with no compromise on quality that includes all construction essentials',
      popular: false,
      highlights: [
        'Trusted brand steel & cement',
        'Standard floor tiles upto ₹50/sqft',
        'Standard flush doors and window finish',
        'Tractor Emulsion finish',
        'Essential kitchen & bathroom fittings',
      ],
    },
    {
      id: 'classic',
      name: 'Classic',
      price: '₹2320',
      description:
        'Our best seller package with upgraded brands like Jindal Steels, Hindware etc at a considerable price',
      popular: true,
      highlights: [
        'Superior brand steel & cement',
        'Refined floor tiles upto ₹100/sqft',
        'Elegant teak doors and window finish',
        'Tractor Shyne Emulsion finish',
        'Stylish kitchen & bathroom',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹2590',
      description:
        'An elegant package crafted for modern living with extra provisions like solar heater setup, puja room door etc',
      popular: false,
      highlights: [
        'Superior Brand steel & cement',
        'Premium floor tiles upto ₹140/sqft',
        'Designer teak doors and window finish',
        'Apcolite Premium finish',
        'Quality kitchen & bathroom',
      ],
    },
    {
      id: 'royale',
      name: 'Royale',
      price: '₹2900',
      description:
        'An ultimate plan with high-end finishes with amenities like EV charging, copper gas connection etc',
      popular: false,
      highlights: [
        'Superior brand steel & cement',
        'Lavish floor tiles upto ₹160/sqft',
        'Designer teak doors and window finish',
        'Apex Ultima Exterior finish',
        'Lavish Fittings for kitchen & bathroom',
      ],
    },
  ];

  const luxuryPackages = [
    {
      id: 'sovereign',
      name: 'Sovereign',
      price: '₹4250',
      description:
        'Architectural luxury villa construction with Italian marble and smart automation features',
      popular: false,
      highlights: [
        'Tata Tiscon / JSW Neosteel Fe550D rebar',
        'Imported Italian marble flooring upto ₹400/sqft',
        'Burma Teak wood 8ft main & interior doors',
        'Complete VRV / VRF air-conditioning piping',
        'Kohler / Toto designer bathroom fixtures',
      ],
    },
    {
      id: 'imperial',
      name: 'Imperial',
      price: '₹4950',
      description:
        'Ultra-luxurious bespoke estate construction with private lift and swimming pool provision',
      popular: true,
      highlights: [
        'Heavy earthquake resistant RCC structural design',
        'Premium Greek / Italian marble flooring upto ₹600/sqft',
        'German double-glazed soundproof glass facade',
        'In-built elevator shaft & structural integration',
        'Full home automation with biometric security',
      ],
    },
    {
      id: 'palatial',
      name: 'Palatial',
      price: '₹5800',
      description:
        'The pinnacle of architectural craftsmanship, sustainable solar energy and private terrace garden',
      popular: false,
      highlights: [
        'Ultra-high performance concrete & structural audits',
        'Custom imported marble & hardwood flooring upto ₹850/sqft',
        'Triple-glazed panoramic thermal insulated glass',
        'Rooftop infinity pool and terrace waterproofing',
        'Dedicated 24/7 site surveillance & 15-year warranty',
      ],
    },
    {
      id: 'monarch',
      name: 'Monarch Custom',
      price: '₹6500+',
      description:
        'End-to-end bespoke luxury architecture, interior design, and turnkey landscape execution',
      popular: false,
      highlights: [
        'International award-winning architectural lead',
        'Unlimited bespoke material selection',
        'Custom landscape, water bodies & private courtyards',
        'Sub-zero imported kitchen & walk-in wardrobes',
        'Complete concierge maintenance for 5 years',
      ],
    },
  ];

  const currentList = houseType === 'homes' ? standardPackages : luxuryPackages;

  return (
    <section className="py-14 sm:py-20 bg-slate-50/60 border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Top Controls Row (matching reference image) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200/80">
          {/* Location Selector Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-slate-900">Location:</span>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className="appearance-none bg-white rounded-xl border-2 border-[#0052FF] pl-4 pr-10 py-2 text-sm sm:text-base font-extrabold text-slate-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0052FF] cursor-pointer"
              >
                {OPERATING_CITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-700">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* Type Toggle Radios (matching reference image) */}
          <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-800">
            <span className="font-bold text-slate-900">Type:</span>

            {/* Homes Radio */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="houseType"
                checked={houseType === 'homes'}
                onChange={() => setHouseType('homes')}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  houseType === 'homes' ? 'border-[#0052FF]' : 'border-slate-400'
                }`}
              >
                {houseType === 'homes' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0052FF]" />
                )}
              </div>
              <span className="text-slate-900 font-bold">Homes</span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-tight">
                STARTS AT ₹2,040 PER SQFT (INCL. GST)
              </span>
            </label>

            {/* Luxury Homes Radio */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="houseType"
                checked={houseType === 'luxury'}
                onChange={() => setHouseType('luxury')}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  houseType === 'luxury' ? 'border-[#0052FF]' : 'border-slate-400'
                }`}
              >
                {houseType === 'luxury' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0052FF]" />
                )}
              </div>
              <span className="text-slate-900 font-bold">Luxury Homes</span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-tight">
                STARTS AT ₹4,250 PER SQFT (INCL. GST)
              </span>
            </label>
          </div>
        </div>

        {/* 4 Package Cards Grid (matching reference image) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {currentList.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl flex flex-col justify-between border transition-all duration-300 hover:shadow-xl ${
                pkg.popular
                  ? 'border-blue-500 shadow-md ring-1 ring-blue-500/40'
                  : 'border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              {/* Popular Gold Banner */}
              {pkg.popular ? (
                <div className="bg-[#0052FF] text-white text-center py-1.5 rounded-t-2xl text-xs font-black uppercase tracking-widest shadow-xs">
                  POPULAR
                </div>
              ) : (
                <div className="h-2 rounded-t-2xl" />
              )}

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {pkg.name}
                </h3>

                {/* Price */}
                <div className="mt-2 text-xl sm:text-2xl font-black text-[#0052FF]">
                  {pkg.price}{' '}
                  <span className="text-sm font-bold text-[#0052FF]">per sqft</span>
                </div>

                {/* Subtitle */}
                <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed min-h-[50px]">
                  {pkg.description}
                </p>

                {/* Highlights Header */}
                <div className="mt-6 mb-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    HIGHLIGHTS
                  </span>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-3 flex-1 mb-8">
                  {pkg.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF] mt-1.5 shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Button */}
                <button
                  type="button"
                  onClick={() => handleLearnMore(pkg.name)}
                  className="w-full py-3 px-4 rounded-xl border-2 border-[#0052FF] text-[#0052FF] hover:bg-[#0052FF] hover:text-white font-extrabold text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.99] text-center"
                >
                  Learn more
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Consultation Modal on Learn More */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialLocation={`${selectedCity} - ${activePackage} Package`}
      />
    </section>
  );
}

