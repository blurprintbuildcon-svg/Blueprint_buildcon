'use client';

import { motion } from 'framer-motion';
import { Calculator, Phone } from 'lucide-react';
import Link from 'next/link';

export default function EstimateCTA() {
  return (
    <section className="bg-brand-navy py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-slate-800/80 backdrop-blur-lg border border-slate-700 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between">
          
          <div className="mb-8 md:mb-0 md:max-w-xl text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Planning Your Construction Budget?
              </h2>
              <p className="text-slate-300 text-lg">
                Tell us about your project and get a customized construction estimate from our team.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
          >
            <Link
              href="/contact"
              className="flex items-center justify-center px-8 py-4 bg-brand-orange text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
            >
              <Calculator className="mr-2 w-5 h-5" />
              Get Free Estimate
            </Link>
            <Link
              href="tel:+919999999999"
              className="flex items-center justify-center px-8 py-4 bg-white text-brand-navy font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
            >
              <Phone className="mr-2 w-5 h-5" />
              Talk to an Expert
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
