'use client';

import { useEffect, useState } from 'react';
import {
  Gift,
  Search,
  RefreshCw,
  Phone,
  Mail,
  Building,
  Calendar,
  Trash2,
  Edit3,
  CheckCircle,
  Clock,
  MessageCircle,
  IndianRupee,
  Coins,
  TrendingUp,
  AlertCircle,
  X,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

type ReferralItem = {
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

export default function AdminReferralsPage() {
  const [referrals, setReferrals] = useState<ReferralItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [message, setMessage] = useState('');
  const [selectedReferral, setSelectedReferral] = useState<ReferralItem | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState<string>('pending');
  const [editNotes, setEditNotes] = useState<string>('');
  const [editReward, setEditReward] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);

  async function loadReferrals() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/referrals');
      if (res.ok) {
        const json = await res.json();
        if (json.success) setReferrals(json.data);
      } else {
        setMessage('Failed to load referrals.');
      }
    } catch {
      setMessage('Network error loading referrals.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReferrals();
  }, []);

  async function deleteReferral(id: string) {
    if (!window.confirm('Are you sure you want to delete this referral lead?')) return;
    try {
      const res = await fetch(`/api/admin/referrals/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReferrals((prev) => prev.filter((r) => r._id !== id));
        setMessage('Referral removed successfully.');
        if (selectedReferral?._id === id) {
          setEditModalOpen(false);
          setSelectedReferral(null);
        }
      } else {
        setMessage('Failed to delete referral.');
      }
    } catch {
      setMessage('Network error deleting referral.');
    }
  }

  function openEditModal(ref: ReferralItem) {
    setSelectedReferral(ref);
    setEditStatus(ref.status);
    setEditNotes(ref.adminNotes || '');
    setEditReward(ref.rewardAmount || 0);
    setEditModalOpen(true);
  }

  async function handleSaveDetails(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedReferral) return;

    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/referrals/${selectedReferral._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          adminNotes: editNotes,
          rewardAmount: editReward,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setReferrals((prev) =>
          prev.map((r) => (r._id === selectedReferral._id ? json.data : r))
        );
        setMessage('Referral details updated successfully.');
        setEditModalOpen(false);
      } else {
        setMessage('Failed to update referral details.');
      }
    } catch {
      setMessage('Network error updating referral details.');
    } finally {
      setIsSaving(false);
    }
  }

  // Filtered Referrals
  const filteredReferrals = referrals.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.referrerName.toLowerCase().includes(q) ||
      r.referrerPhone.includes(q) ||
      r.clientName.toLowerCase().includes(q) ||
      r.clientPhone.includes(q) ||
      r.clientCity.toLowerCase().includes(q) ||
      r.serviceRequired.toLowerCase().includes(q) ||
      r.projectBudget.toLowerCase().includes(q) ||
      (r.requirements && r.requirements.toLowerCase().includes(q));

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const totalCount = referrals.length;
  const pendingCount = referrals.filter((r) => r.status === 'pending').length;
  const inProgressCount = referrals.filter(
    (r) => r.status === 'contacted' || r.status === 'in_discussion'
  ).length;
  const convertedCount = referrals.filter(
    (r) => r.status === 'converted' || r.status === 'reward_paid'
  ).length;
  const totalRewardPaid = referrals.reduce((sum, r) => sum + (r.rewardAmount || 0), 0);

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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'converted':
        return 'Deal Won (Signed)';
      case 'reward_paid':
        return 'Reward Paid';
      case 'in_discussion':
        return 'In Discussion';
      case 'contacted':
        return 'Client Contacted';
      case 'rejected':
        return 'Rejected / Dropped';
      case 'pending':
      default:
        return 'Pending Review';
    }
  };

  return (
    <div className="mx-auto max-w-[1500px] space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm text-slate-500">Partner Program &amp; Growth</p>
          <h2 className="text-3xl font-bold tracking-tight">Referral Program Hub</h2>
          <p className="mt-2 text-sm text-slate-500">
            Track and manage client referrals from your partner network, coordinate site visits, and record cash reward payouts.
          </p>
        </div>

        <button
          type="button"
          onClick={loadReferrals}
          disabled={loading}
          className="inline-flex items-center gap-2 border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-navy shadow-sm transition hover:border-brand-orange hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
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

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 border border-slate-200 shadow-sm rounded-xl">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Referrals</span>
            <Gift size={18} className="text-brand-orange" />
          </div>
          <p className="text-3xl font-extrabold text-brand-navy">{totalCount}</p>
          <p className="text-xs text-slate-400 mt-1">From all partners</p>
        </div>

        <div className="bg-white p-5 border border-slate-200 shadow-sm rounded-xl">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Review</span>
            <Clock size={18} className="text-amber-500" />
          </div>
          <p className="text-3xl font-extrabold text-amber-600">{pendingCount}</p>
          <p className="text-xs text-slate-400 mt-1">Requires initial contact</p>
        </div>

        <div className="bg-white p-5 border border-slate-200 shadow-sm rounded-xl">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Deals Converted</span>
            <TrendingUp size={18} className="text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-600">{convertedCount}</p>
          <p className="text-xs text-slate-400 mt-1">Contracts signed</p>
        </div>

        <div className="bg-white p-5 border border-slate-200 shadow-sm rounded-xl">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Rewards Recorded</span>
            <IndianRupee size={18} className="text-purple-600" />
          </div>
          <p className="text-3xl font-extrabold text-purple-700">₹{totalRewardPaid.toLocaleString('en-IN')}</p>
          <p className="text-xs text-slate-400 mt-1">Partner commission disbursed</p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-3">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All', count: totalCount },
            { id: 'pending', label: 'Pending', count: pendingCount },
            { id: 'in_discussion', label: 'In Discussion', count: inProgressCount },
            { id: 'converted', label: 'Won / Converted', count: convertedCount },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${statusFilter === tab.id
                  ? 'bg-brand-navy text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client, partner, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs sm:text-sm text-brand-navy outline-none focus:border-brand-orange rounded-lg"
          />
        </div>
      </div>

      {/* Referrals Table */}
      <section className="overflow-hidden border border-slate-200 bg-white rounded-xl shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="bg-[#fcfbf9] text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Referrer (Partner)</th>
                <th className="px-5 py-3.5">Referred Client</th>
                <th className="px-5 py-3.5">Project Scope</th>
                <th className="px-5 py-3.5">Budget &amp; Timeline</th>
                <th className="px-5 py-3.5">Status &amp; Reward</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredReferrals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-400">
                    <Gift size={36} className="mx-auto mb-2 text-slate-300" />
                    {loading ? 'Loading referral data...' : 'No referrals found matching the criteria.'}
                  </td>
                </tr>
              ) : (
                filteredReferrals.map((ref) => (
                  <tr key={ref._id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Referrer */}
                    <td className="px-5 py-4 align-top">
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-brand-navy">{ref.referrerName}</p>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                          {ref.referrerRelation}
                        </span>
                      </div>
                      <div className="mt-1.5 space-y-1 text-xs text-slate-600">
                        <a
                          href={`https://wa.me/${ref.referrerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${ref.referrerName}, thank you for referring ${ref.clientName} to BluePrint Build-Con. Here is an update on their project.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-emerald-700 font-semibold hover:underline"
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

                    {/* Client */}
                    <td className="px-5 py-4 align-top">
                      <p className="font-bold text-brand-navy">{ref.clientName}</p>
                      <div className="mt-1.5 space-y-1 text-xs text-slate-600">
                        <a
                          href={`tel:${ref.clientPhone}`}
                          className="flex items-center gap-1.5 hover:text-brand-orange font-medium"
                        >
                          <Phone size={13} className="text-slate-400 shrink-0" />
                          {ref.clientPhone}
                        </a>
                        {ref.clientEmail && (
                          <a
                            href={`mailto:${ref.clientEmail}`}
                            className="flex items-center gap-1.5 hover:text-brand-orange text-slate-500 truncate max-w-[180px]"
                          >
                            <Mail size={13} className="text-slate-400 shrink-0" />
                            {ref.clientEmail}
                          </a>
                        )}
                        <p className="flex items-center gap-1 text-slate-600">
                          <Building size={13} className="text-slate-400 shrink-0" />
                          {ref.clientCity}
                        </p>
                      </div>
                    </td>

                    {/* Scope */}
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
                          <p className="mt-1 bg-slate-50 p-2 rounded text-[11px] text-slate-600 border border-slate-100 line-clamp-2">
                            {ref.requirements}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Budget & Timeline */}
                    <td className="px-5 py-4 align-top">
                      <p className="font-extrabold text-emerald-700 text-sm">{ref.projectBudget}</p>
                      <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
                        <Clock size={12} className="text-slate-400" />
                        {ref.timeline}
                      </p>
                    </td>

                    {/* Status & Reward */}
                    <td className="px-5 py-4 align-top">
                      <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg border ${getStatusBadge(ref.status)}`}>
                        {getStatusLabel(ref.status)}
                      </span>
                      {ref.rewardAmount && ref.rewardAmount > 0 ? (
                        <p className="mt-1 text-xs font-extrabold text-purple-700 flex items-center gap-1">
                          <Coins size={13} />
                          Reward: ₹{ref.rewardAmount.toLocaleString('en-IN')}
                        </p>
                      ) : null}
                      {ref.adminNotes && (
                        <p className="mt-1 text-[11px] text-slate-500 italic line-clamp-1">
                          Note: {ref.adminNotes}
                        </p>
                      )}
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
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 align-top text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(ref)}
                          className="rounded p-1.5 text-blue-600 hover:bg-blue-50 transition"
                          title="Manage Status, Reward & Notes"
                        >
                          <Edit3 size={16} />
                        </button>

                        <a
                          href={`https://wa.me/${ref.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${ref.clientName}, this is regarding your construction requirement referred by ${ref.referrerName} to BluePrint Build-Con.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded p-1.5 text-emerald-600 hover:bg-emerald-50 transition"
                          title="WhatsApp Client"
                        >
                          <MessageCircle size={16} />
                        </a>

                        <button
                          type="button"
                          onClick={() => deleteReferral(ref._id)}
                          className="rounded p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                          title="Delete Referral"
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

      {/* Edit Details & Reward Modal */}
      {editModalOpen && selectedReferral && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Gift size={20} className="text-brand-orange" />
                <h3 className="text-lg font-bold text-brand-navy">
                  Manage Referral #{selectedReferral._id.slice(-6).toUpperCase()}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveDetails} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Referral Stage / Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-brand-orange font-medium"
                >
                  <option value="pending">Pending Review</option>
                  <option value="contacted">Client Contacted</option>
                  <option value="in_discussion">In Discussion (Estimate Sent)</option>
                  <option value="converted">Deal Won (Contract Signed)</option>
                  <option value="reward_paid">Reward Disbursed / Paid</option>
                  <option value="rejected">Rejected / Dropped</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Cash Reward Amount (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={editReward}
                  onChange={(e) => setEditReward(Number(e.target.value) || 0)}
                  placeholder="e.g. 25000"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-brand-orange"
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  Referrer UPI: <strong className="text-slate-600">{selectedReferral.referrerUpi || 'Not provided'}</strong>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Internal Engineering &amp; Payout Notes
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="e.g. Sent 3D elevation drawings on 12th Oct. Payout of ₹25,000 sent via GPay on foundation kickoff."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-brand-orange resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 text-xs font-bold bg-brand-orange hover:bg-blue-700 text-white rounded-lg shadow-sm transition disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
