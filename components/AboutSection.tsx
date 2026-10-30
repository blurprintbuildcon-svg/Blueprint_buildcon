'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutSection() {
  const features = [
    'End-to-end project management',
    'Experienced engineers and contractors',
    'Transparent costing',
    'Quality-controlled construction',
    'Timely project execution',
    'Dedicated project support',
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          
          {/* Left: Image matching text height */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-full h-full min-h-[320px] sm:min-h-[380px] lg:min-h-full flex"
          >
            <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px] lg:min-h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl ring-1 ring-slate-900/10 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=85&w=1200"
                alt="BluePrint BuildCon Modern Architectural Building Project"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange mb-3">
              About BluePrint BuildCon
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-5 leading-tight text-balance">
              Building More Than Structures.<br />
              <span className="text-brand-orange">Building Trust.</span>
            </h2>
            
            <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
              BluePrint BuildCon provides complete construction solutions for residential and commercial projects. Our experienced team brings together planning, architecture, engineering, construction, quality control and project management under one roof.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange mr-3 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>

            <div>
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-3.5 bg-brand-navy text-white font-semibold rounded-full hover:bg-slate-800 transition-colors shadow-lg cursor-pointer"
              >
                Know More About Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
