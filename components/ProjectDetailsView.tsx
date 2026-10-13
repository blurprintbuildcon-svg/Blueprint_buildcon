'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Clock,
  Ruler,
  Building2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Phone,
  MessageCircle,
  Share2,
  CheckCircle2,
  ShieldCheck,
  HardHat,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import type { PublicProject } from '@/lib/public-content';

type ProjectDetailsViewProps = {
  project: PublicProject;
  relatedProjects: PublicProject[];
};

export default function ProjectDetailsView({ project, relatedProjects }: ProjectDetailsViewProps) {
  const images = project.images && project.images.length > 0 ? project.images : [project.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') setActiveImageIndex((prev) => (prev + 1) % images.length);
      if (e.key === 'ArrowLeft') setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, images.length]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${project.title} | Blueprint Build Con`,
          text: project.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // User cancelled or clipboard denied
    }
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Blueprint BuildCon team, I am interested in knowing more about your project "${project.title}" (${project.location}) and would like to discuss a similar construction requirement.`
  );

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-brand-navy pt-24 pb-20">
      {/* Top Header / Breadcrumb Bar */}
      <section className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-slate-500">
              <Link href="/" className="hover:text-brand-orange transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-brand-orange transition-colors">
                Projects
              </Link>
              <span>/</span>
              <span className="text-slate-400 capitalize">{project.category}</span>
              <span>/</span>
              <span className="font-semibold text-brand-navy truncate max-w-[200px] sm:max-w-xs">
                {project.title}
              </span>
            </nav>

            {/* Back link & Share */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-brand-gray hover:bg-slate-200/70 rounded-full transition-colors"
                title="Share this project"
              >
                <Share2 size={13} />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>

              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange hover:text-blue-700 transition-colors"
              >
                <ArrowLeft size={14} />
                <span>All Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Project Showcase Header */}
      <section className="container mx-auto px-4 md:px-6 pt-8 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl"
        >
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-[0.18em] rounded-full bg-brand-blue-light text-brand-blue border border-brand-blue/20">
              {project.category}
            </span>
            {project.type && (
              <span className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">
                {project.type}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {project.details.completion ? project.details.completion : 'Completed'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-navy leading-[1.08] mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <MapPin size={16} className="text-brand-orange shrink-0" />
              <span className="font-medium text-slate-700">{project.location}</span>
            </div>
            {project.client && (
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Client:</span>
                <span className="font-medium text-slate-700">{project.client}</span>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Main Media Showcase (Hero Gallery) */}
      <section className="container mx-auto px-4 md:px-6 mb-12">
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-brand-navy shadow-xl shadow-brand-navy/5 border border-slate-200/80">
          {/* Main Visual Display */}
          <div className="relative h-[340px] sm:h-[450px] md:h-[560px] lg:h-[640px] w-full overflow-hidden bg-slate-900">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIndex}
                src={images[activeImageIndex]}
                alt={`${project.title} - view ${activeImageIndex + 1}`}
                initial={{ opacity: 0.2, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.2 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
              />
            </AnimatePresence>

            {/* Subtle Gradient Overlays for controls */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/20" />

            {/* Expand / Lightbox Button */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-medium rounded-xl transition-all shadow-md"
              aria-label="View Fullscreen"
            >
              <Maximize2 size={14} />
              <span className="hidden sm:inline">Fullscreen</span>
            </button>

            {/* Image counter indicator */}
            <div className="absolute bottom-5 left-5 z-20 px-3 py-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-semibold rounded-lg">
              {activeImageIndex + 1} / {images.length} Photos
            </div>

            {/* Arrows if multiple images */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 bg-white/80 hover:bg-white text-brand-navy rounded-full backdrop-blur-md shadow-lg transition-transform hover:scale-105"
                  aria-label="Previous Image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 bg-white/80 hover:bg-white text-brand-navy rounded-full backdrop-blur-md shadow-lg transition-transform hover:scale-105"
                  aria-label="Next Image"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Bar (if multiple photos) */}
          {images.length > 1 && (
            <div className="bg-white p-3 sm:p-4 border-t border-slate-100 flex items-center gap-3 overflow-x-auto scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 w-20 sm:w-28 h-14 sm:h-18 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-brand-blue ring-2 ring-brand-blue/30 scale-100'
                      : 'border-transparent opacity-70 hover:opacity-100 hover:scale-[1.02]'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* High-level Project Specifications Metrics Bar */}
      <section className="container mx-auto px-4 md:px-6 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                <Ruler size={18} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Area</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-brand-navy">
              {project.details.area || 'Custom Build'}
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                <Clock size={18} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Duration</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-brand-navy">
              {project.details.duration || 'Flexible Timeline'}
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Handover</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-brand-navy">
              {project.details.completion || 'Completed'}
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                <Building2 size={18} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-brand-navy">
              {project.category}
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative & Sticky Sidebar Details Grid */}
      <section className="container mx-auto px-4 md:px-6 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Story & Technical Scope (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Project Overview */}
            <div className="bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-brand-orange" />
                <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange">
                  Architectural Narrative
                </h2>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-5">
                About this Project
              </h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed whitespace-pre-line mb-6">
                {project.description}
              </p>

              {/* Additional Details Callout if present */}
              {project.additionalDetails && (
                <div className="mt-6 p-5 sm:p-6 bg-brand-gray rounded-2xl border-l-4 border-brand-orange">
                  <h4 className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-2">
                    Design & Engineering Highlights
                  </h4>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {project.additionalDetails}
                  </p>
                </div>
              )}
            </div>

            {/* Scope of Work */}
            <div className="bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-brand-orange" />
                <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange">
                  Execution Scope
                </h2>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-6">
                Scope of Work & Deliverables
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.scope.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-[#f8fafc] border border-slate-100 hover:border-blue-200 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-navy text-sm sm:text-base">{item}</p>
                      <p className="text-xs text-slate-500 mt-0.5">Executed to Blueprint BuildCon specifications</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Construction Standards / BluePrint Difference */}
            <div className="bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm">
              <h3 className="text-2xl font-bold text-brand-navy mb-6">
                Our Construction Assurance
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-gray text-brand-orange flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <h4 className="font-bold text-brand-navy text-base">Certified Quality</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    100+ quality checkpoint tests from soil compaction to core concrete strength and water tightness.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-gray text-brand-orange flex items-center justify-center">
                    <HardHat size={20} />
                  </div>
                  <h4 className="font-bold text-brand-navy text-base">Site Supervision</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Dedicated structural engineers and licensed architects supervising on-ground progress daily.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-gray text-brand-orange flex items-center justify-center">
                    <Compass size={20} />
                  </div>
                  <h4 className="font-bold text-brand-navy text-base">Fixed Milestones</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Zero hidden escalations with clear transparent milestone-based stage billing and timelines.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Quick Specs Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-navy mb-4 pb-3 border-b border-slate-100">
                  Project Specifications
                </h4>

                <dl className="space-y-3.5 text-sm">
                  <div className="flex justify-between items-center">
                    <dt className="text-slate-400">Category</dt>
                    <dd className="font-semibold text-brand-navy">{project.category}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-slate-400">Location</dt>
                    <dd className="font-semibold text-brand-navy text-right truncate max-w-[180px]">{project.location}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-slate-400">Built-Up Area</dt>
                    <dd className="font-semibold text-brand-navy">{project.details.area}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-slate-400">Duration</dt>
                    <dd className="font-semibold text-brand-navy">{project.details.duration}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-slate-400">Completion</dt>
                    <dd className="font-semibold text-brand-navy">{project.details.completion}</dd>
                  </div>
                  {project.client && (
                    <div className="flex justify-between items-center">
                      <dt className="text-slate-400">Client</dt>
                      <dd className="font-semibold text-brand-navy">{project.client}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Consultation / Talk to Us Box */}
              <div className="bg-brand-navy text-white rounded-2xl p-6 sm:p-7 shadow-xl shadow-brand-navy/15 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/15 rounded-full blur-2xl pointer-events-none" />

                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-orange mb-2 block">
                  Build Your Dream Project
                </span>
                <h3 className="text-2xl font-bold mb-3 leading-snug">
                  Planning something similar?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Get a comprehensive construction cost estimate and tailored architectural guidance from our engineering team.
                </p>

                <div className="space-y-3">
                  <Link
                    href={`/contact?subject=${encodeURIComponent(`Inquiry for project similar to ${project.title}`)}`}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-brand-orange hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-blue-600/30"
                  >
                    <span>Request Free Consultation</span>
                    <ArrowUpRight size={17} />
                  </Link>

                  <a
                    href={`https://wa.me/919999999999?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-colors"
                  >
                    <MessageCircle size={16} />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <a
                    href="tel:+919999999999"
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm transition-colors"
                  >
                    <Phone size={15} />
                    <span>Speak to an Engineer</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="bg-white py-16 md:py-20 border-t border-slate-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-orange mb-2">
                  Portfolio showcase
                </p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy">
                  More Featured Projects
                </h3>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 font-bold text-sm text-brand-orange hover:text-blue-700 transition-colors"
              >
                <span>View All Projects</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((item) => (
                <Link
                  key={item.id}
                  href={`/projects/${item.id}`}
                  className="group rounded-2xl overflow-hidden border border-slate-200/80 bg-white hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-60 overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h4 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-orange transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center text-slate-500 text-sm mb-3">
                      <MapPin size={15} className="mr-1 text-slate-400 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-1">
                      {item.description}
                    </p>
                    <span className="text-brand-orange text-sm font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                      View Project Details <ArrowUpRight size={16} className="ml-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-5 right-5 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Image counter */}
            <div className="absolute top-6 left-6 z-30 text-white text-sm font-semibold bg-white/10 px-3.5 py-1.5 rounded-full">
              {activeImageIndex + 1} / {images.length}
            </div>

            {/* Nav Prev */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Main Lightbox Image */}
            <div className="relative max-w-6xl max-h-[85vh] w-full flex items-center justify-center">
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={images[activeImageIndex]}
                alt={project.title}
                className="max-h-[82vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Nav Next */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            )}

            {/* Thumbnails in Lightbox */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2 max-w-[90vw] overflow-x-auto p-2 bg-black/40 rounded-xl backdrop-blur-sm">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-10 rounded overflow-hidden border-2 flex-shrink-0 transition-opacity ${
                      activeImageIndex === idx ? 'border-brand-blue opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
