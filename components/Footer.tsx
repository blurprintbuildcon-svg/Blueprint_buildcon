import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Sparkles, ShieldCheck, Gift } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#0a1227] via-[#090f20] to-[#060a17] text-white pt-20 pb-10 border-t border-slate-800/80 overflow-hidden font-sans">
      {/* Top Ambient Glow & Light Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Main Grid: Brand & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 items-start">
          
          {/* Column 1: Brand & About (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
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
                <span className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  BluePrint<span className="text-brand-orange"> BuildCon</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.26em] text-blue-200/80 mt-0.5">
                  Ideas • Structures • Reality
                </span>
              </div>
            </Link>

            {/* Motto Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold tracking-wide">
              <Sparkles size={13} className="shrink-0" />
              <span>From Blueprint to Reality</span>
            </div>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Providing complete, transparent, and high-quality construction solutions for residential and commercial projects.
            </p>

            {/* Trust Tags Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="inline-flex items-center gap-2 text-xs text-slate-300 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl">
                <ShieldCheck size={15} className="text-brand-orange shrink-0" />
                <span>End-to-End Civil &amp; Architectural Excellence</span>
              </div>

              <Link
                href="/refer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 px-3.5 py-1.5 rounded-xl transition-all duration-200"
              >
                <Gift size={14} className="text-amber-400 shrink-0" />
                <span>Refer a Project &amp; Earn Cash Rewards</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Contact Information (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-5 lg:pl-6">
            <h4 className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-white/90 mb-6">
              Contact Us
            </h4>

            <ul className="space-y-4">
              {/* Phone */}
              <li>
                <a
                  href="tel:+919028346900"
                  className="group flex items-start gap-4 p-3 rounded-2xl transition-all duration-200 bg-white/5 border border-white/10 hover:border-brand-orange/50 hover:bg-white/10"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/15 ring-1 ring-brand-orange/30 flex items-center justify-center shrink-0 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 shadow-sm">
                    <Phone size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Direct Line / Call</span>
                    <span className="text-sm sm:text-base font-semibold text-white group-hover:text-brand-orange transition-colors">
                      +91 9028346900
                    </span>
                  </div>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:project@blueprintbuildcon.homes"
                  className="group flex items-start gap-4 p-3 rounded-2xl transition-all duration-200 bg-white/5 border border-white/10 hover:border-brand-orange/50 hover:bg-white/10"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/15 ring-1 ring-brand-orange/30 flex items-center justify-center shrink-0 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 shadow-sm">
                    <Mail size={18} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Project Enquiry Email</span>
                    <span className="text-sm sm:text-base font-semibold text-white group-hover:text-brand-orange transition-colors truncate">
                      project@blueprintbuildcon.homes
                    </span>
                  </div>
                </a>
              </li>

              {/* Address */}
              <li className="flex items-start gap-4 p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/15 ring-1 ring-brand-orange/30 flex items-center justify-center shrink-0 text-brand-orange mt-0.5">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Office Location</span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-0.5">
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
