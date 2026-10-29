'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

type BackButtonProps = {
  fallbackHref?: string;
  label?: string;
  className?: string;
};

export default function BackButton({
  fallbackHref = '/',
  label = 'Back',
  className = '',
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // If the browser has history, navigate back; otherwise go to fallback
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-brand-orange border border-slate-200 shadow-xs text-xs sm:text-sm font-semibold transition-all cursor-pointer group ${className}`}
      aria-label={label}
    >
      <ArrowLeft
        size={16}
        className="transition-transform group-hover:-translate-x-1 text-slate-500 group-hover:text-brand-orange"
      />
      <span>{label}</span>
    </button>
  );
}

