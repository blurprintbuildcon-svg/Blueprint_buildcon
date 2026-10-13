'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const showSolidNav = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    // { name: 'Cities', href: '/#cities' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Process', href: '/process' },
    { name: 'Projects', href: '/projects' },
    // { name: 'Packages', href: '/packages' },
    { name: 'Why Us', href: '/why-us' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showSolidNav
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2.5'
          : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3 flex-shrink-0">
            <div className={`relative flex items-center justify-center w-11 h-11 rounded-xl p-1.5 transition-all duration-300 group-hover:scale-105 ${
              showSolidNav
                ? 'bg-gradient-to-br from-blue-50 to-white shadow-md shadow-blue-900/5 ring-1 ring-blue-500/20'
                : 'bg-white/95 shadow-lg shadow-black/20 ring-1 ring-white/60'
            }`}>
              <Image
                src="/logo-mark.png"
                alt="BluePrint-BuildCon"
                width={40}
                height={40}
                priority
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-extrabold tracking-tight leading-none ${
                showSolidNav ? 'text-brand-navy' : 'text-brand-navy lg:text-white'
              }`}>
                BluePrint<span className="text-brand-orange">-BuildCon</span>
              </span>
              <span className={`text-[8.5px] font-bold uppercase tracking-[0.24em] mt-1 transition-colors ${
                showSolidNav ? 'text-slate-400 group-hover:text-brand-orange' : 'text-slate-500 lg:text-blue-100/80 group-hover:text-white'
              }`}>
                Ideas • Structures • Reality
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-brand-orange ${showSolidNav ? 'text-brand-charcoal' : 'text-brand-charcoal lg:text-white'
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-brand-orange text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
            >
              Get Free Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-brand-navy"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} className={showSolidNav ? 'text-brand-navy' : 'text-brand-navy lg:text-white'} />}
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
            <div className="flex flex-col px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-brand-charcoal font-medium hover:bg-brand-gray rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 mx-4 px-6 py-3 bg-brand-orange text-white text-center font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
              >
                Get Free Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
