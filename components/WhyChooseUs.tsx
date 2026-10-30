'use client';

import { motion } from 'framer-motion';
import {
  BadgeCheck,
  Clock3,
  Handshake,
  HardHat,
  Layers3,
  MessageCircle,
  ReceiptText,
  SlidersHorizontal,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function WhyChooseUs() {
  const highlights = [
    'Fixed Scope & Pricing',
    'Certified Quality Materials',
    'Single Point of Contact',
  ];

  const benefits = [
    {
      title: 'Transparent Pricing',
      description: 'No hidden surprises. Get clear estimates and defined project scope.',
      icon: ReceiptText,
    },
    {
      title: 'Quality Materials',
      description: 'We use carefully selected materials and follow defined quality standards.',
      icon: Layers3,
    },
    {
      title: 'Experienced Professionals',
      description: 'Architects, engineers, supervisors and skilled construction teams.',
      icon: HardHat,
    },
    {
      title: 'Timely Execution',
      description: 'Structured planning and regular monitoring to keep projects moving.',
      icon: Clock3,
    },
    {
      title: 'Dedicated Support',
      description: 'A dedicated team to answer questions and keep you updated.',
      icon: MessageCircle,
    },
    {
      title: 'Quality Assurance',
      description: 'Regular site inspections and quality checks throughout construction.',
      icon: BadgeCheck,
    },
    {
      title: 'Customized Solutions',
      description: 'Solutions designed around your plot, budget, lifestyle and requirements.',
      icon: SlidersHorizontal,
    },
    {
      title: 'Complete Responsibility',
      description: 'One construction partner from planning to final handover.',
      icon: Handshake,
    }
  ];

  return (
    <section id="why-us" className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white pt-6 pb-20 text-brand-navy lg:pt-10 lg:pb-28">
      {/* Subtle Ambient Decorative Lights */}
      <div className="absolute top-0 right-0 -mt-24 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-24 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-14 lg:mb-20 grid gap-8 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            {/* Pill Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-5 border border-brand-orange/15 shadow-sm">
              <Sparkles size={14} className="shrink-0" />
              <span>The Blueprint Standard</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-navy leading-[1.08]">
              Why Build With{' '}
              <span className="relative inline-block text-brand-orange">
                Us?
                <span className="absolute -bottom-1.5 left-0 w-full h-1.5 bg-brand-orange/25 rounded-full" />
              </span>
            </h2>
          </motion.div>

          {/* Right Column: Description & Trust Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col justify-end"
          >
            <div className="border-l-2 border-brand-orange/40 pl-5 mb-5">
              <p className="text-base sm:text-lg leading-relaxed text-slate-600">
                A better build starts with better decisions. We bring the people, process, and accountability needed to keep your project clear, confident, and on track from day one.
              </p>
            </div>

            {/* Quick Trust Badges */}
            <div className="flex flex-wrap gap-2.5 pl-5">
              {highlights.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-sm"
                >
                  <CheckCircle2 size={13} className="text-brand-orange shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Benefit Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(10,18,39,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-orange/50 hover:shadow-[0_16px_36px_rgba(10,18,39,0.08)]"
            >
              {/* Top Accent Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange to-amber-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white group-hover:scale-105 shadow-sm">
                    <benefit.icon size={22} strokeWidth={2} />
                  </div>
                  <span className="font-mono text-xs font-bold tracking-wider text-slate-300 transition-colors group-hover:text-brand-orange">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mb-2.5 text-lg sm:text-xl font-bold tracking-tight text-brand-navy group-hover:text-brand-orange transition-colors">
                  {benefit.title}
                </h3>
              </div>

              <p className="text-sm sm:text-[15px] leading-relaxed text-slate-500 mt-2">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
