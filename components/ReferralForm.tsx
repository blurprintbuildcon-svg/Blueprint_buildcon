'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Send,
  AlertCircle,
  Gift,
  Sparkles,
  MessageCircle,
  Check,
  Search,
  IndianRupee,
} from 'lucide-react';
import { getWhatsAppNumber, openWhatsApp } from '@/lib/whatsapp';

type ReferralFormProps = {
  isModal?: boolean;
  onSuccess?: () => void;
  onClose?: () => void;
};

export const CONSTRUCTION_SERVICES = [
  'Residential Construction (Bungalow / Villa / House)',
  'Commercial Construction (Offices / Retail / Building)',
  'Architectural Planning & 3D Design',
  'Complete Renovation & Remodeling',
  'Interior Design & Turnkey Execution',
  'Civil Contracting & Turnkey Construction',
];

export const BUDGET_RANGES = [
  '₹15 Lakhs – ₹30 Lakhs',
  '₹30 Lakhs – ₹50 Lakhs',
  '₹50 Lakhs – ₹1 Crore',
  '₹1 Crore – ₹2.5 Crores',
  '₹2.5 Crores+',
];

export const PROPERTY_STATUSES = [
  'Plot Owned & Ready to Build',
  'Searching for Plot / Land',
  'Existing House to Demolish & Rebuild',
  'Renovation / Floor Extension',
  'Apartment / Commercial Space for Interior',
];

export const TIMELINES = [
  'Immediate (Within 30 Days)',
  '1 to 3 Months',
  '3 to 6 Months',
  'Planning Stage / Just Exploring',
];

export const REFERRER_RELATIONS = [
  'Friend / Relative',
  'Architect / Interior Designer',
  'Real Estate Consultant / Broker',
  'Existing / Previous Client',
  'Business Associate / Vendor',
  'Other',
];

