import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1 */}
          <div className="space-y-4">
            <Link href="/" className="group inline-flex items-center gap-3.5">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 ring-1 ring-white/20 p-2 backdrop-blur-md transition-all group-hover:bg-white/15 group-hover:ring-brand-orange/40 group-hover:scale-105">
                <Image
                  src="/logo-mark.png"
                  alt="BluePrint-BuildCon"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white leading-tight">
                  BluePrint<span className="text-brand-orange">-BuildCon</span>
                </span>
                <span className="text-[9.5px] font-semibold uppercase tracking-[0.24em] text-blue-200/80">
                  Ideas | Structures | Reality
                </span>
              </div>
            </Link>
            <p className="text-brand-orange font-medium text-sm">From Blueprint to Reality.</p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Providing complete, transparent, and high-quality construction solutions for residential and commercial projects.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm">About Us</Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-400 hover:text-white transition-colors text-sm">Projects</Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-white transition-colors text-sm">Services</Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Careers</Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-slate-400 hover:text-white transition-colors text-sm">Home Construction</Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-white transition-colors text-sm">Commercial Construction</Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-white transition-colors text-sm">Architectural Design</Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-white transition-colors text-sm">Renovation</Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-white transition-colors text-sm">Interior & Finishing</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-slate-400 text-sm">
                <Phone size={18} className="text-brand-orange mt-0.5 shrink-0" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-start space-x-3 text-slate-400 text-sm">
                <Mail size={18} className="text-brand-orange mt-0.5 shrink-0" />
                <span>info@blueprintbuildcon.com</span>
              </li>
              <li className="flex items-start space-x-3 text-slate-400 text-sm">
                <MapPin size={18} className="text-brand-orange mt-0.5 shrink-0" />
                <span>[Company Address], City, State, ZIP Code</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
          <p>© {currentYear} BluePrint-BuildCon. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
