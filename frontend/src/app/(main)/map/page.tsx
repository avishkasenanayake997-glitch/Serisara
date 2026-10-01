'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SAMPLE_DESTINATIONS, SAMPLE_ACCOMMODATIONS, SAMPLE_EXPERIENCES } from '../../../lib/data/sample-data';
import { StarRating } from '../../../components/shared/star-rating';
import { PriceDisplay } from '../../../components/shared/price-display';
import { Badge, Button } from '../../../components/ui';
import {
  MapPin,
  Compass,
  Navigation,
  Sparkles,
  Building2,
  Trees,
  Layers,
  Search,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react';

interface MapPoint {
  id: string;
  name: string;
  slug: string;
  type: 'destination' | 'accommodation' | 'experience';
  category: string;
  region: string;
  lat: number;
  lng: number;
  // Scaled coordinates for Sri Lanka SVG canvas (viewBox 0 0 500 700)
  svgX: number;
  svgY: number;
  rating: number;
  reviews: number;
  price?: number;
  imageUrl: string;
  description: string;
}

// Calibrated SVG pin locations for Sri Lanka's geography
const MAP_POINTS: MapPoint[] = [
  {
    id: 'p-sigiriya',
    name: 'Sigiriya Rock Citadel',
    slug: 'sigiriya-ancient-rock-fortress',
    type: 'destination',
    category: 'UNESCO Heritage',
    region: 'Central Province',
    lat: 7.957,
    lng: 80.7603,
    svgX: 250,
    svgY: 260,
    rating: 4.9,
    reviews: 128,
    imageUrl: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic 5th-century palace complex soaring above lush jungle plains.',
  },
  {
    id: 'p-kandy',
    name: 'Temple of the Tooth, Kandy',
    slug: 'temple-of-the-sacred-tooth-relic',
    type: 'destination',
    category: 'Sacred Temples',
    region: 'Central Province',
    lat: 7.2936,
    lng: 80.6413,
    svgX: 235,
    svgY: 345,
    rating: 4.9,
    reviews: 142,
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    description: 'Buddhism’s most venerated royal shrine on the shores of Lake Kandy.',
  },
  {
    id: 'p-ella',
    name: 'Nine Arches Bridge, Ella',
    slug: 'nine-arches-bridge-ella',
    type: 'destination',
    category: 'Highlands',
    region: 'Uva Province',
    lat: 6.8768,
    lng: 81.0608,
    svgX: 285,
    svgY: 410,
    rating: 4.9,
    reviews: 110,
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    description: 'Colonial stone railway viaduct curved amidst misty emerald tea hills.',
  },
  {
    id: 'p-galle',
    name: 'Galle Dutch Fort',
    slug: 'galle-dutch-fort',
    type: 'destination',
    category: 'Colonial Heritage',
    region: 'Southern Province',
    lat: 6.0305,
    lng: 80.2173,
    svgX: 180,
    svgY: 535,
    rating: 4.8,
    reviews: 94,
    imageUrl: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80',
    description: 'Living 17th-century oceanfront citadel with lighthouse and ramparts.',
  },
  {
    id: 'p-yala',
    name: 'Yala Leopard Safari',
    slug: 'yala-national-park',
    type: 'destination',
    category: 'Wildlife Sanctuary',
    region: 'Southern Province',
    lat: 6.3725,
    lng: 81.517,
    svgX: 340,
    svgY: 485,
    rating: 4.7,
    reviews: 85,
    imageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
    description: 'Premier wildlife reserve renowned for world’s densest leopard population.',
  },
  {
    id: 'p-mirissa-stay',
    name: 'The Fortress Resort & Spa',
    slug: 'the-fortress-resort-and-spa',
    type: 'accommodation',
    category: '5★ Luxury Hotel',
    region: 'Southern Province',
    lat: 6.0028,
    lng: 80.3236,
    svgX: 195,
    svgY: 540,
    rating: 4.9,
    reviews: 46,
    price: 220,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    description: 'Oceanfront boutique retreat with infinity pool and Ayurvedic spa.',
  },
  {
    id: 'p-98acres',
    name: '98 Acres Resort & Spa',
    slug: '98-acres-resort-and-spa',
    type: 'accommodation',
    category: 'Tea Estate Resort',
    region: 'Uva Province',
    lat: 6.8665,
    lng: 81.0601,
    svgX: 280,
    svgY: 418,
    rating: 4.9,
    reviews: 62,
    price: 180,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    description: 'Eco-luxury timber chalets overlooking Ella Gap and tea slopes.',
  },
  {
    id: 'p-whale',
    name: 'Mirissa Blue Whale Expedition',
    slug: 'mirissa-sunrise-whale-dolphin-expedition',
    type: 'experience',
    category: 'Marine Safari',
    region: 'Southern Province',
    lat: 5.945,
    lng: 80.4578,
    svgX: 215,
    svgY: 560,
    rating: 4.8,
    reviews: 58,
    price: 65,
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    description: 'Encounter majestic Blue Whales on ethical small-boat ocean cruises.',
  },
  {
    id: 'p-tea',
    name: 'Ceylon Tea Masterclass',
    slug: 'ceylon-tea-masters-plucking-and-tasting-journey',
    type: 'experience',
    category: 'Highland Heritage',
    region: 'Central Province',
    lat: 6.9497,
    lng: 80.7891,
    svgX: 250,
    svgY: 380,
    rating: 4.9,
    reviews: 42,
    price: 40,
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    description: 'Two leaves and a bud harvesting and tea cupping session in Nuwara Eliya.',
  },
];

export default function InteractiveMapPage() {
  const [selectedType, setSelectedType] = useState<'all' | 'destination' | 'accommodation' | 'experience'>('all');
  const [activePointId, setActivePointId] = useState<string>('p-sigiriya');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPoints = MAP_POINTS.filter((pt) => {
    const matchesType = selectedType === 'all' || pt.type === selectedType;
    const matchesSearch =
      pt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const activePoint = MAP_POINTS.find((pt) => pt.id === activePointId) || filteredPoints[0] || MAP_POINTS[0];

  const getHref = (pt: MapPoint) => {
    if (pt.type === 'destination') return `/destinations/${pt.slug}`;
    if (pt.type === 'accommodation') return `/accommodations/${pt.slug}`;
    return `/experiences/${pt.slug}`;
  };

  return (
    <div className="bg-stone-900 min-h-screen text-stone-100 flex flex-col">
      {/* Top Map Control Bar */}
      <div className="bg-stone-950/80 border-b border-stone-800 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">
                Sri Lanka Island Map Explorer
              </h1>
              <p className="text-xs text-stone-400">
                Tap any hotspot to view live details, rates, and navigation routes
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Highlights' },
              { id: 'destination', label: 'Destinations' },
              { id: 'accommodation', label: 'Luxury Stays' },
              { id: 'experience', label: 'Adventures' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedType(f.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedType === f.id
                    ? 'bg-emerald-500 text-stone-950 shadow-md shadow-emerald-500/20'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Map & Interactive Panel Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Vector Map of Sri Lanka */}
        <div className="lg:col-span-7 bg-stone-950 rounded-3xl border border-stone-800 p-6 relative overflow-hidden shadow-2xl flex flex-col items-center">
          {/* Map Status Badge */}
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-700 text-xs text-stone-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Interactive Live Grid</span>
          </div>

          {/* Sri Lanka SVG Map Graphic */}
          <div className="relative w-full max-w-[440px] aspect-[500/700] my-2 select-none">
            <svg
              viewBox="0 0 500 700"
              className="w-full h-full drop-shadow-[0_15px_35px_rgba(16,185,129,0.15)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="islandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#064e3b" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#047857" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0f766e" stopOpacity="0.85" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Geographic Island Outline of Sri Lanka */}
              <path
                d="M 230,45 
                   C 250,55 270,85 275,125
                   C 280,165 315,220 330,270
                   C 345,320 365,370 360,430
                   C 355,490 325,540 270,575
                   C 220,605 185,580 160,545
                   C 135,510 140,430 155,360
                   C 165,300 175,240 180,180
                   C 185,120 200,60 230,45 Z"
                fill="url(#islandGradient)"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="none"
                className="transition-all duration-500"
              />

              {/* Jaffna Peninsula Top Region */}
              <path
                d="M 220,40
                   C 210,25 200,15 225,12
                   C 245,10 260,25 235,42 Z"
                fill="#047857"
                stroke="#10b981"
                strokeWidth="1.5"
              />

              {/* Central Highlands Elevation Ring */}
              <path
                d="M 220,320
                   C 240,310 270,330 280,360
                   C 290,390 270,430 240,425
                   C 210,420 200,350 220,320 Z"
                fill="#065f46"
                stroke="#34d399"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.6"
              />

              {/* Ocean Wave Accents */}
              <path
                d="M 100,200 Q 120,210 140,200"
                stroke="#065f46"
                strokeWidth="1.5"
                fill="none"
                opacity="0.4"
              />
              <path
                d="M 360,200 Q 380,210 400,200"
                stroke="#065f46"
                strokeWidth="1.5"
                fill="none"
                opacity="0.4"
              />
              <path
                d="M 90,460 Q 110,470 130,460"
                stroke="#065f46"
                strokeWidth="1.5"
                fill="none"
                opacity="0.4"
              />

              {/* Hotspot Pins */}
              {filteredPoints.map((pt) => {
                const isSelected = pt.id === activePointId;
                const pinColor =
                  pt.type === 'destination'
                    ? '#10b981' // emerald
                    : pt.type === 'accommodation'
                    ? '#14b8a6' // teal
                    : '#f59e0b'; // amber

                return (
                  <g
                    key={pt.id}
                    onClick={() => setActivePointId(pt.id)}
                    className="cursor-pointer transition-transform duration-200"
                    transform={`translate(${pt.svgX}, ${pt.svgY})`}
                  >
                    {/* Pulsing ring for active pin */}
                    {isSelected && (
                      <circle
                        r="18"
                        fill="none"
                        stroke={pinColor}
                        strokeWidth="2"
                        className="animate-ping"
                        opacity="0.75"
                      />
                    )}

                    {/* Outer Pin Circle */}
                    <circle
                      r={isSelected ? '12' : '8'}
                      fill={isSelected ? '#ffffff' : pinColor}
                      stroke={pinColor}
                      strokeWidth={isSelected ? '3' : '2'}
                      filter="url(#glow)"
                    />

                    {/* Inner Center Dot */}
                    <circle
                      r={isSelected ? '5' : '3'}
                      fill={isSelected ? pinColor : '#ffffff'}
                    />

                    {/* Hover/Active label */}
                    {isSelected && (
                      <text
                        y="-18"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="11"
                        fontWeight="bold"
                        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
                      >
                        {pt.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Legend */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs text-stone-400 bg-stone-900/60 px-4 py-2 rounded-2xl border border-stone-800">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Heritage & Landmarks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
              <span>Luxury Stays</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Experiences & Safaris</span>
            </div>
          </div>
        </div>

        {/* Right Column: Active Card Preview & Hotspot List */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Highlight Card */}
          {activePoint && (
            <div className="bg-stone-950 rounded-3xl border border-emerald-500/40 p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-3">
                <Badge
                  variant="primary"
                  className={
                    activePoint.type === 'destination'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : activePoint.type === 'accommodation'
                      ? 'bg-teal-950 text-teal-300 border-teal-800'
                      : 'bg-amber-950 text-amber-300 border-amber-800'
                  }
                >
                  {activePoint.category}
                </Badge>
                <span className="text-xs text-stone-400 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {activePoint.region}
                </span>
              </div>

              {/* Photo Banner */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-4 bg-stone-900">
                <Image
                  src={activePoint.imageUrl}
                  alt={activePoint.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              <h2 className="text-xl font-black text-white tracking-tight">
                {activePoint.name}
              </h2>
              <p className="mt-1.5 text-xs text-stone-300 leading-relaxed">
                {activePoint.description}
              </p>

              <div className="mt-4 pt-4 border-t border-stone-800 flex items-center justify-between">
                <StarRating rating={activePoint.rating} reviewCount={activePoint.reviews} size="sm" />
                {activePoint.price !== undefined ? (
                  <PriceDisplay amountUSD={activePoint.price} per={activePoint.type === 'accommodation' ? 'night' : 'person'} size="sm" />
                ) : (
                  <span className="text-xs font-bold text-emerald-400">Public Landmark</span>
                )}
              </div>

              <Link href={getHref(activePoint)} className="block mt-5">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30">
                  <span>Explore Full Guide & Book</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}

          {/* Quick List Selector */}
          <div className="bg-stone-950 rounded-3xl border border-stone-800 p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>All Locations ({filteredPoints.length})</span>
              </h3>
            </div>

            <div className="max-h-[280px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {filteredPoints.map((pt) => {
                const isSelected = pt.id === activePointId;
                return (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setActivePointId(pt.id)}
                    className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-950/60 border border-emerald-500/50 text-white'
                        : 'bg-stone-900/50 hover:bg-stone-900 text-stone-300 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-stone-800">
                        <Image src={pt.imageUrl} alt={pt.name} fill sizes="40px" className="object-cover" />
                      </div>
                      <div className="truncate">
                        <h4 className="text-xs font-bold truncate text-white">{pt.name}</h4>
                        <span className="text-[11px] text-stone-400 block truncate">{pt.region}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-stone-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
