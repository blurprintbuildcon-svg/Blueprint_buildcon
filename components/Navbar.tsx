'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Gift, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type NavLink =
  | { type: 'link'; name: string; href: string; highlight?: boolean }
  | { type: 'dropdown'; name: string; submenu: { name: string; href: string }[] };

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBranchesSlide, setIsBranchesSlide] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWorkMenuOpen, setIsWorkMenuOpen] = useState(false);
  const [isMobileWorkOpen, setIsMobileWorkOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const showDarkNav = isHomePage && isBranchesSlide;
  const showSolidNav = isScrolled || !isHomePage || showDarkNav;
  const useLightNavText = (!showSolidNav && isHomePage) || showDarkNav;
  const isActiveLink = (href: string) =>
    pathname === href || (href !== '/' && Boolean(pathname?.startsWith(`${href}/`)));
  const isWorkActive = isActiveLink('/process') || isActiveLink('/projects');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleBranchSlide = (event: Event) => {
      setIsBranchesSlide((event as CustomEvent<boolean>).detail);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hero-branches-visibility', handleBranchSlide);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hero-branches-visibility', handleBranchSlide);
    };
  }, []);

  const navLinks: NavLink[] = [
    { type: 'link', name: 'Home', href: '/' },
    { type: 'link', name: 'About', href: '/about' },
    { type: 'link', name: 'Services', href: '/services' },
    {
      type: 'dropdown',
      name: 'Work',
      submenu: [
        { name: 'Process', href: '/process' },
        { name: 'Portfolio', href: '/projects' },
      ],
    },
    { type: 'link', name: 'Why Us', href: '/why-us' },
    { type: 'link', name: 'Refer & Earn', href: '/refer', highlight: true },
    { type: 'link', name: 'Contact Us', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-2.5 transition-colors duration-300 ${
        showDarkNav
          ? 'border-b border-white/10 bg-brand-navy shadow-lg shadow-slate-950/20'
          : showSolidNav
            ? 'border-b border-slate-200/80 bg-white/95 shadow-md shadow-slate-900/5 backdrop-blur-md'
            : 'border-b border-white/10 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Name */}
          <Link href="/" className="group flex min-w-0 items-center gap-2 sm:gap-3 flex-shrink-0">
            <div
              className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl p-1.5 transition-all duration-300 group-hover:scale-105 sm:h-11 sm:w-11 ${
                showSolidNav
                  ? 'bg-gradient-to-br from-blue-50 to-white shadow-md shadow-blue-900/5 ring-1 ring-blue-500/20'
                  : 'bg-white/95 shadow-lg shadow-black/20 ring-1 ring-white/60'
              }`}
            >
              <Image
                src="/logo-mark.png"
                alt="BluePrint BuildCon"
                width={40}
                height={40}
                priority
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-base font-extrabold leading-none tracking-tight sm:text-xl ${
                  useLightNavText ? 'text-white drop-shadow-sm' : 'text-brand-navy'
                }`}
              >
                BluePrint<span className="text-brand-orange"> BuildCon</span>
              </span>
              <span
                className={`mt-1 text-[7px] font-bold uppercase tracking-[0.16em] transition-colors sm:text-[8.5px] sm:tracking-[0.24em] ${
                  useLightNavText
                    ? 'text-blue-100/90 group-hover:text-white'
                    : 'text-slate-400 group-hover:text-brand-orange'
                }`}
              >
                Ideas • Structures • Reality
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-7">
            <ul className="flex items-center space-x-6">
              {navLinks.map((link) =>
                link.type === 'dropdown' ? (
                  <li
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setIsWorkMenuOpen(true)}
                    onMouseLeave={() => setIsWorkMenuOpen(false)}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') setIsWorkMenuOpen(false);
                    }}
                  >
                    <button
                      type="button"
                      aria-expanded={isWorkMenuOpen}
                      aria-controls="desktop-work-links"
                      onClick={() => setIsWorkMenuOpen(true)}
                      className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-brand-orange ${
                        isWorkActive
                          ? `font-semibold underline decoration-2 underline-offset-8 ${
                              showDarkNav ? 'text-sky-300' : 'text-brand-orange'
                            }`
                          : showSolidNav
                            ? showDarkNav ? 'text-white' : 'text-brand-charcoal'
                            : 'text-white'
                      }`}
                    >
                      {link.name}
                      <ChevronDown size={15} aria-hidden="true" />
                    </button>
                    {isWorkMenuOpen && (
                      <ul
                        id="desktop-work-links"
                        className="absolute left-0 top-full min-w-40 rounded-xl border border-slate-100 bg-white p-2 pt-3 shadow-xl"
                      >
                        {link.submenu.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => setIsWorkMenuOpen(false)}
                              aria-current={isActiveLink(item.href) ? 'page' : undefined}
                              className={`block rounded-lg px-4 py-2.5 text-sm transition-colors hover:bg-blue-50 hover:text-brand-orange ${
                                isActiveLink(item.href)
                                  ? 'font-semibold text-brand-orange'
                                  : 'text-brand-charcoal'
                              }`}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      aria-current={isActiveLink(link.href) ? 'page' : undefined}
                      className={link.highlight
                        ? 'inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:from-blue-700 hover:to-violet-700 hover:shadow-lg'
                        : `text-sm font-medium transition-colors hover:text-brand-orange inline-flex items-center gap-1.5 ${
                        isActiveLink(link.href)
                          ? `font-semibold underline decoration-2 underline-offset-8 ${
                              showDarkNav ? 'text-sky-300' : 'text-brand-orange'
                            }`
                          : showSolidNav
                            ? showDarkNav ? 'text-white' : 'text-brand-charcoal'
                            : 'text-white'
                      }`}
                    >
                      <span>{link.name}</span>
                      {link.highlight && <Gift size={15} aria-hidden="true" className="text-amber-200" />}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`p-2 lg:hidden ${useLightNavText ? 'text-white' : 'text-brand-navy'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu
                size={24}
                className={useLightNavText ? 'text-white' : 'text-brand-navy'}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg lg:hidden"
          >
            <div className="flex flex-col px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) =>
                link.type === 'dropdown' ? (
                  <div key={link.name}>
                    <button
                      type="button"
                      aria-expanded={isMobileWorkOpen}
                      aria-controls="mobile-work-links"
                      onClick={() => setIsMobileWorkOpen((open) => !open)}
                      className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 font-medium transition-colors ${
                        isWorkActive
                          ? 'bg-blue-50 font-semibold text-brand-orange'
                          : 'text-brand-charcoal hover:bg-brand-gray'
                      }`}
                    >
                      {link.name}
                      <ChevronDown
                        size={18}
                        aria-hidden="true"
                        className={`transition-transform ${isMobileWorkOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isMobileWorkOpen && (
                      <ul id="mobile-work-links" className="ml-4 mt-1 space-y-1 border-l border-slate-200 pl-3">
                        {link.submenu.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileWorkOpen(false);
                              }}
                              aria-current={isActiveLink(item.href) ? 'page' : undefined}
                              className={`block rounded-lg px-4 py-2.5 transition-colors ${
                                isActiveLink(item.href)
                                  ? 'bg-blue-50 font-semibold text-brand-orange'
                                  : 'font-medium text-brand-charcoal hover:bg-brand-gray'
                              }`}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-current={isActiveLink(link.href) ? 'page' : undefined}
                    className={link.highlight
                      ? 'flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2.5 font-semibold text-white shadow-sm'
                      : `flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors ${
                        isActiveLink(link.href)
                          ? 'bg-blue-50 font-semibold text-brand-orange'
                          : 'font-medium text-brand-charcoal hover:bg-brand-gray'
                      }`}
                  >
                    <span>{link.name}</span>
                    {link.highlight && <Gift size={17} aria-hidden="true" className="text-amber-200" />}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
