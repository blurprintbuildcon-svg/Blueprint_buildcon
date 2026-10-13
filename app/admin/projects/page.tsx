'use client';

import Link from 'next/link';
import { Eye, MapPin, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { projects as fallbackProjects } from '@/data/projects';

type Project = { id: string; title: string; location: string; category: string; description: string; image: string };

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>(fallbackProjects);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All categories');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/projects?limit=50').then(async (response) => {
      const result = await response.json();
      if (response.ok && result.data.length) setItems(result.data.map((item: { _id: string; title: string; location: string; category: string; description: string; images?: { url: string }[] }) => ({ id: item._id, title: item.title, location: item.location, category: item.category, description: item.description, image: item.images?.[0]?.url ?? fallbackProjects[0].image })));
    }).catch(() => undefined);
  }, []);

  const filtered = useMemo(() => items.filter((project) => `${project.title} ${project.location}`.toLowerCase().includes(query.toLowerCase()) && (category === 'All categories' || project.category === category)), [category, items, query]);
  async function remove(id: string, title: string) { if (!window.confirm(`Are you sure you want to delete ${title}?`)) return; const response = await fetch(`/api/projects/${id}`, { method: 'DELETE' }); if (response.ok) { setItems(items.filter((item) => item.id !== id)); setMessage('Project deleted successfully.'); } else setMessage('Unable to delete this project.'); }

  return <div className="mx-auto max-w-[1500px] space-y-6">
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="mb-2 text-sm text-slate-500">Portfolio content</p><h2 className="text-3xl font-bold tracking-tight">Featured projects</h2><p className="mt-2 text-sm text-slate-500">Manage the stories and details shown in your project gallery.</p></div><Link href="/admin/projects/new" className="inline-flex items-center justify-center gap-2 bg-brand-orange px-4 py-3 text-sm font-bold text-white shadow-lg shadow-brand-orange/15 hover:bg-orange-700"><Plus size={17} /> New project</Link></div>
    {message && <p role="status" className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p>}
    <section className="overflow-hidden border border-slate-200 bg-white"><div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"><div className="relative w-full sm:max-w-sm"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title or location" className="w-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-brand-orange" /></div><select value={category} onChange={(event) => setCategory(event.target.value)} className="border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-brand-orange"><option>All categories</option><option>Residential</option><option>Villas</option><option>Commercial</option><option>Renovation</option></select></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="bg-brand-gray text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500"><tr><th className="px-5 py-4">Project</th><th className="px-5 py-4">Location</th><th className="px-5 py-4">Category</th><th className="px-5 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{filtered.map((project) => <tr key={project.id} className="hover:bg-[#fcfbf9]"><td className="px-5 py-4"><div className="flex items-center gap-3"><img src={project.image} alt="" className="h-12 w-16 object-cover" /><div><p className="font-bold text-brand-navy">{project.title}</p><p className="mt-1 max-w-xs truncate text-xs text-slate-400">{project.description}</p></div></div></td><td className="px-5 py-4 text-sm text-slate-500"><span className="flex items-center gap-1"><MapPin size={14} />{project.location}</span></td><td className="px-5 py-4"><span className="bg-brand-gray px-2.5 py-1 text-xs font-bold text-slate-600">{project.category}</span></td><td className="px-5 py-4"><div className="flex justify-end gap-1"><Link href={`/projects/${project.id}`} className="rounded-lg p-2 text-slate-400 hover:bg-brand-gray hover:text-brand-navy" aria-label={`View ${project.title}`}><Eye size={17} /></Link><Link href={`/admin/projects/edit/${project.id}`} className="rounded-lg p-2 text-slate-400 hover:bg-brand-gray hover:text-brand-navy" aria-label={`Edit ${project.title}`}><Pencil size={17} /></Link><button type="button" onClick={() => remove(project.id, project.title)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" aria-label={`Delete ${project.title}`}><Trash2 size={17} /></button></div></td></tr>)}</tbody></table></div><div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-400">Showing {filtered.length} of {items.length} projects</div></section>
  </div>;
}
