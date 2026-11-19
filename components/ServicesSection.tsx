'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import Link from 'next/link';
import type { PublicService } from '@/lib/public-content';

const serviceCardVariants: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 18 },
  },
};

export default function ServicesSection({ services: providedServices }: { services?: PublicService[] }) {
  const serviceData = providedServices ?? services;
  return (
    <section id="services" className="pt-20 pb-10 lg:pt-28 lg:pb-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-6">
              <span className="animate-word-highlight" style={{ animationDelay: '0s' }}>Complete</span>{' '}
              <span className="animate-word-highlight" style={{ animationDelay: '1s' }}>Construction</span>{' '}
              <span className="animate-word-highlight" style={{ animationDelay: '2s' }}>Solutions</span>
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to turn your vision into a finished space.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {serviceData.map((service, idx) => {
            const serviceMatchId = ('iconName' in service ? service.iconName : undefined) ?? service.id;
            const ServiceIcon = services.find((item) => item.id === serviceMatchId)?.icon ?? services[0].icon;

            return (
              <motion.div
                key={service.id}
                variants={serviceCardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  rotateX: 2,
                  transition: { type: 'spring', stiffness: 280, damping: 18 },
                }}
                whileTap={{ scale: 0.98 }}
                style={{ transformPerspective: 1000 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-brand-gray shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-brand-orange/50 hover:shadow-[0_18px_42px_rgba(10,18,39,0.12)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-orange to-amber-400 transition-transform duration-500 group-hover:scale-x-100" />
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: idx * 0.12 + 0.15, ease: 'easeOut' }}
                    whileHover={{ scale: 1.12, rotate: 360 }}
                    className="absolute top-4 right-4 z-20 rounded-full bg-white p-3 shadow-lg"
                  >
                    <ServiceIcon className="w-6 h-6 text-brand-orange" />
                  </motion.div>
                </div>
                <div className="p-8">
                  <h3 className="mb-3 text-xl font-bold text-brand-navy transition-colors duration-300 group-hover:text-brand-orange">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-6 line-clamp-3">
                    {service.description}
                  </p>
                  <Link
                    href={`/services/${service.id}`}
                    className="inline-flex items-center text-brand-orange font-semibold hover:text-blue-700 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
