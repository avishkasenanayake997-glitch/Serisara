'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../providers/auth-provider';
import { Button, Badge } from '../../components/ui';
import {
  Compass,
  Users,
  MapPin,
  Building2,
  Sparkles,
  Calendar,
  MessageSquare,
  Mail,
  LayoutDashboard,
  ArrowLeft,
  ShieldAlert,
  LogOut,
  ChevronRight,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, isManager, isAdmin, signOut, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Users & Roles', href: '/admin/users', icon: Users, adminOnly: true },
    { label: 'Destinations', href: '/admin/destinations', icon: MapPin },
    { label: 'Accommodations', href: '/admin/accommodations', icon: Building2 },
    { label: 'Experiences', href: '/admin/experiences', icon: Sparkles },
    { label: 'Bookings', href: '/admin/bookings', icon: Calendar },
    { label: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
    { label: 'Inquiries', href: '/admin/inquiries', icon: Mail },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <Compass className="w-8 h-8 text-emerald-400 animate-spin" />
          <p className="text-sm text-stone-400">Verifying administrative credentials...</p>
        </div>
      </div>
    );
  }

  // Access check
  if (!isManager) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-900 text-white p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Restricted Access</h1>
        <p className="text-stone-400 text-sm max-w-md mb-6 leading-relaxed">
          The Serisara Management Console requires Manager or Platform Admin privileges. Your current role is{' '}
          <span className="font-semibold text-white uppercase">{profile?.role || 'User'}</span>.
        </p>
        <Link href="/dashboard">
          <Button variant="outline" className="border-stone-700 text-stone-200 hover:bg-stone-800">
            Return to User Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-stone-950 text-stone-100">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-stone-800/80 bg-stone-900/90 flex flex-col shrink-0">
        {/* Brand */}
        <div className="h-16 px-6 border-b border-stone-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-950/40">
              <Compass className="w-4 h-4 text-stone-950" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-white block leading-none">
                SERISARA
              </span>
              <span className="text-[9px] tracking-widest text-emerald-400 font-bold uppercase">
                Console
              </span>
            </div>
          </Link>
          <Badge variant="accent" className="text-[10px] uppercase font-bold py-0.5">
            {profile?.role}
          </Badge>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            if (item.adminOnly && !isAdmin) return null;
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20 font-bold'
                    : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-200" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-stone-800/80 space-y-2">
          <Link href="/dashboard" className="block">
            <Button variant="ghost" size="sm" className="w-full justify-start text-stone-400 hover:text-white hover:bg-stone-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back to Site</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full justify-start text-rose-400 hover:text-rose-300 hover:bg-rose-950/20"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span>Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 border-b border-stone-800/80 bg-stone-900/60 backdrop-blur-md px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span className="font-semibold text-stone-300">Management Console</span>
            <span>/</span>
            <span className="capitalize text-emerald-400">
              {pathname.replace('/admin', '').replace('/', '') || 'Overview'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right text-xs">
              <p className="font-bold text-stone-200">{profile?.full_name}</p>
              <p className="text-stone-400">{user?.email}</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold flex items-center justify-center text-xs">
              {profile?.full_name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-8 bg-stone-950">{children}</main>
      </div>
    </div>
  );
}
