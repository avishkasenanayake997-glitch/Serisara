'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../../providers/auth-provider';
import { Card, CardContent, Button } from '../../../components/ui';
import { Compass, MapPin, Calendar, Heart, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const { profile } = useAuth();

  const quickLinks = [
    {
      title: 'Explore Destinations',
      desc: 'Discover UNESCO heritage ruins, rainforests, and tropical coasts',
      href: '/destinations',
      icon: MapPin,
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Book Accommodations',
      desc: 'Browse luxury beach villas, colonial bungalows, and eco-lodges',
      href: '/accommodations',
      icon: Compass,
      gradient: 'from-teal-500 to-cyan-600',
    },
    {
      title: 'Build Itinerary',
      desc: 'Craft your day-by-day Sri Lanka dream holiday with drag-and-drop',
      href: '/trips',
      icon: Calendar,
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Saved Favorites',
      desc: 'Quick access to your bookmarked places and excursions',
      href: '/favorites',
      icon: Heart,
      gradient: 'from-rose-500 to-pink-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-900 p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ayubowan! Welcome to Serisara</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Hello, {profile?.full_name || 'Traveler'} 👋
          </h1>
          <p className="text-emerald-100 text-sm leading-relaxed">
            Your travel command center is ready. Start building your custom Sri Lanka journey, browse handpicked boutique stays, or manage your bookings.
          </p>
          <div className="pt-2">
            <Link href="/trips">
              <Button size="md" className="bg-white text-emerald-900 hover:bg-emerald-50 shadow-none font-bold">
                Start a New Trip
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.title} href={item.href} className="group">
              <Card className="h-full hover:shadow-md hover:border-emerald-300/80 transition-all duration-200">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.gradient} flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Trust & Guarantee strip */}
      <Card className="bg-stone-50 border-stone-200">
        <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Sri Lanka Tourism Certified Platform</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Secure 256-bit encrypted authentication & payments</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
