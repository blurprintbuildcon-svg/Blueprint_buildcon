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
    <section id="about" className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Construction Site Supervision"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Element */}
            <div className="absolute -bottom-8 -right-8 bg-brand-navy p-8 rounded-xl shadow-xl hidden md:block">
              <p className="text-white text-4xl font-bold mb-1">15+</p>
              <p className="text-brand-orange font-medium">Years of Trust</p>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-6 leading-tight text-balance">
              Building More Than Structures.<br />
              <span className="text-brand-orange">Building Trust.</span>
            </h2>
            
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Blueprint Build Con provides complete construction solutions for residential and commercial projects. Our experienced team brings together planning, architecture, engineering, construction, quality control and project management under one roof.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-brand-orange mr-3 shrink-0" />
                  <span className="text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center px-8 py-3.5 bg-brand-navy text-white font-semibold rounded-full hover:bg-slate-800 transition-colors shadow-lg"
            >
              Know More About Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
