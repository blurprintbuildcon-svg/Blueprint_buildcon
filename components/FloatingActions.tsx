'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ReferralModal from './ReferralModal';
import { getWhatsAppNumber } from '@/lib/whatsapp';

export default function FloatingActions() {
  const pathname = usePathname();
  const [isReferralOpen, setIsReferralOpen] = useState(false);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const whatsappNumber = getWhatsAppNumber();
  const phoneNumber = '+919028346900';

  return (
    <>
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-5 z-40 flex flex-col items-end gap-2.5 sm:gap-3">
        {/* 1. Refer & Earn (Icon-Only with Float Animation) */}
        <div className="relative group/btn flex items-center">
          <span className="pointer-events-none absolute right-full mr-2.5 hidden sm:group-hover/btn:block whitespace-nowrap rounded-lg bg-slate-900/95 px-2.5 py-1 text-xs font-semibold text-white shadow-lg transition-opacity">
            Refer &amp; Earn
          </span>
          <motion.button
            type="button"
            onClick={() => setIsReferralOpen(true)}
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-gradient-to-tr from-[#0052FF] to-[#0A1227] text-white shadow-md hover:shadow-xl transition-shadow ring-2 ring-blue-400/40 cursor-pointer"
            aria-label="Refer a Project and Earn Cash Rewards"
            title="Refer & Earn"
          >
            <span className="absolute -top-1 -left-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 text-[8.5px] font-extrabold text-brand-navy items-center justify-center shadow">
                ₹
              </span>
            </span>
            <Gift size={18} className="text-amber-300 shrink-0" />
          </motion.button>
        </div>

        {/* 2. WhatsApp (Official App Icon with Pulse Animation) */}
        <div className="relative group/btn flex items-center">
          <span className="pointer-events-none absolute right-full mr-2.5 hidden sm:group-hover/btn:block whitespace-nowrap rounded-lg bg-slate-900/95 px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition-opacity">
            WhatsApp (+91 9028346900)
          </span>
          <motion.a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
            whileHover={{ scale: 1.14 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            aria-label="Chat on WhatsApp (+91 9028346900)"
            title="Chat on WhatsApp (+91 9028346900)"
          >
            {/* Subtle radar ping ring */}
            <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping -z-10 pointer-events-none opacity-40" />

            <Image
              src="/whatsapp-icon.png"
              alt="WhatsApp"
              width={44}
              height={44}
              className="w-full h-full object-cover"
            />
          </motion.a>
        </div>

        {/* 3. Call Now (Calling Phone Icon with Ringing Tilt Animation) */}
        <div className="relative group/btn flex items-center">
          <span className="pointer-events-none absolute right-full mr-2.5 hidden sm:group-hover/btn:block whitespace-nowrap rounded-lg bg-slate-900/95 px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition-opacity">
            Call +91 9028346900
          </span>
          <motion.a
            href={`tel:${phoneNumber}`}
            animate={{
              rotate: [0, -9, 9, -6, 6, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.14 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            aria-label="Call +91 9028346900"
            title="Call +91 9028346900"
          >
            {/* Subtle radar ping ring */}
            <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping -z-10 pointer-events-none opacity-40" style={{ animationDelay: '0.8s' }} />

            <Image
              src="/call-icon.png"
              alt="Call +91 9028346900"
              width={44}
              height={44}
              className="w-full h-full object-cover"
            />
          </motion.a>
        </div>
      </div>

      {/* Global Referral Modal */}
      <ReferralModal isOpen={isReferralOpen} onClose={() => setIsReferralOpen(false)} />
    </>
  );
}
