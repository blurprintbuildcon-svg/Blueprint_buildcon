'use client';

import React from 'react';
import {
  Inbox,
  Phone,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  MessageCircle,
  Trash2,
  Building2,
} from 'lucide-react';

export type ConsultationSubmission = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  projectType: string;
  company?: string;
  location: string;
  propertyStatus: string;
  budget: string;
  service: string;
  message?: string;
  joinReferralProgram: string;
  status?: 'new' | 'contacted' | 'in_progress' | 'closed';
  createdAt: string;
};

type ConsultationsTableProps = {
  items: ConsultationSubmission[];
  loading: boolean;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
  updatingStatusId: string | null;
};

export default function ConsultationsTable({
  items,
  loading,
  onDelete,
  onStatusChange,
  updatingStatusId,
}: ConsultationsTableProps) {
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'closed':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'new':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <section className="overflow-hidden border border-slate-200 bg-white rounded-xl shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-left">
          <thead className="bg-[#fcfbf9] text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-3.5">Client Details</th>
              <th className="px-5 py-3.5">Project Type &amp; Status</th>
              <th className="px-5 py-3.5">Budget &amp; Service</th>
              <th className="px-5 py-3.5">Partner Program</th>
              <th className="px-5 py-3.5">Requirements / Notes</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Date</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {items.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400">
                  <Inbox size={32} className="mx-auto mb-2 text-slate-300" />
                  {loading ? 'Loading modal consultation leads...' : 'No modal consultation leads found.'}
                </td>
              </tr>
            ) : (
              items.map((lead) => (
                <tr key={lead._id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Client Details */}
                  <td className="px-5 py-4 align-top">
                    <p className="font-bold text-brand-navy">{lead.name}</p>
                    <div className="mt-1.5 space-y-1 text-xs text-slate-600">
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center gap-1.5 hover:text-brand-orange font-medium"
                      >
                        <Phone size={13} className="text-slate-400 shrink-0" />
                        {lead.phone}
                      </a>
                      <p className="flex items-center gap-1.5 text-slate-500">
                        <MapPin size={13} className="text-slate-400 shrink-0" />
                        {lead.location}
                      </p>
                    </div>
                  </td>

                  {/* Project Type & Status */}
                  <td className="px-5 py-4 align-top">
                    <span className="inline-block bg-blue-50 text-blue-800 font-bold text-xs px-2.5 py-1 rounded-md border border-blue-200/60">
                      {lead.projectType || 'General Construction'}
                    </span>
                    <p className="mt-1.5 text-xs text-slate-600 flex items-center gap-1">
                      <Layers size={12} className="text-slate-400" />
                      {lead.propertyStatus || 'Not specified'}
                    </p>
                  </td>

                  {/* Budget & Service */}
                  <td className="px-5 py-4 align-top">
                    <span className="inline-block bg-emerald-50 text-emerald-800 font-bold text-xs px-2.5 py-0.5 rounded border border-emerald-200/80">
                      {lead.budget || 'Custom'}
                    </span>
                    <p className="mt-1.5 text-xs text-slate-600 truncate max-w-[200px]" title={lead.service}>
                      {lead.service || 'Turnkey Construction'}
                    </p>
                  </td>

                  {/* Partner Program */}
                  <td className="px-5 py-4 align-top">
                    {lead.joinReferralProgram === 'Yes' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                        <Sparkles size={12} className="text-amber-600" />
                        <span>Referral Partner</span>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Client Only</span>
                    )}
                  </td>

                  {/* Message */}
                  <td className="px-5 py-4 align-top max-w-xs">
                    {lead.message ? (
                      <div className="rounded-lg bg-slate-50 p-2.5 text-xs text-slate-700 leading-relaxed border border-slate-100 line-clamp-3">
                        {lead.message}
                      </div>
                    ) : (
                      <span className="text-xs italic text-slate-400">No notes provided</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4 align-top">
                    <div className="space-y-1">
                      <select
                        value={lead.status || 'new'}
                        disabled={updatingStatusId === lead._id}
                        onChange={(e) => onStatusChange(lead._id, e.target.value)}
                        className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border outline-none cursor-pointer ${getStatusBadge(
                          lead.status || 'new'
                        )}`}
                      >
                        <option value="new">New Lead</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Discussion</option>
                        <option value="closed">Closed / Handover</option>
                      </select>
                      {updatingStatusId === lead._id && (
                        <span className="block text-[10px] text-slate-400 animate-pulse">Saving...</span>
                      )}
                    </div>
                  </td>

                  {/* Date */}
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

                  {/* Actions */}
                  <td className="px-5 py-4 align-top text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello ${lead.name}, this is BluePrint Build-Con regarding your ${lead.projectType || 'construction'} enquiry in ${lead.location}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded p-1.5 text-emerald-600 hover:bg-emerald-50 transition"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle size={17} />
                      </a>

                      <button
                        type="button"
                        onClick={() => onDelete(lead._id)}
                        className="rounded p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600 cursor-pointer"
                        title="Delete consultation"
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
  );
}

