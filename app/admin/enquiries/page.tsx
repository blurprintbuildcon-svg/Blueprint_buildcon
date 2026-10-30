'use client';

import { useEffect, useState } from 'react';
import {
  Mail,
  Phone,
  Calendar,
  Trash2,
  Inbox,
  Send,
  Building,
  RefreshCw,
  Search,
  Sparkles,
  Gift,
  ExternalLink,
  CheckCircle,
  Clock,
  UserCheck,
  ChevronDown,
  MessageCircle,
  IndianRupee,
  Building2,
} from 'lucide-react';
import ConsultationsTable, { ConsultationSubmission } from '@/components/admin/ConsultationsTable';

type ContactSubmission = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  projectType: string;
  message?: string;
  createdAt: string;
};

type ServiceEnquirySubmission = {
  _id: string;
  fullname: string;
  mobile: string;
  email: string;
  serviceInterestedIn: string;
  notes?: string;
  createdAt: string;
};

type ReferralSubmission = {
  _id: string;
  referrerName: string;
  referrerPhone: string;
  referrerEmail?: string;
  referrerUpi?: string;
  referrerRelation: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  clientCity: string;
  serviceRequired: string;
  propertyStatus: string;
  estimatedArea?: string;
  projectBudget: string;
  timeline: string;
  requirements: string;
  status: 'pending' | 'contacted' | 'in_discussion' | 'converted' | 'reward_paid' | 'rejected';
  adminNotes?: string;
  rewardAmount?: number;
  createdAt: string;
};

