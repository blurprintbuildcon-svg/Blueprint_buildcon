'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import Link from 'next/link';
import type { PublicService } from '@/lib/public-content';

export default function ServicesSection({ services: providedServices }: { services?: PublicService[] }) {
  const serviceData = providedServices ?? services;
  return (
    <section id="services" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-6">
              Complete Construction Solutions
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to turn your vision into a finished space.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((service, idx) => {
            const serviceMatchId = ('iconName' in service ? service.iconName : undefined) ?? service.id;
            const ServiceIcon = services.find((item) => item.id === serviceMatchId)?.icon ?? services[0].icon;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-brand-gray rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg z-20">
                    <ServiceIcon className="w-6 h-6 text-brand-orange" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-brand-navy mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-6 line-clamp-3">
                    {service.description}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-brand-orange font-semibold hover:text-blue-700 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
