'use client';

import { useEffect, useState } from 'react';
import {
  Star,
  CheckCircle2,
  XCircle,
  Trash2,
  Search,
  Check,
  X,
  AlertCircle,
  Download,
  Filter,
  Eye,
  EyeOff,
  Clock,
  Sparkles,
} from 'lucide-react';

type TestimonialUI = {
  _id: string;
  fullname: string;
  email: string;
  feedback: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialUI[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

    const loadTestimonials = () => {
      setIsLoading(true);
      fetch('/api/admin/testimonials')
        .then(async (res) => {
          const result = await res.json();
          if (result.success && Array.isArray(result.data)) {
            setItems(result.data);
          }
        })
      .catch (() => {
      setMessage({ text: 'Failed to fetch testimonials.', type: 'error' });
    })
    .finally(() => setIsLoading(false));
};

useEffect(() => {
  loadTestimonials();
}, []);

    async function updateStatus(id: string, status: 'approved' | 'rejected' | 'pending') {
      try {
        const res = await fetch(`/api/admin/testimonials/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        });
        if (res.ok) {
          setItems((prev) => prev.map((item) => (item._id === id ? { ...item, status } : item)));
          const statusLabel =
            status === 'approved'
              ? 'Approved (Now live on public website)'
              : status === 'rejected'
                ? 'Rejected (Hidden from public website)'
                : 'Reset to Pending';
          setMessage({ text: `Testimonial ${statusLabel}.`, type: 'success' });
          setTimeout(() => setMessage(null), 4000);
        } else {
          setMessage({ text: 'Failed to update testimonial status.', type: 'error' });
        }
      } catch {
        setMessage({ text: 'An error occurred while updating status.', type: 'error' });
      }
    }

    async function remove(id: string) {
        if (!window.confirm('Are you sure you want to permanently delete this testimonial?')) return;
        try {
          const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
          if (res.ok) {
            setItems((prev) => prev.filter((item) => item._id !== id));
            setMessage({ text: 'Testimonial deleted successfully.', type: 'success' });
            setTimeout(() => setMessage(null), 4000);
          } else {
            setMessage({ text: 'Failed to delete testimonial.', type: 'error' });
          }
        } catch {
          setMessage({ text: 'An error occurred while deleting.', type: 'error' });
        }
      }

      async function handleSeedSamples() {
        if (!window.confirm('Import the 4 sample reviews into database as "Pending Approval"?')) return;
        setIsSeeding(true);
        try {
          const res = await fetch('/api/admin/testimonials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'seed_samples' }),
          });
          const data = await res.json();
          if (data.success && Array.isArray(data.data)) {
            setItems(data.data);
            setMessage({ text: 'Sample reviews imported as Pending. You can now Approve or Reject each review.', type: 'success' });
          } else {
            setMessage({ text: 'Failed to import sample reviews.', type: 'error' });
          }
        } catch {
          setMessage({ text: 'An error occurred during sample import.', type: 'error' });
        } finally {
          setIsSeeding(false);
        }
      }

      // Filter & Search logic
      const filteredItems = items.filter((item) => {
        const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
        const matchesSearch =
          searchQuery === '' ||
          item.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.feedback.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
      });

      const countTotal = items.length;
      const countApproved = items.filter((i) => i.status === 'approved').length;
      const countPending = items.filter((i) => i.status === 'pending').length;
      const countRejected = items.filter((i) => i.status === 'rejected').length;

      return (
        <div className="mx-auto max-w-[1500px] space-y-6">
          {/* Header Row */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Website Reviews</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy">Client Testimonials</h2>
              <p className="mt-1 text-sm text-slate-500">
                Control which client testimonials are approved and visible on the public website.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSeedSamples}
                disabled={isSeeding}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-brand-navy shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <Download size={15} />
                <span>{isSeeding ? 'Importing Samples...' : 'Import Sample Reviews'}</span>
              </button>
            </div>
          </div>

            {/* Metric Cards Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Reviews</span>
                <p className="text-2xl sm:text-3xl font-black text-brand-navy mt-1">{countTotal}</p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-emerald-200/90 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Approved (Live on UI)</span>
                  <Eye size={16} className="text-emerald-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">{countApproved}</p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-amber-200/90 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Pending Review</span>
                  <Clock size={16} className="text-amber-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">{countPending}</p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-rose-200/90 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Rejected (Hidden)</span>
                  <EyeOff size={16} className="text-rose-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-rose-600 mt-1">{countRejected}</p>
              </div>
            </div>

            {/* Notification Toast Banner */}
            {message && (
              <div
                role="status"
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${message.type === 'success'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                    : 'border-rose-200 bg-rose-50 text-rose-800'
                  }`}
              >
                {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span>{message.text}</span>
              </div>
            )}

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/90 w-full sm:w-auto overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${filterStatus === 'all'
                      ? 'bg-white text-brand-navy shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  All ({countTotal})
                </button>

                <button
                  type="button"
                  onClick={() => setFilterStatus('pending')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${filterStatus === 'pending'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-amber-800 hover:bg-amber-50'
                    }`}
                >
                  <span>Pending</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">{countPending}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFilterStatus('approved')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${filterStatus === 'approved'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-emerald-800 hover:bg-emerald-50'
                    }`}
                >
                  <span>Approved</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">{countApproved}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFilterStatus('rejected')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${filterStatus === 'rejected'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-rose-800 hover:bg-rose-50'
                    }`}
                >
                  <span>Rejected</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">{countRejected}</span>
                </button>
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-72">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by client or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF]/20 focus:border-[#0052FF]"
                />
              </div>
            </div>

            {/* Main Table */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
              <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] text-left">
                      <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
                        <tr>
                          <th className="px-6 py-4">Client Details</th>
                          <th className="px-6 py-4">Feedback &amp; Rating</th>
                          <th className="px-6 py-4">Approval Status</th>
                          <th className="px-6 py-4 text-right">Moderation Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
              {filteredItems.map((testimonial) => {
                                    const isApproved = testimonial.status === 'approved';
                                    const isRejected = testimonial.status === 'rejected';
                                    const isPending = testimonial.status === 'pending';

                                    return (
                                      <tr key={testimonial._id} className="hover:bg-slate-50/70 transition-colors">
                                        {/* Column 1: Client */}
                                        <td className="px-6 py-4 align-top w-56">
                                          <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-sm uppercase shrink-0">
                                              {testimonial.fullname.charAt(0)}
                                            </div>
                                            <div className="min-w-0">
                                              <p className="font-bold text-brand-navy truncate text-sm">{testimonial.fullname}</p>
                                              <p className="text-xs text-slate-400 truncate">{testimonial.email}</p>
                                              <p className="text-[11px] text-slate-400 mt-1">
                                                {new Date(testimonial.createdAt).toLocaleDateString('en-IN', {
                                                  day: 'numeric',
                                                  month: 'short',
                                                  year: 'numeric',
                                                })}
                                              </p>
                                            </div>
                                          </div>
                                        </td>

                                        {/* Column 2: Feedback & Stars */}
                                        <td className="px-6 py-4 align-top">
                                          <div className="flex items-center gap-1.5 text-amber-400 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                              <Star
                                                key={i}
                                                fill={i < Math.floor(testimonial.rating) ? 'currentColor' : 'none'}
                                                className="w-4 h-4"
                                              />
                                            ))}
                                            <span className="ml-1 text-xs font-bold text-slate-700">{testimonial.rating.toFixed(1)} / 5</span>
                                          </div>
                                          <p className="text-sm text-slate-700 leading-relaxed break-words line-clamp-4">
                                            &ldquo;{testimonial.feedback}&rdquo;
                                          </p>
                                        </td>

                                        {/* Column 3: Status Badge */}
                                        <td className="px-6 py-4 align-top w-44">
                                          {isApproved && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                              <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                              <span>Approved (Live)</span>
                                            </span>
                                          )}
                                              {isRejected && (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                                                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                                                  <span>Rejected</span>
                                                </span>
                                              )}
                                              {isPending && (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                                                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                                                  <span>Pending Approval</span>
                                                </span>
                                              )}
                                            </td>

                    {/* Column 4: Action Buttons (Approve / Reject / Delete) */}
                                          <td className="px-6 py-4 align-top text-right">
                                            <div className="flex items-center justify-end gap-2">
                                              {/* Approve Button */}
                                              {!isApproved && (
                                                <button
                                                  type="button"
                                                  onClick={() => updateStatus(testimonial._id, 'approved')}
                                                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                                                  title="Approve and show on website"
                                                >
                                                  <Check size={14} />
                                                  <span>Approve</span>
                                                </button>
                                              )}

                                              {/* Reject Button */}
                                              {!isRejected && (
                                                <button
                                                  type="button"
                                                  onClick={() => updateStatus(testimonial._id, 'rejected')}
                                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
                                                  title="Reject and hide from website"
                                                >
                                                  <X size={14} />
                                                  <span>Reject</span>
                                                </button>
                                              )}

                                              {/* Reset to Pending (if already approved/rejected) */}
                                              {!isPending && (
                                                <button
                                                  type="button"
                                                  onClick={() => updateStatus(testimonial._id, 'pending')}
                                                  className="px-2.5 py-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                                                  title="Reset to Pending status"
                                                >
                                                  Reset
                                                </button>
                                              )}

                                              {/* Delete Button */}
                                              <button
                                                type="button"
                                                onClick={() => remove(testimonial._id)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                                title="Permanently Delete Testimonial"
                                              >
                                                <Trash2 size={16} />
                                              </button>
                                            </div>
                                          </td>
                                      </tr>
                                    );
                                  })}

                                {filteredItems.length === 0 && (
                                  <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                      <div className="max-w-sm mx-auto space-y-2">
                                        <Clock size={32} className="mx-auto text-slate-400" />
                                        <p className="font-bold text-slate-700">No testimonials found</p>
                                        <p className="text-xs text-slate-400">
                                          {filterStatus !== 'all'
                                            ? `There are no testimonials with status "${filterStatus}".`
                                            : 'No reviews have been submitted yet.'}
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
      </section>
                    </div>
                    );
}
