import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#0a1227] via-[#090f20] to-[#060a17] text-white pt-20 pb-10 border-t border-slate-800/80 overflow-hidden font-sans">
      {/* Top Ambient Glow & Light Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* Column 1: Brand (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="group inline-flex items-center gap-3.5">
              <div className="relative flex items-center justify-center w-13 h-13 rounded-2xl bg-white/10 ring-1 ring-white/20 p-2.5 backdrop-blur-md transition-all duration-300 group-hover:bg-white/15 group-hover:ring-brand-orange/60 group-hover:scale-105 shadow-lg shadow-black/20">
                <Image
                  src="/logo-mark.png"
                  alt="BluePrint BuildCon"
                  width={46}
                  height={46}
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-extrabold tracking-tight text-white leading-tight">
                  BluePrint<span className="text-brand-orange"> BuildCon</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-blue-200/80 mt-0.5">
                  Ideas • Structures • Reality
                </span>
              </div>
            </Link>

            {/* Motto Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold tracking-wide">
              <Sparkles size={12} className="shrink-0" />
              <span>From Blueprint to Reality</span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Providing complete, transparent, and high-quality construction solutions for residential and commercial projects.
            </p>

            {/* Quality Assurance Trust Tag */}
            <div className="flex items-center gap-2.5 pt-1 text-xs text-slate-400">
              <ShieldCheck size={16} className="text-brand-orange shrink-0" />
              <span>End-to-End Civil &amp; Architectural Excellence</span>
            </div>
          </div>

          {/* Column 2: Company (2 cols on lg) */}
          <div className="lg:col-span-2 lg:pl-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-white/90 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              Company
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/about"
                  className="group inline-flex items-center text-slate-400 hover:text-white transition-all duration-200 text-sm hover:translate-x-1"
                >
                  <span className="transition-colors">About Us</span>
                  <ArrowUpRight size={13} className="opacity-0 -ml-1 text-brand-orange transition-all duration-200 group-hover:opacity-100 group-hover:ml-1" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="group inline-flex items-center text-slate-400 hover:text-white transition-all duration-200 text-sm hover:translate-x-1"
                >
                  <span className="transition-colors">Services</span>
                  <ArrowUpRight size={13} className="opacity-0 -ml-1 text-brand-orange transition-all duration-200 group-hover:opacity-100 group-hover:ml-1" />
                </Link>
              </li>
              <li>
                <Link
                  href="/refer"
                  className="group inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-all duration-200 text-sm font-semibold hover:translate-x-1"
                >
                  <span>Refer &amp; Earn Rewards</span>
                  <span className="text-[10px] bg-gradient-to-r from-amber-400/25 to-orange-400/25 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-md font-bold tracking-wide shadow-xs">
                    Earn ₹
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="group inline-flex items-center text-slate-400 hover:text-white transition-all duration-200 text-sm hover:translate-x-1"
                >
                  <span className="transition-colors">Careers</span>
                  <ArrowUpRight size={13} className="opacity-0 -ml-1 text-brand-orange transition-all duration-200 group-hover:opacity-100 group-hover:ml-1" />
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group inline-flex items-center text-slate-400 hover:text-white transition-all duration-200 text-sm hover:translate-x-1"
                >
                  <span className="transition-colors">Contact</span>
                  <ArrowUpRight size={13} className="opacity-0 -ml-1 text-brand-orange transition-all duration-200 group-hover:opacity-100 group-hover:ml-1" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (3 cols on lg) */}
          <div className="lg:col-span-3 lg:pl-2">
            <h4 className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-white/90 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              Services
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/services"
                  className="group inline-flex items-center text-slate-400 hover:text-white transition-all duration-200 text-sm hover:translate-x-1"
                >
                  <span className="transition-colors">Home Construction</span>
                  <ArrowUpRight size={13} className="opacity-0 -ml-1 text-brand-orange transition-all duration-200 group-hover:opacity-100 group-hover:ml-1" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="group inline-flex items-center text-slate-400 hover:text-white transition-all duration-200 text-sm hover:translate-x-1"
                >
                  <span className="transition-colors">Commercial Construction</span>
                  <ArrowUpRight size={13} className="opacity-0 -ml-1 text-brand-orange transition-all duration-200 group-hover:opacity-100 group-hover:ml-1" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="group inline-flex items-center text-slate-400 hover:text-white transition-all duration-200 text-sm hover:translate-x-1"
                >
                  <span className="transition-colors">Architectural Design</span>
                  <ArrowUpRight size={13} className="opacity-0 -ml-1 text-brand-orange transition-all duration-200 group-hover:opacity-100 group-hover:ml-1" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="group inline-flex items-center text-slate-400 hover:text-white transition-all duration-200 text-sm hover:translate-x-1"
                >
                  <span className="transition-colors">Renovation</span>
                  <ArrowUpRight size={13} className="opacity-0 -ml-1 text-brand-orange transition-all duration-200 group-hover:opacity-100 group-hover:ml-1" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="group inline-flex items-center text-slate-400 hover:text-white transition-all duration-200 text-sm hover:translate-x-1"
                >
                  <span className="transition-colors">Interior &amp; Finishing</span>
                  <ArrowUpRight size={13} className="opacity-0 -ml-1 text-brand-orange transition-all duration-200 group-hover:opacity-100 group-hover:ml-1" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact (3 cols on lg) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-white/90 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              Contact
            </h4>
            <ul className="space-y-4">
              {/* Phone */}
              <li>
                <a
                  href="tel:+919028346900"
                  className="group flex items-start gap-3.5 p-2 -ml-2 rounded-xl transition-all duration-200 hover:bg-white/5"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/10 ring-1 ring-white/15 flex items-center justify-center shrink-0 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                    <Phone size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Call Us</span>
                    <span className="text-sm font-semibold text-white group-hover:text-brand-orange transition-colors">
                      +91 9028346900
                    </span>
                  </div>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:project@blueprintbuildcon.homes"
                  className="group flex items-start gap-3.5 p-2 -ml-2 rounded-xl transition-all duration-200 hover:bg-white/5"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/10 ring-1 ring-white/15 flex items-center justify-center shrink-0 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                    <Mail size={16} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email Us</span>
                    <span className="text-sm font-semibold text-white group-hover:text-brand-orange transition-colors truncate">
                      project@blueprintbuildcon.homes
                    </span>
                  </div>
                </a>
              </li>

              {/* Address */}
              <li className="flex items-start gap-3.5 p-2 -ml-2">
                <div className="w-9 h-9 rounded-lg bg-white/10 ring-1 ring-white/15 flex items-center justify-center shrink-0 text-brand-orange mt-0.5">
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Office Location</span>
                  <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                    WORK FLO, ICON TOWER 7TH FLOOR OFFICE NO 702, BANER ROAD, BANER, OPP KFC, BANER, PUNE (MUNICIPAL CORPORATION.), PUNE CITY, PUNE, 411045
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="tracking-wide">
            &copy; {currentYear}{' '}
            <span className="font-semibold text-white">BluePrint BuildCon</span>. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-700">•</span>
            <Link
              href="/terms"
              className="hover:text-white transition-colors duration-200"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-slate-700">•</span>
            <Link
              href="/privacy-policy#cookies"
              className="hover:text-white transition-colors duration-200"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
