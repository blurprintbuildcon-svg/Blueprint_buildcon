'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Phone, Sparkles } from 'lucide-react';

type ServiceEnquiryFormProps = {
  currentServiceTitle?: string;
  availableServices: { id: string; title: string }[];
};

export default function ServiceEnquiryForm({
  currentServiceTitle,
  availableServices,
}: ServiceEnquiryFormProps) {
  const [formData, setFormData] = useState({
    fullname: '',
    mobile: '',
    email: '',
    serviceInterestedIn: currentServiceTitle || (availableServices[0]?.title ?? ''),
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/service-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || 'Failed to submit enquiry');
      }

      setIsSubmitted(true);
      setFormData({
        fullname: '',
        mobile: '',
        email: '',
        serviceInterestedIn: currentServiceTitle || (availableServices[0]?.title ?? ''),
        notes: '',
      });

      setTimeout(() => setIsSubmitted(false), 8000);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-7 sm:p-9 md:p-10 border border-slate-200/90 shadow-xl relative overflow-hidden">
      {/* Decorative Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-orange via-blue-600 to-brand-navy" />

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles size={13} />
          <span>Quick Project Estimate</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
          Enquire About This Service
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-500 leading-relaxed">
          Share your project details with our engineers. We provide free site assessments and transparent cost estimates.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={36} />
          </div>
          <h4 className="text-2xl font-bold text-emerald-900">Enquiry Received!</h4>
          <p className="text-sm text-emerald-700 max-w-md mx-auto">
            Thank you for reaching out. One of our senior civil engineers will review your requirements and call you shortly.
          </p>
          <div className="pt-2">
            <span className="text-xs text-emerald-600">
              Need immediate assistance? Call us directly at{' '}
              <a href="tel:+919028346900" className="font-bold underline">
                +91 9028346900
              </a>
            </span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
              <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullname" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                required
                value={formData.fullname}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-800 placeholder-slate-400 text-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label htmlFor="mobile" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-800 placeholder-slate-400 text-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. rahul@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-800 placeholder-slate-400 text-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
              />
            </div>

            {/* Service Interested In (Dropdown) */}
            <div>
              <label htmlFor="serviceInterestedIn" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Service Interested In <span className="text-red-500">*</span>
              </label>
              <select
                id="serviceInterestedIn"
                name="serviceInterestedIn"
                required
                value={formData.serviceInterestedIn}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-800 text-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
              >
                <option value="" disabled>Select a service...</option>
                {availableServices.map((svc) => (
                  <option key={svc.id} value={svc.title}>
                    {svc.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Short Notes / Message */}
          <div>
            <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Short Note / Requirements
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Tell us about your plot size, location, planned budget, or specific requirements..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-800 placeholder-slate-400 text-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20 resize-none"
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-brand-orange hover:bg-blue-700 text-white font-bold text-sm tracking-wide uppercase transition-all shadow-lg shadow-brand-orange/25 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-wait"
          >
            <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Service Enquiry'}</span>
            {!isSubmitting && <Send size={16} />}
          </button>

          <p className="text-[11px] text-center text-slate-400 leading-relaxed">
            By submitting, you agree to receive project consultation calls and WhatsApp updates from Blueprint Build Con. We never share your data.
          </p>
        </form>
      )}
    </div>
  );
}
