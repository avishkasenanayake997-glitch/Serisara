'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../providers/auth-provider';
import { Button, Badge } from '../../components/ui';
import {
  Compass,
  Calendar,
  Heart,
  User,
  LogOut,
  Shield,
  Layers,
  ChevronRight,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, role, isManager, signOut, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const navItems = [
    { label: 'My Profile', href: '/profile', icon: User },
    { label: 'My Trips', href: '/trips', icon: Calendar },
    { label: 'Bookings', href: '/bookings', icon: Layers },
    { label: 'Saved Favorites', href: '/favorites', icon: Heart },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center animate-pulse">
            <Compass className="w-6 h-6 text-white animate-spin" />
          </div>
          <p className="text-sm font-medium text-stone-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-950/20">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-stone-900">
                SERISARA
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
              <Link href="/destinations" className="hover:text-emerald-700 transition-colors">
                Destinations
              </Link>
              <Link href="/accommodations" className="hover:text-emerald-700 transition-colors">
                Accommodations
              </Link>
              <Link href="/experiences" className="hover:text-emerald-700 transition-colors">
                Experiences
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isManager && (
              <Link href="/admin">
                <Badge variant="accent" className="cursor-pointer hover:bg-amber-100 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>Admin Panel</span>
                </Badge>
              </Link>
            )}

            <div className="flex items-center gap-3 pl-3 border-l border-stone-200">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold flex items-center justify-center text-xs overflow-hidden shrink-0">
                {profile?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
                ) : (
                  profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'
                )}
              </div>

              <div className="hidden sm:block text-left text-xs">
                <p className="font-bold text-stone-800 line-clamp-1">{profile?.full_name || 'Traveler'}</p>
                <p className="text-stone-400 capitalize">{role}</p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-stone-500 hover:text-rose-600"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1 space-y-2">
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-sm mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-black text-lg border border-emerald-500/20">
                  {profile?.full_name?.charAt(0) || 'S'}
                </div>
                <div className="overflow-hidden">
                  <h2 className="text-sm font-bold text-stone-900 truncate">
                    {profile?.full_name || 'Traveler'}
                  </h2>
                  <p className="text-xs text-stone-400 truncate">{user?.email}</p>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/10 font-bold'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-emerald-200" />}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Page Content */}
          <main className="md:col-span-3">{children}</main>
        </div>
      </div>
    </div>
  );
}
