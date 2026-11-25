'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  ShieldCheck,
  Send,
  Building2,
  CheckCircle2,
  User,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { openEnquiryWhatsApp } from '@/lib/whatsapp';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    projectType: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [lastSubmitted, setLastSubmitted] = useState<typeof formData | null>(null);

  const triggerWhatsApp = (data = formData) => {
    const text = `*New Contact Enquiry for BluePrint Build-Con*
---------------------------------------
• Client Name: ${data.name}
• Contact Number: ${data.phone}
• Email: ${data.email}
• City: ${data.city}
• Project Type: ${data.projectType}
${data.message ? `• Requirements: ${data.message}\n` : ''}---------------------------------------
_Sent via BluePrint Build-Con Website_`;

    openEnquiryWhatsApp(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error ?? 'Unable to submit your enquiry');
      }

      const submittedSnapshot = { ...formData };
      setLastSubmitted(submittedSnapshot);
      setIsSubmitted(true);

      // Automatically redirect to WhatsApp (+91 9028087659)
      try {
        triggerWhatsApp(submittedSnapshot);
      } catch (err) {
        console.error('WhatsApp redirect error:', err);
      }

      setFormData({ name: '', phone: '', email: '', city: '', projectType: '', message: '' });
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
        <section id="contact" className="relative py-14 lg:py-20 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30 overflow-hidden">
          {/* Subtle architectural backdrop accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0052FF]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-900/5 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0052FF]/10 text-[#0052FF] text-xs font-bold uppercase tracking-widest mb-3.5 border border-[#0052FF]/20">
                      <Sparkles size={13} />
                      <span>Direct Communication</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
                      Let&apos;s Build Something <span className="text-[#0052FF]">Great Together</span>
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                      Connect directly with our senior civil engineers and architects for site consultations, estimation breakdown, and turnkey project planning.
                    </p>
                </motion.div>
              </div>

                {/* Main Grid: Left (Contact Details) & Right (Enhanced Form) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                  {/* Left Column: Direct Touchpoints & Trust (5 Cols) */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-5 space-y-6"
                  >
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm">
                      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0052FF]" />
                        BluePrint Build-Con Head Office
                      </h3>

                            <div className="space-y-5">
                              {/* Phone & Direct Desk */}
                              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-[#0052FF]/30 transition-colors group">
                                <div className="w-11 h-11 rounded-xl bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center shrink-0 group-hover:bg-[#0052FF] group-hover:text-white transition-colors">
                                  <Phone size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Phone &amp; WhatsApp</div>
                                  <a
                                    href="tel:+919028346900"
                                    className="text-base font-bold text-slate-900 hover:text-[#0052FF] transition-colors block"
                                  >
                                    +91 9028346900
                                  </a>
                                  <a
                                    href="tel:+919028087659"
                                    className="text-xs font-semibold text-slate-600 hover:text-[#0052FF] transition-colors block mt-0.5"
                                  >
                                    Enquiry Desk: +91 9028087659
                                  </a>
                                </div>
                              </div>

                                {/* Email Address */}
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-[#0052FF]/30 transition-colors group">
                                  <div className="w-11 h-11 rounded-xl bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center shrink-0 group-hover:bg-[#0052FF] group-hover:text-white transition-colors">
                                    <Mail size={20} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Project Inquiries</div>
                                    <a
                                      href="mailto:project@blueprintbuildcon.homes"
                                      className="text-sm md:text-base font-bold text-slate-900 hover:text-[#0052FF] transition-colors break-all block"
                                    >
                                      project@blueprintbuildcon.homes
                                    </a>
                                    <div className="text-xs text-slate-500 mt-0.5">Average reply time: under 2 hours</div>
                                  </div>
                                </div>

                                  {/* Office Location */}
                                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-[#0052FF]/30 transition-colors group">
                                    <div className="w-11 h-11 rounded-xl bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center shrink-0 group-hover:bg-[#0052FF] group-hover:text-white transition-colors">
                                      <MapPin size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Pune Regional Office</div>
                                      <p className="text-xs md:text-sm font-semibold text-slate-800 leading-snug">
                                        Work Flo, Icon Tower, 7th Floor, Office No. 702,<br />
                                        Baner Road, Opp. KFC, Baner,<br />
                                        Pune, Maharashtra 411045
                                      </p>
                                    </div>
                                  </div>

                                    {/* Working Hours */}
                                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                                      <div className="w-11 h-11 rounded-xl bg-slate-200/70 text-slate-700 flex items-center justify-center shrink-0">
                                        <Clock size={20} />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Working Hours</div>
                                        <div className="text-xs md:text-sm font-semibold text-slate-800">
                                          Monday &ndash; Saturday: 9:00 AM &ndash; 7:30 PM
                                        </div>
                                        <div className="text-xs text-slate-500 mt-0.5">Site visits available on Sundays by appointment</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                  {/* Key Guarantees Card */}
                                  <div className="bg-[#0A1227] text-white rounded-3xl p-6 md:p-7 shadow-lg">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0052FF] mb-3">
                                      <ShieldCheck size={16} />
                                      <span>The BluePrint Guarantee</span>
                                    </div>
                                    <ul className="space-y-2.5 text-xs md:text-sm text-slate-300">
                                      <li className="flex items-center gap-2">
                                        <CheckCircle2 size={15} className="text-[#0052FF] shrink-0" />
                                        <span>Fixed-price contracts with zero hidden escalations</span>
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <CheckCircle2 size={15} className="text-[#0052FF] shrink-0" />
                                        <span>15-Year structural warranty &amp; in-house QA audits</span>
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <CheckCircle2 size={15} className="text-[#0052FF] shrink-0" />
                                        <span>Real-time mobile app project milestone tracking</span>
                                      </li>
                                    </ul>
                                  </div>
                                </motion.div>

                                {/* Right Column: High-End Contact Form (7 Cols) */}
                                <motion.div
                                  initial={{ opacity: 0, x: 20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.5 }}
                                  className="lg:col-span-7"
                                >
                                      <div className="relative bg-white rounded-3xl border border-slate-200/90 shadow-[0_12px_40px_rgba(10,18,39,0.06)] overflow-hidden">
                                        {/* Electric blue header accent */}
                                        <div className="h-1.5 w-full bg-gradient-to-r from-[#0052FF] via-[#3B82F6] to-[#0A1227]" />

                                            <div className="p-7 md:p-10">
                                              {isSubmitted ? (
                                                <div className="py-10 text-center space-y-5">
                                                  <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                                                    <CheckCircle2 size={36} />
                                                  </div>
                                                  <div>
                                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank you! Enquiry Received</h3>
                                                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                                                      Your project details have been successfully recorded and forwarded to our engineering team via email and WhatsApp.
                                                    </p>
                                                  </div>

                                                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                                                    <button
                                                      type="button"
                                                      onClick={() => triggerWhatsApp(lastSubmitted || undefined)}
                                                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] text-white text-sm font-bold shadow-md hover:bg-[#1EBE5D] transition-colors"
                                                    >
                                                      <MessageCircle size={18} />
                                                      <span>Chat Now on WhatsApp</span>
                                                    </button>
                                                    <button
                                                      type="button"
                                                      onClick={() => setIsSubmitted(false)}
                                                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-colors"
                                                    >
                                                      <span>Send Another Message</span>
                                                    </button>
                                                  </div>
                                                </div>
                                              ) : (
                                                <div>
                                            <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
                                              <div>
                                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Send Us a Message</h3>
                                                <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                                                  Tell us about your project &bull; Fast callback within hours
                                                </p>
                                              </div>
                                              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 shrink-0">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                Engineers Online
                                              </span>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-5">
                                              {error && (
                                                <div role="alert" className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs md:text-sm text-red-700 font-medium">
                                                  {error}
                                                </div>
                                              )}

                                              {/* Name & Phone */}
                                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                    Full Name <span className="text-[#0052FF]">*</span>
                                                  </label>
                                                  <div className="relative">
                                                    <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                                    <input
                                                      type="text"
                                                      id="name"
                                                      name="name"
                                                      required
                                                      placeholder="e.g. Rahul Sharma"
                                                      value={formData.name}
                                                      onChange={handleChange}
                                                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-[#0052FF] focus:bg-white transition-all"
                                                    />
                                                  </div>
                                                </div>

                                            <div>
                                              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                Mobile Number <span className="text-[#0052FF]">*</span>
                                              </label>
                                              <div className="relative">
                                                <Phone size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                                <input
                                                  type="tel"
                                                  id="phone"
                                                  name="phone"
                                                  required
                                                  placeholder="10-digit mobile number"
                                                  value={formData.phone}
                                                  onChange={handleChange}
                                                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-[#0052FF] focus:bg-white transition-all"
                                                />
                                              </div>
                                            </div>
                                          </div>

                                          {/* Email & City */}
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                Email Address <span className="text-[#0052FF]">*</span>
                                              </label>
                                              <div className="relative">
                                                <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                                <input
                                                  type="email"
                                                  id="email"
                                                  name="email"
                                                  required
                                                  placeholder="name@example.com"
                                                  value={formData.email}
                                                  onChange={handleChange}
                                                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-[#0052FF] focus:bg-white transition-all"
                                                />
                                              </div>
                                            </div>

                                            <div>
                                              <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                City / Location <span className="text-[#0052FF]">*</span>
                                              </label>
                                              <div className="relative">
                                                <MapPin size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                                <input
                                                  type="text"
                                                  id="city"
                                                  name="city"
                                                  required
                                                  placeholder="e.g. Pune, Baner, PCMC"
                                                  value={formData.city}
                                                  onChange={handleChange}
                                                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-[#0052FF] focus:bg-white transition-all"
                                                />
                                              </div>
                                            </div>
                                          </div>

                                          {/* Project Type */}
                                          <div>
                                            <label htmlFor="projectType" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                              Project Type <span className="text-[#0052FF]">*</span>
                                            </label>
                                            <div className="relative">
                                              <Building2 size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                              <select
                                                id="projectType"
                                                name="projectType"
                                                required
                                                value={formData.projectType}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-[#0052FF] focus:bg-white transition-all appearance-none cursor-pointer"
                                              >
                                                <option value="" disabled>Select project type</option>
                                                <option value="Residential Construction">Residential Construction (Villa / Bungalow / Row House)</option>
                                                <option value="Commercial Construction">Commercial &amp; Office Building Construction</option>
                                                <option value="Turnkey Civil Construction">Complete Turnkey Civil Contract</option>
                                                <option value="Renovation & Remodeling">Structural Renovation &amp; Remodeling</option>
                                                <option value="Architectural & Interior Design">Architectural &amp; Interior Design</option>
                                                <option value="Project Finance & Joint Venture">Project Finance / Joint Venture</option>
                                                <option value="Other">Other Project Type</option>
                                              </select>
                                              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Requirements / Message */}
                                          <div>
                                            <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                              Your Requirements / Message <span className="text-xs text-slate-400 font-normal lowercase">(optional)</span>
                                            </label>
                                            <textarea
                                              id="message"
                                              name="message"
                                              rows={3}
                                              value={formData.message}
                                              onChange={handleChange}
                                              placeholder="Tell us about plot area, number of floors, estimated budget, or expected commencement date..."
                                              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-[#0052FF] focus:bg-white resize-none transition-all"
                                            />
                                          </div>

                                          {/* Privacy reassurance */}
                                          <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                                            <ShieldCheck size={14} className="text-slate-400 shrink-0" />
                                            <span>Your contact details are strictly confidential and used only to address your construction requirement.</span>
                                          </p>

                                          {/* Submit Button */}
                                          <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-[#0A1227] hover:bg-[#0052FF] text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-[#0052FF]/25 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60"
                                          >
                                            {isSubmitting ? (
                                              <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span className="text-sm">Submitting &amp; Opening WhatsApp...</span>
                                              </>
                                            ) : (
                                              <>
                                                <MessageCircle size={18} className="text-[#25D366] group-hover:scale-110 transition-transform" />
                                                <span className="text-sm">Submit &amp; Connect on WhatsApp</span>
                                                <ArrowRight size={16} className="text-white/70 group-hover:translate-x-1 transition-transform" />
                                              </>
                                            )}
                                          </button>

                                          <div className="text-center">
                                            <span className="text-[11px] text-slate-500">
                                              Enquiry forwarded to: <strong className="text-slate-700">project@blueprintbuildcon.homes</strong> &amp; WhatsApp (+91 9028087659)
                                            </span>
                                          </div>
                                        </form>
                                      </div>
                )}
                                    </div>
            </div>
                            </motion.div>

                          </div>
                        </div>
                      </section>
                      );
}
