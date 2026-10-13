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
} from 'lucide-react';

export default function WhyChooseUs() {
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
    <section id="why-us" className="relative overflow-hidden bg-white py-14 text-brand-navy lg:py-24">
      <div className="absolute left-0 top-0 h-full w-2 bg-brand-orange" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-orange">The BluePrint standard</p>
            <h2 className="max-w-lg text-4xl font-bold leading-[0.95] tracking-[-0.05em] md:text-5xl lg:text-6xl">
              Why Build With Us?
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl text-base leading-7 text-slate-500 md:text-lg md:leading-8"
          >
            A better build starts with better decisions. We bring the people, process, and accountability needed to keep your project clear, confident, and on track from day one.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative min-h-56 overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(10,18,39,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/50 hover:shadow-[0_18px_35px_rgba(10,18,39,0.08)]"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center bg-brand-gray text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white">
                  <benefit.icon size={22} strokeWidth={1.8} />
                </div>
                <span className="text-[11px] font-bold tracking-[0.2em] text-slate-300">0{idx + 1}</span>
              </div>
              <h3 className="mb-3 text-lg font-bold leading-tight tracking-[-0.02em] text-brand-navy md:text-xl">{benefit.title}</h3>
              <p className="text-[15px] leading-6 text-slate-500">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
