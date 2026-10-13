'use client';

import { useEffect, useState } from 'react';
import { Star, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { ITestimonial } from '@/models/Testimonial';

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
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/testimonials')
      .then(async (res) => {
        const result = await res.json();
        if (result.success) setItems(result.data);
      })
      .catch(() => undefined);
  }, []);

  async function updateStatus(id: string, status: 'approved' | 'rejected') {
    const res = await fetch(`/api/admin/testimonials/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setItems(items.map((item) => (item._id === id ? { ...item, status } : item)));
      setMessage(`Testimonial ${status} successfully.`);
    } else {
      setMessage('Failed to update status.');
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems(items.filter((item) => item._id !== id));
      setMessage('Testimonial deleted successfully.');
    } else {
      setMessage('Failed to delete testimonial.');
    }
  }

  return (
    <div className="mx-auto max-w-[1500px] space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm text-slate-500">Feedback content</p>
          <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
          <p className="mt-2 text-sm text-slate-500">Manage client reviews and feedback.</p>
        </div>
      </div>
      {message && <p role="status" className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p>}
      
      <section className="overflow-hidden border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-brand-gray text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-5 py-4">Client</th>
                <th className="px-5 py-4">Feedback</th>
                <th className="px-5 py-4">Rating</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((testimonial) => (
                <tr key={testimonial._id} className="hover:bg-[#fcfbf9]">
                  <td className="px-5 py-4 align-top">
                    <p className="font-bold text-brand-navy">{testimonial.fullname}</p>
                    <p className="text-xs text-slate-400">{testimonial.email}</p>
                    <p className="text-xs text-slate-400 mt-1">{new Date(testimonial.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <p className="text-sm text-slate-600 max-w-md break-words">{testimonial.feedback}</p>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} fill={i < Math.floor(testimonial.rating) ? 'currentColor' : 'none'} className="w-4 h-4" />
                      ))}
                      <span className="ml-2 text-sm text-slate-600">{testimonial.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${testimonial.status === 'approved' ? 'bg-green-100 text-green-700' : testimonial.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {testimonial.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <div className="flex justify-end gap-1">
                      {testimonial.status !== 'approved' && (
                        <button onClick={() => updateStatus(testimonial._id, 'approved')} className="rounded-lg p-2 text-green-600 hover:bg-green-50" title="Approve">
                          <CheckCircle size={17} />
                        </button>
                      )}
                      {testimonial.status !== 'rejected' && (
                        <button onClick={() => updateStatus(testimonial._id, 'rejected')} className="rounded-lg p-2 text-orange-600 hover:bg-orange-50" title="Reject">
                          <XCircle size={17} />
                        </button>
                      )}
                      <button onClick={() => remove(testimonial._id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50" title="Delete">
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-slate-500">No testimonials found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
