'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SAMPLE_DESTINATIONS } from '../../../lib/data/sample-data';
import { Badge, Button } from '../../../components/ui';
import {
  Calendar,
  MapPin,
  Clock,
  Plus,
  Compass,
  ArrowRight,
  Car,
  CheckCircle,
  Share2,
  Trash2,
} from 'lucide-react';

interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  activities: string[];
  driveTime: string;
  imageUrl: string;
}

const DEFAULT_ITINERARY: ItineraryDay[] = [
  {
    day: 1,
    title: 'Arrival & Sigiriya Ancient Citadel',
    location: 'Central Province',
    activities: [
      'Airport transfer to Cultural Triangle',
      'Climb the 5th-century Sigiriya Rock Fortress at golden hour',
      'Traditional Sri Lankan dinner at Habarana',
    ],
    driveTime: '3.5 hrs from Colombo Airport',
    imageUrl: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
  },
  {
    day: 2,
    title: 'Sacred Kandy & Royal Temple of the Tooth',
    location: 'Central Province',
    activities: [
      'Morning visit to Dambulla Golden Cave Temple',
      'Scenic drive down to royal city of Kandy',
      'Evening Thevava ceremony at Temple of the Tooth Relic',
    ],
    driveTime: '2.5 hrs transit',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
  },
  {
    day: 3,
    title: 'Nuwara Eliya Tea Gardens & Waterfalls',
    location: 'Central Province',
    activities: [
      'Scenic climb through misty tea estates',
      'Ceylon tea factory plucking and masterclass cupping session',
      'Stroll around Gregory Lake and colonial post office',
    ],
    driveTime: '2.5 hrs mountain drive',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
  },
  {
    day: 4,
    title: 'Iconic Ella Scenic Train & Nine Arches Bridge',
    location: 'Uva Province',
    activities: [
      'Board the world-famous blue train from Nanu Oya to Ella',
      'Hike down to the colonial Demodara Nine Arches Bridge',
      'Sunset hike up Little Adam’s Peak',
    ],
    driveTime: '2 hrs train ride',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
  },
  {
    day: 5,
    title: 'Yala National Park Leopard Safari',
    location: 'Southern Province',
    activities: [
      'Descend to the southern dry zone plains',
      'Afternoon private 4x4 open-top safari through Block 1',
      'Spotting wild Asian elephants, leopards, and crocodiles',
    ],
    driveTime: '2.5 hrs transit',
    imageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
  },
  {
    day: 6,
    title: 'Mirissa Blue Whale Cruise & Galle Dutch Fort',
    location: 'Southern Coast',
    activities: [
      'Early dawn ethical whale watching boat expedition',
      'Afternoon explore Galle Fort ramparts and colonial streets',
      'Seafood dinner overlooking the Indian Ocean sunset',
    ],
    driveTime: '1.5 hrs coastal highway',
    imageUrl: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80',
  },
];

export default function TripPlannerPage() {
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(DEFAULT_ITINERARY);
  const [tripTitle, setTripTitle] = useState('7-Day Sri Lanka Highlights & Coastlines');
  const [newActivity, setNewActivity] = useState('');
  const [activeDayModal, setActiveDayModal] = useState<number | null>(null);

  const handleAddActivity = (dayIndex: number) => {
    if (!newActivity.trim()) return;
    const updated = [...itinerary];
    updated[dayIndex].activities.push(newActivity.trim());
    setItinerary(updated);
    setNewActivity('');
    setActiveDayModal(null);
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-24">
      {/* Top Banner */}
      <section className="bg-stone-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <Badge variant="accent" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs mb-3">
              INTELLIGENT TRIP PLANNER
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {tripTitle}
            </h1>
            <p className="mt-2 text-stone-300 text-sm max-w-xl">
              Customized multi-day road journey through UNESCO heritage marvels, misty tea slopes, and southern ocean coastlines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/destinations">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20 text-white rounded-full text-xs">
                <Compass className="w-4 h-4 mr-1.5" />
                Browse Attractions
              </Button>
            </Link>
            <Button
              variant="primary"
              className="bg-emerald-600 hover:bg-emerald-700 rounded-full text-xs shadow-lg shadow-emerald-900/20"
              onClick={() => alert('Trip plan saved to your traveler profile!')}
            >
              Save Itinerary
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content Timeline */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-6">
        {itinerary.map((dayItem, idx) => (
          <div
            key={dayItem.day}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Day Image */}
              <div className="relative aspect-[16/10] lg:w-64 rounded-2xl overflow-hidden shrink-0 bg-stone-100">
                <Image
                  src={dayItem.imageUrl}
                  alt={dayItem.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 256px"
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-stone-900/90 text-white px-3 py-1 rounded-full text-xs font-black backdrop-blur-md">
                  Day {dayItem.day}
                </div>
              </div>

              {/* Day Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-400 font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{dayItem.location}</span>
                    <span>•</span>
                    <Car className="w-3.5 h-3.5 text-teal-600" />
                    <span>{dayItem.driveTime}</span>
                  </div>
                  <h2 className="text-xl font-black text-stone-900">{dayItem.title}</h2>
                </div>

                {/* Activities List */}
                <div className="space-y-2">
                  {dayItem.activities.map((act, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>

                {/* Add activity prompt */}
                {activeDayModal === idx ? (
                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      value={newActivity}
                      onChange={(e) => setNewActivity(e.target.value)}
                      placeholder="Add customized activity or stop..."
                      className="flex-1 p-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <Button size="sm" onClick={() => handleAddActivity(idx)} className="rounded-xl text-xs bg-emerald-600">
                      Add
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setActiveDayModal(null)} className="rounded-xl text-xs">
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveDayModal(idx)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 pt-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Activity to Day {dayItem.day}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
