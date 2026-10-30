'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageSquare, ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import { faqs } from '@/data/faqs';

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

  const rawWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9561186693';
  const whatsappNumber = rawWhatsapp.startsWith('91')
    ? rawWhatsapp
    : `91${rawWhatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <section id="faq" className="py-20 lg:py-28 bg-slate-50/70 relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">
              <HelpCircle size={14} className="shrink-0" />
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight mb-4">
              Clear Answers to Common Questions
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Learn more about our transparent pricing, architectural planning, quality inspections, and execution process.
            </p>
          </motion.div>

          {/* Quick Action: Expand/Collapse All */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={toggleAll}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:border-brand-orange/40 hover:text-brand-orange transition-all shadow-sm cursor-pointer"
            >
              <ChevronsUpDown size={14} />
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
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
                className={`group rounded-2xl sm:rounded-3xl border bg-white transition-all duration-300 flex flex-col ${
                  isOpen
                    ? 'border-brand-orange/50 ring-1 ring-brand-orange/20 shadow-[0_12px_32px_rgba(228,107,60,0.1)] -translate-y-0.5'
                    : 'border-slate-200/90 shadow-[0_4px_16px_rgba(10,18,39,0.03)] hover:border-slate-300 hover:shadow-[0_12px_28px_rgba(10,18,39,0.06)] hover:-translate-y-0.5'
                }`}
              >
                {/* Clickable Card Header */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 sm:p-7 flex flex-col text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-2xl sm:rounded-3xl"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    {/* Number Badge */}
                    <span
                      className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all duration-300 ${
                        isOpen
                          ? 'bg-brand-orange text-white shadow-sm shadow-brand-orange/40'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-brand-orange/10 group-hover:text-brand-orange'
                      }`}
                    >
                      FAQ {formattedNumber}
                    </span>

                    {/* Circular Action Toggle */}
                    <div
                      className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? 'bg-brand-orange text-white rotate-180 shadow-md shadow-brand-orange/30'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-brand-orange/10 group-hover:text-brand-orange'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Question Title */}
                  <h3
                    className={`font-bold text-base sm:text-lg lg:text-[19px] leading-snug transition-colors duration-200 ${
                      isOpen
                        ? 'text-brand-navy'
                        : 'text-slate-800 group-hover:text-brand-orange'
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
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 pb-6 pt-0">
                        <div className="pt-4 border-t border-slate-100 text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                          {faq.answer}
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
          className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-brand-navy text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-white/10 max-w-6xl mx-auto"
        >
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
              Still have questions about your build?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl">
              Speak directly with our experienced engineering and architectural team for advice tailored to your project.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-lg hover:shadow-orange-500/25 text-center"
            >
              Contact Us
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/15 text-center"
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
