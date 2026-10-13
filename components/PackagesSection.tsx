'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { packages } from '@/data/packages';
import Link from 'next/link';

export default function PackagesSection() {
  return (
    <section id="packages" className="py-20 lg:py-32 bg-brand-gray relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-6">
              Construction Packages
            </h2>
            <p className="text-lg text-slate-600">
              Choose a package that matches your project requirements.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-white rounded-3xl p-8 relative flex flex-col ${
                pkg.popular 
                  ? 'border-2 border-brand-orange shadow-2xl scale-105 z-10' 
                  : 'border border-slate-200 shadow-lg'
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-orange text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-brand-navy mb-2">{pkg.name}</h3>
                <p className="text-slate-500 text-sm h-10">{pkg.description}</p>
                <div className="mt-6 text-brand-navy font-bold text-3xl">
                  Custom Quote
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className={`w-full py-4 rounded-xl text-center font-bold transition-all ${
                  pkg.popular
                    ? 'bg-brand-orange text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20'
                    : 'bg-slate-100 text-brand-navy hover:bg-slate-200'
                }`}
              >
                {pkg.ctaText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
