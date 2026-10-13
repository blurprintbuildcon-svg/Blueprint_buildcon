'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ProcessTimeline() {
  const [activeImage, setActiveImage] = useState(0);

 const processSteps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We understand your requirements, budget, timeline, and vision for your construction project.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "02",
    title: "Planning & Design",
    description:
      "Our team develops detailed plans and designs that match your requirements and project goals.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "03",
    title: "Blueprint",
    description:
      "Detailed architectural blueprints and technical drawings are prepared before construction begins.",
    image:
      "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "04",
    title: "Construction",
    description:
      "Our experienced team manages the construction process while maintaining quality and timelines.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "05",
    title: "Quality Inspection",
    description:
      "Every stage is carefully inspected to ensure that the work meets required quality standards.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "06",
    title: "Handover",
    description:
      "Once everything is completed and inspected, your finished project is handed over to you.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
];

  const processImages = [
    {
      src: 'https://images.unsplash.com/photo-1503387762-59252a7b3c6a?auto=format&fit=crop&q=85&w=1600',
      alt: 'Architectural plans spread across a worktable',
      label: '01 / Planning',
      title: 'Every strong build starts with a clear plan.',
    },
    {
      src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=85&w=1600',
      alt: 'Construction team working on a building site',
      label: '02 / Construction',
      title: 'Experienced hands turn the plan into progress.',
    },
    {
      src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=85&w=1600',
      alt: 'Workers inspecting a concrete construction project',
      label: '03 / Quality',
      title: 'Quality checks keep every milestone accountable.',
    },
    {
      src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=85&w=1600',
      alt: 'Completed modern interior ready for handover',
      label: '04 / Handover',
      title: 'The finished space is ready for what comes next.',
    },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % processImages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [processImages.length]);


  ///for sliding 
 const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % processSteps.length);
  };

  const prevSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + processSteps.length) % processSteps.length
    );
  };
 ///for sliding 




  const showPreviousImage = () => {
    setActiveImage((current) => (current - 1 + processImages.length) % processImages.length);
  };

  const showNextImage = () => {
    setActiveImage((current) => (current + 1) % processImages.length);
  };

  return (
    <section id="process" className="bg-white mb-5">
      <div className="container mx-auto px-4 md:px-6">
 <section className="py-10 lg:py-16 bg-white">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16 px-4">
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

      {/* Slider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">

          {/* Cards */}
          <div className="overflow-hidden">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {processSteps
                .slice(current, current + 3)
                .concat(
                  current + 3 > processSteps.length
                    ? processSteps.slice(0, (current + 3) % processSteps.length)
                    : []
                )
                .map((step) => (
                  <div
                    key={step.number}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
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
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-brand-navy mb-3">
                        {step.title}
                      </h3>

                      <p className="text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
            </motion.div>
          </div>

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-12 h-12 rounded-full bg-brand-navy text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-12 h-12 rounded-full bg-brand-navy text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {processSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-8 bg-brand-navy"
                  : "w-2.5 bg-slate-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>


        {/* Timeline Container */}
        <div className="relative">
          {/* Horizontal Line for Desktop */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-slate-200 z-0"></div>

        
        </div>

        <div className="mx-auto mt-20 max-w-6xl">
          <div className="relative overflow-hidden bg-brand-navy">
            <motion.div
              key={processImages[activeImage].src}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-16/8 min-h-75"
            >
              <img
                src={processImages[activeImage].src}
                alt={processImages[activeImage].alt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-brand-navy/90 via-brand-navy/30 to-transparent" />
              <div className="absolute bottom-8 left-8 max-w-md text-white md:bottom-12 md:left-12">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-brand-orange">
                  {processImages[activeImage].label}
                </p>
                <h3 className="text-2xl font-bold leading-tight md:text-4xl">
                  {processImages[activeImage].title}
                </h3>
              </div>
            </motion.div>

            <div className="absolute bottom-7 right-7 flex gap-2 md:bottom-10 md:right-10">
              <button
                type="button"
                onClick={showPreviousImage}
                aria-label="Show previous process image"
                className="flex h-11 w-11 items-center justify-center border border-white/60 bg-brand-navy/70 text-white transition-colors hover:bg-brand-orange"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={showNextImage}
                aria-label="Show next process image"
                className="flex h-11 w-11 items-center justify-center border border-white/60 bg-brand-navy/70 text-white transition-colors hover:bg-brand-orange"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="mt-5 flex justify-center gap-2" role="tablist" aria-label="Process images">
            {processImages.map((image, index) => (
              <button
                key={image.label}
                type="button"
                role="tab"
                aria-label={`Show ${image.label.toLowerCase()} image`}
                aria-selected={activeImage === index}
                onClick={() => setActiveImage(index)}
                className={`h-1.5 transition-all ${activeImage === index ? 'w-10 bg-brand-orange' : 'w-5 bg-slate-300 hover:bg-slate-400'}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-brand-navy mb-6">Ready to Start Building?</h3>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 bg-brand-orange text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
          >
            Book Free Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section >
  );
}
