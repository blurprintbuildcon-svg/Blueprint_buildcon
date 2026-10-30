'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { processSteps } from '@/data/processSteps';

export default function ProcessTimeline() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="process" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-6">
              From Blueprint to Reality
            </h2>

            <p className="text-lg text-slate-600">
              A simple, transparent process designed to make construction easier.
            </p>
          </motion.div>
        </div>

        {/* Continuous Auto-Scrolling Slider (Pauses on Hover) */}
        <div
          className="relative max-w-7xl mx-auto overflow-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Subtle edge gradient fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Marquee Track */}
          <div
            className="flex animate-continuous-scroll w-max"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {/* Primary Set */}
            <div className="flex shrink-0 gap-6 pr-6">
              {processSteps.map((step) => (
                <Link
                  key={step.id}
                  href={`/process/${step.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between w-[300px] sm:w-[350px] md:w-[380px] shrink-0"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Number */}
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.number}
                    </div>

                    {/* Hover Overlay Badge */}
                    <div className="absolute inset-0 bg-brand-navy/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 bg-white/95 text-brand-navy font-bold text-xs uppercase tracking-wider rounded-full shadow-lg">
                        View Details &rarr;
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-2xl font-bold text-brand-navy mb-3 group-hover:text-brand-orange transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-slate-600 leading-relaxed text-sm">
                        {step.shortDescription}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-orange uppercase tracking-wider">
                      <span>Explore Stage Details</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Seamless Duplicate Set for Infinite Continuous Scrolling */}
            <div className="flex shrink-0 gap-6 pr-6" aria-hidden="true">
              {processSteps.map((step) => (
                <Link
                  key={`${step.id}-duplicate`}
                  href={`/process/${step.id}`}
                  tabIndex={-1}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between w-[300px] sm:w-[350px] md:w-[380px] shrink-0"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Number */}
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.number}
                    </div>

                    {/* Hover Overlay Badge */}
                    <div className="absolute inset-0 bg-brand-navy/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 bg-white/95 text-brand-navy font-bold text-xs uppercase tracking-wider rounded-full shadow-lg">
                        View Details &rarr;
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-2xl font-bold text-brand-navy mb-3 group-hover:text-brand-orange transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-slate-600 leading-relaxed text-sm">
                        {step.shortDescription}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-orange uppercase tracking-wider">
                      <span>Explore Stage Details</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-brand-navy mb-6">Ready to Start Building?</h3>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 bg-brand-orange text-white font-semibold rounded-full hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
          >
            Book Free Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