export default function ReferralForm({ isModal = false, onSuccess, onClose }: ReferralFormProps) {
  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');

  const [formData, setFormData] = useState({
    // Referrer details
    referrerName: '',
    referrerPhone: '',
    referrerEmail: '',
    referrerUpi: '',
    referrerRelation: 'Friend / Relative',

    // Client & Project details
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    clientCity: '',
    serviceRequired: '',
    propertyStatus: 'Plot Owned & Ready to Build',
    estimatedArea: '',
    projectBudget: '',
    timeline: 'Immediate (Within 30 Days)',
    requirements: '',

    // Consent
    consentContact: true,
    consentClientPermission: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAction, setSubmitAction] = useState<'save' | 'whatsapp'>('save');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Lookup State
  const [lookupPhone, setLookupPhone] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResults, setLookupResults] = useState<any[] | null>(null);
  const [lookupError, setLookupError] = useState('');

  const targetWhatsApp = getWhatsAppNumber();

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
    return `*New Construction Referral for BluePrint BuildCon*
---------------------------------------
👤 *REFERRER DETAILS:*
• Name: ${formData.referrerName || 'N/A'}
• Contact: ${formData.referrerPhone || 'N/A'}
• Relation: ${formData.referrerRelation}
${formData.referrerUpi ? `• UPI ID for Reward: ${formData.referrerUpi}\n` : ''}
🏗️ *REFERRED CLIENT DETAILS:*
• Client Name: ${formData.clientName || 'N/A'}
• Client Contact: ${formData.clientPhone || 'N/A'}
${formData.clientEmail ? `• Client Email: ${formData.clientEmail}\n` : ''}• Location/City: ${formData.clientCity || 'N/A'}
• Service: ${formData.serviceRequired || 'Construction Inquiry'}
• Property Status: ${formData.propertyStatus}
${formData.estimatedArea ? `• Built-up / Plot Area: ${formData.estimatedArea}\n` : ''}• Estimated Budget: ${formData.projectBudget || 'Not specified'}
• Expected Start: ${formData.timeline}
• Requirements: ${formData.requirements || 'N/A'}
---------------------------------------
_Submitted via BluePrint BuildCon Referral Portal_`;
  };

  const triggerWhatsApp = () => {
    const message = buildWhatsAppMessage();
    openWhatsApp(message, targetWhatsApp);
  };

  const handleFormAction = async (e: React.FormEvent, openWhatsAppAfterSave: boolean) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.referrerName.trim() || !formData.referrerPhone.trim()) {
      setErrorMessage('Please fill in your Referrer Name and Contact Number.');
      return;
    }

    if (!formData.clientName.trim() || !formData.clientPhone.trim() || !formData.clientCity.trim()) {
      setErrorMessage("Please fill in Referred Client's Name, Contact Number, and City.");
      return;
    }

    if (!formData.serviceRequired || !formData.projectBudget || !formData.requirements.trim()) {
      setErrorMessage('Please select the Service Required, Project Budget, and enter Requirements.');
      return;
    }

    if (!formData.consentClientPermission) {
      setErrorMessage('Please verify that you have client permission to share their contact details.');
      return;
    }

    setSubmitAction(openWhatsAppAfterSave ? 'whatsapp' : 'save');
    setIsSubmitting(true);

    try {
      // Save to MongoDB database backend
      const res = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(result?.error || 'Failed to submit referral');
      }

      const refCode =
        result?.data?.refCode ||
        'BP-' + (result?.data?.id ? result.data.id.slice(-6).toUpperCase() : 'BP');
      setSubmissionId(refCode);
      setIsSubmitted(true);

      // If user clicked "Send Referral on WhatsApp", open WhatsApp immediately
      if (openWhatsAppAfterSave) {
        triggerWhatsApp();
      }

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError('');
    setLookupResults(null);
    setLookupLoading(true);

    try {
      const cleanPhone = lookupPhone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10) {
        throw new Error('Please enter a valid 10-digit mobile number.');
      }

      const res = await fetch(`/api/referral?phone=${encodeURIComponent(cleanPhone)}`);
      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.error || 'Failed to track referral.');
      }

      setLookupResults(json.data || []);
    } catch (err: any) {
      setLookupError(err.message || 'Failed to track referral.');
    } finally {
      setLookupLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSubmissionId('');
    setFormData({
      referrerName: '',
      referrerPhone: '',
      referrerEmail: '',
      referrerUpi: '',
      referrerRelation: 'Friend / Relative',
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      clientCity: '',
      serviceRequired: '',
      propertyStatus: 'Plot Owned & Ready to Build',
      estimatedArea: '',
      projectBudget: '',
      timeline: 'Immediate (Within 30 Days)',
      requirements: '',
      consentContact: true,
      consentClientPermission: true,
    });
  };

  return (
    <div
      className={`w-full bg-white text-slate-800 ${isModal
        ? 'p-5 sm:p-7 md:p-8'
        : 'relative overflow-hidden rounded-3xl border border-slate-200/80 p-6 shadow-sm sm:p-8'
        }`}
    >
      {/* Header Info */}
      <div className="mb-6 border-b border-slate-100 pb-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
            <Sparkles size={13} aria-hidden="true" />
            <span>{isModal ? 'Grow Together • Partner Program' : 'Grow Together'}</span>
          </div>

          {/* Mode Switcher */}
            <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('submit')}
                className={`px-3 py-1 rounded-md transition ${activeTab === 'submit'
                  ? 'bg-white text-brand-navy shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                Submit Referral
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('track')}
                className={`px-3 py-1 rounded-md transition ${activeTab === 'track'
                  ? 'bg-white text-brand-navy shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                Track Status 🔍
              </button>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Refer and Earn
          </h2>
          <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-800 sm:text-base">
            <Gift size={17} className="shrink-0 text-brand-orange" aria-hidden="true" />
            <span>Refer a Client. Earn Commission &amp; Cash Rewards!</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Know someone looking to build a residential home, villa, commercial building, or complete renovation? Refer them to{' '}
            <strong className="text-brand-navy font-semibold">BluePrint BuildCon</strong>. Our senior engineers will prepare customized architectural plans and estimates.
          </p>
          <div className="mt-2.5 flex items-start gap-2 text-xs font-medium leading-relaxed text-slate-600">
            <span>🎁</span>
            <span>
              <strong className="text-brand-blue">Refer More, Earn More!</strong> Cash rewards are subject to project eligibility, confirmation, and applicable terms.
            </span>
          </div>
        </div>

        {/* TRACK STATUS TAB */}
        {activeTab === 'track' ? (
          <div className="space-y-6">
            <form onSubmit={handleLookup} className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Enter Your Referrer Mobile Number
              </label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  required
                  value={lookupPhone}
                  onChange={(e) => setLookupPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm outline-none focus:border-brand-orange focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={lookupLoading}
                  className="px-5 py-2.5 bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-2 disabled:opacity-50"
                >
                  <Search size={15} />
                  <span>{lookupLoading ? 'Checking...' : 'Check Status'}</span>
                </button>
              </div>
              {lookupError && (
                <p className="text-xs text-red-600 flex items-center gap-1.5">
                  <AlertCircle size={14} /> {lookupError}
                </p>
              )}
            </form>

            {lookupResults !== null && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Your Submitted Referrals ({lookupResults.length})
                </h4>
                {lookupResults.length === 0 ? (
                  <div className="p-6 text-center bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500">
                    No referrals found for this number. Submit a referral above to get started!
                  </div>
                ) : (
                  lookupResults.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-brand-navy text-sm">{item.clientMasked}</span>
                          <span className="font-mono text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                            {item.refCode}
                          </span>
                        </div>
                        <p className="text-slate-600 mt-1 font-medium">{item.serviceRequired}</p>
                        <p className="text-slate-400 text-[11px] mt-0.5">
                          Location: {item.clientCity} • Budget: {item.projectBudget}
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 capitalize">
                          {item.status.replace('_', ' ')}
                        </span>
                        {item.rewardAmount > 0 && (
                          <p className="mt-1 text-purple-700 font-bold flex items-center sm:justify-end gap-1">
                            <IndianRupee size={12} /> Reward: ₹{item.rewardAmount.toLocaleString('en-IN')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ) : isSubmitted ? (
          /* SUCCESS SCREEN */
          <div className="py-8 px-4 sm:px-6 rounded-2xl bg-gradient-to-b from-blue-50/60 to-white border border-blue-200 text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30">
              <Check size={36} strokeWidth={3} />
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                Referral Reference #{submissionId}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
                Referral Saved Successfully!
              </h3>
              <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for referring <strong className="text-brand-navy font-semibold">{formData.clientName}</strong>. Your referral is stored safely in our system and our civil engineering team will reach out to explore project requirements.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 max-w-md mx-auto text-left text-xs space-y-2 text-slate-600 shadow-sm">
              <div className="flex justify-between pb-1.5 border-b border-slate-100 font-medium">
                <span className="text-slate-500">Referred Client:</span>
                <span className="text-brand-navy font-bold">{formData.clientName}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-slate-100 font-medium">
                <span className="text-slate-500">Location:</span>
                <span className="text-brand-navy">{formData.clientCity}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-slate-100 font-medium">
                <span className="text-slate-500">Service:</span>
                <span className="text-brand-navy truncate max-w-[220px]">{formData.serviceRequired}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-500">Target WhatsApp:</span>
                <span className="text-brand-navy font-mono">+{targetWhatsApp}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={triggerWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold shadow-md transition"
              >
                <MessageCircle size={17} />
                <span>Send Message on WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition"
              >
                <span>Submit Another Referral</span>
              </button>
            </div>

            {isModal && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-slate-600 underline font-medium pt-2 block mx-auto"
              >
                Close Window
              </button>
            )}
          </div>
        ) : (
          /* FORM SUBMISSION */
          <form onSubmit={(e) => handleFormAction(e, false)} className="space-y-6">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* SECTION 1: REFERRER DETAILS */}
            <div>
              <div className="mb-3.5 border-b border-orange-100 pb-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Referrer Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="referrerName" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Referrer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="referrerName"
                    name="referrerName"
                    required
                    value={formData.referrerName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>

                <div>
                  <label htmlFor="referrerPhone" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Referrer Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="referrerPhone"
                    name="referrerPhone"
                    required
                    value={formData.referrerPhone}
                    onChange={handleChange}
                    placeholder="Enter your mobile / WhatsApp number"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>

                <div>
                  <label htmlFor="referrerRelation" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Your Relationship with Client
                  </label>
                  <select
                    id="referrerRelation"
                    name="referrerRelation"
                    value={formData.referrerRelation}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  >
                    {REFERRER_RELATIONS.map((rel) => (
                      <option key={rel} value={rel}>
                        {rel}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="referrerUpi" className="mb-1.5 block text-sm font-medium text-slate-700">
                    UPI ID for Reward Payout <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="referrerUpi"
                    name="referrerUpi"
                    value={formData.referrerUpi}
                    onChange={handleChange}
                    placeholder="e.g. yourname@okhdfcbank / PhonePe"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: REFERRED CLIENT & CONSTRUCTION DETAILS */}
            <div>
              <div className="mb-3.5 border-b border-orange-100 pb-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Referred Client&apos;s Construction &amp; Project Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="clientName" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Referred Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    required
                    value={formData.clientName}
                    onChange={handleChange}
                    placeholder="Enter client's full name"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>

                <div>
                  <label htmlFor="clientPhone" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Referred Client Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="clientPhone"
                    name="clientPhone"
                    required
                    value={formData.clientPhone}
                    onChange={handleChange}
                    placeholder="Enter client's contact number"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>

                <div>
                  <label htmlFor="clientCity" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Project City / Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="clientCity"
                    name="clientCity"
                    required
                    value={formData.clientCity}
                    onChange={handleChange}
                    placeholder="e.g. Pune (Baner, Wakad, PCMC), etc."
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>

                <div>
                  <label htmlFor="clientEmail" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Client Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    id="clientEmail"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleChange}
                    placeholder="client@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>

                <div>
                  <label htmlFor="serviceRequired" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Construction Service Required <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="serviceRequired"
                    name="serviceRequired"
                    required
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  >
                    <option value="" disabled>Select service required...</option>
                    {CONSTRUCTION_SERVICES.map((svc) => (
                      <option key={svc} value={svc}>
                        {svc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="projectBudget" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Estimated Project Budget (₹) <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="projectBudget"
                    name="projectBudget"
                    required
                    value={formData.projectBudget}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  >
                    <option value="" disabled>Select estimated budget...</option>
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="propertyStatus" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Property / Plot Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="propertyStatus"
                    name="propertyStatus"
                    required
                    value={formData.propertyStatus}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  >
                    {PROPERTY_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Project Timeline / Urgency <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    required
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  >
                    {TIMELINES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="estimatedArea" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Estimated Built-up Area / Plot Dimensions <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="estimatedArea"
                    name="estimatedArea"
                    value={formData.estimatedArea}
                    onChange={handleChange}
                    placeholder="e.g. 1500 sq ft, 30x40 plot, G+2 floor plan"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="requirements" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Project Requirements / Purpose <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    required
                    rows={3}
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="e.g. Planning a new 3-BHK independent villa, looking for structural blueprints, 3D design, and turnkey A-grade construction contract..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>
              </div>
            </div>

            {/* REWARD HIGHLIGHT BANNER */}
            <div className="rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200/80 p-4 sm:p-4.5 text-center shadow-sm">
              <div className="flex items-center justify-center gap-1.5 text-amber-900 font-bold text-xs sm:text-sm">
                <Sparkles size={16} className="text-amber-600 shrink-0" />
                <span>Earn ₹3,000 to ₹10,000+ Per Successful Construction Project Referral!</span>
              </div>
              <p className="mt-1 text-[11px] sm:text-xs text-amber-700/90 leading-relaxed max-w-xl mx-auto">
                🚀 Your cash commission depends on the project scope and is paid directly via bank/UPI when the client signs the contract and commences construction. T&amp;C Apply.
              </p>
            </div>

            {/* CONSENT & AGREEMENT CHECKBOXES */}
            <div className="space-y-3 pt-1">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="consentContact"
                  checked={formData.consentContact}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-orange focus:ring-brand-orange"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  By submitting this form, you agree to be contacted by BluePrint BuildCon on <strong>WhatsApp / SMS / Phone</strong> regarding this referral and reward tracking.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="consentClientPermission"
                  required
                  checked={formData.consentClientPermission}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-orange focus:ring-brand-orange"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Consent &amp; Client Permission <span className="text-red-500">*</span>:</strong> I confirm that I have informed the client and have their permission to share their project details. BluePrint BuildCon will keep all information confidential and process it strictly in accordance with our{' '}
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

            {/* ACTION BUTTONS: DUAL SUBMIT OPTIONS */}
            <div className="pt-2 space-y-3">
              {/* 1. Primary Submit Button: Saves Referral directly to Database */}
              <button
                type="button"
                onClick={(e) => handleFormAction(e, false)}
                disabled={isSubmitting}
                className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-sm sm:text-base tracking-wide transition shadow-lg shadow-brand-blue/25 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-wait cursor-pointer"
              >
                <Send size={18} />
                <span>
                  {isSubmitting && submitAction === 'save'
                    ? 'Saving Referral...'
                    : 'Submit & Save Referral'}
                </span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-0.5">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
                  Or Send via WhatsApp
                </span>
              </div>

              {/* 2. WhatsApp Button: Saves Referral to Database AND opens WhatsApp */}
              <button
                type="button"
                onClick={(e) => handleFormAction(e, true)}
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-sm sm:text-base tracking-wide transition shadow-md flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-wait cursor-pointer"
              >
                <MessageCircle size={20} className="text-[#25D366] shrink-0" />
                <span>
                  {isSubmitting && submitAction === 'whatsapp'
                    ? 'Saving & Opening WhatsApp...'
                    : 'Send Referral on WhatsApp ↗'}
                </span>
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-400 leading-relaxed pt-1">
              Your referral is safely saved into our system upon clicking Submit. If you choose WhatsApp, a message addressed to +{targetWhatsApp} will be opened for your review.
            </p>
          </form>
        )}
      </div>
      );
}
