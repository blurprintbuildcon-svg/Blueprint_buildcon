'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  FileText,
  Lock,
  Database,
  UserCheck,
  AlertCircle,
  Mail,
  Printer,
  ChevronRight,
  ExternalLink,
  Building,
  CheckCircle2,
  Clock,
  Sparkles,
  Share2,
} from 'lucide-react';

export default function PrivacyPolicyPage() {
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
    { id: 'definitions', label: '1. Definitions' },
    { id: 'collection', label: '2. Collection of Personal Data' },
    { id: 'third-party-disclaimer', label: '3. Third-Party Data Disclaimer' },
    { id: 'purpose', label: '4. Purpose & Lawful Basis of Processing' },
    { id: 'consent-mechanism', label: '5. Consent Mechanism' },
    { id: 'disclosure', label: '6. Disclosure & Data Processors' },
    { id: 'retention', label: '7. Data Retention' },
    { id: 'security', label: '8. Data Security' },
    { id: 'children', label: '9. Children’s Data' },
    { id: 'rights', label: '10. Data Principal Rights' },
    { id: 'grievance', label: '11. Grievance Redressal' },
    { id: 'changes', label: '12. Changes To This Policy' },
    { id: 'consent-notice', label: '13. Consent Notice' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-brand-blue selection:text-white pt-24 pb-20">
      {/* TOP HEADER / HERO */}
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
            <span className="text-brand-cyan font-medium">Privacy Policy</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck size={14} />
                <span>DPDP Act, 2023 Compliant</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Privacy Policy
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                <strong>BluePrint BuildCon</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition shadow-xs cursor-pointer"
                title="Print this policy"
              >
                <Printer size={15} />
                <span>Print Document</span>
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition shadow-xs cursor-pointer"
                title="Copy policy URL"
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
              className="px-4 py-2 rounded-lg bg-brand-blue text-white text-xs sm:text-sm font-bold shadow-sm transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-bold transition"
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
              Entity: <strong>BluePrint BuildCon</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-600" />
              Governing Law: <strong>DPDP Act, 2023 (India)</strong>
            </span>
          </div>
          <div className="text-slate-500 font-mono text-[11px]">
            Doc Ref: POL-DPDP-2026-V1
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* STICKY TABLE OF CONTENTS (SIDEBAR) */}
          <aside aria-label="Table of Contents" className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <FileText size={15} className="text-brand-blue" />
                <span>Table of Contents</span>
              </h2>
              <nav aria-label="Policy sections" className="space-y-1">
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

            {/* GRIEVANCE QUICK CARD */}
            <div className="bg-gradient-to-br from-blue-50/80 via-white to-slate-50 rounded-2xl border border-blue-200/80 p-5 shadow-xs text-xs space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-brand-navy">
                <Mail size={16} className="text-brand-blue" />
                <span>Grievance Redressal</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                In accordance with the DPDP Act, personal data concerns may be addressed to:
              </p>
              <div className="pt-1 border-t border-blue-100 font-medium text-slate-700 space-y-1">
                <div>Office: <strong>Grievance Officer, BluePrint BuildCon</strong></div>
                <div>
                  Email:{' '}
                  <a
                    href="mailto:project@blueprintbuildcon.homes"
                    className="text-brand-blue hover:underline font-bold"
                  >
                    project@blueprintbuildcon.homes
                  </a>
                </div>
              </div>
            </div>

            {/* TERMS SWITCHER CARD */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs text-xs space-y-2">
              <h3 className="font-bold text-slate-800">Looking for Terms of Service?</h3>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Read our complete terms regarding architectural designs, turnkey construction contracts, milestone payments, and warranties.
              </p>
              <Link
                href="/terms"
                className="inline-flex items-center gap-1.5 text-brand-blue font-bold hover:underline pt-1"
              >
                <span>Read Terms &amp; Conditions</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </aside>

          {/* MAIN LEGAL DOCUMENT BODY */}
          <article className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-10">

            {/* INTRODUCTORY STATEMENT */}
            <section className="space-y-4 pb-8 border-b border-slate-100">
              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  This Privacy Policy describes how <strong>BluePrint BuildCon</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;), collects, uses, stores, discloses, and protects Personal Data of users in accordance with the <strong>Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;)</strong> and applicable Indian laws.
                </p>
                <p>
                  By accessing or using our website, mobile application, or services (collectively, the <strong>“Services”</strong>), you acknowledge that you have read and understood this Privacy Policy and consent to the processing of your Personal Data as described herein.
                </p>
              </div>
            </section>

            {/* SECTION 1: DEFINITIONS */}
            <section id="definitions" className="space-y-4 pt-2">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  01
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  DEFINITIONS
                </h2>
              </div>

              <dl className="grid grid-cols-1 gap-3.5 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <dt className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-1">
                    “Data Principal”
                  </dt>
                  <dd className="text-sm text-slate-700 leading-relaxed">
                    means the individual to whom the Personal Data relates.
                  </dd>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <dt className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-1">
                    “Data Fiduciary”
                  </dt>
                  <dd className="text-sm text-slate-700 leading-relaxed">
                    means BluePrint BuildCon.
                  </dd>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <dt className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-1">
                    “Data Processor”
                  </dt>
                  <dd className="text-sm text-slate-700 leading-relaxed">
                    means any third party that processes Personal Data on behalf of the Company.
                  </dd>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <dt className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-1">
                    “Personal Data”
                  </dt>
                  <dd className="text-sm text-slate-700 leading-relaxed">
                    means any data about an individual who is identifiable by or in relation to such data.
                  </dd>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <dt className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-1">
                    “Consent”
                  </dt>
                  <dd className="text-sm text-slate-700 leading-relaxed">
                    means a freely given, specific, informed, unconditional and unambiguous indication of the Data Principal’s agreement to the processing of their Personal Data.
                  </dd>
                </div>
              </dl>
            </section>

            {/* SECTION 2: COLLECTION OF PERSONAL DATA */}
            <section id="collection" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  02
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  COLLECTION OF PERSONAL DATA
                </h2>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                We may collect Personal Data through the following lawful sources:
              </p>

              <ul className="space-y-3 pt-1 text-sm text-slate-700">
                <li className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <CheckCircle2 size={18} className="text-brand-blue shrink-0 mt-0.5" />
                  <span>
                    <strong>Directly from you</strong>, when you register on our platform, submit forms, communicate with us, or use our Services.
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <CheckCircle2 size={18} className="text-brand-blue shrink-0 mt-0.5" />
                  <span>
                    <strong>From Channel Partners, contractors, brokers, or other business partners</strong> with whom we have entered into valid arrangements such as referral agreements, provided that such parties represent and confirm that they have obtained the necessary consent or lawful authority to share such Personal Data with us.
                  </span>
                </li>
                <li id="cookies" className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <CheckCircle2 size={18} className="text-brand-blue shrink-0 mt-0.5" />
                  <span>
                    <strong>Automatically, through cookies, analytics tools, and similar technologies</strong> when you interact with our website or platform.
                  </span>
                </li>
              </ul>
            </section>

            {/* SECTION 3: THIRD-PARTY DATA DISCLAIMER */}
            <section id="third-party-disclaimer" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  03
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  Third-Party Data Disclaimer
                </h2>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 text-sm leading-relaxed space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <AlertCircle size={18} className="text-amber-600 shrink-0" />
                  <span>Notice Concerning Channel &amp; Referral Partner Data</span>
                </div>
                <p>
                  Where Personal Data is received by BluePrint BuildCon from third parties such as channel partners, referral partners, or other intermediaries, the Company relies on such third parties to have collected and shared the Personal Data in compliance with applicable data protection laws.
                </p>
                <p>
                  The Company shall not be responsible for any unauthorised, excessive, or unlawful collection of Personal Data by such third parties prior to receipt by the Company. Upon receipt, the Company shall process such Personal Data in accordance with this Privacy Policy and applicable law.
                </p>
              </div>
            </section>

            {/* SECTION 4: PURPOSE AND LAWFUL BASIS OF PROCESSING */}
            <section id="purpose" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  04
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  PURPOSE AND LAWFUL BASIS OF PROCESSING
                </h2>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                We process Personal Data strictly in accordance with the DPDP Act on the basis of:
              </p>

              <div className="space-y-3 text-sm text-slate-700">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h3 className="font-bold text-brand-navy mb-1">
                    1. Consent provided by the Data Principal; and/or
                  </h3>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <h3 className="font-bold text-brand-navy">
                    2. Legitimate uses permitted under the DPDP Act, including but not limited to:
                  </h3>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
                    <li>Performance of a contract or provision of requested services</li>
                    <li>Compliance with legal or regulatory obligations</li>
                    <li>Prevention of fraud, misuse, or unlawful activity</li>
                    <li>Responding to queries, grievances, or customer support requests</li>
                  </ul>
                </div>

                <p className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-brand-navy font-medium">
                  Personal Data shall not be processed for purposes that are incompatible with those stated above.
                </p>
              </div>
            </section>

            {/* SECTION 5: CONSENT MECHANISM */}
            <section id="consent-mechanism" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  05
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  CONSENT MECHANISM
                </h2>
              </div>

              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  Consent is obtained through clear affirmative action such as selecting a checkbox, submitting forms, or continued use of Services after being presented with a consent notice.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span>
                    You may withdraw your consent at any time by writing to us at{' '}
                    <a
                      href="mailto:project@blueprintbuildcon.homes"
                      className="text-brand-blue font-bold hover:underline"
                    >
                      project@blueprintbuildcon.homes
                    </a>
                    . Withdrawal of consent shall not affect the lawfulness of processing prior to such withdrawal.
                  </span>
                  <a
                    href="mailto:project@blueprintbuildcon.homes?subject=Withdrawal%20of%20Consent%20-%20DPDP%20Act"
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-800 text-white font-bold text-xs hover:bg-slate-900 transition text-center"
                  >
                    Withdraw Consent
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 6: DISCLOSURE AND DATA PROCESSORS */}
            <section id="disclosure" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  06
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  DISCLOSURE AND DATA PROCESSORS
                </h2>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                We may share Personal Data with:
              </p>

              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-brand-blue mt-2 shrink-0" />
                  <span>
                    <strong>Service providers and Data Processors</strong>, including technology partners, analytics providers, customer engagement platforms, and communication service providers, engaged to perform services on our behalf.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-brand-blue mt-2 shrink-0" />
                  <span>
                    <strong>Auditors, consultants, and professional advisors</strong> for compliance, governance, financial reporting, and audit purposes.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-brand-blue mt-2 shrink-0" />
                  <span>
                    <strong>Regulatory or government authorities</strong> where required under applicable law.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-brand-blue mt-2 shrink-0" />
                  <span>
                    <strong>Successors or assignees</strong> in the event of a merger, acquisition, restructuring, or transfer of business.
                  </span>
                </li>
              </ul>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
                <p>
                  Such Data Processors may have limited access to Personal Data solely for performing services on our behalf and are contractually bound to process such data strictly in accordance with applicable data protection laws and our instructions.
                </p>
                <p>
                  All Data Processors are required to implement appropriate technical and organisational safeguards and shall not use Personal Data for any purpose other than providing services to BluePrint BuildCon.
                </p>
              </div>
            </section>

            {/* SECTION 7: DATA RETENTION */}
            <section id="retention" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  07
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  DATA RETENTION
                </h2>
              </div>

              <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
                <p>
                  We retain Personal Data for as long as it is necessary to fulfil the purposes for which it was collected, including for the lifetime of the Company, subject to applicable legal, regulatory, audit, accounting, and compliance requirements.
                </p>
                <p>
                  Personal Data may be retained beyond the active business relationship for purposes such as:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
                  <li>Statutory, regulatory, or tax compliance</li>
                  <li>Internal or external audits</li>
                  <li>Legal proceedings or dispute resolution</li>
                  <li>Prevention of fraud and misuse</li>
                  <li>Maintenance of historical business records</li>
                </ul>
                <p>
                  Where retention is no longer required under applicable law, such data shall be securely deleted, anonymised, or archived in accordance with our internal data retention policies.
                </p>
              </div>
            </section>

            {/* SECTION 8: DATA SECURITY */}
            <section id="security" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  08
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  DATA SECURITY
                </h2>
              </div>

              <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
                <p>
                  We implement reasonable security safeguards, including technical and organisational measures, to protect Personal Data from unauthorised access, disclosure, alteration, or destruction.
                </p>
                <p className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-xs italic">
                  However, no system is completely secure and we do not guarantee absolute security.
                </p>
              </div>
            </section>

            {/* SECTION 9: CHILDREN'S DATA */}
            <section id="children" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  09
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  CHILDREN’S DATA
                </h2>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                Our Services are not directed at individuals below the age of 18. Personal Data of children shall be processed only with verifiable consent of a parent or lawful guardian, in accordance with the DPDP Act. We do not engage in tracking, profiling, or targeted advertising directed at children.
              </p>
            </section>

            {/* SECTION 10: DATA PRINCIPAL RIGHTS */}
            <section id="rights" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  10
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  DATA PRINCIPAL RIGHTS
                </h2>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                Subject to applicable law, you have the right to:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Obtain information about processing of your Personal Data</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Seek correction or erasure of your Personal Data</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Withdraw consent</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Register a grievance with BluePrint BuildCon</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 sm:col-span-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Nominate another individual to exercise your rights in the event of death or incapacity</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/70 text-xs sm:text-sm text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span>
                  Requests may be submitted to:{' '}
                  <a
                    href="mailto:project@blueprintbuildcon.homes"
                    className="text-brand-blue font-bold hover:underline"
                  >
                    project@blueprintbuildcon.homes
                  </a>
                </span>
                <a
                  href="mailto:project@blueprintbuildcon.homes?subject=Data%20Principal%20Rights%20Request"
                  className="px-4 py-2 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-blue-700 transition text-center shadow-xs"
                >
                  Submit Request
                </a>
              </div>
            </section>

            {/* SECTION 11: GRIEVANCE REDRESSAL */}
            <section id="grievance" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  11
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  GRIEVANCE REDRESSAL
                </h2>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                In accordance with the DPDP Act, grievances may be addressed to:
              </p>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-brand-navy text-white shadow-md space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-brand-cyan">
                    Designated Grievance Officer
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] text-slate-300 font-mono">
                    DPDP Act Statutory Officer
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-bold text-white">
                    Grievance Officer: Legal &amp; Compliance Cell, BluePrint BuildCon
                  </div>
                  <div className="text-sm text-slate-300">
                    Email:{' '}
                    <a
                      href="mailto:project@blueprintbuildcon.homes"
                      className="text-brand-cyan hover:underline font-semibold"
                    >
                      project@blueprintbuildcon.homes
                    </a>
                  </div>
                  <div className="text-xs text-slate-400">
                    Office Address: WORK FLO, ICON TOWER 7TH FLOOR OFFICE NO 702, BANER ROAD, BANER, OPP KFC, PUNE 411045
                  </div>
                </div>
                <div className="pt-2 text-xs text-slate-400 border-t border-slate-700/60 leading-relaxed">
                  For prompt resolution, please include your full name, contact information, and a clear description of your grievance.
                </div>
              </div>
            </section>

            {/* SECTION 12: CHANGES TO THIS POLICY */}
            <section id="changes" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  12
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  Changes To This Policy
                </h2>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                We may update this Privacy Policy from time to time. Material changes shall be communicated through the website or other appropriate means. Continued use of the Services shall constitute acknowledgment of the updated Policy.
              </p>
            </section>

            {/* SECTION 13: CONSENT NOTICE */}
            <section id="consent-notice" className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-xs">
                  13
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  CONSENT NOTICE
                </h2>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200 text-slate-800 text-sm leading-relaxed space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-base">
                  <CheckCircle2 size={20} className="text-brand-blue shrink-0" />
                  <span>Affirmative User Consent Statement</span>
                </div>
                <p>
                  By clicking <strong>“I Agree”</strong>, submitting your details, or using our Services, you consent to the collection and processing of your Personal Data by <strong>BluePrint BuildCon</strong> for the purposes stated in the Privacy Policy.
                </p>
                <p className="text-xs text-slate-600">
                  You may withdraw your consent at any time by writing to{' '}
                  <a
                    href="mailto:project@blueprintbuildcon.homes"
                    className="text-brand-blue font-bold hover:underline"
                  >
                    project@blueprintbuildcon.homes
                  </a>
                  .
                </p>
              </div>
            </section>

          </article>
        </div>
      </main>
    </div>
  );
}
