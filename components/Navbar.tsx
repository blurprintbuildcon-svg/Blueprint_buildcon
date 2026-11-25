'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Gift, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LocationSelector from './LocationSelector';

type NavItem =
  | { type: 'link'; id: string; name: string; href: string }
  | {
      type: 'dropdown';
      id: string;
      name: string;
      submenu: { name: string; href: string; description: string }[];
    };

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWorkMenuOpen, setIsWorkMenuOpen] = useState(false);
  const [isMobileWorkOpen, setIsMobileWorkOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const pathname = usePathname();
  const workDropdownRef = useRef<HTMLLIElement>(null);

  // Active item determination
  const getActiveId = (): string => {
    if (!pathname || pathname === '/') return 'home';
    if (pathname.startsWith('/about')) return 'about';
    if (pathname.startsWith('/services')) return 'services';
    // if (pathname.startsWith('/process') || pathname.startsWith('/projects')) return 'work';
    if (pathname.startsWith('/why-us')) return 'why-us';
    if (pathname.startsWith('/contact')) return 'contact';
    return 'home'; // Always maintains a rounded active blue pill
  };

  const [activeTab, setActiveTab] = useState<string>('home');

  useEffect(() => {
    setActiveTab(getActiveId());
  }, [pathname]);

  // Scroll listener for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (workDropdownRef.current && !workDropdownRef.current.contains(e.target as Node)) {
        setIsWorkMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsWorkMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Navigation Links
  const navLinks: NavItem[] = [
    { type: 'link', id: 'home', name: 'Home', href: '/' },
    { type: 'link', id: 'about', name: 'About', href: '/about' },
    { type: 'link', id: 'services', name: 'Services', href: '/services' },
    // {
    //   type: 'dropdown',
    //   id: 'work',
    //   name: 'Work',
    //   submenu: [
    //     { name: 'Process', href: '/process', description: 'Our 7-step engineering methodology' },
    //     { name: 'Portfolio', href: '/projects', description: 'Explore verified completed projects' },
    //   ],
    // },
    { type: 'link', id: 'why-us', name: 'Why Us', href: '/why-us' },
    { type: 'link', id: 'contact', name: 'Contact Us', href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/20 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(10,18,39,0.06)] border-b border-white/25 py-1.5 sm:py-2'
          : 'bg-white/10 backdrop-blur-xl shadow-[0_4px_20px_0_rgba(10,18,39,0.03)] border-b border-white/15 py-2 sm:py-2.5'
      }`}
    >
      {/* Glossy Top Specular Glass Reflection Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between gap-4">
          
          {/* 1. Left: Logo and Brand Name */}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="group flex min-w-0 items-center gap-2.5 sm:gap-3.5 shrink-0 select-none"
            aria-label="BluePrint Build-Con Home"
          >
            {/* Original Clean Logo Mark (No animation) */}
            <div className="relative flex h-[54px] w-[54px] sm:h-[64px] sm:w-[64px] shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/Just%20Logo-01.svg"
                alt="BluePrint Build-Con Logo"
                width={64}
                height={64}
                priority
                className="w-full h-full object-contain"
              />
            </div>

            {/* Brand Typography */}
            <div className="flex flex-col justify-center">
              <span className="text-[15px] sm:text-[18px] font-black leading-none tracking-tight font-heading">
                <span className="text-[#0052FF]">Blue</span>
                <span className="text-slate-900">Print</span>{' '}
                <span className="text-[#0052FF]">Build</span>
                <span className="text-slate-900">-Con</span>
              </span>
              <span className="mt-1 text-[7px] font-bold uppercase tracking-[0.22em] sm:text-[7.5px] sm:tracking-[0.25em] text-[#0052FF]">
                Your vision our victory
              </span>
            </div>
          </Link>

          {/* 2. Center: Navigation Links with Animated Blue Border & Active Pill */}
          <nav className="hidden lg:flex items-center justify-center flex-1 max-w-2xl px-2">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 12px 0px rgba(0, 82, 255, 0.25)',
                  '0 0 24px 3px rgba(0, 82, 255, 0.55)',
                  '0 0 12px 0px rgba(0, 82, 255, 0.25)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative p-[1.5px] rounded-full overflow-hidden"
            >
              {/* Rotating Conic Gradient Beam - Vibrant Blue Light Orbiting the Border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-[200%] bg-[conic-gradient(from_0deg,transparent_0_240deg,#0052FF_290deg,#00D2FF_330deg,#0052FF_360deg)] pointer-events-none"
              />

              <ul className="relative z-10 inline-flex items-center gap-1 p-1 rounded-full bg-white/80 border border-blue-400/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7)] backdrop-blur-xl">
                {navLinks.map((item) => {
                  const isActive = activeTab === item.id;
                  const isHovered = hoveredTab === item.id;

                  if (item.type === 'dropdown') {
                    return (
                      <li
                        key={item.id}
                        ref={workDropdownRef}
                        className="relative"
                        onMouseEnter={() => {
                          setIsWorkMenuOpen(true);
                          setHoveredTab(item.id);
                        }}
                        onMouseLeave={() => {
                          setIsWorkMenuOpen(false);
                          setHoveredTab(null);
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab(item.id);
                            setIsWorkMenuOpen((prev) => !prev);
                          }}
                          aria-expanded={isWorkMenuOpen}
                          aria-haspopup="true"
                          className={`relative z-10 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer select-none ${
                            isActive
                              ? 'text-white'
                              : 'text-slate-700 hover:text-[#0052FF]'
                          }`}
                        >
                          {/* Smooth Active Animated Background Pill */}
                          {isActive && (
                            <motion.div
                              layoutId="activeNavbarPill"
                              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0052FF] via-[#0042EC] to-[#0275F8] border border-blue-200/50"
                              style={{
                                boxShadow: '0 4px 16px rgba(0, 82, 255, 0.45), 0 0 12px rgba(0, 82, 255, 0.25)',
                              }}
                              transition={{
                                type: 'spring',
                                stiffness: 420,
                                damping: 32,
                              }}
                            />
                          )}

                          {/* Inactive Hover Indicator */}
                          {!isActive && isHovered && (
                            <motion.div
                              layoutId="hoverNavbarPill"
                              className="absolute inset-0 rounded-full bg-blue-50/90 border border-blue-200/70 shadow-xs"
                              transition={{
                                type: 'spring',
                                stiffness: 500,
                                damping: 35,
                              }}
                            />
                          )}

                          <span className="relative z-10">{item.name}</span>
                          <ChevronDown
                            size={14}
                            className={`relative z-10 transition-transform duration-300 ease-out ${
                              isWorkMenuOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {/* Work Dropdown Menu */}
                        <AnimatePresence>
                          {isWorkMenuOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.96 }}
                              transition={{ duration: 0.2, ease: 'easeOut' }}
                              className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 min-w-[230px]"
                            >
                              <div className="rounded-2xl border border-slate-200/90 bg-white/98 backdrop-blur-xl p-2 shadow-[0_12px_36px_-6px_rgba(10,18,39,0.16)] ring-1 ring-slate-900/5">
                                {item.submenu.map((sub) => {
                                  const isSubActive = pathname?.startsWith(sub.href);
                                  return (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      onClick={() => {
                                        setActiveTab('work');
                                        setIsWorkMenuOpen(false);
                                      }}
                                      className={`group flex flex-col gap-0.5 rounded-xl px-3.5 py-2.5 transition-all duration-150 ${
                                        isSubActive
                                          ? 'bg-blue-50/90 text-[#0052FF]'
                                          : 'text-slate-700 hover:bg-slate-50 hover:text-[#0052FF]'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold">{sub.name}</span>
                                        <ArrowRight
                                          size={13}
                                          className={`transition-transform duration-200 ${
                                            isSubActive
                                              ? 'translate-x-0.5 text-[#0052FF]'
                                              : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-slate-400'
                                          }`}
                                        />
                                      </div>
                                      <span className="text-[11px] text-slate-400 font-normal">
                                        {sub.description}
                                      </span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }

                  return (
                    <li
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => setHoveredTab(item.id)}
                      onMouseLeave={() => setHoveredTab(null)}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setActiveTab(item.id)}
                        className={`relative z-10 inline-flex items-center px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 select-none ${
                          isActive
                            ? 'text-white'
                            : 'text-slate-700 hover:text-[#0052FF]'
                        }`}
                      >
                        {/* Smooth Active Animated Background Pill */}
                        {isActive && (
                          <motion.div
                            layoutId="activeNavbarPill"
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0052FF] via-[#0042EC] to-[#0275F8] border border-blue-200/50"
                            style={{
                              boxShadow: '0 4px 16px rgba(0, 82, 255, 0.45), 0 0 12px rgba(0, 82, 255, 0.25)',
                            }}
                            transition={{
                              type: 'spring',
                              stiffness: 420,
                              damping: 32,
                            }}
                          />
                        )}

                        {/* Inactive Hover Indicator */}
                        {!isActive && isHovered && (
                          <motion.div
                            layoutId="hoverNavbarPill"
                            className="absolute inset-0 rounded-full bg-blue-50/90 border border-blue-200/70 shadow-xs"
                            transition={{
                              type: 'spring',
                              stiffness: 500,
                              damping: 35,
                            }}
                          />
                        )}

                        <motion.span
                          whileHover={!isActive ? { scale: 1.05 } : undefined}
                          whileTap={{ scale: 0.96 }}
                          className="relative z-10"
                        >
                          {item.name}
                        </motion.span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </nav>

          {/* 3. Right: Location Selector & Refer & Earn Button */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Location Selector (Hyderabad Pill) */}
            <div>
              <LocationSelector />
            </div>

            {/* Refer & Earn Button with Animated Gift Icon */}
            <Link
              href="/refer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#0052FF] via-[#4F46E5] to-[#7C3AED] hover:from-[#0042EC] hover:via-[#4338CA] hover:to-[#6D28D9] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-600/25 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-600/35 hover:scale-[1.03] active:scale-[0.98] select-none"
            >
              {/* Subtle shimmer reflection */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

              <span>Refer &amp; Earn</span>

              {/* Animated Gift Badge */}
              <motion.span
                animate={{
                  rotate: [0, -12, 12, -8, 8, 0],
                  scale: [1, 1.08, 1.08, 1, 1, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8,
                  ease: 'easeInOut',
                  repeatDelay: 1.5,
                }}
                className="flex items-center justify-center rounded-full bg-amber-400/25 p-1 ring-1 ring-amber-400/40 text-amber-300"
              >
                <Gift size={14} className="text-amber-300 fill-amber-300/30" />
              </motion.span>
            </Link>
          </div>

          {/* 4. Mobile Controls: Hamburger Toggle (Location moved to mobile drawer) */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              className="p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* 5. Mobile Drawer Menu with Animated Navigation Pills */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/30 bg-white/95 backdrop-blur-2xl shadow-xl lg:hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {/* Mobile Location Selector in Drawer */}
              <div className="flex items-center justify-between p-2.5 px-3 rounded-2xl bg-blue-50/70 border border-blue-100/80 mb-3 shadow-2xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Select Location
                </span>
                <LocationSelector />
              </div>
              {navLinks.map((item) => {
                const isActive = activeTab === item.id;

                if (item.type === 'dropdown') {
                  return (
                    <div key={item.id} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileWorkOpen((prev) => !prev);
                        }}
                        className={`flex w-full items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-[#0052FF] to-[#0275F8] text-white shadow-md shadow-blue-500/20'
                            : 'text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${
                            isMobileWorkOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Mobile Work Submenu */}
                      <AnimatePresence>
                        {isMobileWorkOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden pl-3 space-y-1 border-l-2 border-blue-200 ml-4 my-1"
                          >
                            {item.submenu.map((sub) => {
                              const isSubActive = pathname?.startsWith(sub.href);
                              return (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => {
                                    setActiveTab('work');
                                    setIsMobileMenuOpen(false);
                                    setIsMobileWorkOpen(false);
                                  }}
                                  className={`block px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                                    isSubActive
                                      ? 'bg-blue-50 text-[#0052FF] font-bold'
                                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                  }`}
                                >
                                  {sub.name}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0052FF] to-[#0275F8] text-white shadow-md shadow-blue-500/20'
                        : 'text-slate-800 hover:bg-slate-100 hover:text-[#0052FF]'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-white shadow-xs" />
                    )}
                  </Link>
                );
              })}

              {/* Mobile Refer & Earn Full-Width CTA */}
              <div className="pt-2">
                <Link
                  href="/refer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#0052FF] via-[#4F46E5] to-[#7C3AED] text-white font-bold text-sm shadow-md shadow-indigo-600/25 active:scale-[0.98] transition-all"
                >
                  <span>Refer &amp; Earn Rewards</span>
                  <Gift size={16} className="text-amber-300" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
