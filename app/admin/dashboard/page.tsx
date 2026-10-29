'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  FolderOpen,
  Image as ImageIcon,
  Plus,
  Inbox,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  Send,
  Gift,
} from 'lucide-react';

type StatsData = {
  projects: number;
  services: number;
  contacts: number;
  serviceEnquiries: number;
  consultations: number;
  referrals: number;
  submissions: number;
};

type RecentLead = {
  _id: string;
  type: 'contact' | 'enquiry' | 'referral';
  name: string;
  email: string;
  phone: string;
  detail: string;
  date: string;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData>({
    projects: 0,
    services: 0,
    contacts: 0,
    serviceEnquiries: 0,
    consultations: 0,
    referrals: 0,
    submissions: 0,
  });

  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);

  useEffect(() => {
    // 1. Fetch live stats
    fetch('/api/admin/dashboard/stats')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setStats(res.data);
        }
      })
      .catch(() => undefined);

    // 2. Fetch latest submissions for quick dashboard view
    Promise.all([
      fetch('/api/admin/contacts').then((r) => r.json()),
      fetch('/api/admin/enquiries').then((r) => r.json()),
      fetch('/api/admin/referrals').then((r) => r.json()),
    ])
      .then(([contactsRes, enquiriesRes, referralsRes]) => {
        const combined: RecentLead[] = [];

        if (contactsRes.success && Array.isArray(contactsRes.data)) {
          contactsRes.data.forEach((c: any) => {
            combined.push({
              _id: c._id,
              type: 'contact',
              name: c.name,
              email: c.email,
              phone: c.phone,
              detail: `${c.projectType} (${c.city})`,
              date: c.createdAt,
            });
          });
        }

        if (enquiriesRes.success && Array.isArray(enquiriesRes.data)) {
          enquiriesRes.data.forEach((e: any) => {
            combined.push({
              _id: e._id,
              type: 'enquiry',
              name: e.fullname,
              email: e.email,
              phone: e.mobile,
              detail: e.serviceInterestedIn,
              date: e.createdAt,
            });
          });
        }

        if (referralsRes.success && Array.isArray(referralsRes.data)) {
          referralsRes.data.forEach((r: any) => {
            combined.push({
              _id: r._id,
              type: 'referral',
              name: `Client: ${r.clientName} (via ${r.referrerName})`,
              email: r.clientEmail || r.referrerEmail || 'No email',
              phone: r.clientPhone,
              detail: `${r.serviceRequired} • Budget: ${r.projectBudget}`,
              date: r.createdAt,
            });
          });
        }

        combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setRecentLeads(combined.slice(0, 6));
      })
          .catch(() => undefined);
      }, []);

    const statCards = [
      {
        label: 'Partner Referrals',
        value: stats.referrals ?? 0,
        note: 'Refer & Earn leads',
        icon: Gift,
        accent: 'bg-amber-500',
        href: '/admin/enquiries',
      },
      {
        label: 'Contact Submissions',
        value: stats.contacts,
        note: 'Website contact leads',
        icon: Send,
        accent: 'bg-brand-orange',
        href: '/admin/enquiries',
      },
      {
        label: 'Service Enquiries',
        value: stats.serviceEnquiries,
        note: 'Service-specific inquiries',
        icon: Sparkles,
        accent: 'bg-[#2b537d]',
        href: '/admin/enquiries',
      },
      {
        label: 'Featured Projects',
        value: stats.projects,
        note: 'Published projects in portfolio',
        icon: BriefcaseBusiness,
        accent: 'bg-brand-navy',
        href: '/admin/projects',
      },
    ];

    return (
      <div className="mx-auto max-w-[1500px] space-y-8">
        {/* Top Banner */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm text-slate-500">Good to see you.</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your work, at a glance.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Keep track of customer inquiries, partner referrals, services, and showcased portfolio projects.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/enquiries"
              className="inline-flex items-center gap-2 bg-brand-navy px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800"
            >
              <Inbox size={17} /> View all enquiries &amp; referrals
            </Link>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 bg-brand-orange px-4 py-3 text-sm font-bold text-white shadow-lg shadow-brand-orange/15 transition hover:bg-orange-700"
            >
              <Plus size={17} /> Add project
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="group block border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(20,34,31,0.04)] transition hover:border-brand-orange"
            >
              <div className="mb-6 flex items-start justify-between">
                <div className={`flex h-11 w-11 items-center justify-center text-white ${stat.accent}`}>
                  <stat.icon size={21} />
                </div>
                <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-400 group-hover:text-brand-orange">
                  View <ArrowUpRight size={14} />
                </span>
              </div>
              <p className="text-3xl font-bold tracking-tight text-brand-navy">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold text-brand-navy">{stat.label}</p>
              <p className="mt-2 text-xs text-slate-400">{stat.note}</p>
            </Link>
          ))}
        </div>

        {/* Main Grid: Recent Inquiries + Quick Actions */}
        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          {/* Recent Submissions */}
          <section className="border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                  Recent Inquiries &amp; Referrals
                </p>
                <h3 className="mt-1 text-xl font-bold">Latest Inbound Leads</h3>
              </div>
              <Link
                href="/admin/enquiries"
                className="inline-flex items-center gap-1 text-sm font-bold text-brand-orange hover:text-orange-700"
              >
                Open Enquiries Hub <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentLeads.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <Inbox size={32} className="mx-auto mb-2 text-slate-300" />
                  No customer submissions recorded yet.
                </div>
              ) : (
                recentLeads.map((lead) => (
                <div key={lead._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 sm:px-7 hover:bg-slate-50/60">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-bold text-brand-navy">{lead.name}</p>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded ${
                          lead.type === 'referral'
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : lead.type === 'contact'
                            ? 'bg-orange-50 text-brand-orange border border-orange-100'
                            : 'bg-blue-50 text-blue-700 border border-blue-100'
                        }`}
                      >
                        {lead.type === 'referral' ? 'Partner Referral 🎁' : lead.type === 'contact' ? 'Contact' : 'Service Enquiry'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 truncate">{lead.detail}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                      <span>{lead.email}</span>
                      <span>•</span>
                      <span>{lead.phone}</span>
                    </div>
                  </div>

                  <span className="text-xs text-slate-400 whitespace-nowrap self-start sm:self-center">
                    {new Date(lead.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>
            ))
            )}
        </div>
      </section>

        {/* Quick Start Side Card */ }
    <section className="bg-brand-navy p-6 text-white sm:p-7 flex flex-col justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Lead &amp; Partner Hub</p>
        <h3 className="mt-4 max-w-xs text-2xl font-bold leading-tight">Prompt replies win clients.</h3>
        <p className="mt-4 text-sm leading-6 text-white/60">
          Check incoming queries from clients and partner referrals interested in construction, architecture, and interior design directly in your enquiries dashboard.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <Link
          href="/admin/enquiries"
          className="flex items-center justify-between border border-white/15 px-4 py-3 text-sm font-semibold transition hover:border-brand-orange hover:bg-white/5"
        >
          Review all enquiries &amp; referrals <ArrowUpRight size={17} />
        </Link>
        <Link
          href="/admin/projects/new"
          className="flex items-center justify-between border border-white/15 px-4 py-3 text-sm font-semibold transition hover:border-brand-orange hover:bg-white/5"
        >
          Add a new portfolio project <ArrowUpRight size={17} />
        </Link>
        <Link
          href="/admin/services/new"
          className="flex items-center justify-between border border-white/15 px-4 py-3 text-sm font-semibold transition hover:border-brand-orange hover:bg-white/5"
        >
          Add a new service offering <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
      </div >
    </div >
  );
}
