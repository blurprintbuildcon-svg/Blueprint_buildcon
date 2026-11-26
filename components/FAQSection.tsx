'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageSquare, ChevronsUpDown, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { faqs } from '@/data/faqs';
import { getWhatsAppNumber } from '@/lib/whatsapp';

export default function FAQSection() {
  // Allow multiple cards to be open independently in the grid (first two open by default)
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);

  const toggleFAQ = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleAll = () => {
    if (openIndices.length === faqs.length) {
      setOpenIndices([]);
    } else {
      setOpenIndices(faqs.map((_, i) => i));
    }
  };

  const allOpen = openIndices.length === faqs.length;

  const whatsappNumber = getWhatsAppNumber();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="pt-8 pb-20 lg:pt-14 lg:pb-28 bg-gradient-to-b from-white via-slate-50/80 to-slate-50 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-tr from-blue-400/10 via-cyan-400/5 to-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-[#0275F8] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <HelpCircle size={14} className="shrink-0 text-[#0275F8]" />
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight mb-4">
              <span className="animate-word-highlight" style={{ animationDelay: '0s', animationDuration: '5s' }}>Clear</span>{' '}
              <span className="animate-word-highlight" style={{ animationDelay: '1s', animationDuration: '5s' }}>Answers</span>{' '}
              <span className="animate-word-highlight" style={{ animationDelay: '2s', animationDuration: '5s' }}>to</span>{' '}
              <span className="animate-word-highlight" style={{ animationDelay: '3s', animationDuration: '5s' }}>Common</span>{' '}
              <span className="animate-word-highlight" style={{ animationDelay: '4s', animationDuration: '5s' }}>Questions</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Learn more about our transparent pricing, architectural planning, quality inspections, and execution process.
            </p>
          </motion.div>

          {/* Quick Action: Expand/Collapse All */}
          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={toggleAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 hover:border-[#0275F8]/50 hover:text-[#0275F8] hover:bg-blue-50/40 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronsUpDown size={15} className="text-[#0275F8]" />
              {allOpen ? 'Collapse All Questions' : 'Expand All Questions'}
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-6xl mx-auto items-start">
          {faqs.map((faq, index) => {
            const isOpen = openIndices.includes(index);
            const formattedNumber = String(index + 1).padStart(2, '0');

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col overflow-hidden ${
                  isOpen
                    ? 'bg-gradient-to-br from-white via-blue-50/20 to-white border-[#0275F8]/60 ring-2 ring-[#0275F8]/15 shadow-[0_16px_36px_-10px_rgba(2,117,248,0.18)]'
                    : 'bg-white/95 backdrop-blur-sm border-slate-200/90 shadow-[0_4px_20px_rgba(10,18,39,0.03)] hover:border-[#0275F8]/40 hover:shadow-[0_16px_32px_-8px_rgba(2,117,248,0.12)]'
                }`}
              >
                {/* Top Glowing Gradient Accent Bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-[#0275F8] to-cyan-400 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                />

                {/* Clickable Card Header */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 sm:p-7 flex flex-col text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0275F8] rounded-2xl sm:rounded-3xl"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center justify-between w-full mb-3.5">
                    {/* Number Badge with Sparkle */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono transition-all duration-300 ${
                          isOpen
                            ? 'bg-gradient-to-r from-blue-600 to-[#0275F8] text-white shadow-md shadow-blue-500/25 scale-105'
                            : 'bg-blue-50 text-[#0275F8] border border-blue-200/60 group-hover:bg-[#0275F8] group-hover:text-white'
                        }`}
                      >
                        <Sparkles size={12} className={isOpen ? 'text-amber-300 animate-pulse' : 'opacity-70'} />
                        FAQ {formattedNumber}
                      </span>
                      {isOpen && (
                        <span className="text-[11px] font-semibold text-[#0275F8] hidden sm:inline-flex items-center gap-1.5 animate-in fade-in duration-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0275F8] animate-ping" />
                          Answered
                        </span>
                      )}
                    </div>

                    {/* Circular Action Toggle */}
                    <div
                      className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? 'bg-gradient-to-tr from-blue-600 to-[#0275F8] text-white rotate-180 shadow-md shadow-blue-500/35 ring-4 ring-blue-100'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#0275F8] group-hover:scale-105'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Question Title */}
                  <h3
                    className={`font-bold text-base sm:text-lg lg:text-[19px] leading-snug transition-colors duration-200 ${
                      isOpen
                        ? 'text-[#0275F8]'
                        : 'text-slate-900 group-hover:text-[#0275F8]'
                    }`}
                  >
                    {faq.question}
                  </h3>
                </button>

                {/* Animated Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 pb-6 pt-0">
                        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-slate-50/70 to-blue-50/40 border border-blue-100/80 shadow-inner relative overflow-hidden">
                          {/* Left Accent Indicator */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0275F8] to-cyan-400 rounded-l" />
                          <div className="flex items-start gap-3 pl-1">
                            <CheckCircle2 size={18} className="text-[#0275F8] shrink-0 mt-0.5" />
                            <p className="text-slate-700 text-sm sm:text-[15px] leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-brand-navy text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-white/10 max-w-6xl mx-auto relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
              Still have questions about your build?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl">
              Speak directly with our experienced engineering and architectural team for advice tailored to your project.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 shrink-0 w-full sm:w-auto relative z-10">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-[#0275F8] hover:from-blue-700 hover:to-blue-600 text-white font-bold text-sm transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95 text-center"
            >
              Contact Us
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/15 active:scale-95 text-center"
            >
              <MessageSquare size={16} />
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
