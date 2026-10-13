'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { BarChart3, BriefcaseBusiness, Building2, ChevronRight, CircleUserRound, LogOut, Menu, PanelLeftClose, PanelLeftOpen, X, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';

const navigation = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: BarChart3 },
  { label: 'Featured Projects', href: '/admin/projects', icon: BriefcaseBusiness },
  { label: 'Services', href: '/admin/services', icon: Building2 },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const isLogin = pathname === '/admin/login';

  useEffect(() => {
    if (isLogin) return;
    fetch('/api/admin/me').then((response) => {
      if (!response.ok) router.replace('/admin/login');
    }).catch(() => router.replace('/admin/login'));
  }, [isLogin, router]);

  if (isLogin) return <div className="admin-root min-h-screen">{children}</div>;

  const currentPage = navigation.find((item) => pathname.startsWith(item.href));
  return <div className="admin-root min-h-screen bg-[#f7f5f1] text-brand-navy">
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-brand-navy text-white transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${collapsed ? 'lg:w-24' : ''}`}>
      <div className="flex h-24 items-center justify-between border-b border-white/10 px-6">
        <Link href="/admin/dashboard" className={`flex items-center gap-3 overflow-hidden whitespace-nowrap text-lg font-bold tracking-tight ${collapsed ? 'lg:justify-center' : ''}`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 p-1.5 ring-1 ring-white/15">
            <Image src="/logo-mark.png" alt="Logo" width={32} height={32} className="h-full w-full object-contain filter drop-shadow-sm" />
          </div>
          <div className={collapsed ? 'lg:hidden' : ''}>
            <span>BluePrint<span className="text-brand-orange">-BuildCon</span></span>
            <span className="mt-0.5 block text-[9.5px] font-medium uppercase tracking-[0.24em] text-white/50">Control Room</span>
          </div>
        </Link>
        <button type="button" onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden" aria-label="Close sidebar"><X size={20} /></button>
        <button type="button" onClick={() => setCollapsed(!collapsed)} className="hidden rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:block" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}</button>
      </div>
      <div className="flex-1 px-4 py-8"><p className={`mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/35 ${collapsed ? 'lg:hidden' : ''}`}>Workspace</p><nav className="space-y-2">{navigation.map((item) => { const active = pathname.startsWith(item.href); return <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} title={collapsed ? item.label : undefined} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${active ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' : 'text-white/60 hover:bg-white/10 hover:text-white'} ${collapsed ? 'lg:justify-center' : ''}`}><item.icon size={19} className="shrink-0" /><span className={collapsed ? 'lg:hidden' : ''}>{item.label}</span>{active && !collapsed && <ChevronRight size={16} className="ml-auto" />}</Link>; })}</nav></div>
      <div className={`border-t border-white/10 p-4 ${collapsed ? 'lg:px-3' : ''}`}><div className={`mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3 ${collapsed ? 'lg:justify-center' : ''}`}><CircleUserRound size={20} className="text-brand-orange" /><div className={collapsed ? 'lg:hidden' : ''}><p className="text-sm font-semibold">Admin account</p><p className="text-xs text-white/45">Workspace owner</p></div></div><button type="button" onClick={async () => { await fetch('/api/admin/logout', { method: 'POST' }); router.push('/admin/login'); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/55 transition-colors hover:bg-white/10 hover:text-white ${collapsed ? 'lg:justify-center' : ''}`} title={collapsed ? 'Log out' : undefined}><LogOut size={18} /><span className={collapsed ? 'lg:hidden' : ''}>Log out</span></button></div>
    </aside>
    <div className={`min-h-screen transition-[padding] duration-300 ${collapsed ? 'lg:pl-24' : 'lg:pl-72'}`}><header className="sticky top-0 z-30 flex h-24 items-center justify-between border-b border-slate-200 bg-[#f7f5f1]/90 px-5 backdrop-blur-md sm:px-8 lg:px-10"><div className="flex items-center gap-3"><button type="button" onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-brand-navy hover:bg-white lg:hidden" aria-label="Open sidebar"><Menu size={22} /></button><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">Admin workspace</p><h1 className="mt-1 text-xl font-bold sm:text-2xl">{currentPage?.label ?? 'Dashboard'}</h1></div></div><div className="hidden items-center gap-3 sm:flex"><div className="h-8 w-px bg-slate-200" /><div className="text-right"><p className="text-sm font-semibold">BluePrint-BuildCon</p><p className="text-xs text-slate-400">Live content management</p></div><CircleUserRound size={30} className="text-brand-orange" /></div></header><main className="px-5 py-8 sm:px-8 lg:px-10">{children}</main></div>
    {sidebarOpen && <button type="button" className="fixed inset-0 z-30 bg-brand-navy/50 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar overlay" />}
  </div>;
}