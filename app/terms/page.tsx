'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertCircle,
  Scale,
  Printer,
  Share2,
  ChevronRight,
  Clock,
  Coins,
  Wrench,
  Compass,
  AlertTriangle,
  Mail,
} from 'lucide-react';

export default function TermsAndConditionsPage() {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tableOfContents = [
    { id: 'acceptance', label: '1. Acceptance & Scope of Terms' },
    { id: 'services', label: '2. Services, Blueprints & Turnkey Contracts' },
    { id: 'quotations', label: '3. Estimates, Quotations & Price Validity' },
    { id: 'payments', label: '4. Stage-Wise Milestone Payments' },
    { id: 'client-obligations', label: '5. Client Responsibilities & Site Clearances' },
    { id: 'referral-terms', label: '6. Referral Program & Partner Commission' },
    { id: 'warranty', label: '7. Material Standards & Structural Warranty' },
    { id: 'delays', label: '8. Delays & Force Majeure' },
    { id: 'change-orders', label: '9. Scope Modifications & Change Orders' },
    { id: 'cancellation', label: '10. Cancellation, Suspension & Refunds' },
    { id: 'intellectual-property', label: '11. Intellectual Property & Blueprints' },
    { id: 'liability', label: '12. Limitation of Liability' },
    { id: 'governing-law', label: '13. Governing Law & Dispute Resolution' },
    { id: 'contact-notices', label: '14. Grievances & Official Notices' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-brand-blue selection:text-white pt-24 pb-20">
      {/* TOP HERO */}
      <section className="bg-brand-navy text-white relative overflow-hidden py-14 sm:py-18 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#1360e2_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={13} className="text-slate-600" />
            <span className="text-slate-400">Legal</span>
            <ChevronRight size={13} className="text-slate-600" />
            <span className="text-brand-cyan font-medium">Terms &amp; Conditions</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-3">
                <Scale size={14} />
                <span>Commercial &amp; Civil Engineering Contract Framework</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Terms &amp; Conditions
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Rules, commitments, payment milestones, and service standards governing your architectural and construction engagement with <strong>BluePrint Build-Con</strong>.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition shadow-xs cursor-pointer"
                title="Print terms"
              >
                <Printer size={15} />
                <span>Print Document</span>
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition shadow-xs cursor-pointer"
                title="Share URL"
              >
                <Share2 size={15} />
                <span>{copied ? 'Copied Link!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Legal Navigation Tabs */}
          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center gap-3">
            <Link
              href="/privacy-policy"
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-bold transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="px-4 py-2 rounded-lg bg-brand-blue text-white text-xs sm:text-sm font-bold shadow-sm transition"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </section>

      {/* METADATA BAR */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock size={14} className="text-slate-400" />
              Effective: <strong>October 2026</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Building size={14} className="text-slate-400" />
              Operating Entity: <strong>BluePrint Build-Con</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Scale size={14} className="text-emerald-600" />
              Jurisdiction: <strong>Courts of Pune, Maharashtra, India</strong>
            </span>
          </div>
          <div className="text-slate-500 font-mono text-[11px]">
            Doc Ref: TC-CONST-2026-V1
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* STICKY SIDEBAR */}
          <aside aria-label="Table of Contents" className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <FileText size={15} className="text-brand-blue" />
                <span>Table of Contents</span>
              </h2>
              <nav aria-label="Terms sections" className="space-y-1">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-brand-blue hover:bg-blue-50/70 transition"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* KEY HIGHLIGHTS */}
            <div className="bg-gradient-to-br from-blue-50/80 via-white to-slate-50 rounded-2xl border border-blue-200/80 p-5 shadow-xs text-xs space-y-3">
              <div className="flex items-center gap-2 font-bold text-brand-navy">
                <ShieldCheck size={16} className="text-brand-blue" />
                <span>Key Customer Commitments</span>
              </div>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>10-Year Structural Warranty</strong> on all RCC frame structures.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Stage-Wise Escrow Payments</strong> tied strictly to physical site verification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Hidden Costs:</strong> Detailed line-item BOQs before project kickoff.</span>
                </li>
              </ul>
            </div>

            {/* NEED HELP */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs text-xs space-y-2">
              <h3 className="font-bold text-slate-800">Questions about our Terms?</h3>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Our legal and civil engineering consultation desk is available to assist you.
              </p>
              <a
                href="mailto:project@blueprintbuildcon.homes"
                className="inline-flex items-center gap-1.5 text-brand-blue font-bold hover:underline pt-1"
              >
                <span>project@blueprintbuildcon.homes</span>
                <ChevronRight size={14} />
              </a>
            </div>
          </aside>

          {/* MAIN ARTICLE BODY */}
          <article className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-10">

            {/* INTRO */}
            <section className="space-y-4 pb-8 border-b border-slate-100">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Welcome to <strong>BluePrint Build-Con</strong>. These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Client&quot;, &quot;User&quot;, &quot;Partner&quot;, or &quot;You&quot;) and BluePrint Build-Con regarding your access to and use of our website, mobile interfaces, architectural blueprinting, site consultation, turnkey civil construction services, and referral partner programs.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                By browsing our platform, booking a site inspection, submitting a construction inquiry, enrolling in the referral program, or executing a construction work order, you acknowledge that you have read, understood, and agreed to be bound by these Terms and our Privacy Policy.
              </p>
            </section>

            {/* SECTION 1: ACCEPTANCE & SCOPE */}
            <section id="acceptance" className="space-y-4 pt-2">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  01
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  1. Acceptance &amp; Scope of Terms
                </h2>
              </div>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  These Terms govern all interactions with BluePrint Build-Con, including digital interfaces, offline consultations, architectural blueprint deliveries, structural calculations, site supervision, material procurement, and general turnkey building execution.
                </p>
                <p>
                  If you are entering into these Terms on behalf of a company, partnership, society, or other legal entity, you represent and warrant that you possess the full legal authority to bind such entity to these obligations.
                </p>
              </div>
            </section>

            {/* SECTION 2: SERVICES & SCOPE */}
            <section id="services" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  02
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  2. Services, Blueprints &amp; Turnkey Contracts
                </h2>
              </div>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  BluePrint Build-Con provides comprehensive architectural and civil construction services, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
                  <li><strong>Architectural Design &amp; 3D Elevation:</strong> Conceptual floor layouts, 3D modeling, Vastu-compliant blueprints, and MEP (Mechanical, Electrical, Plumbing) designs.</li>
                  <li><strong>Structural Engineering:</strong> Soil testing coordination, RCC frame design, load-bearing calculations, and seismic resistance planning as per Bureau of Indian Standards (IS codes).</li>
                  <li><strong>Turnkey Residential &amp; Commercial Construction:</strong> Complete project execution from excavation and foundation to brickwork, plastering, premium flooring, painting, and handover.</li>
                  <li><strong>Project Management &amp; Quality Audits:</strong> Digital stage tracking, quality checks (slump test, cube test, steel grade checks), and scheduled milestone reviews.</li>
                </ul>
              </div>
            </section>

            {/* SECTION 3: QUOTATIONS & ESTIMATES */}
            <section id="quotations" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  03
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  3. Estimates, Quotations &amp; Price Validity
                </h2>
              </div>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  Preliminary estimates provided on the website or via initial WhatsApp discussions are ballpark projections based on standard square-foot packages. Final binding contracts are based on an exhaustive <strong>Bill of Quantities (BOQ)</strong> prepared after comprehensive soil inspection and architectural finalization.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
                  <p><strong>Quote Validity:</strong> Formal written quotations remain valid for thirty (30) calendar days from issuance due to market fluctuations in core commodity prices (cement, TMT steel, and sand).</p>
                  <p><strong>Price Escalation Clause:</strong> Unless an explicit fixed-price turnkey agreement is executed, material price escalations beyond ±10% in government indices may be adjusted as defined in the master work order.</p>
                </div>
              </div>
            </section>

            {/* SECTION 4: PAYMENTS & MILESTONES */}
            <section id="payments" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  04
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  4. Stage-Wise Milestone Payments
                </h2>
              </div>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  To protect client funds and maintain total financial transparency, our turnkey contracts operate strictly on <strong>milestone-based payments</strong>:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="text-brand-navy block mb-1">Stage 1: Booking &amp; Soil Test</strong>
                    <span>Token advance upon contract signing for architectural 2D/3D approval and structural drawings.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="text-brand-navy block mb-1">Stage 2: Plinth &amp; Foundation</strong>
                    <span>Released only after completion of excavation, footing, plinth beam, and anti-termite treatment.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="text-brand-navy block mb-1">Stage 3: RCC Slab Castings</strong>
                    <span>Stage payments per floor upon successful casting and curing of reinforced concrete slabs.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="text-brand-navy block mb-1">Stage 4: Finishing &amp; Handover</strong>
                    <span>Final balance released post joint snag-list completion, final touch-ups, and handover certificate.</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 pt-1">
                  Work will not proceed to the subsequent milestone unless the preceding stage payment has been verified and settled.
                </p>
              </div>
            </section>

            {/* SECTION 5: CLIENT RESPONSIBILITIES */}
            <section id="client-obligations" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  05
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  5. Client Responsibilities &amp; Site Clearances
                </h2>
              </div>
              <div className="space-y-2.5 text-sm text-slate-700 leading-relaxed">
                <p>The client is responsible for providing:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
                  <li><strong>Clear Land Title &amp; Demarcation:</strong> Unencumbered ownership, peaceful site possession, and marked boundary stones.</li>
                  <li><strong>Statutory Approvals &amp; Sanctions:</strong> Building permission from municipal authorities (PMC, PCMC, BBMP, or local Gram Panchayat), with architectural liaison support from our team.</li>
                  <li><strong>Water &amp; Power Supply:</strong> Continuous construction-grade water and electrical connection at site for labor, mixing, and curing operations.</li>
                  <li><strong>Safe Access:</strong> Unobstructed vehicular access for transit mixers, RMC trucks, and material haulers.</li>
                </ul>
              </div>
            </section>

            {/* SECTION 6: REFERRAL PROGRAM */}
            <section id="referral-terms" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  06
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  6. Referral Program &amp; Partner Commission
                </h2>
              </div>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  Under the BluePrint Build-Con <strong>Refer &amp; Earn Program</strong>, channel partners, existing clients, and individuals may earn referral cash rewards ranging from <strong>₹10,000 to ₹1,00,000+</strong> per successful project:
                </p>
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs sm:text-sm text-amber-950 space-y-2">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Coins size={16} className="text-amber-600" />
                    <span>Referral Program Requirements</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-amber-900/90 text-xs">
                    <li><strong>Lawful Consent:</strong> Referrer warrants that they have informed the prospective client and obtained their consent prior to submitting their contact number and project scope.</li>
                    <li><strong>Eligibility:</strong> Referral rewards apply strictly to new, verified inquiries that culminate in signed turnkey or architectural contracts. Self-referrals or existing pipeline leads are excluded.</li>
                    <li><strong>Payout Timeline:</strong> Cash commission is disbursed via UPI/Bank Transfer within 7–14 business days after the referred client completes contract signing and the first milestone advance.</li>
                    <li><strong>Taxation:</strong> Referral payouts are subject to applicable TDS (Tax Deducted at Source) under Indian Income Tax regulations.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 7: WARRANTY & STANDARDS */}
            <section id="warranty" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  07
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  7. Material Standards &amp; Structural Warranty
                </h2>
              </div>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  We build to rigorous Indian Standard (IS) benchmarks using top-tier materials:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="text-brand-navy block mb-1">10-Year Structural Guarantee</strong>
                    <span>Covers RCC frame integrity, columns, beams, footings, and structural slabs against design or casting defects.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="text-brand-navy block mb-1">1-Year Defect Liability (DLP)</strong>
                    <span>Free rectification of plumbing leaks, electrical switchgear issues, door adjustments, and exterior painting hairline settlements.</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  Warranty excludes unauthorized structural alterations made by the client after handover, unauthorized third-party drilling, natural disasters (earthquake exceeding design limit, flooding), or intentional misuse.
                </p>
              </div>
            </section>

            {/* SECTION 8: DELAYS & FORCE MAJEURE */}
            <section id="delays" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  08
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  8. Delays &amp; Force Majeure
                </h2>
              </div>
              <div className="space-y-2.5 text-sm text-slate-700 leading-relaxed">
                <p>
                  BluePrint Build-Con is committed to on-time handover as committed in the master schedule. However, timelines will be reasonably extended without liability in cases of <strong>Force Majeure</strong>:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-slate-600">
                  <li>Acts of God, unseasonal severe weather, floods, earthquakes, pandemics, or government-imposed construction halts (e.g. NGT pollution bans).</li>
                  <li>Delays in client milestone payments or delayed approvals of finishes, tiles, or sanitary selections.</li>
                  <li>Local neighborhood disputes, court stay orders, or utility disconnections outside the Company&apos;s control.</li>
                </ul>
              </div>
            </section>

            {/* SECTION 9: CHANGE ORDERS */}
            <section id="change-orders" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  09
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  9. Scope Modifications &amp; Change Orders
                </h2>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Any modifications to approved blueprints, additions of built-up area, wall relocations, or specification upgrades requested after contract signing will be documented through a formal <strong>Variation / Change Order</strong> detailing revised costs and timeline adjustments before implementation.
              </p>
            </section>

            {/* SECTION 10: CANCELLATIONS & REFUNDS */}
            <section id="cancellation" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  10
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  10. Cancellation, Suspension &amp; Refunds
                </h2>
              </div>
              <div className="space-y-2.5 text-sm text-slate-700 leading-relaxed">
                <p>
                  In the event of project cancellation by the client prior to ground excavation, booking fees are refunded minus actual expenses incurred (site surveys, soil testing fees, structural calculations, and 3D architectural design hours).
                </p>
                <p className="text-xs text-slate-500">
                  Once physical ground excavation or RCC work has commenced, funds corresponding to completed work and procured on-site materials are non-refundable. A joint measurement audit will be performed to settle accounts.
                </p>
              </div>
            </section>

            {/* SECTION 11: INTELLECTUAL PROPERTY */}
            <section id="intellectual-property" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  11
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  11. Intellectual Property &amp; Blueprints
                </h2>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                All 2D floor plans, 3D renderings, structural blueprints, design layouts, and technical documentation produced by BluePrint Build-Con remain the intellectual property of the Company. The client is granted an exclusive, non-transferable license to construct the specific project on the designated plot. Resale or commercial reuse of plans on other sites is prohibited.
              </p>
            </section>

            {/* SECTION 12: LIMITATION OF LIABILITY */}
            <section id="liability" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  12
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  12. Limitation of Liability
                </h2>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                To the maximum extent permitted by applicable Indian law, the Company&apos;s total aggregate liability arising out of or related to any project engagement, whether in contract, tort, or warranty, shall not exceed the actual management and execution fees paid by the client under the specific work order in dispute.
              </p>
            </section>

            {/* SECTION 13: GOVERNING LAW */}
            <section id="governing-law" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  13
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  13. Governing Law &amp; Dispute Resolution
                </h2>
              </div>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the Republic of India.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <p>
                    <strong>Arbitration:</strong> Any dispute, controversy, or claim arising out of or relating to this contract shall be settled amicably through mutual discussion within thirty (30) days. Failing such resolution, the dispute shall be referred to arbitration under the Arbitration and Conciliation Act, 1996, before a sole arbitrator mutually appointed by both parties.
                  </p>
                  <p>
                    <strong>Jurisdiction:</strong> Subject to arbitration, the courts having jurisdiction in Pune, Maharashtra shall have exclusive jurisdiction over any legal proceedings.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 14: CONTACT & NOTICES */}
            <section id="contact-notices" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  14
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  14. Grievances &amp; Official Notices
                </h2>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-brand-navy text-white shadow-md space-y-3 text-xs sm:text-sm">
                <div className="text-brand-cyan font-bold uppercase tracking-wider text-xs">
                  Official Communication &amp; Legal Notices
                </div>
                <div className="space-y-1.5 text-slate-300">
                  <div><strong>Company:</strong> BluePrint Build-Con</div>
                  <div>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:project@blueprintbuildcon.homes" className="text-brand-cyan hover:underline font-semibold">
                      project@blueprintbuildcon.homes
                    </a>
                  </div>
                  <div>
                    <strong>Head Office:</strong> WORK FLO, ICON TOWER 7TH FLOOR OFFICE NO 702, BANER ROAD, BANER, OPP KFC, BANER, PUNE (MUNICIPAL CORPORATION.), PUNE CITY, PUNE, 411045
                  </div>
                </div>
              </div>
            </section>

          </article>
        </div>
      </main>
    </div>
  );
}
