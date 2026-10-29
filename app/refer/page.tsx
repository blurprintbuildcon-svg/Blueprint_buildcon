import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Building2,
  Coins,
  Layers,
} from 'lucide-react';
import ReferralForm from '@/components/ReferralForm';
import ReferralShareButton from '@/components/ReferralShareButton';

export const metadata: Metadata = {
  title: 'Refer & Earn Rewards | BluePrint-BuildCon Construction Partner Program',
  description:
    'Refer residential or commercial construction projects to BluePrint-BuildCon and earn cash rewards from ₹10,000 to ₹1,00,000+. Transparent payouts and quality engineering.',
};

export default function ReferPage() {
  const steps = [
    {
      number: '01',
      title: 'Submit Client Details',
      desc: 'Fill out our quick 2-minute referral form with your contact info and your client’s construction requirement.',
      icon: Layers,
    },
    {
      number: '02',
      title: 'We Consult & Finalize',
      desc: 'Our civil engineers & architects consult with the client, provide free 3D blueprints, site feasibility, and transparent cost estimates.',
      icon: Building2,
    },
    {
      number: '03',
      title: 'Earn Lucrative Cash Rewards',
      desc: 'Once the client approves and commences construction, your reward is transferred directly to your bank account or UPI.',
      icon: Coins,
    },
  ];

  const rewardTiers = [
    {
      category: 'Architectural & 3D Design',
      reward: '₹5,000 – ₹15,000',
      scope: 'Floor plans, 3D Elevation, Structural Drawings & Sanctioning',
      tag: 'Fast Payout',
    },
    {
      category: 'Residential Homes & Villas',
      reward: '₹25,000 – ₹1,00,000+',
      scope: 'Turnkey Bungalows, Duplex Homes, G+2/G+3 Independent Residences',
      tag: 'Most Popular',
      featured: true,
    },
    {
      category: 'Commercial & Turnkey Projects',
      reward: 'Up to ₹2,00,000+',
      scope: 'Office Buildings, Commercial Showrooms, Large Warehouses & Institutions',
      tag: 'High Value',
    },
  ];

  const faqs = [
    {
      q: 'Who can refer clients to BluePrint-BuildCon?',
      a: 'Anyone! Friends, family, real estate consultants, architects, interior designers, property brokers, and satisfied existing clients can all participate.',
    },
    {
      q: 'When do I receive my referral reward?',
      a: 'Referral rewards are disbursed directly to your designated bank account or UPI ID upon contract signing and milestone kickoff (e.g. excavation / foundation phase).',
    },
    {
      q: 'Is there any limit to the number of referrals I can submit?',
      a: 'No! There is no limit. You can refer as many homeowners, plot owners, or commercial builders as you like, earning rewards for each successful project.',
    },
    {
      q: 'How will I know the status of my referral?',
      a: 'Our team will keep you updated via WhatsApp and phone regarding site visits, proposal presentations, and contract status.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      {/* <PageHero
        eyebrow="BluePrint Partner & Referral Program"
        title="Refer a Construction Project. Earn Up to ₹1,00,000+ in Cash Rewards!"
        description="Help friends, colleagues, or clients find Pune's most reliable, transparent, and quality-driven civil construction team. Get rewarded generously for every verified project."
        image="/services/residential.jpg"
        imageAlt="Modern residential construction by BluePrint-BuildCon"
      /> */}

      {/* Program Highlights Banner */}
      {/* <section className="py-12 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-blue-50/60 border border-blue-100">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20">
                <Coins size={24} />
              </div>
              <div>
                <h4 className="font-bold text-brand-navy text-lg">Guaranteed Payouts</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Transparent cash reward transferred directly via UPI or IMPS upon project confirmation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-amber-50/60 border border-amber-100">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-brand-navy text-lg">Zero Selling Required</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Just share the basic requirements. Our senior engineers handle site visits, 3D drawings, and negotiations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
                <TrendingUp size={24} />
              </div>
              <div>
                <h4 className="font-bold text-brand-navy text-lg">A+ Construction Quality</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Your referred clients will thank you. We build with premium materials, branded steel/cement, and daily tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* How it Works Section */}
      {/* <section className="py-16 bg-[#f7f9fc] border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange bg-blue-50 px-3 py-1 rounded-full">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy mt-3 tracking-tight">
              How the Referral Program Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              From submission to payout, we maintain full transparency every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className="relative bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-orange flex items-center justify-center font-bold text-lg group-hover:bg-brand-orange group-hover:text-white transition">
                    <step.icon size={22} />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-200 group-hover:text-blue-100 transition">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Commission Tiers */}
      {/* <section className="py-16 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange bg-blue-50 px-3 py-1 rounded-full">
              Estimated Earning Potential
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy mt-3 tracking-tight">
              Referral Reward Tiers
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Higher project scale unlocks larger cash bonuses for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {rewardTiers.map((tier) => (
              <div
                key={tier.category}
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all ${tier.featured
                    ? 'bg-brand-navy text-white shadow-xl ring-2 ring-brand-orange scale-105 z-10'
                    : 'bg-slate-50 text-slate-800 border border-slate-200'
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${tier.featured ? 'bg-brand-orange text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                    >
                      {tier.tag}
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold ${tier.featured ? 'text-white' : 'text-brand-navy'}`}>
                    {tier.category}
                  </h3>
                  <div className="my-5">
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Reward Range</p>
                    <p className={`text-2xl sm:text-3xl font-extrabold mt-1 ${tier.featured ? 'text-amber-300' : 'text-blue-600'}`}>
                      {tier.reward}
                    </p>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed ${tier.featured ? 'text-blue-100/80' : 'text-slate-600'}`}>
                    {tier.scope}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/20">
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <CheckCircle2 size={16} className={tier.featured ? 'text-brand-orange' : 'text-emerald-600'} />
                    <span>Direct Bank / UPI Transfer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Main Referral Form Section */}
      <section
        id="referral-form"
        className="min-h-[calc(100vh-80px)] bg-slate-100 px-4 pb-16 pt-28 sm:px-6 sm:pt-32"
      >
        <div className="mx-auto max-w-2xl">
          <div className="mb-5 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-brand-blue"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to Home
            </Link>
            <ReferralShareButton />
          </div>

          <ReferralForm />
        </div>
      </section>

        {/* FAQ Section */}
        {/* <section className="py-16 bg-[#f7f9fc] border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Have questions about how referrals work? Here are the most common queries.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
                <h4 className="text-base font-bold text-brand-navy flex items-center gap-2.5">
                  <HelpCircle size={18} className="text-brand-orange shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 pl-7 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-blue-50/80 border border-blue-200 text-center">
            <p className="text-sm font-semibold text-brand-navy">
              Want to discuss a bulk channel partnership or have specific questions?
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Reach out to our business development desk directly at{' '}
              <a href="tel:+919028346900" className="text-brand-orange font-bold hover:underline">
                +91 9028346900
              </a>{' '}
              or chat with us on WhatsApp.
            </p>
          </div>
        </div>
      </section> */}
    </div>
  );
}
