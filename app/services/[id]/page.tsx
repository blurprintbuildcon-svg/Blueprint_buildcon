import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  MessageCircle, 
  Layers, 
  BadgeCheck 
} from 'lucide-react';
import { getPublicServiceById, getPublicServices } from '@/lib/public-content';
import { services as fallbackServices } from '@/data/services';
import EstimateCTA from '@/components/EstimateCTA';
import ServiceEnquiryForm from '@/components/ServiceEnquiryForm';

type PageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const service = await getPublicServiceById(id);

  if (!service) {
    return {
      title: 'Service Not Found | BluePrint BuildCon',
      description: 'The requested construction service could not be found.',
    };
  }

  return {
    title: `${service.title} | Construction Services | BluePrint BuildCon`,
    description: service.shortDescription || service.description.slice(0, 160),
    openGraph: {
      title: `${service.title} - BluePrint BuildCon`,
      description: service.shortDescription || service.description.slice(0, 160),
      images: [{ url: service.image }],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const service = await getPublicServiceById(id);

  if (!service) {
    notFound();
  }

  const allServices = await getPublicServices();
  const iconMatch = fallbackServices.find((s) => s.id === service.iconName || s.title === service.title);
  const ServiceIcon = iconMatch?.icon ?? fallbackServices[0].icon;

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 md:px-6 mb-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-orange transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* Full-width Image Hero Banner on Top */}
      <section className="container mx-auto px-4 md:px-6 mb-10">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[340px] sm:h-[440px] md:h-[500px] border border-slate-200">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-black/25 to-transparent" />

          {/* Top Category Tag */}
          <div className="absolute top-6 left-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-navy/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} className="text-brand-orange" />
            <span>{service.category || 'Specialized Construction'}</span>
          </div>

          {/* Service Icon Floating Badge */}
          <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl flex items-center justify-center text-brand-orange border border-white/40">
            <ServiceIcon size={28} />
          </div>

          {/* Bottom Title & Summary */}
          <div className="absolute bottom-6 left-6 right-6 text-white max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 drop-shadow-md">
              {service.title}
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed drop-shadow line-clamp-2">
              {service.shortDescription || service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="container mx-auto px-4 md:px-6 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left 2 Columns: Detailed Service Information */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-sm">
              <h2 className="text-2xl font-bold text-brand-navy mb-5 flex items-center gap-3">
                <Layers className="text-brand-orange" size={26} />
                <span>Service Scope & Overview</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {service.description}
              </p>
            </div>

            {/* Key Capabilities / Features */}
            {service.features && service.features.length > 0 && (
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-sm">
                <h2 className="text-2xl font-bold text-brand-navy mb-6 flex items-center gap-3">
                  <BadgeCheck className="text-brand-orange" size={26} />
                  <span>Key Service Advantages</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                    >
                      <CheckCircle2 size={20} className="text-brand-orange shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-700 leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What We Deliver */}
            {service.deliverables && service.deliverables.length > 0 && (
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-sm">
                <h2 className="text-2xl font-bold text-brand-navy mb-6">
                  Standard Deliverables & Outputs
                </h2>
                <ul className="space-y-4">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-base text-slate-600 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Execution Process Highlights */}
            {service.processHighlights && service.processHighlights.length > 0 && (
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-sm">
                <h2 className="text-2xl font-bold text-brand-navy mb-6">
                  Execution Methodology
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.processHighlights.map((highlight, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100/60">
                      <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">
                        Step {String(idx + 1).padStart(2, '0')}
                      </span>
                      <strong className="text-brand-navy text-sm font-bold block">{highlight}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Service Enquiry Form Section */}
            <div id="enquire" className="pt-4">
              <ServiceEnquiryForm
                currentServiceTitle={service.title}
                availableServices={allServices.map((s) => ({ id: s.id, title: s.title }))}
              />
            </div>
          </div>

          {/* Right Column: Other Services & Contact Assistance */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm sticky top-28">
              <h3 className="text-xl font-bold text-brand-navy mb-5 pb-3 border-b border-slate-100">
                All Construction Services
              </h3>
              <div className="space-y-2.5">
                {allServices.map((s) => {
                  const isActive = s.id === service.id;
                  return (
                    <Link
                      key={s.id}
                      href={`/services/${s.id}`}
                      className={`flex items-center justify-between p-3.5 rounded-2xl transition-all text-sm ${
                        isActive
                          ? 'bg-brand-orange text-white font-bold shadow-md shadow-brand-orange/20'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 font-medium'
                      }`}
                    >
                      <span className="truncate pr-2">{s.title}</span>
                      <ArrowRight size={15} className={isActive ? 'text-white' : 'text-slate-400'} />
                    </Link>
                  );
                })}
              </div>

              {/* Consultation Assistance Box */}
              <div className="mt-8 pt-6 border-t border-slate-100 bg-brand-navy rounded-2xl p-6 text-white text-center">
                <h4 className="text-lg font-bold mb-2">Need a Custom Quote?</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Get in touch with our team for detailed estimates and technical consultations.
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
                    href="https://wa.me/919028346900?text=Hi%20Blueprint%20BuildCon,%20I%20would%20like%20to%20inquire%20about%20your%20services"
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

      {/* Interactive CTA */}
      <EstimateCTA />
    </main>
  );
}