export default function AdminEnquiriesPage() {
  const [activeTab, setActiveTab] = useState<
    'consultations' | 'contacts' | 'serviceEnquiries' | 'referrals'
  >('consultations');
  const [consultations, setConsultations] = useState<ConsultationSubmission[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [serviceEnquiries, setServiceEnquiries] = useState<ServiceEnquirySubmission[]>([]);
  const [referrals, setReferrals] = useState<ReferralSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    try {
      const [resContacts, resEnquiries, resReferrals, resConsultations] = await Promise.all([
        fetch('/api/admin/contacts'),
        fetch('/api/admin/enquiries'),
        fetch('/api/admin/referrals'),
        fetch('/api/admin/consultations'),
      ]);

      if (resContacts.ok) {
        const json = await resContacts.json();
        if (json.success) setContacts(json.data);
      }

      if (resEnquiries.ok) {
        const json = await resEnquiries.json();
        if (json.success) setServiceEnquiries(json.data);
      }

      if (resReferrals.ok) {
        const json = await resReferrals.json();
        if (json.success) setReferrals(json.data);
      }

      if (resConsultations.ok) {
        const json = await resConsultations.json();
        if (json.success) setConsultations(json.data);
      }
    } catch {
      setMessage('Failed to load enquiries and referrals data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function deleteConsultation(id: string) {
    if (!window.confirm('Are you sure you want to delete this consultation lead?')) return;
    try {
      const res = await fetch(`/api/admin/consultations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setConsultations((prev) => prev.filter((item) => item._id !== id));
        setMessage('Consultation lead deleted successfully.');
      } else {
        setMessage('Failed to delete consultation lead.');
      }
    } catch {
      setMessage('Network error deleting consultation lead.');
    }
  }

  async function updateConsultationStatus(id: string, status: string) {
    setUpdatingStatusId(id);
    try {
      const res = await fetch(`/api/admin/consultations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setConsultations((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: status as any } : c))
        );
        setMessage('Consultation status updated.');
      }
    } catch {
      setMessage('Failed to update status.');
    } finally {
      setUpdatingStatusId(null);
    }
  }

  async function deleteContact(id: string) {
    if (!window.confirm('Are you sure you want to delete this contact lead?')) return;
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setContacts((prev) => prev.filter((item) => item._id !== id));
        setMessage('Contact lead deleted successfully.');
      } else {
        setMessage('Failed to delete contact lead.');
      }
    } catch {
      setMessage('Network error deleting contact lead.');
    }
  }

  async function deleteServiceEnquiry(id: string) {
    if (!window.confirm('Are you sure you want to delete this service enquiry?')) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServiceEnquiries((prev) => prev.filter((item) => item._id !== id));
        setMessage('Service enquiry deleted successfully.');
      } else {
        setMessage('Failed to delete service enquiry.');
      }
    } catch {
      setMessage('Network error deleting service enquiry.');
    }
  }

  async function deleteReferral(id: string) {
    if (!window.confirm('Are you sure you want to delete this referral submission?')) return;
    try {
      const res = await fetch(`/api/admin/referrals/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReferrals((prev) => prev.filter((item) => item._id !== id));
        setMessage('Referral lead deleted successfully.');
      } else {
        setMessage('Failed to delete referral lead.');
      }
    } catch {
      setMessage('Network error deleting referral lead.');
    }
  }

  async function updateReferralStatus(id: string, newStatus: string) {
    setUpdatingStatusId(id);
    try {
      const res = await fetch(`/api/admin/referrals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setReferrals((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus as any } : item))
        );
        setMessage(`Referral status updated to "${newStatus.replace('_', ' ')}".`);
      } else {
        setMessage('Failed to update referral status.');
      }
    } catch {
      setMessage('Network error updating status.');
    } finally {
      setUpdatingStatusId(null);
    }
  }

  const filteredConsultations = consultations.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.location.toLowerCase().includes(q) ||
      (c.projectType && c.projectType.toLowerCase().includes(q)) ||
      (c.service && c.service.toLowerCase().includes(q)) ||
      (c.budget && c.budget.toLowerCase().includes(q)) ||
      (c.message && c.message.toLowerCase().includes(q))
    );
  });

  const filteredContacts = contacts.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.projectType.toLowerCase().includes(q) ||
      (c.message && c.message.toLowerCase().includes(q))
    );
  });

  const filteredEnquiries = serviceEnquiries.filter((e) => {
    const q = searchQuery.toLowerCase();
    return (
      e.fullname.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.mobile.includes(q) ||
      e.serviceInterestedIn.toLowerCase().includes(q) ||
      (e.notes && e.notes.toLowerCase().includes(q))
    );
  });

  const filteredReferrals = referrals.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.referrerName.toLowerCase().includes(q) ||
      r.referrerPhone.includes(q) ||
      r.clientName.toLowerCase().includes(q) ||
      r.clientPhone.includes(q) ||
      r.clientCity.toLowerCase().includes(q) ||
      r.serviceRequired.toLowerCase().includes(q) ||
      r.projectBudget.toLowerCase().includes(q) ||
      (r.requirements && r.requirements.toLowerCase().includes(q)) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'converted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'reward_paid':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'in_discussion':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'rejected':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'pending':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="mx-auto max-w-[1500px] space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm text-slate-500">Inbound Leads &amp; Communications</p>
          <h2 className="text-3xl font-bold tracking-tight">Customer &amp; Partner Submissions</h2>
          <p className="mt-2 text-sm text-slate-500">
            Review incoming leads from Modal Consultations, Contact forms, Service enquiries, and Partner Referrals.
          </p>
        </div>

        <button
          type="button"
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center gap-2 border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-navy shadow-sm transition hover:border-brand-orange hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh Leads
        </button>
      </div>

      {/* Alert Notice */}
      {message && (
        <div className="flex items-center justify-between border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <span>{message}</span>
          <button
            type="button"
            onClick={() => setMessage('')}
            className="text-emerald-700 hover:text-emerald-900 font-semibold text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Tabs and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-3">
        <div className="flex flex-wrap gap-2">
          {/* TAB 0: MODAL CONSULTATIONS */}
          <button
            type="button"
            onClick={() => setActiveTab('consultations')}
            className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === 'consultations'
                ? 'bg-brand-navy text-white shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Building2 size={16} className="text-brand-orange" />
            Modal Consultations
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                activeTab === 'consultations'
                  ? 'bg-brand-orange text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {consultations.length}
            </span>
          </button>

          {/* TAB 1: CONTACT FORM */}
          <button
            type="button"
            onClick={() => setActiveTab('contacts')}
            className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === 'contacts'
                ? 'bg-brand-navy text-white shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Send size={16} />
            Contact Form
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                activeTab === 'contacts'
                  ? 'bg-brand-orange text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {contacts.length}
            </span>
          </button>

          {/* TAB 2: SERVICE ENQUIRIES */}
          <button
            type="button"
            onClick={() => setActiveTab('serviceEnquiries')}
            className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === 'serviceEnquiries'
                ? 'bg-brand-navy text-white shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Sparkles size={16} />
            Service Enquiries
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                activeTab === 'serviceEnquiries'
                  ? 'bg-brand-orange text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {serviceEnquiries.length}
            </span>
          </button>

          {/* TAB 3: REFERRAL PROGRAM */}
          <button
            type="button"
            onClick={() => setActiveTab('referrals')}
            className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === 'referrals'
                ? 'bg-brand-navy text-white shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Gift size={16} className="text-amber-500" />
            Referral Program Leads
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                activeTab === 'referrals'
                  ? 'bg-amber-400 text-brand-navy'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              {referrals.length}
            </span>
          </button>
        </div>

        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads, names, cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-brand-navy outline-none focus:border-brand-orange"
          />
        </div>
      </div>

      {/* Tab 0: Modal Consultations */}
      {activeTab === 'consultations' && (
        <ConsultationsTable
          items={filteredConsultations}
          loading={loading}
          onDelete={deleteConsultation}
          onStatusChange={updateConsultationStatus}
          updatingStatusId={updatingStatusId}
        />
      )}

      {/* Tab 1: Contact Form Submissions */}
      {activeTab === 'contacts' && (
        <section className="overflow-hidden border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-[#fcfbf9] text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Client Details</th>
                  <th className="px-5 py-3.5">City &amp; Requirement</th>
                  <th className="px-5 py-3.5">Message</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      <Inbox size={32} className="mx-auto mb-2 text-slate-300" />
                      {loading ? 'Loading contact submissions...' : 'No contact submissions found.'}
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((lead) => (
                    <tr key={lead._id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4 align-top">
                        <p className="font-bold text-brand-navy">{lead.name}</p>
                        <div className="mt-1.5 space-y-1 text-xs text-slate-600">
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-1.5 hover:text-brand-orange"
                          >
                            <Mail size={13} className="text-slate-400 shrink-0" />
                            {lead.email}
                          </a>
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-1.5 hover:text-brand-orange"
                          >
                            <Phone size={13} className="text-slate-400 shrink-0" />
                            {lead.phone}
                          </a>
                        </div>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <span className="inline-block bg-brand-orange/10 text-brand-orange font-bold text-xs px-2.5 py-1 rounded">
                          {lead.projectType}
                        </span>
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-slate-600">
                          <Building size={13} className="text-slate-400" />
                          {lead.city}
                        </p>
                      </td>

                      <td className="px-5 py-4 align-top max-w-xs">
                        {lead.message ? (
                          <div className="rounded-lg bg-slate-50 p-2.5 text-xs text-slate-700 leading-relaxed border border-slate-100">
                            {lead.message}
                          </div>
                        ) : (
                          <span className="text-xs italic text-slate-400">No message provided</span>
                        )}
                      </td>

                      <td className="px-5 py-4 align-top whitespace-nowrap text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-400" />
                          {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="block mt-0.5 text-[11px] text-slate-400">
                          {new Date(lead.createdAt).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </td>

                      <td className="px-5 py-4 align-top text-right">
                        <button
                          type="button"
                          onClick={() => deleteContact(lead._id)}
                          className="rounded p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete submission"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Tab 2: Service Enquiries */}
      {activeTab === 'serviceEnquiries' && (
        <section className="overflow-hidden border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-[#fcfbf9] text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Client Details</th>
                  <th className="px-5 py-3.5">Requested Service</th>
                  <th className="px-5 py-3.5">Project Notes</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      <Inbox size={32} className="mx-auto mb-2 text-slate-300" />
                      {loading ? 'Loading service enquiries...' : 'No service enquiries found.'}
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4 align-top">
                        <p className="font-bold text-brand-navy">{enquiry.fullname}</p>
                        <div className="mt-1.5 space-y-1 text-xs text-slate-600">
                          <a
                            href={`mailto:${enquiry.email}`}
                            className="flex items-center gap-1.5 hover:text-brand-orange"
                          >
                            <Mail size={13} className="text-slate-400 shrink-0" />
                            {enquiry.email}
                          </a>
                          <a
                            href={`tel:${enquiry.mobile}`}
                            className="flex items-center gap-1.5 hover:text-brand-orange"
                          >
                            <Phone size={13} className="text-slate-400 shrink-0" />
                            {enquiry.mobile}
                          </a>
                        </div>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <span className="inline-block bg-blue-50 text-blue-700 font-bold text-xs px-2.5 py-1 rounded border border-blue-100">
                          {enquiry.serviceInterestedIn}
                        </span>
                      </td>

                      <td className="px-5 py-4 align-top max-w-xs">
                        {enquiry.notes ? (
                          <div className="rounded-lg bg-slate-50 p-2.5 text-xs text-slate-700 leading-relaxed border border-slate-100">
                            {enquiry.notes}
                          </div>
                        ) : (
                          <span className="text-xs italic text-slate-400">No notes provided</span>
                        )}
                      </td>

                      <td className="px-5 py-4 align-top whitespace-nowrap text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-400" />
                          {new Date(enquiry.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="block mt-0.5 text-[11px] text-slate-400">
                          {new Date(enquiry.createdAt).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </td>

                      <td className="px-5 py-4 align-top text-right">
                        <button
                          type="button"
                          onClick={() => deleteServiceEnquiry(enquiry._id)}
                          className="rounded p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete enquiry"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Tab 3: Partner Referral Leads */}
      {activeTab === 'referrals' && (
        <section className="overflow-hidden border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead className="bg-[#fcfbf9] text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Referrer (Partner)</th>
                  <th className="px-5 py-3.5">Referred Client</th>
                  <th className="px-5 py-3.5">Project Scope &amp; Location</th>
                  <th className="px-5 py-3.5">Budget &amp; Timeline</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredReferrals.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <Gift size={32} className="mx-auto mb-2 text-slate-300" />
                      {loading ? 'Loading referral leads...' : 'No referral submissions found.'}
                    </td>
                  </tr>
                ) : (
                  filteredReferrals.map((ref) => (
                    <tr key={ref._id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Referrer Details */}
                      <td className="px-5 py-4 align-top">
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-brand-navy">{ref.referrerName}</p>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                            {ref.referrerRelation}
                          </span>
                        </div>
                        <div className="mt-1.5 space-y-1 text-xs text-slate-600">
                          <a
                            href={`https://wa.me/${ref.referrerPhone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-emerald-700 font-medium hover:underline"
                          >
                            <MessageCircle size={13} className="text-emerald-500 shrink-0" />
                            {ref.referrerPhone}
                          </a>
                          {ref.referrerUpi && (
                            <p className="flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60 font-mono">
                              <IndianRupee size={11} className="shrink-0" />
                              UPI: {ref.referrerUpi}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Client Details */}
                      <td className="px-5 py-4 align-top">
                        <p className="font-bold text-brand-navy">{ref.clientName}</p>
                        <div className="mt-1.5 space-y-1 text-xs text-slate-600">
                          <a
                            href={`tel:${ref.clientPhone}`}
                            className="flex items-center gap-1.5 hover:text-brand-orange"
                          >
                            <Phone size={13} className="text-slate-400 shrink-0" />
                            {ref.clientPhone}
                          </a>
                          {ref.clientEmail && (
                            <a
                              href={`mailto:${ref.clientEmail}`}
                              className="flex items-center gap-1.5 hover:text-brand-orange text-slate-500"
                            >
                              <Mail size={13} className="text-slate-400 shrink-0" />
                              {ref.clientEmail}
                            </a>
                          )}
                          <p className="flex items-center gap-1 text-slate-600 font-medium">
                            <Building size={13} className="text-slate-400 shrink-0" />
                            {ref.clientCity}
                          </p>
                        </div>
                      </td>

                      {/* Project Scope & Requirements */}
                      <td className="px-5 py-4 align-top max-w-xs">
                        <span className="inline-block bg-blue-50 text-blue-800 font-bold text-xs px-2.5 py-0.5 rounded border border-blue-200">
                          {ref.serviceRequired}
                        </span>
                        <div className="mt-1.5 space-y-1 text-xs text-slate-600">
                          <p className="text-[11px]">
                            <strong className="text-slate-700">Plot:</strong> {ref.propertyStatus}
                          </p>
                          {ref.estimatedArea && (
                            <p className="text-[11px]">
                              <strong className="text-slate-700">Area:</strong> {ref.estimatedArea}
                            </p>
                          )}
                          {ref.requirements && (
                            <p className="mt-1 bg-slate-50 p-2 rounded text-[11px] text-slate-600 border border-slate-100 line-clamp-3">
                              {ref.requirements}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Budget & Timeline */}
                      <td className="px-5 py-4 align-top">
                        <div className="text-xs">
                          <p className="font-extrabold text-brand-navy text-sm text-emerald-700">
                            {ref.projectBudget}
                          </p>
                          <p className="mt-1 text-[11px] text-slate-500 flex items-center gap-1">
                            <Clock size={12} className="text-slate-400" />
                            {ref.timeline}
                          </p>
                        </div>
                      </td>

                      {/* Status Selector */}
                      <td className="px-5 py-4 align-top">
                        <div className="space-y-1.5">
                          <select
                            value={ref.status}
                            disabled={updatingStatusId === ref._id}
                            onChange={(e) => updateReferralStatus(ref._id, e.target.value)}
                            className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border outline-none cursor-pointer ${getStatusBadge(
                              ref.status
                            )}`}
                          >
                            <option value="pending">Pending Review</option>
                            <option value="contacted">Client Contacted</option>
                            <option value="in_discussion">In Discussion</option>
                            <option value="converted">Deal Won (Signed)</option>
                            <option value="reward_paid">Reward Paid</option>
                            <option value="rejected">Rejected / Dropped</option>
                          </select>
                          {updatingStatusId === ref._id && (
                            <span className="block text-[10px] text-slate-400 animate-pulse">Saving...</span>
                          )}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 align-top whitespace-nowrap text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-400" />
                          {new Date(ref.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="block mt-0.5 text-[11px] text-slate-400">
                          {new Date(ref.createdAt).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </td>

                      {/* Action buttons */}
                      <td className="px-5 py-4 align-top text-right">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={`https://wa.me/${ref.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${ref.clientName}, this is regarding your construction inquiry referred by ${ref.referrerName} to BluePrint BuildCon.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded p-1.5 text-emerald-600 hover:bg-emerald-50 transition"
                            title="Chat with client on WhatsApp"
                          >
                            <MessageCircle size={16} />
                          </a>

                          <button
                            type="button"
                            onClick={() => deleteReferral(ref._id)}
                            className="rounded p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                            title="Delete referral lead"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
