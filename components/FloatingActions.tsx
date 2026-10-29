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
  const whatsappNumber = rawWhatsapp.startsWith('91') ? rawWhatsapp : `91${rawWhatsapp.replace(/[^0-9]/g, '')}`;
  const phoneNumber = '+919028346900';

  return (
            <>
              <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
                {/* Refer & Earn Floating Action */}
                <button
                  type="button"
                  onClick={() => setIsReferralOpen(true)}
                  className="group relative flex items-center bg-gradient-to-r from-brand-orange to-brand-navy text-white p-3 md:py-3 md:px-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ring-2 ring-blue-400/30"
                  aria-label="Refer a Project and Earn Cash Rewards"
                >
                  <span className="absolute -top-1.5 -left-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 text-[9px] font-extrabold text-brand-navy items-center justify-center shadow">
                      ₹
                    </span>
              </span>
              <Gift size={22} className="text-amber-300 shrink-0" />
              <span className="hidden md:block ml-2 text-sm font-bold tracking-tight">Refer &amp; Earn</span>
            </button>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center bg-[#25D366] text-white p-3 md:py-3 md:px-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={22} />
              <span className="hidden md:block ml-2 text-sm font-medium">WhatsApp</span>
            </a>

            {/* Call Button */}
            <a
              href={`tel:${phoneNumber}`}
              className="group flex items-center bg-brand-navy text-white p-3 md:py-3 md:px-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              aria-label="Call Now"
            >
              <Phone size={22} />
              <span className="hidden md:block ml-2 text-sm font-medium">Call Now</span>
            </a>
          </div>

          {/* Global Referral Modal */}
          <ReferralModal isOpen={isReferralOpen} onClose={() => setIsReferralOpen(false)} />
        </>
        );
}
