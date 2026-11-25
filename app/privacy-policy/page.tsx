'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-800 selection:bg-[#0052FF] selection:text-white pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
      {/* Centered Document Card Container (matching simple clean look from image) */}
      <div className="max-w-4xl mx-auto bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl p-6 sm:p-12 md:p-16 border border-slate-100">

        {/* Document Header */}
        <div className="border-b border-slate-100 pb-6 mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-[40px] font-extrabold text-[#0B1736] tracking-tight leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-2">
            Last Updated: 25 November 2026
          </p>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mt-4">
            <strong>BluePrint Build-Con</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy. This Privacy Policy explains how information may be collected, used, stored, and shared when you visit our website, submit an inquiry, book a site consultation, or communicate with us.
          </p>
        </div>

        {/* 1. Information We Collect */}
        <section className="mb-8">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5">
            1. Information We Collect
          </h2>
          <p className="text-sm text-slate-600 sm:text-slate-700 leading-relaxed mb-2.5">
            Depending on your inquiry and the services requested, we may collect:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 sm:text-slate-700">
            <li>Name, mobile number, and email address.</li>
            <li>City, site address, location, and pincode.</li>
            <li>Profession, employment, or business details.</li>
            <li>Project / property type, property status, and estimated construction budget.</li>
            <li>Information submitted voluntarily through website inquiry forms, consultation requests, or official communication channels.</li>
            <li id="cookies">Technical details collected through cookies, analytics tools, and browsing logs when interacting with our website.</li>
          </ul>
        </section>

        {/* 2. How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5">
            2. How We Use Your Information
          </h2>
          <p className="text-sm text-slate-600 sm:text-slate-700 leading-relaxed mb-2.5">
            We may use your information to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 sm:text-slate-700">
            <li>Respond to construction inquiries, blueprint consultations, and service requests.</li>
            <li>Understand your architectural, structural, and civil engineering requirements.</li>
            <li>Contact you regarding inquiries, site inspections, estimates, and project follow-ups.</li>
            <li>Coordinate with relevant engineering specialists, material suppliers, and lending partners where authorised (such as for project loans).</li>
            <li>Manage referral program enrollments and disburse referral cash commissions.</li>
            <li>Improve our customer support, digital platform, and construction services.</li>
            <li>Meet applicable legal, statutory, and regulatory requirements under Indian law (including the Digital Personal Data Protection Act, 2023).</li>
          </ul>
        </section>

        {/* 3. WhatsApp and AI-Assisted Communication */}
        <section className="mb-8">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5">
            3. WhatsApp and AI-Assisted Communication
          </h2>
          <p className="text-sm text-slate-600 sm:text-slate-700 leading-relaxed mb-2.5">
            We may use WhatsApp and automated or AI-assisted tools to communicate with customers and respond to inquiries. Information processed through these services may be handled by the relevant technology providers, including Meta and Google, subject to their applicable terms and privacy policies.
          </p>
          <p className="text-sm text-slate-600 sm:text-slate-700 leading-relaxed">
            Please do not share OTPs, passwords, PINs, internet banking credentials, or unnecessarily sensitive identity information in chatbot or messaging conversations.
          </p>
        </section>

        {/* 4. Sharing of Information */}
        <section className="mb-8">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5">
            4. Sharing of Information
          </h2>
          <p className="text-sm text-slate-600 sm:text-slate-700 leading-relaxed">
            Where necessary and authorised, relevant information may be shared with banking and lending partners (for clients requesting project loans), verified subcontractors, engineering consultants, technology providers, or service partners for the purposes described in this policy. Information may also be disclosed when required by applicable law, statutory authorities, or court orders.
          </p>
        </section>

        {/* 5. Data Security */}
        <section className="mb-8">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5">
            5. Data Security
          </h2>
          <p className="text-sm text-slate-600 sm:text-slate-700 leading-relaxed">
            We take reasonable physical, electronic, and administrative steps to protect the information provided to us against unauthorized access, loss, or misuse. However, no electronic transmission or storage system can be guaranteed to be completely secure.
          </p>
        </section>

        {/* 6. Data Retention */}
        <section className="mb-8">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5">
            6. Data Retention
          </h2>
          <p className="text-sm text-slate-600 sm:text-slate-700 leading-relaxed">
            We retain personal information for as long as reasonably necessary for the purposes described in this policy, to service project warranties (such as our 10-year structural guarantee), and to meet applicable legal, regulatory, tax, and record-keeping requirements.
          </p>
        </section>

        {/* 7. Your Privacy Choices */}
        <section className="mb-8">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5">
            7. Your Privacy Choices
          </h2>
          <p className="text-sm text-slate-600 sm:text-slate-700 leading-relaxed">
            You may contact us to request access to, correction of, or deletion of your personal information, subject to applicable legal requirements and legitimate record-retention needs. You may also request that we stop contacting you about an inquiry.
          </p>
        </section>

        {/* 8. Third-Party Websites */}
        <section className="mb-8">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5">
            8. Third-Party Websites
          </h2>
          <p className="text-sm text-slate-600 sm:text-slate-700 leading-relaxed">
            Our website may contain links to third-party websites or services (e.g. social platforms, maps, banking partners). Their privacy practices are governed by their own policies, and we encourage you to review them.
          </p>
        </section>

        {/* 9. Changes to This Policy */}
        <section className="mb-8">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5">
            9. Changes to This Policy
          </h2>
          <p className="text-sm text-slate-600 sm:text-slate-700 leading-relaxed">
            We may update this Privacy Policy from time to time. Any updated version will be published on this page with a revised effective date.
          </p>
        </section>

        {/* 10. Contact Us */}
        <section className="pt-6 border-t border-slate-100">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
            10. Contact Us
          </h2>
          <div className="text-sm text-slate-700 space-y-1.5 leading-relaxed">
            <p className="font-semibold text-slate-900">BluePrint Build-Con</p>
            <p>
              Website:{' '}
              <Link href="/" className="text-[#0052FF] hover:underline font-medium">
                www.blueprintbuildcon.homes
              </Link>
            </p>
            <p>
              Email:{' '}
              <a href="mailto:project@blueprintbuildcon.homes" className="text-[#0052FF] hover:underline font-medium">
                project@blueprintbuildcon.homes
              </a>
            </p>
            <p>
              Direct Line:{' '}
              <a href="tel:+919028346900" className="text-[#0052FF] hover:underline font-medium">
                +91 9028346900
              </a>
            </p>
            <p className="text-xs text-slate-600 pt-1">
              Registered Office: WORK FLO, ICON TOWER 7TH FLOOR OFFICE NO 702, BANER ROAD, BANER, OPP KFC, BANER, PUNE (MUNICIPAL CORPORATION.), PUNE CITY, PUNE, 411045
            </p>
          </div>

          {/* Action Button (matching image) */}
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#0052FF] hover:bg-[#0041cc] text-white text-xs sm:text-sm font-bold shadow-md transition-all duration-200"
            >
              Contact Privacy Desk
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
