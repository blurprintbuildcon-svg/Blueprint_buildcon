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
  MessageSquare,
  Sparkles,
} from 'lucide-react';

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

export default function AdminEnquiriesPage() {
  const [activeTab, setActiveTab] = useState<'contacts' | 'serviceEnquiries'>('contacts');
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [serviceEnquiries, setServiceEnquiries] = useState<ServiceEnquirySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');

  async function loadData() {
    setLoading(true);
    try {
      const [resContacts, resEnquiries] = await Promise.all([
        fetch('/api/admin/contacts'),
        fetch('/api/admin/enquiries'),
      ]);

      if (resContacts.ok) {
        const json = await resContacts.json();
        if (json.success) setContacts(json.data);
      }

      if (resEnquiries.ok) {
        const json = await resEnquiries.json();
        if (json.success) setServiceEnquiries(json.data);
      }
    } catch {
      setMessage('Failed to load enquiries data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

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

  return (
    <div className="mx-auto max-w-[1500px] space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm text-slate-500">Inbound Leads & Communications</p>
          <h2 className="text-3xl font-bold tracking-tight">Customer Submissions</h2>
          <p className="mt-2 text-sm text-slate-500">
            Review incoming leads from both the main Contact form and Service-specific enquiries.
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
        <div className="flex gap-2">
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
            Contact Form Leads
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                activeTab === 'contacts' ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {contacts.length}
            </span>
          </button>

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
                activeTab === 'serviceEnquiries' ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {serviceEnquiries.length}
            </span>
          </button>
        </div>

        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-brand-navy outline-none focus:border-brand-orange"
          />
        </div>
      </div>

      {/* Tab 1: Contact Form Submissions */}
      {activeTab === 'contacts' && (
        <section className="overflow-hidden border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-[#fcfbf9] text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Client Details</th>
                  <th className="px-5 py-3.5">City & Requirement</th>
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
    </div>
  );
}
