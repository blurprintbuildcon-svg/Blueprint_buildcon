'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Send,
  Building2,
  Sparkles,
} from 'lucide-react';
import { getWhatsAppNumber, openWhatsApp } from '@/lib/whatsapp';

export type ConsultationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PROJECT_TYPES = [
  'Residential (Villa / Bungalow / Row House)',
  'Commercial Complex / Office / Retail Space',
  'Independent Multi-Floor Building (G+2 / G+3)',
  'Turnkey Farmhouse / Weekend Villa',
  'Full Home Renovation & Remodeling',
  'Interior Architecture & Turnkey Execution',
  'Structural Blueprinting & Sanctioning',
];

const PROPERTY_STATUSES = [
  'Plot Owned & Ready to Build',
  'Looking to Purchase Plot Soon',
  'Demolish Existing Building & Rebuild',
  'Existing Structure Needs Renovation / Expansion',
];

const BUDGET_RANGES = [
  '₹15 Lakhs – ₹30 Lakhs',
  '₹30 Lakhs – ₹50 Lakhs',
  '₹50 Lakhs – ₹1 Crore',
  '₹1 Crore – ₹2.5 Crores',
  '₹2.5 Crores+',
];

const SERVICES_OFFERED = [
  'Turnkey Civil Construction (A-Grade Materials)',
  'Architectural Planning & 3D Elevation Design',
  'Structural Blueprint Engineering & Sanctions',
  'Residential Villa / Bungalow Construction',
  'Commercial Building & Retail Space Construction',
  'Complete Home Renovation & Strengthening',
];

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectType: 'Residential (Villa / Bungalow / Row House)',
    location: '',
    propertyStatus: 'Plot Owned & Ready to Build',
    budget: '₹30 Lakhs – ₹50 Lakhs',
    service: 'Turnkey Civil Construction (A-Grade Materials)',
    message: '',
    joinReferralProgram: 'Yes',
    agreeContact: true,
    agreePrivacy: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitType, setSubmitType] = useState<'whatsapp' | 'save'>('whatsapp');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const buildWhatsAppMessage = () => {
    return `*New Construction Enquiry - BluePrint BuildCon*
---------------------------------------
👤 *CLIENT INFORMATION:*
• Name: ${formData.name || 'N/A'}
• Contact: ${formData.phone || 'N/A'}
• Location / City: ${formData.location || 'N/A'}

🏗️ *PROJECT REQUIREMENTS:*
• Project Type: ${formData.projectType}
• Plot / Property Status: ${formData.propertyStatus}
• Estimated Budget: ${formData.budget}
• Service Interested In: ${formData.service}
• Referral Program Partner: ${formData.joinReferralProgram}
• Project Notes: ${formData.message || 'Ready for site inspection / blueprint review'}
---------------------------------------
_Submitted via BluePrint BuildCon Web Portal_`;
  };

  const handleFormAction = async (e: React.FormEvent, openInWhatsApp: boolean) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Please enter your Full Name and Contact Number.');
      return;
    }

    if (!formData.location.trim()) {
      setErrorMessage('Please enter your City or Location.');
      return;
    }

    if (!formData.agreePrivacy) {
      setErrorMessage('Please accept the Data Privacy consent to continue.');
      return;
    }

    setSubmitType(openInWhatsApp ? 'whatsapp' : 'save');
    setIsSubmitting(true);

    try {
      // Save enquiry to MongoDB backend
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          projectType: formData.projectType,
          location: formData.location,
          propertyStatus: formData.propertyStatus,
          budget: formData.budget,
          service: formData.service,
          message: formData.message,
          joinReferralProgram: formData.joinReferralProgram,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error || 'Failed to submit enquiry');
      }

      setIsSubmitted(true);

      // If user selected WhatsApp action, trigger WhatsApp
      if (openInWhatsApp) {
        const message = buildWhatsAppMessage();
        openWhatsApp(message);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto overscroll-contain animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-5 sm:p-8 md:p-9 max-h-[90vh] overflow-y-auto overscroll-contain border border-slate-100 my-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close form"
          className="absolute right-4 top-4 sm:right-6 sm:top-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition shadow-xs cursor-pointer z-10"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          /* SUCCESS CONFIRMATION VIEW */
          <div className="py-8 px-4 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 size={38} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
              Enquiry Submitted Successfully!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-brand-navy">{formData.name}</strong>. Our senior civil engineering and architectural team will contact you at{' '}
              <strong className="text-brand-navy">{formData.phone}</strong> shortly to discuss your project.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const message = buildWhatsAppMessage();
                  openWhatsApp(message);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold shadow-md transition"
              >
                <MessageCircle size={18} />
                <span>Chat Now on WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold transition"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          /* CONSULTATION ENQUIRY FORM */
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h2
                id="consultation-modal-title"
                className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight"
              >
                Let Us Help You <span className="text-brand-orange">Here.</span>
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Share your details below to get the right architectural, structural, and construction solution for your project.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={(e) => handleFormAction(e, false)} className="space-y-4">
              {/* ROW 1: FULL NAME & CONTACT NUMBER */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 placeholder-slate-400 text-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>

                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="modal-phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 placeholder-slate-400 text-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>
              </div>

              {/* ROW 2: PROJECT TYPE & CITY / LOCATION */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-projectType" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Project / Building Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="modal-projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 text-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  >
                    {PROJECT_TYPES.map((pt) => (
                      <option key={pt} value={pt}>
                        {pt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="modal-location" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    City / Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="modal-location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Your city or location (e.g. Pune, Baner)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 placeholder-slate-400 text-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>
              </div>

              {/* ROW 3: PROPERTY STATUS & ESTIMATED BUDGET */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-propertyStatus" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Plot / Property Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="modal-propertyStatus"
                    name="propertyStatus"
                    value={formData.propertyStatus}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 text-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  >
                    {PROPERTY_STATUSES.map((ps) => (
                      <option key={ps} value={ps}>
                        {ps}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="modal-budget" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Estimated Project Budget (₹) <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="modal-budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 text-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  >
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ROW 4: SERVICE INTERESTED IN */}
              <div>
                <label htmlFor="modal-service" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Select Service You Are Interested In <span className="text-red-500">*</span>
                </label>
                <select
                  id="modal-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 text-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                >
                  {SERVICES_OFFERED.map((srv) => (
                    <option key={srv} value={srv}>
                      {srv}
                    </option>
                  ))}
                </select>
              </div>

              {/* ROW 5: MESSAGE / REQUIREMENTS */}
              <div>
                <label htmlFor="modal-message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Requirements / Message <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirement or project (e.g. plot area, 3-BHK villa, G+2 floors, expected start date)..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 placeholder-slate-400 text-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20 resize-none"
                />
              </div>

              {/* ROW 6: REFERRAL PROGRAM PARTICIPATION */}
              <div>
                <label htmlFor="modal-joinReferral" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Would You Like to Join Our Referral Program? <span className="text-red-500">*</span>
                </label>
                <select
                  id="modal-joinReferral"
                  name="joinReferralProgram"
                  value={formData.joinReferralProgram}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 text-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                >
                  <option value="Yes">Yes (Earn ₹3,000 to ₹10,000+ per referral)</option>
                  <option value="No">No (Only construction inquiry for my project)</option>
                </select>
              </div>

              {/* REFERRAL REWARD HIGHLIGHT BANNER */}
              <div className="rounded-xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200/80 p-3 text-center">
                <p className="text-[11px] sm:text-xs text-amber-900 font-bold flex items-center justify-center gap-1.5 flex-wrap">
                  <Sparkles size={14} className="text-amber-600 shrink-0" />
                  <span>Earn ₹3,000 to ₹10,000+ Per Successful Project Referral!</span>
                </p>
                <p className="text-[10px] sm:text-[11px] text-amber-700/90 mt-0.5">
                  🚀 Your reward depends on the project scope and when project successfully commenced. T&amp;C Apply.
                </p>
              </div>

              {/* CONSENT CHECKBOXES */}
              <div className="space-y-2.5 pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreeContact"
                    checked={formData.agreeContact}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-orange focus:ring-brand-orange"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    By submitting this form, you agree to be contacted by BluePrint BuildCon on <strong>WhatsApp / SMS / Email / Phone</strong> regarding your enquiry.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreePrivacy"
                    required
                    checked={formData.agreePrivacy}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-orange focus:ring-brand-orange"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-800">Consent &amp; Data Privacy <span className="text-red-500">*</span>:</strong> I agree to the collection and use of the information I provide in accordance with BluePrint BuildCon&apos;s{' '}
                    <Link href="/privacy-policy" target="_blank" className="text-brand-orange font-semibold underline hover:text-blue-700">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link href="/terms" target="_blank" className="text-brand-orange font-semibold underline hover:text-blue-700">
                      Terms &amp; Conditions
                    </Link>.
                  </span>
                </label>
              </div>

              {/* ACTION BUTTONS: DUAL ACTIONS */}
              <div className="pt-2 space-y-2.5">
                {/* 1. Primary Action: Get Solution on WhatsApp (styled in emerald green just like the screenshot) */}
                <button
                  type="button"
                  onClick={(e) => handleFormAction(e, true)}
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#20c997] hover:bg-[#1bb587] text-white font-bold text-sm sm:text-base tracking-wide transition shadow-md flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-wait cursor-pointer"
                >
                  <MessageCircle size={20} className="shrink-0" />
                  <span>
                    {isSubmitting && submitType === 'whatsapp'
                      ? 'Saving & Opening WhatsApp...'
                      : 'Get Solution on WhatsApp ↗'}
                  </span>
                </button>

                {/* 2. Direct Submit & Save Button */}
                <button
                  type="button"
                  onClick={(e) => handleFormAction(e, false)}
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-wide transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait cursor-pointer"
                >
                  <Send size={15} />
                  <span>
                    {isSubmitting && submitType === 'save'
                      ? 'Saving Your Enquiry...'
                      : 'Submit & Save Enquiry Directly'}
                  </span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400 leading-relaxed pt-1">
                Share your details below, and our senior engineering team will contact you to discuss suitable options.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

