'use client';

import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { testimonials as fallbackTestimonials } from '@/data/testimonials';
import TestimonialForm from '@/components/TestimonialForm';
import { useEffect, useRef, useState, useCallback } from 'react';

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const updateScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [allTestimonials.length]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

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

  return (
    <section className="pt-16 pb-20 lg:pt-24 lg:pb-32 bg-white relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 -mt-20 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Styled Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-16">
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

          {/* Right: Rating Badge & Carousel Controls */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-between lg:justify-end mt-4 lg:mt-0">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
              <div className="flex items-center text-amber-400">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <span className="text-xs font-bold text-brand-navy">4.9 / 5 Rating</span>
            </div>

            {/* Carousel Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll testimonials left"
                className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-brand-navy bg-white hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm hover:shadow-md cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll testimonials right"
                className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-brand-navy bg-white hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm hover:shadow-md cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory custom-scrollbar select-none"
          style={{ scrollbarWidth: 'thin' }}
        >
          {allTestimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
              className="flex-shrink-0 w-[310px] sm:w-[380px] md:w-[420px] snap-start bg-slate-50/70 border border-slate-200/90 rounded-3xl p-7 md:p-9 relative shadow-[0_4px_20px_rgba(10,18,39,0.03)] hover:shadow-[0_16px_36px_rgba(10,18,39,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
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
            </motion.div>
          ))}
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
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
              }
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
