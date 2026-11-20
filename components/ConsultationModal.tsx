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
  initialLocation?: string;
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
  'New Residential Construction',
  'New Commercial Construction',
  'Interior Renovation & Remodeling',
  'Villa / Bungalow Construction',
  'Office Building Construction',
  'Turnkey Construction Project',
  'Apartment / Flat Construction',
  'Duplex House Construction',
  'Warehouse / Industrial Construction',
  'Structural Repair & Restoration',
  'Other',
];

const BUDGET_RANGES = [
  '₹15 Lakhs – ₹30 Lakhs',
  '₹30 Lakhs – ₹50 Lakhs',
  '₹50 Lakhs – ₹1 Crore',
  '₹1 Crore – ₹2.5 Crores',
  '₹2.5 Crores – ₹3 Crores',
  '₹3 Crores – ₹4 Crores',
  '₹4 Crores – ₹5 Crores',
  '₹5 Crores – ₹6 Crores',
];

const SERVICES_OFFERED = [
  'Turnkey Civil Construction (A-Grade Materials)',
  'Architectural Planning & 3D Elevation Design',
  'Structural Blueprint Engineering & Sanctions',
  'Residential Villa / Bungalow Construction',
  'Commercial Building & Retail Space Construction',
  'Complete Home Renovation & Strengthening',
];

