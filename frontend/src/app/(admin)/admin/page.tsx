'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../../providers/auth-provider';
import { Button } from '../../../components/ui';
import {
  Users,
  MapPin,
  Building2,
  Sparkles,
  Calendar,
  Mail,
  Plus,
  CheckCircle,
  Activity,
  ArrowUpRight,
} from 'lucide-react';

export default function AdminOverviewPage() {
  const { profile, isAdmin } = useAuth();

  const metrics = [
    { title: 'Total Registered Travelers', value: '1,280', change: '+12% this month', icon: Users, color: 'text-sky-400' },
    { title: 'Active Destinations', value: '48', change: '4 UNESCO sites', icon: MapPin, color: 'text-emerald-400' },
    { title: 'Listed Accommodations', value: '32', change: 'Hotels, Villas & Lodges', icon: Building2, color: 'text-amber-400' },
    { title: 'Curated Experiences', value: '24', change: 'Active expeditions', icon: Sparkles, color: 'text-purple-400' },
    { title: 'Bookings Processed', value: '186', change: '$42,500 via Stripe', icon: Calendar, color: 'text-teal-400' },
    { title: 'Pending Inquiries', value: '6', change: 'Requires response', icon: Mail, color: 'text-rose-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">Console Overview</h1>
          <p className="text-xs text-stone-400">
            Welcome back, {profile?.full_name}. Real-time monitoring of Sri Lanka travel listings & operations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/destinations/new">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5 shadow-none">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Destination</span>
            </Button>
          </Link>
          <Link href="/admin/accommodations/new">
            <Button size="sm" variant="outline" className="border-stone-700 text-stone-200 hover:bg-stone-800 gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Stay</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className="p-5 rounded-2xl bg-stone-900 border border-stone-800/90 hover:border-stone-700/80 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-stone-400">{metric.title}</span>
                <div className="w-8 h-8 rounded-xl bg-stone-800 flex items-center justify-center">
                  <Icon className={`w-4 h-4 ${metric.color}`} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white">{metric.value}</span>
                <span className="text-[11px] font-medium text-stone-400">{metric.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Launch & Health Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Launch */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Management Shortcuts</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {isAdmin && (
              <Link
                href="/admin/users"
                className="p-4 rounded-xl bg-stone-800/50 hover:bg-stone-800 border border-stone-700/60 transition-all group flex items-center justify-between"
              >
                <div>
                  <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Manage Platform Users
                  </h3>
                  <p className="text-[11px] text-stone-400 mt-0.5">Assign roles and account statuses</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            )}

            <Link
              href="/admin/destinations"
              className="p-4 rounded-xl bg-stone-800/50 hover:bg-stone-800 border border-stone-700/60 transition-all group flex items-center justify-between"
            >
              <div>
                <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Attraction Catalog
                </h3>
                <p className="text-[11px] text-stone-400 mt-0.5">Publish & edit destination entries</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>

            <Link
              href="/admin/bookings"
              className="p-4 rounded-xl bg-stone-800/50 hover:bg-stone-800 border border-stone-700/60 transition-all group flex items-center justify-between"
            >
              <div>
                <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Booking Oversight
                </h3>
                <p className="text-[11px] text-stone-400 mt-0.5">Review payments & confirmations</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>

            <Link
              href="/admin/reviews"
              className="p-4 rounded-xl bg-stone-800/50 hover:bg-stone-800 border border-stone-700/60 transition-all group flex items-center justify-between"
            >
              <div>
                <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Review Moderation
                </h3>
                <p className="text-[11px] text-stone-400 mt-0.5">Filter spam & verify guest feedback</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
          </div>
        </div>

        {/* System Health */}
        <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Infrastructure Health</span>
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-800/40">
              <span className="text-stone-300">Express API Gateway</span>
              <span className="text-emerald-400 font-bold">Operational (200)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-800/40">
              <span className="text-stone-300">Supabase Postgres</span>
              <span className="text-emerald-400 font-bold">Connected (Singapore)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-800/40">
              <span className="text-stone-300">Stripe Integration</span>
              <span className="text-emerald-400 font-bold">Ready</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-800/40">
              <span className="text-stone-300">Cloudinary CDN</span>
              <span className="text-emerald-400 font-bold">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
