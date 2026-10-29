'use client';

import { useState } from 'react';
import { Phone, MessageCircle, Gift } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ReferralModal from './ReferralModal';

export default function FloatingActions() {
  const pathname = usePathname();
  const [isReferralOpen, setIsReferralOpen] = useState(false);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const rawWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9561186693';
  const whatsappNumber = rawWhatsapp.startsWith('91')
    ? rawWhatsapp
    : `91${rawWhatsapp.replace(/[^0-9]/g, '')}`;
  const phoneNumber = '+919028346900';

  return (
            <>
              <div className="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-end gap-3">
                {/* 1. Refer & Earn (Icon-Only) */}
                <div className="relative group/btn flex items-center">
                  <span className="pointer-events-none absolute right-full mr-2.5 hidden sm:group-hover/btn:block whitespace-nowrap rounded-lg bg-slate-900/95 px-2.5 py-1 text-xs font-semibold text-white shadow-lg transition-opacity">
                    Refer &amp; Earn
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsReferralOpen(true)}
                    className="relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-gradient-to-tr from-brand-orange to-brand-navy text-white shadow-lg hover:shadow-2xl hover:scale-108 active:scale-95 transition-all duration-300 ring-2 ring-blue-400/40 cursor-pointer"
                    aria-label="Refer a Project and Earn Cash Rewards"
                    title="Refer & Earn"
                  >
                    <span className="absolute -top-1 -left-1 flex h-4.5 w-4.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-amber-400 text-[10px] font-extrabold text-brand-navy items-center justify-center shadow">
                        ₹
                      </span>
                </span>
                <Gift size={22} className="text-amber-300 shrink-0" />
              </button>
            </div>

            {/* 2. WhatsApp (Icon-Only) */}
            <div className="relative group/btn flex items-center">
              <span className="pointer-events-none absolute right-full mr-2.5 hidden sm:group-hover/btn:block whitespace-nowrap rounded-lg bg-slate-900/95 px-2.5 py-1 text-xs font-semibold text-white shadow-lg transition-opacity">
                Chat on WhatsApp
              </span>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-lg hover:shadow-2xl hover:scale-108 active:scale-95 transition-all duration-300 cursor-pointer"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
              >
                <MessageCircle size={24} />
              </a>
            </div>

          {/* 3. Call Now (Icon-Only) */}
          <div className="relative group/btn flex items-center">
            <span className="pointer-events-none absolute right-full mr-2.5 hidden sm:group-hover/btn:block whitespace-nowrap rounded-lg bg-slate-900/95 px-2.5 py-1 text-xs font-semibold text-white shadow-lg transition-opacity">
              Call Now
            </span>
            <a
              href={`tel:${phoneNumber}`}
              className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-brand-navy hover:bg-slate-800 text-white shadow-lg hover:shadow-2xl hover:scale-108 active:scale-95 transition-all duration-300 ring-1 ring-white/10 cursor-pointer"
              aria-label="Call Now"
              title="Call Now"
            >
              <Phone size={22} />
            </a>
          </div>
      </div>

  {/* Global Referral Modal */ }
  <ReferralModal isOpen={isReferralOpen} onClose={() => setIsReferralOpen(false)} />
    </>
  );
}