export default function ConsultationModal({ isOpen, onClose, initialLocation }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Residential (Villa / Bungalow / Row House)',
    otherProjectType: '',
    location: '',
    pincode: '',
    propertyStatus: 'Plot Owned & Ready to Build',
    otherPropertyStatus: '',
    budget: '₹30 Lakhs – ₹50 Lakhs',
    service: 'Turnkey Civil Construction (A-Grade Materials)',
    message: '',
    projectFinance: 'No',
    projectCash: 'No',
    profession: '',
    otherProfession: '',
    joinReferralProgram: 'Yes',
    agreeContact: true,
    agreePrivacy: true,
    marketingConsent: false,
  });

  useEffect(() => {
    if (initialLocation && isOpen) {
      setFormData((prev) => ({ ...prev, location: initialLocation }));
    }
  }, [initialLocation, isOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const getProjectType = () =>
    formData.projectType === 'Other' ? formData.otherProjectType.trim() : formData.projectType;

  const getPropertyStatus = () =>
    formData.propertyStatus === 'Other'
      ? formData.otherPropertyStatus.trim()
      : formData.propertyStatus;

  const buildWhatsAppMessage = () => {
    return `*New Construction Enquiry - BluePrint Build-Con*
---------------------------------------
👤 *CLIENT INFORMATION:*
• Name: ${formData.name || 'N/A'}
• Contact: ${formData.phone || 'N/A'}
• Email: ${formData.email || 'N/A'}
• Location / City: ${formData.location || 'N/A'}
• Pincode: ${formData.pincode || 'N/A'}
• Profession: ${formData.profession === 'Other' ? formData.otherProfession : formData.profession || 'N/A'}

🏗️ *PROJECT REQUIREMENTS:*
• Project Type: ${getProjectType()}
• Plot / Property Status: ${getPropertyStatus()}
• Estimated Budget: ${formData.budget}
• Service Interested In: ${formData.service}
• Interested in Project Finance: ${formData.projectFinance}
• Interested in Project Cash: ${formData.projectCash}
• Referral Program Partner: ${formData.joinReferralProgram}
• Marketing Updates Consent: ${formData.marketingConsent ? 'Yes' : 'No'}
• Project Notes: ${formData.message || 'Ready for site inspection / blueprint review'}
---------------------------------------
_Submitted via BluePrint Build-Con Web Portal_`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      setErrorMessage('Please enter a valid 6-digit pincode.');
      return;
    }

    if (formData.projectType === 'Other' && !formData.otherProjectType.trim()) {
      setErrorMessage('Please specify your project or building type.');
      return;
    }

    if (formData.propertyStatus === 'Other' && !formData.otherPropertyStatus.trim()) {
      setErrorMessage('Please specify your plot or property status.');
      return;
    }

    if (formData.profession === 'Other' && !formData.otherProfession.trim()) {
      setErrorMessage('Please specify your profession.');
      return;
    }

    if (!formData.agreePrivacy) {
      setErrorMessage('Please accept the Data Privacy consent to continue.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Save enquiry to MongoDB backend (which also sends email alert to project@blueprintbuildcon.homes)
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          projectType: getProjectType(),
          location: formData.location,
          pincode: formData.pincode,
          propertyStatus: getPropertyStatus(),
          budget: formData.budget,
          service: formData.service,
          message: formData.message,
          projectFinance: formData.projectFinance,
          projectCash: formData.projectCash,
          profession: formData.profession,
          otherProfession: formData.otherProfession,
          joinReferralProgram: formData.joinReferralProgram,
          marketingConsent: formData.marketingConsent,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error || 'Failed to submit enquiry');
      }

      setIsSubmitted(true);

      // 2. Redirect / open enquiry on WhatsApp directly
      const message = buildWhatsAppMessage();
      openWhatsApp(message);
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
      onClick={(e) => e.stopPropagation()}
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
                className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight"
              >
                Let Us Help You <span className="text-[#0052FF]">Here.</span>
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-black font-medium leading-relaxed">
                Share your details below to get the right architectural, structural, and construction solution for your project.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-300 text-red-900 font-semibold text-xs sm:text-sm flex items-start gap-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* PERFECTLY ALIGNED 2-COLUMN GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Full Name */}
                <div>
                  <label htmlFor="modal-name" className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-black font-medium placeholder-slate-400 text-sm outline-none transition focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20"
                  />
                </div>

                {/* 2. Contact Number */}
                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                    Contact Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="modal-phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-black font-medium placeholder-slate-400 text-sm outline-none transition focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20"
                  />
                </div>

                {/* 3. Email ID */}
                <div>
                  <label htmlFor="modal-email" className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                    Email ID <span className="text-slate-500 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-black font-medium placeholder-slate-400 text-sm outline-none transition focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20"
                  />
                </div>

                {/* 4. Profession */}
                <div>
                  <label htmlFor="modal-profession" className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                    Profession <span className="text-slate-500 font-normal lowercase">(optional)</span>
                  </label>
                  <select
                    id="modal-profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-black font-medium text-sm outline-none transition focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20"
                  >
                    <option value="">Select your profession</option>
                    <option value="Self-employed">Self-employed</option>
                    <option value="Salaried">Salaried</option>
                    <option value="Other">Other</option>
                  </select>
                  {formData.profession === 'Other' && (
                    <div className="mt-2">
                      <input
                        type="text"
                        id="modal-other-profession"
                        name="otherProfession"
                        required
                        value={formData.otherProfession}
                        onChange={handleChange}
                        placeholder="Specify your profession"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-black font-medium placeholder-slate-400 text-sm outline-none transition focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20"
                      />
                    </div>
                  )}
                </div>

                {/* 5. City / Location */}
                <div>
                  <label htmlFor="modal-location" className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                    City / Location <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="modal-location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Your city (e.g. Hyderabad, Pune)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-black font-medium placeholder-slate-400 text-sm outline-none transition focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20"
                  />
                </div>

                {/* 6. Pincode */}
                <div>
                  <label htmlFor="modal-pincode" className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                    Pincode <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="modal-pincode"
                    name="pincode"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    title="Enter a 6-digit pincode"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-black font-medium placeholder-slate-400 text-sm outline-none transition focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20"
                  />
                </div>

                {/* 7. Project / Building Type */}
                <div>
                  <label htmlFor="modal-projectType" className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                    Project / Building Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="modal-projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-black font-medium text-sm outline-none transition focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20"
                  >
                    {PROJECT_TYPES.map((pt) => (
                      <option key={pt} value={pt}>
                        {pt}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  {formData.projectType === 'Other' && (
                    <div className="mt-2">
                      <input
                        type="text"
                        id="modal-other-projectType"
                        name="otherProjectType"
                        required
                        value={formData.otherProjectType}
                        onChange={handleChange}
                        placeholder="Specify project / building type"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-black font-medium placeholder-slate-400 text-sm outline-none transition focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20"
                      />
                    </div>
                  )}
                </div>

                {/* 8. Plot / Property Status */}
                <div>
                  <label htmlFor="modal-propertyStatus" className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                    Plot / Property Status <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="modal-propertyStatus"
                    name="propertyStatus"
                    value={formData.propertyStatus}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-black font-medium text-sm outline-none transition focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20"
                  >
                    {PROPERTY_STATUSES.map((ps) => (
                      <option key={ps} value={ps}>
                        {ps}
                      </option>
                    ))}
                  </select>
                  {formData.propertyStatus === 'Other' && (
                    <div className="mt-2">
                      <input
                        type="text"
                        id="modal-other-propertyStatus"
                        name="otherPropertyStatus"
                        required
                        value={formData.otherPropertyStatus}
                        onChange={handleChange}
                        placeholder="Specify plot / property status"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-black font-medium placeholder-slate-400 text-sm outline-none transition focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20"
                      />
                    </div>
                  )}
                </div>

                {/* 9. Estimated Budget */}
                <div>
                  <label htmlFor="modal-budget" className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                    Estimated Project Budget (₹) <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="modal-budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-black font-medium text-sm outline-none transition focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20"
                  >
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 10. Service Interested In */}
                <div>
                  <label htmlFor="modal-service" className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                    Select Service <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="modal-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-black font-medium text-sm outline-none transition focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20"
                  >
                    {SERVICES_OFFERED.map((srv) => (
                      <option key={srv} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 11. Project Finance */}
                <div>
                  <label htmlFor="modal-projectFinance" className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                    Interested in Project Finance? <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="modal-projectFinance"
                    name="projectFinance"
                    value={formData.projectFinance}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-black font-medium text-sm outline-none transition focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* 12. Project Cash */}
                <div>
                  <label htmlFor="modal-projectCash" className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                    Interested in Project Cash? <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="modal-projectCash"
                    name="projectCash"
                    value={formData.projectCash}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-black font-medium text-sm outline-none transition focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* 13. Join Referral Program (Full Width in Grid) */}
                <div className="sm:col-span-2">
                  <label htmlFor="modal-joinReferral" className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                    Would You Like to Join Our Referral Program? <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="modal-joinReferral"
                    name="joinReferralProgram"
                    value={formData.joinReferralProgram}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-black font-medium text-sm outline-none transition focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20"
                  >
                    <option value="Yes">Yes (Earn ₹3,000 to ₹10,000+ per referral)</option>
                    <option value="No">No (Only construction inquiry for my project)</option>
                  </select>
                </div>

                {/* 14. Requirements / Message (Full Width in Grid) */}
                <div className="sm:col-span-2">
                  <label htmlFor="modal-message" className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                    Your Requirements / Message <span className="text-slate-500 font-normal lowercase">(optional)</span>
                  </label>
                  <textarea
                    id="modal-message"
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirement or project (e.g. plot area, 3-BHK villa, G+2 floors, expected start date)..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-black font-medium placeholder-slate-400 text-sm outline-none transition focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/20 resize-none"
                  />
                </div>
              </div>

              {/* REFERRAL REWARD HIGHLIGHT BANNER */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center">
                <p className="text-[11px] sm:text-xs text-black font-extrabold flex items-center justify-center gap-1.5 flex-wrap">
                  <Sparkles size={14} className="text-[#0052FF] shrink-0" />
                  <span>Earn ₹3,000 to ₹10,000+ Per Successful Project Referral!</span>
                </p>
                <p className="text-[10px] sm:text-[11px] text-black font-medium mt-0.5">
                  🚀 Your reward depends on the project scope and when project successfully commenced. T&amp;C Apply.
                </p>
              </div>

              {/* CONSENT CHECKBOXES - EVERY POINT HIGHLIGHTED IN BOLD BLACK */}
              <div className="space-y-2.5 pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreeContact"
                    checked={formData.agreeContact}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-400 text-[#0052FF] focus:ring-[#0052FF]"
                  />
                  <span className="text-xs text-black font-medium leading-relaxed">
                    By submitting this form, you agree to be contacted by <strong className="text-black font-black">BluePrint Build-Con</strong> on <strong className="text-black font-black">WhatsApp / SMS / Email / Phone</strong> regarding your enquiry.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreePrivacy"
                    required
                    checked={formData.agreePrivacy}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-400 text-[#0052FF] focus:ring-[#0052FF]"
                  />
                  <span className="text-xs text-black font-medium leading-relaxed">
                    <strong className="text-black font-black">Consent &amp; Data Privacy <span className="text-red-600">*</span>:</strong> I agree to the collection and use of the information I provide in accordance with BluePrint Build-Con&apos;s{' '}
                    <Link href="/privacy-policy" target="_blank" className="text-[#0052FF] font-black underline hover:text-blue-800">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link href="/terms" target="_blank" className="text-[#0052FF] font-black underline hover:text-blue-800">
                      Terms &amp; Conditions
                    </Link>.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-400 text-[#0052FF] focus:ring-[#0052FF]"
                  />
                  <span className="text-xs text-black font-medium leading-relaxed">
                    By submitting, you consent to receive updates and offers via <strong className="text-black font-black">SMS, Email, WhatsApp or RCS</strong>, and permit us to use your information for marketing purposes.
                  </span>
                </label>
              </div>

              {/* ACTION BUTTON: HIGH-CONTRAST BLACK SUBMIT BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-black hover:bg-slate-900 text-white font-extrabold text-sm sm:text-base tracking-wide transition shadow-lg shadow-black/25 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-wait cursor-pointer group"
                >
                  <Send size={18} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                  <span>
                    {isSubmitting ? 'Submitting Enquiry...' : 'Submit Enquiry'}
                  </span>
                </button>
              </div>

              <p className="text-[11px] text-center text-black font-semibold leading-relaxed pt-1">
                Your enquiry will be saved and automatically forwarded to our engineering team via Email and WhatsApp.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

