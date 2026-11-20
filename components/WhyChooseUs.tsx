'use client';

import { motion, type Variants } from 'framer-motion';
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
  ArrowRight,
} from 'lucide-react';

const benefitCardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.95 },
  visible: (idx: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      delay: idx * 0.07,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  }),
};

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
      tag: '100% Itemized',
      color: {
        hoverBorder: 'hover:border-blue-500/50',
        hoverShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(2,117,248,0.22)]',
        hoverTitle: 'group-hover:text-blue-600',
        hoverArrow: 'group-hover:text-blue-600',
        iconBg: 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-blue-500/25',
        badge: 'bg-blue-50 text-blue-700 border-blue-200/80',
        bgTint: 'bg-gradient-to-br from-blue-500/[0.04] via-cyan-500/[0.02] to-transparent',
        topLine: 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400',
        dot: 'bg-blue-500',
        numBadge: 'text-blue-600 bg-blue-50 border-blue-200/60',
      },
    },
    {
      title: 'Quality Materials',
      description: 'We use carefully selected materials and follow defined quality standards.',
      icon: Layers3,
      tag: 'Certified Grade',
      color: {
        hoverBorder: 'hover:border-emerald-500/50',
        hoverShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.22)]',
        hoverTitle: 'group-hover:text-emerald-600',
        hoverArrow: 'group-hover:text-emerald-600',
        iconBg: 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-emerald-500/25',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        bgTint: 'bg-gradient-to-br from-emerald-500/[0.04] via-teal-500/[0.02] to-transparent',
        topLine: 'bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-400',
        dot: 'bg-emerald-500',
        numBadge: 'text-emerald-600 bg-emerald-50 border-emerald-200/60',
      },
    },
    {
      title: 'Experienced Professionals',
      description: 'Architects, engineers, supervisors and skilled construction teams.',
      icon: HardHat,
      tag: 'Vetted Experts',
      color: {
        hoverBorder: 'hover:border-indigo-500/50',
        hoverShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.22)]',
        hoverTitle: 'group-hover:text-indigo-600',
        hoverArrow: 'group-hover:text-indigo-600',
        iconBg: 'bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-indigo-500/25',
        badge: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
        bgTint: 'bg-gradient-to-br from-indigo-500/[0.04] via-violet-500/[0.02] to-transparent',
        topLine: 'bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-400',
        dot: 'bg-indigo-500',
        numBadge: 'text-indigo-600 bg-indigo-50 border-indigo-200/60',
      },
    },
    {
      title: 'Timely Execution',
      description: 'Structured planning and regular monitoring to keep projects moving.',
      icon: Clock3,
      tag: 'On-Time Handover',
      color: {
        hoverBorder: 'hover:border-amber-500/50',
        hoverShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.22)]',
        hoverTitle: 'group-hover:text-amber-600',
        hoverArrow: 'group-hover:text-amber-600',
        iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-amber-500/25',
        badge: 'bg-amber-50 text-amber-800 border-amber-200/80',
        bgTint: 'bg-gradient-to-br from-amber-500/[0.04] via-orange-500/[0.02] to-transparent',
        topLine: 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400',
        dot: 'bg-amber-500',
        numBadge: 'text-amber-700 bg-amber-50 border-amber-200/60',
      },
    },
    {
      title: 'Dedicated Support',
      description: 'A dedicated team to answer questions and keep you updated.',
      icon: MessageCircle,
      tag: 'Always Available',
      color: {
        hoverBorder: 'hover:border-sky-500/50',
        hoverShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(14,165,233,0.22)]',
        hoverTitle: 'group-hover:text-sky-600',
        hoverArrow: 'group-hover:text-sky-600',
        iconBg: 'bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-sky-500/25',
        badge: 'bg-sky-50 text-sky-700 border-sky-200/80',
        bgTint: 'bg-gradient-to-br from-sky-500/[0.04] via-blue-500/[0.02] to-transparent',
        topLine: 'bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400',
        dot: 'bg-sky-500',
        numBadge: 'text-sky-600 bg-sky-50 border-sky-200/60',
      },
    },
    {
      title: 'Quality Assurance',
      description: 'Regular site inspections and quality checks throughout construction.',
      icon: BadgeCheck,
      tag: 'Multi-Point Audits',
      color: {
        hoverBorder: 'hover:border-purple-500/50',
        hoverShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.22)]',
        hoverTitle: 'group-hover:text-purple-600',
        hoverArrow: 'group-hover:text-purple-600',
        iconBg: 'bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-purple-500/25',
        badge: 'bg-purple-50 text-purple-700 border-purple-200/80',
        bgTint: 'bg-gradient-to-br from-purple-500/[0.04] via-pink-500/[0.02] to-transparent',
        topLine: 'bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-400',
        dot: 'bg-purple-500',
        numBadge: 'text-purple-600 bg-purple-50 border-purple-200/60',
      },
    },
    {
      title: 'Customized Solutions',
      description: 'Solutions designed around your plot, budget, lifestyle and requirements.',
      icon: SlidersHorizontal,
      tag: 'Tailored to You',
      color: {
        hoverBorder: 'hover:border-rose-500/50',
        hoverShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(244,63,94,0.22)]',
        hoverTitle: 'group-hover:text-rose-600',
        hoverArrow: 'group-hover:text-rose-600',
        iconBg: 'bg-gradient-to-tr from-rose-500 to-orange-500 text-white shadow-rose-500/25',
        badge: 'bg-rose-50 text-rose-700 border-rose-200/80',
        bgTint: 'bg-gradient-to-br from-rose-500/[0.04] via-orange-500/[0.02] to-transparent',
        topLine: 'bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400',
        dot: 'bg-rose-500',
        numBadge: 'text-rose-600 bg-rose-50 border-rose-200/60',
      },
    },
    {
      title: 'Complete Responsibility',
      description: 'One construction partner from planning to final handover.',
      icon: Handshake,
      tag: 'Single Ownership',
      color: {
        hoverBorder: 'hover:border-teal-500/50',
        hoverShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(20,184,166,0.22)]',
        hoverTitle: 'group-hover:text-teal-700',
        hoverArrow: 'group-hover:text-teal-700',
        iconBg: 'bg-gradient-to-tr from-blue-700 to-teal-600 text-white shadow-teal-500/25',
        badge: 'bg-teal-50 text-teal-800 border-teal-200/80',
        bgTint: 'bg-gradient-to-br from-teal-500/[0.04] via-blue-500/[0.02] to-transparent',
        topLine: 'bg-gradient-to-r from-blue-700 via-teal-500 to-emerald-400',
        dot: 'bg-teal-500',
        numBadge: 'text-teal-700 bg-teal-50 border-teal-200/60',
      },
    },
  ];

  return (
    <section id="why-us" className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white pt-6 pb-20 text-brand-navy lg:pt-10 lg:pb-28">
      {/* Subtle Ambient Decorative Lights */}
      <div className="absolute top-0 right-0 -mt-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-24 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header (Centered & Balanced) */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Pill Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0275F8] text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200/60 shadow-sm">
              <Sparkles size={14} className="shrink-0 text-[#0275F8]" />
              <span>The Blueprint Standard</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-navy leading-[1.08] mb-5">
              <span className="animate-word-highlight" style={{ animationDelay: '0s' }}>Why</span>{' '}
              <span className="animate-word-highlight" style={{ animationDelay: '1s' }}>Build</span>{' '}
              <span className="animate-word-highlight" style={{ animationDelay: '2s' }}>With</span>{' '}
              <span className="animate-word-highlight" style={{ animationDelay: '3s' }}>Us?</span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto mb-6">
              A better build starts with better decisions. We bring the people, process, and accountability needed to keep your project clear, confident, and on track from day one.
            </p>

            {/* Quick Trust Badges (Centered) */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {highlights.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm"
                >
                  <CheckCircle2 size={13} className="text-[#0275F8] shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Benefit Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={benefitCardVariants}
              whileHover={{
                y: -8,
                scale: 1.025,
                transition: { type: 'spring', stiffness: 350, damping: 20 },
              }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-6 sm:p-7 shadow-[0_4px_20px_rgba(10,18,39,0.04)] transition-all duration-300 ${benefit.color.hoverBorder} ${benefit.color.hoverShadow} overflow-hidden cursor-default`}
            >
              {/* Permanent Ambient Top Accent Line (Each card has its unique gradient) */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${benefit.color.topLine} opacity-80 group-hover:opacity-100 group-hover:h-1.5 transition-all duration-300 rounded-t-3xl`} />

              {/* Radiant Interior Background Tint (Unique to each card, visible all the time) */}
              <div className={`pointer-events-none absolute inset-0 rounded-3xl ${benefit.color.bgTint} opacity-100 transition-opacity duration-300 group-hover:opacity-100`} />

              {/* Subtle Faint Background Watermark Icon (Gives each card a custom visual identity) */}
              <div className="pointer-events-none absolute -bottom-6 -right-6 text-slate-900/[0.03] group-hover:text-slate-900/[0.06] transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-6">
                <benefit.icon size={130} strokeWidth={1.2} />
              </div>

              {/* Shimmer Light Beam Effect on Hover */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute -left-full top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[150%] group-hover:opacity-75" />
              </div>

              <div className="relative z-10">
                {/* Header Row: Floating Animated Gradient Icon and Step Badge */}
                <div className="mb-5 flex items-center justify-between">
                  {/* Icon with continuous breathing/floating animation so it is never static */}
                  <motion.div
                    animate={{
                      y: [0, -3.5, 0],
                    }}
                    transition={{
                      duration: 3 + (idx % 4) * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: idx * 0.2,
                    }}
                    className={`relative flex h-13 w-13 items-center justify-center rounded-2xl ${benefit.color.iconBg} shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg`}
                  >
                    <benefit.icon size={22} strokeWidth={2.2} />
                  </motion.div>

                  {/* Step Number Badge Styled With Card's Unique Theme */}
                  <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${benefit.color.numBadge} transition-all duration-300 shadow-xs`}>
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`mb-2 text-lg sm:text-[19px] font-bold tracking-tight text-slate-900 transition-colors duration-200 ${benefit.color.hoverTitle}`}>
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-slate-600 mt-2">
                  {benefit.description}
                </p>
              </div>

              {/* Card Footer: Distinct Colorful Pill Tag & Sliding Interactive Arrow */}
              <div className="relative z-10 mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border ${benefit.color.badge} shadow-2xs`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${benefit.color.dot} animate-pulse`} />
                  <span>{benefit.tag}</span>
                </span>
                
                <div className={`flex items-center gap-1 text-xs font-bold text-slate-400 ${benefit.color.hoverArrow} transition-colors duration-200`}>
                  <ArrowRight size={15} className="transform transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
