'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MapPin, ChevronDown, Search, Check, LocateFixed, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const OPERATING_CITIES = [
  { name: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lon: 77.5946 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lon: 78.4867 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707 },
  { name: 'New Delhi', state: 'Delhi NCR', lat: 28.6139, lon: 77.2090 },
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lon: 72.8777 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lon: 73.8567 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lon: 72.5714 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lon: 75.7873 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lon: 88.3639 },
  { name: 'Kochi', state: 'Kerala', lat: 9.9312, lon: 76.2673 },
  { name: 'Goa', state: 'Goa', lat: 15.2993, lon: 74.1240 },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lon: 75.8577 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462 },
  { name: 'Bhubaneswar', state: 'Odisha', lat: 20.2961, lon: 85.8245 },
  { name: 'Guwahati', state: 'Assam', lat: 26.1445, lon: 91.7362 },
  { name: 'Patna', state: 'Bihar', lat: 25.5941, lon: 85.1376 },
  { name: 'Raipur', state: 'Chhattisgarh', lat: 21.2514, lon: 81.6296 },
  { name: 'Surat', state: 'Gujarat', lat: 21.1702, lon: 72.8311 },
];

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function LocationSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCity, setSelectedCity] = useState<string>('Select Location');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectStatus, setDetectStatus] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync city based on pathname or localStorage
  useEffect(() => {
    if (pathname && pathname.startsWith('/location/')) {
      const citySlug = pathname.replace('/location/', '').split('/')[0];
      const matchedCity = OPERATING_CITIES.find(
        (c) => c.name.toLowerCase().replace(/\s+/g, '-') === citySlug.toLowerCase()
      );
      if (matchedCity) {
        setSelectedCity(matchedCity.name);
        localStorage.setItem('blueprint_selected_city', matchedCity.name);
        return;
      }
    }

    const saved = localStorage.getItem('blueprint_selected_city');
    if (saved) {
      setSelectedCity(saved);
    } else {
      setSelectedCity('Hyderabad'); // Default operational hub matching reference
    }
  }, [pathname]);

  // Listen to city-selected event
  useEffect(() => {
    const handleEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail === 'string') {
        setSelectedCity(detail);
      }
    };
    window.addEventListener('city-selected', handleEvent);
    return () => window.removeEventListener('city-selected', handleEvent);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectCity = (cityName: string) => {
    setSelectedCity(cityName);
    localStorage.setItem('blueprint_selected_city', cityName);
    window.dispatchEvent(new CustomEvent('city-selected', { detail: cityName }));
    setIsOpen(false);
    setSearchQuery('');
    setDetectStatus('');

    // Navigate to dedicated city landing page
    const slug = cityName.toLowerCase().trim().replace(/\s+/g, '-');
    router.push(`/location/${slug}`);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setDetectStatus('Geolocation not supported by your browser');
      return;
    }

    setIsDetecting(true);
    setDetectStatus('Detecting location...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        // Find closest operating city
        let closest = OPERATING_CITIES[0];
        let minDistance = getDistanceKm(userLat, userLon, closest.lat, closest.lon);

        for (let i = 1; i < OPERATING_CITIES.length; i++) {
          const dist = getDistanceKm(userLat, userLon, OPERATING_CITIES[i].lat, OPERATING_CITIES[i].lon);
          if (dist < minDistance) {
            minDistance = dist;
            closest = OPERATING_CITIES[i];
          }
        }

        setIsDetecting(false);
        handleSelectCity(closest.name);
      },
      (error) => {
        setIsDetecting(false);
        if (error.code === error.PERMISSION_DENIED) {
          setDetectStatus('Location permission denied. Please select from list.');
        } else {
          setDetectStatus('Unable to retrieve location. Please choose below.');
        }
      },
      { timeout: 8000 }
    );
  };

  const filteredCities = OPERATING_CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Navbar Location Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-slate-200/90 bg-slate-50/80 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-semibold text-slate-700 transition-all hover:border-brand-orange/40 hover:bg-blue-50/60 hover:text-brand-navy shadow-xs cursor-pointer select-none"
      >
        <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
          <MapPin size={12} className="sm:w-3.5 sm:h-3.5" />
        </div>
        <span className="max-w-[85px] sm:max-w-[120px] md:max-w-[140px] truncate text-slate-800 font-bold group-hover:text-brand-navy">
          {selectedCity}
        </span>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform duration-200 group-hover:text-slate-600 ${
            isOpen ? 'rotate-180 text-brand-orange' : ''
          }`}
        />
      </button>

      {/* Location Dropdown Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-[310px] sm:w-[360px] rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-brand-orange" />
                <h3 className="text-sm font-bold text-brand-navy">Select Operating City</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors rounded-full p-1 hover:bg-slate-100"
              >
                <X size={15} />
              </button>
            </div>

            {/* Detect Current Location Button */}
            <div className="pt-3 pb-2">
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isDetecting}
                className="w-full flex items-center justify-between gap-2.5 rounded-xl border border-blue-100 bg-blue-50/70 p-2.5 text-left text-xs font-semibold text-blue-700 transition hover:bg-blue-100/70 active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <LocateFixed size={15} className={`text-blue-600 ${isDetecting ? 'animate-spin' : ''}`} />
                  <span>{isDetecting ? 'Detecting your city...' : 'Detect My Current Location'}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-blue-500 bg-white px-2 py-0.5 rounded-full shadow-2xs">
                  GPS
                </span>
              </button>
              {detectStatus && (
                <p className="mt-1.5 text-[11px] text-amber-600 font-medium px-1">{detectStatus}</p>
              )}
            </div>

            {/* Search Input */}
            <div className="relative my-2">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city or state..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pl-8 pr-3 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-blue-500/15"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Cities List */}
            <div className="mt-2 max-h-56 overflow-y-auto pr-1 space-y-1 scrollbar-thin scrollbar-thumb-slate-200">
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 px-2 py-1">
                {filteredCities.length} Operating Cities
              </p>

              <div className="grid grid-cols-2 gap-1.5">
                {filteredCities.map((city) => {
                  const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
                  return (
                    <button
                      key={city.name}
                      type="button"
                      onClick={() => handleSelectCity(city.name)}
                      className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-left transition text-xs font-semibold ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs font-bold'
                          : 'bg-slate-50/60 text-slate-700 hover:bg-blue-50 hover:text-brand-orange'
                      }`}
                    >
                      <div className="truncate">
                        <p className="truncate leading-none">{city.name}</p>
                        <p
                          className={`text-[9.5px] mt-0.5 truncate ${
                            isSelected ? 'text-blue-100' : 'text-slate-400'
                          }`}
                        >
                          {city.state}
                        </p>
                      </div>
                      {isSelected && <Check size={13} className="shrink-0 text-white ml-1" />}
                    </button>
                  );
                })}
              </div>

              {filteredCities.length === 0 && (
                <div className="py-6 text-center text-xs text-slate-400">
                  No cities found matching &quot;{searchQuery}&quot;
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Selected: <strong className="text-brand-navy">{selectedCity}</strong></span>
              <span className="text-[10px] text-amber-600 font-medium">Pan-India Support</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

