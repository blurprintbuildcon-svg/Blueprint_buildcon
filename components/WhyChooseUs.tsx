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
} from 'lucide-react';

const benefitCardVariants: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 95, damping: 17 },
  },
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
        {/* Section Header (Centered & Balanced) */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Pill Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4 border border-brand-orange/15 shadow-sm">
              <Sparkles size={14} className="shrink-0" />
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
                  <CheckCircle2 size={13} className="text-brand-orange shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Benefit Cards Grid */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              variants={benefitCardVariants}
              whileHover={{
                y: -10,
                scale: 1.035,
                rotateX: 2,
                rotateY: -1,
                transition: { type: 'spring', stiffness: 280, damping: 18 },
              }}
              whileTap={{ scale: 0.98 }}
              style={{ transformPerspective: 1000 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(10,18,39,0.03)] transition-[border-color,box-shadow] duration-300 hover:border-brand-orange/50 hover:shadow-[0_18px_42px_rgba(10,18,39,0.12)]"
            >
              {/* Top Accent Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange to-amber-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/[0.04] via-transparent to-brand-orange/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-70" />
              </div>

              <div>
                <div className="mb-6 flex items-center justify-between">
                  <motion.div
                    initial={{ rotate: 360, scale: 0 }}
                    whileInView={{ rotate: 0, scale: 1 }}
                    viewport={{ once: true }}
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      rotate: { duration: 0.6, delay: idx * 0.1 + 0.15, ease: 'easeOut' },
                      scale: { duration: 0.6, delay: idx * 0.1 + 0.15, ease: 'easeOut' },
                      y: { duration: 2.8, repeat: Infinity, delay: idx * 0.22, ease: 'easeInOut' },
                    }}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange transition-colors duration-300 group-hover:bg-brand-orange group-hover:text-white shadow-sm"
                  >
                    <benefit.icon size={22} strokeWidth={2} />
                  </motion.div>
                  <span className="font-mono text-xs font-bold tracking-wider text-slate-300 transition-colors group-hover:text-brand-orange">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mb-2.5 text-lg sm:text-xl font-bold tracking-tight text-brand-navy group-hover:text-brand-orange transition-colors">
                  {benefit.title}
                </h3>
              </div>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 + 0.2 }}
                className="text-sm sm:text-[15px] leading-relaxed text-slate-500 mt-2"
              >
                {benefit.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
