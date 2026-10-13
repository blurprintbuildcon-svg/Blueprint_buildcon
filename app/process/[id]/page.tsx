import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Users, 
  FileText, 
  Phone,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { processSteps } from '@/data/processSteps';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return processSteps.map((step) => ({
    id: step.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const step = processSteps.find((s) => s.id === id);

  if (!step) {
    return {
      title: 'Process Step Not Found | Blueprint Build Con',
      description: 'The requested construction process step could not be found.',
    };
  }

  return {
    title: `Step ${step.number}: ${step.title} | Our Process | Blueprint Build Con`,
    description: step.shortDescription,
    openGraph: {
      title: `${step.title} - Blueprint Build Con Construction Process`,
      description: step.shortDescription,
      images: [{ url: step.image }],
    },
  };
}

export default async function ProcessDetailPage({ params }: PageProps) {
  const { id } = await params;
  const stepIndex = processSteps.findIndex((s) => s.id === id);

  if (stepIndex === -1) {
    notFound();
  }

  const step = processSteps[stepIndex];
  const prevStep = stepIndex > 0 ? processSteps[stepIndex - 1] : null;
  const nextStep = stepIndex < processSteps.length - 1 ? processSteps[stepIndex + 1] : null;

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      {/* Top Breadcrumb & Navigation */}
      <div className="container mx-auto px-4 md:px-6 mb-8">
        <Link
          href="/process"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-orange transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Process Steps</span>
        </Link>
      </div>

      {/* Full-width Image Hero Banner on Top */}
      <section className="container mx-auto px-4 md:px-6 mb-10">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[340px] sm:h-[440px] md:h-[500px] border border-slate-200">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-black/20 to-transparent" />
          
          <div className="absolute top-6 left-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-navy/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} className="text-brand-orange" />
            <span>Phase {step.number} of {String(processSteps.length).padStart(2, '0')}</span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 drop-shadow-md">
              {step.title}
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed drop-shadow">
              {step.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Meta Highlights Bar */}
      <section className="container mx-auto px-4 md:px-6 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-orange flex items-center justify-center shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Typical Duration</span>
              <strong className="text-brand-navy text-base font-bold">{step.duration}</strong>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Quality Milestone</span>
              <strong className="text-brand-navy text-base font-bold">{step.qualityMilestone}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left 2 Columns: Detailed Breakdown */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-sm">
              <h2 className="text-2xl font-bold text-brand-navy mb-5 flex items-center gap-3">
                <FileText className="text-brand-orange" size={26} />
                <span>Phase Overview & Approach</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {step.fullDescription}
              </p>
              <div className="rounded-2xl bg-blue-50/70 border border-blue-100 p-5 text-sm text-blue-900 leading-relaxed flex items-start gap-3">
                <Users size={20} className="text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-brand-navy mb-1 font-semibold">Your Role & Collaboration:</strong>
                  {step.clientInvolvement}
                </div>
              </div>
            </div>

            {/* Key Deliverables */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-sm">
              <h2 className="text-2xl font-bold text-brand-navy mb-6">
                What You Receive (Deliverables)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {step.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <CheckCircle2 size={20} className="text-brand-orange shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Activities */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-sm">
              <h2 className="text-2xl font-bold text-brand-navy mb-6">
                Engineering & Execution Activities
              </h2>
              <ul className="space-y-4">
                {step.keyActivities.map((activity, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-base text-slate-600 leading-relaxed">
                      {activity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step Navigation (Prev / Next) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
              {prevStep ? (
                <Link
                  href={`/process/${prevStep.id}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-3 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 hover:border-brand-orange text-brand-navy font-semibold text-sm transition-all shadow-sm"
                >
                  <ArrowLeft size={16} />
                  <span>Previous: {prevStep.title}</span>
                </Link>
              ) : <div />}

              {nextStep ? (
                <Link
                  href={`/process/${nextStep.id}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-end gap-3 px-6 py-3.5 rounded-2xl bg-brand-navy hover:bg-brand-charcoal text-white font-semibold text-sm transition-all shadow-sm ml-auto"
                >
                  <span>Next: {nextStep.title}</span>
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-brand-orange hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md ml-auto"
                >
                  <span>Ready to Begin? Contact Us</span>
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: Steps Quick Nav & Direct Consultation Card */}
          <div className="space-y-8">
            {/* Quick Process Steps List */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm sticky top-28">
              <h3 className="text-xl font-bold text-brand-navy mb-5 pb-3 border-b border-slate-100">
                All 6 Process Steps
              </h3>
              <div className="space-y-2.5">
                {processSteps.map((s) => {
                  const isActive = s.id === step.id;
                  return (
                    <Link
                      key={s.id}
                      href={`/process/${s.id}`}
                      className={`flex items-center justify-between p-3.5 rounded-2xl transition-all text-sm ${
                        isActive
                          ? 'bg-brand-orange text-white font-bold shadow-md shadow-brand-orange/20'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          isActive ? 'bg-white text-brand-orange' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {s.number}
                        </span>
                        <span>{s.title}</span>
                      </div>
                      <ArrowRight size={15} className={isActive ? 'text-white' : 'text-slate-400'} />
                    </Link>
                  );
                })}
              </div>

              {/* Consultation Assistance Box */}
              <div className="mt-8 pt-6 border-t border-slate-100 bg-brand-navy rounded-2xl p-6 text-white text-center">
                <h4 className="text-lg font-bold mb-2">Have Questions About This Step?</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Our civil engineering advisors can walk you through the specifics of your project site.
                </p>
                <div className="space-y-2.5">
                  <a
                    href="tel:+919028346900"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-brand-orange hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
                  >
                    <Phone size={16} />
                    <span>Call +91 9028346900</span>
                  </a>
                  <a
                    href="https://wa.me/919028346900?text=Hi%20Blueprint%20BuildCon,%20I%20have%20questions%20about%20your%20construction%20process"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
