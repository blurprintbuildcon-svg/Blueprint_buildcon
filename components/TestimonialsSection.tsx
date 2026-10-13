'use client';

import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
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
        stars.push(<Star key={i} fill="currentColor" className="w-5 h-5 text-yellow-400" />);
      } else if (rating - i === 0.5) {
        stars.push(
          <div key={i} className="relative w-5 h-5 text-yellow-400">
            <Star className="w-5 h-5 absolute" />
            <div className="absolute overflow-hidden w-[10px] h-5">
              <Star className="w-5 h-5 fill-current" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-yellow-400 opacity-30" />);
      }
    }
    return stars;
  };

  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange mb-3 block">
                Client Reviews
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy">
                What Our Clients Say
              </h2>
              <div className="w-20 h-1 bg-brand-orange mt-4 rounded-full" />
            </motion.div>
          </div>

          {/* Carousel Arrows */}
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll testimonials left"
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-brand-navy bg-white hover:bg-brand-gray hover:border-brand-orange transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll testimonials right"
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-brand-navy bg-white hover:bg-brand-gray hover:border-brand-orange transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            >
              <ChevronRight size={22} />
            </button>
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
              className="flex-shrink-0 w-[310px] sm:w-[380px] md:w-[420px] snap-start bg-brand-gray border border-slate-100 rounded-3xl p-7 md:p-9 relative shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-200" />

              <div>
                <div className="flex items-center gap-1 text-yellow-400 mb-5">
                  {renderStars(item.rating)}
                  <span className="ml-2 text-xs font-bold text-slate-500">
                    {item.rating.toFixed(1)}
                  </span>
                </div>

                <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed italic relative z-10 line-clamp-5">
                  &ldquo;{item.feedback}&rdquo;
                </p>
              </div>

              <div className="flex items-center pt-4 border-t border-slate-200/60 mt-auto">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-brand-orange/20"
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
