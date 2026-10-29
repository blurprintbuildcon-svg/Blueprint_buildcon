'use client';

import { useEffect, useRef } from 'react';
import { X, Gift } from 'lucide-react';
import ReferralForm from './ReferralForm';

type ReferralModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ReferralModal({ isOpen, onClose }: ReferralModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="referral-modal-title"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      style={{ overscrollBehavior: 'contain' }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in zoom-in-95 duration-200"
        style={{ overscrollBehavior: 'contain' }}
      >
        {/* Top Decorative Header Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-brand-orange via-blue-600 to-brand-navy shrink-0" />

        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close referral dialog"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition shadow-sm"
        >
          <X size={18} />
        </button>

        {/* Scrollable Form Body with custom scrollbar */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-1 sm:p-2">
          <ReferralForm isModal={true} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}

