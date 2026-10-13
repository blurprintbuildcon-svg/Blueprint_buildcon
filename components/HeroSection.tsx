'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    message: '',
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsFormOpen(true);

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!isFormOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFormOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFormOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error ?? 'Unable to submit your enquiry');
      }

      setIsSubmitted(true);
      setFormData({ name: '', phone: '', company: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to submit your enquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-charcoal">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-navy/70 mix-blend-multiply z-10" />
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"
          alt="Modern House Construction"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20 py-12 lg:py-24">
        <div className="max-w-3xl">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Build Your Dream.<br />
                <span className="text-brand-orange">We&apos;ll Build It Right.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl leading-relaxed">
                End-to-end construction solutions designed around your vision, budget and timeline — from the first blueprint to the final handover.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 bg-brand-orange text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 flex items-center"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/services"
                  className="px-8 py-3.5 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 backdrop-blur-sm transition-all border border-white/20"
                >
                  Explore Our Services
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/20">
                {[
                  'Transparent Pricing',
                  'Quality Construction',
                  'Professional Team',
                  'End-to-End Support'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center text-sm font-medium text-slate-200">
                    <CheckCircle2 className="text-brand-orange w-4 h-4 mr-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="consultation-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsFormOpen(false); }}>
          <motion.div initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.25 }} className="relative grid max-h-[90vh] w-full max-w-5xl overflow-hidden bg-white shadow-2xl md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative hidden min-h-[420px] overflow-hidden bg-brand-navy md:block">
              <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=85&w=1000" alt="Blueprint Build Con construction project" className="absolute inset-0 h-full w-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-brand-navy/70" />
              <div className="relative flex h-full flex-col justify-end p-8 text-white lg:p-10">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-orange">BluePrint-BuildCon</p>
                <h2 className="max-w-sm text-4xl font-bold leading-tight">Build your vision with confidence.</h2>
                <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">Tell us a little about your project and our team will help you find the right next step.</p>
              </div>
            </div>

            <div className="relative min-h-0 overflow-y-auto p-5 sm:p-6 md:p-7">
              <button type="button" aria-label="Close consultation form" onClick={() => setIsFormOpen(false)} className="absolute right-5 top-5 text-slate-400 transition-colors hover:text-brand-navy"><X size={24} /></button>
              <h2 id="consultation-title" className="pr-8 text-2xl font-bold leading-tight text-brand-navy sm:text-3xl">Let Us Help You With the Right Solution</h2>

              {isSubmitted ? (
                <div className="mt-8 space-y-4 border border-green-200 bg-green-50 p-6 text-center text-green-700"><CheckCircle2 className="mx-auto h-12 w-12 text-green-500" /><p className="text-lg font-bold">Thank you!</p><p>Our construction expert will contact you shortly.</p></div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                  {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
                  <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} className="w-full border border-blue-300 px-4 py-2.5 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
                  <input type="tel" name="phone" placeholder="Your Phone Number" required value={formData.phone} onChange={handleChange} className="w-full border border-blue-300 px-4 py-2.5 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
                  <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} className="w-full border border-blue-300 px-4 py-2.5 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
                  <textarea name="message" placeholder="Message..." rows={2} value={formData.message} onChange={handleChange} className="w-full resize-none border border-blue-300 px-4 py-2.5 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
                  <p className="text-sm font-medium leading-5 text-blue-700">By clicking Sign Up, you confirm that you have read and agree to our Terms &amp; Conditions and Privacy Policy.</p>
                  <label className="flex items-start gap-2 text-sm leading-5 text-blue-700"><input type="checkbox" required className="mt-1 h-4 w-4 accent-blue-600" /><span>By submitting this form, you agree to be contacted by us on <strong>WhatsApp / SMS / Email</strong> regarding your enquiry.</span></label>
                  <div className="grid grid-cols-2 gap-3 pt-1"><button type="button" onClick={() => setIsFormOpen(false)} className="bg-blue-100 px-4 py-2.5 font-semibold text-blue-700 transition hover:bg-blue-200">Skip</button><button type="submit" disabled={isSubmitting} className="bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60">{isSubmitting ? 'Submitting...' : 'Sign Up'}</button></div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
