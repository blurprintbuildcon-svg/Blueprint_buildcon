'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function FloatingActions() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const whatsappNumber = "919999999999";
  const phoneNumber = "+919999999999";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center bg-[#25D366] text-white p-3 md:py-3 md:px-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
        <span className="hidden md:block ml-2 font-medium">WhatsApp</span>
      </a>

      {/* Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="group flex items-center bg-brand-navy text-white p-3 md:py-3 md:px-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        aria-label="Call Now"
      >
        <Phone size={24} />
        <span className="hidden md:block ml-2 font-medium">Call Now</span>
      </a>
    </div>
  );
}
