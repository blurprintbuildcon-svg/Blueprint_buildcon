
'use client';

import { motion } from 'framer-motion';
import { Star, Quote, Sparkles } from 'lucide-react';
import { testimonials as fallbackTestimonials } from '@/data/testimonials';
import TestimonialForm from '@/components/TestimonialForm';
import { useEffect, useState, useCallback } from 'react';

type DynamicTestimonial = {
  _id: string;
  fullname: string;
  feedback: string;
  rating: number;
  createdAt?: string;
};

type DisplayItem = {
  id: string;
  name: string;
  role: string;
  rating: number;
  feedback: string;
  avatar?: string;
  isDynamic?: boolean;
};

export default function TestimonialsSection() {
  const [dynamicTestimonials, setDynamicTestimonials] = useState<DynamicTestimonial[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  const fetchTestimonials = useCallback(() => {
    fetch('/api/testimonials')
      .then(async (res) => {
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          setDynamicTestimonials(result.data);
        }
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const allTestimonials: DisplayItem[] = [
    ...dynamicTestimonials.map((d) => ({
      id: d._id,
      name: d.fullname,
      role: 'Verified Client • New Feedback',
      rating: d.rating,
      feedback: d.feedback,
      isDynamic: true,
    })),
    ...fallbackTestimonials.map((f) => ({
      id: f.id,
      name: f.name,
      role: `${f.projectType} • ${f.location}`,
      rating: f.rating,
      feedback: f.text,
      avatar: f.avatar,
      isDynamic: false,
    })),
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating - i >= 1) {
        stars.push(<Star key={i} fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />);
      } else if (rating - i === 0.5) {
        stars.push(
          <div key={i} className="relative w-4 h-4 sm:w-5 sm:h-5 text-amber-400">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 absolute" />
            <div className="absolute overflow-hidden w-[10px] h-5">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 opacity-30" />);
      }
    }
    return stars;
  };

  const renderTestimonialCard = (item: DisplayItem, keySuffix: string) => (
    <div
      key={`${item.id}-${keySuffix}`}
      className="flex-shrink-0 w-[310px] sm:w-[380px] md:w-[420px] bg-slate-50/70 border border-slate-200/90 rounded-3xl p-7 md:p-9 relative shadow-[0_4px_20px_rgba(10,18,39,0.03)] hover:shadow-[0_16px_36px_rgba(10,18,39,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
    >
      <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-200" />

      <div>
        <div className="flex items-center gap-1 text-amber-400 mb-5">
          {renderStars(item.rating)}
          <span className="ml-2 text-xs font-bold text-slate-500">
            {item.rating.toFixed(1)}
          </span>
        </div>

        <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed italic relative z-10 line-clamp-5">
          &ldquo;{item.feedback}&rdquo;
        </p>
      </div>

      <div className="flex items-center pt-4 border-t border-slate-200/80 mt-auto">
        {item.avatar ? (
          <img
            src={item.avatar}
            alt={item.name}
            className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-brand-orange/20 shadow-sm"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-brand-navy text-white mr-4 flex items-center justify-center font-bold text-lg uppercase shadow-sm">
            {item.name.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <h4 className="font-bold text-brand-navy truncate text-base">{item.name}</h4>
          <p className="text-xs text-slate-500 truncate">{item.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="pt-16 pb-8 lg:pt-24 lg:pb-12 bg-white relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 -mt-20 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Styled Section Header */}
        <div className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            {/* Pill Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4 border border-brand-orange/15 shadow-sm">
              <Sparkles size={14} className="shrink-0" />
              <span>Client Reviews</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-navy leading-[1.08]">
              What Our Clients{' '}
              <span className="relative inline-block text-brand-orange">
                Say
                <span className="absolute -bottom-1.5 left-0 w-full h-1.5 bg-brand-orange/25 rounded-full" />
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Real stories and feedback from homeowners and commercial partners who trusted us with their build.
            </p>
          </motion.div>
        </div>

        {/* Continuous Auto-Scrolling Testimonials (Pauses on Hover) */}
        <div
          className="relative max-w-full overflow-hidden py-4 select-none"
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
            style={{
              animationDuration: `${Math.max(35, allTestimonials.length * 7)}s`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {/* Primary Set */}
            <div className="flex shrink-0 gap-6 pr-6">
              {allTestimonials.map((item) => renderTestimonialCard(item, 'primary'))}
            </div>

            {/* Seamless Duplicate Set for Infinite Continuous Scrolling */}
            <div className="flex shrink-0 gap-6 pr-6" aria-hidden="true">
              {allTestimonials.map((item) => renderTestimonialCard(item, 'duplicate'))}
            </div>
          </div>
        </div>

        {/* Feedback Submission Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14"
        >
          <TestimonialForm
            onTestimonialSubmitted={(newTestimonial) => {
              setDynamicTestimonials((prev) => [newTestimonial, ...prev]);
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

