import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-white pt-10 sm:pt-12 pb-6 border-t border-slate-700/80 overflow-hidden font-sans">
      {/* Background Image with Balanced Medium Dark Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/footer-bg.jpg"
          alt="BluePrint BuildCon Construction Team"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Medium dark overlay (balanced: image clearly visible while keeping text crisp) */}
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/45 to-slate-950/75" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Main Grid: Brand & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 items-start">

          {/* Column 1: Brand & About (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 sm:gap-3.5 select-none"
              aria-label="BluePrint Build-Con Home"
            >
              {/* Logo Mark with Crisp White Frame for 100% Visibility */}
              <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-white p-1.5 sm:p-2 shadow-lg shadow-black/25 ring-2 ring-white/30 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/Just%20Logo-01.svg"
                  alt="BluePrint Build-Con Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col justify-center">
                <span className="text-[17px] sm:text-[20px] font-black leading-none tracking-tight font-heading drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                  <span className="text-[#0052FF]">Blue</span>
                  <span className="text-white">Print</span>{' '}
                  <span className="text-[#0052FF]">Build</span>
                  <span className="text-white">-Con</span>
                </span>
                <span className="mt-1 text-[7.5px] sm:text-[8px] font-bold uppercase tracking-[0.22em] sm:tracking-[0.25em] text-[#0052FF] drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                  Your vision our victory
                </span>
              </div>
            </Link>

            {/* Trust Tags Row */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-lg shadow-sm">
                <ShieldCheck size={13} className="text-[#0275F8] shrink-0" />
                <span>End-to-End Civil &amp; Architectural Excellence</span>
              </div>
            </div>
          </div>

          {/* Column 2: Contact Information (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-3 lg:pl-4">
            <h4 className="font-heading text-[11px] font-bold uppercase tracking-[0.22em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] mb-2">
              Contact Us
            </h4>

            <ul className="space-y-2.5">
              {/* Phone */}
              <li>
                <a
                  href="tel:+919028346900"
                  className="group flex items-center gap-3 p-2.5 px-3 rounded-xl transition-all duration-200 bg-black/60 backdrop-blur-md border border-white/20 hover:border-[#0275F8] hover:bg-black/80 shadow-md"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0275F8] flex items-center justify-center shrink-0 text-white shadow-sm">
                    <Phone size={15} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Direct Line / Call</span>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                      +91 9028346900
                    </span>
                  </div>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:project@blueprintbuildcon.homes"
                  className="group flex items-center gap-3 p-2.5 px-3 rounded-xl transition-all duration-200 bg-black/60 backdrop-blur-md border border-white/20 hover:border-[#0275F8] hover:bg-black/80 shadow-md"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0275F8] flex items-center justify-center shrink-0 text-white shadow-sm">
                    <Mail size={15} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Project Enquiry Email</span>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                      project@blueprintbuildcon.homes
                    </span>
                  </div>
                </a>
              </li>

              {/* Address */}
              <li className="flex items-start gap-3 p-2.5 px-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 shadow-md">
                <div className="w-8 h-8 rounded-lg bg-[#0275F8] flex items-center justify-center shrink-0 text-white mt-0.5 shadow-sm">
                  <MapPin size={15} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Office Location</span>
                  <p className="text-[11px] sm:text-xs text-white/95 leading-snug mt-0.5 font-medium">
                    WORK FLO, ICON TOWER 7TH FLOOR OFFICE NO 702, BANER ROAD, BANER, OPP KFC, BANER, PUNE (MUNICIPAL CORPORATION.), PUNE CITY, PUNE, 411045
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="border-t border-white/20 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-white/90 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
          <p className="tracking-wide">
            &copy; {currentYear}{' '}
            <span className="font-semibold text-white">BluePrint Build-Con</span>. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-blue-300 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span className="text-white/60">•</span>
            <Link
              href="/terms"
              className="hover:text-blue-300 transition-colors duration-200"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
