'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SAMPLE_ACCOMMODATIONS, SAMPLE_EXPERIENCES } from '../../../lib/data/sample-data';
import { Badge, Button } from '../../../components/ui';
import {
  Calendar,
  Building2,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default function BookingsPage() {
  const sampleStays = [
    {
      id: 'b-01',
      title: 'The Fortress Resort & Spa',
      roomName: 'Ocean View Suite',
      dates: '18 Nov 2026 – 21 Nov 2026 (3 Nights)',
      location: 'Koggala, Southern Province',
      status: 'Confirmed',
      amount: '$750 USD (~ LKR 232,500)',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      slug: 'the-fortress-resort-and-spa',
    },
  ];

  const sampleExperiences = [
    {
      id: 'b-02',
      title: 'Mirissa Sunrise Whale & Dolphin Expedition',
      time: '19 Nov 2026 • 6:30 AM Departure',
      guests: '2 Participants',
      status: 'Confirmed',
      amount: '$130 USD (~ LKR 40,300)',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      slug: 'mirissa-sunrise-whale-dolphin-expedition',
    },
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">
            My Travel Bookings
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Manage your verified resort reservations, boutique stays, and safari expeditions.
          </p>
        </div>

        {/* Accommodations Section */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-stone-800 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-teal-600" />
            <span>Reserved Accommodations</span>
          </h2>

          {sampleStays.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-stone-100">
                  <Image src={booking.imageUrl} alt={booking.title} fill sizes="80px" className="object-cover" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {booking.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900">{booking.title}</h3>
                  <p className="text-xs text-stone-500">{booking.roomName} • {booking.dates}</p>
                  <p className="text-xs text-stone-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-teal-600" /> {booking.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-stone-100">
                <span className="text-sm font-bold text-stone-900">{booking.amount}</span>
                <Link href={`/accommodations/${booking.slug}`}>
                  <Button variant="outline" size="sm" className="rounded-full text-xs">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Experiences Section */}
        <div className="space-y-4 pt-4">
          <h2 className="text-base font-bold text-stone-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Booked Experiences & Tours</span>
          </h2>

          {sampleExperiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-stone-100">
                  <Image src={exp.imageUrl} alt={exp.title} fill sizes="80px" className="object-cover" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {exp.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900">{exp.title}</h3>
                  <p className="text-xs text-stone-500">{exp.time} • {exp.guests}</p>
                </div>
              </div>

              <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-stone-100">
                <span className="text-sm font-bold text-stone-900">{exp.amount}</span>
                <Link href={`/experiences/${exp.slug}`}>
                  <Button variant="outline" size="sm" className="rounded-full text-xs">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">Looking to add more to your trip?</h3>
            <p className="text-xs text-emerald-100 mt-1">
              Explore national parks, mountain train journeys, and sacred temple rituals.
            </p>
          </div>
          <Link href="/destinations">
            <Button className="bg-white text-emerald-950 hover:bg-stone-100 rounded-full font-bold px-6 text-xs shrink-0">
              Browse Destinations <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
