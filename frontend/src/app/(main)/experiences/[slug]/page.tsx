'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SAMPLE_EXPERIENCES, ExperienceItem } from '../../../../lib/data/sample-data';
import { StarRating } from '../../../../components/shared/star-rating';
import { PriceDisplay } from '../../../../components/shared/price-display';
import { Badge, Button } from '../../../../components/ui';
import {
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  Heart,
  Share2,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Check,
  PackageCheck,
  Briefcase,
  Compass,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ExperienceDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const experience: ExperienceItem | undefined = SAMPLE_EXPERIENCES.find(
    (item) => item.slug === slug
  );

  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [participants, setParticipants] = useState(2);
  const [selectedDate, setSelectedDate] = useState('2026-10-15');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!experience) {
    return (
      <div className="min-h-screen bg-stone-50 py-24 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        <Sparkles className="w-16 h-16 text-amber-600 mb-4 animate-spin" />
        <h1 className="text-3xl font-black text-stone-900">Experience Not Found</h1>
        <p className="mt-2 text-stone-500 max-w-md">
          The experience you are looking for is currently not available.
        </p>
        <Link href="/experiences" className="mt-6">
          <Button variant="primary" className="rounded-full px-6 bg-amber-600 hover:bg-amber-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experiences
          </Button>
        </Link>
      </div>
    );
  }

  const gallery = [experience.featuredImageUrl, ...(experience.galleryImages || [])];
  const totalPriceUSD = experience.pricePerPerson * participants;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs font-semibold text-stone-500">
          <div className="flex items-center gap-2 truncate">
            <Link href="/" className="hover:text-amber-700 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/experiences" className="hover:text-amber-700 transition-colors">
              Experiences
            </Link>
            <span>/</span>
            <span className="text-stone-900 truncate">{experience.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-all"
            >
              <Share2 className="w-3.5 h-3.5 text-stone-500" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                isSaved
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-stone-200 hover:bg-stone-50 text-stone-700'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-stone-500'}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="primary" className="bg-amber-100 text-amber-800 border-amber-200 font-bold text-xs uppercase">
                {experience.category}
              </Badge>
              <Badge variant="secondary" className="bg-stone-900 text-white font-bold text-xs">
                {experience.difficulty.toUpperCase()} LEVEL
              </Badge>
              <Badge variant="accent" className="bg-emerald-600 text-white font-bold text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {experience.durationHours} Hours Duration
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              {experience.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-stone-600">
              <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{experience.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={experience.avgRating} reviewCount={experience.reviewCount} size="md" />
              </div>
            </div>
          </div>

          <div className="flex items-baseline gap-2 bg-white px-5 py-3 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-xs text-stone-500 font-semibold">Per Person</span>
            <PriceDisplay amountUSD={experience.pricePerPerson} per="person" size="lg" />
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 rounded-3xl overflow-hidden shadow-xl mb-10">
          <div className="relative aspect-[16/10] lg:col-span-3 w-full bg-stone-200 overflow-hidden">
            <Image
              src={gallery[activeGalleryIndex] || experience.featuredImageUrl}
              alt={experience.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 75vw"
              className="object-cover transition-all duration-300"
            />
          </div>
          <div className="hidden lg:flex flex-col gap-3">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveGalleryIndex(idx)}
                className={`relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 transition-all ${
                  activeGalleryIndex === idx
                    ? 'border-amber-600 ring-2 ring-amber-500/40'
                    : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <Image src={img} alt={`${experience.name} photo ${idx + 1}`} fill sizes="25vw" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content & Booking Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <section className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm">
              <h2 className="text-2xl font-black text-stone-900 tracking-tight mb-4">
                About this Experience
              </h2>
              <p className="text-stone-600 leading-relaxed text-base whitespace-pre-line">
                {experience.description}
              </p>
            </section>

            {/* Inclusions & What to Bring */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <section className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <PackageCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-bold text-stone-900">What&apos;s Included</h3>
                </div>
                <ul className="space-y-2.5">
                  {experience.includedItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* What to Bring */}
              <section className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-bold text-stone-900">What to Bring</h3>
                </div>
                <ul className="space-y-2.5">
                  {experience.whatToBring.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Schedule & Meeting Point */}
            <section className="bg-amber-50/60 rounded-3xl p-8 border border-amber-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-black text-amber-950">Departure & Itinerary</h3>
              </div>
              <p className="text-amber-900/80 text-sm leading-relaxed mb-4">
                <strong>Schedule:</strong> {experience.schedule}
              </p>
              <div className="space-y-2 text-xs font-medium text-amber-900">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  <span>Please arrive at the meeting point 15 minutes prior to departure.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  <span>Complimentary pickup available within 5km radius upon request.</span>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Booking Widget Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-28 bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xl space-y-6">
              <div className="flex items-baseline justify-between border-b border-stone-100 pb-4">
                <div>
                  <span className="text-xs text-stone-400 font-medium block">Price per guest</span>
                  <PriceDisplay amountUSD={experience.pricePerPerson} per="person" size="md" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-700">★ 4.8 Top Rated</span>
                </div>
              </div>

              {/* Date & Participants Controls */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1.5">
                    Activity Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1.5">
                    Participants
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setParticipants(Math.max(experience.minParticipants, participants - 1))}
                      className="w-9 h-9 rounded-xl border border-stone-300 flex items-center justify-center text-stone-700 font-bold hover:bg-stone-50"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-black text-stone-900">{participants} Guests</span>
                    <button
                      type="button"
                      onClick={() => setParticipants(participants + 1)}
                      className="w-9 h-9 rounded-xl border border-stone-300 flex items-center justify-center text-stone-700 font-bold hover:bg-stone-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>${experience.pricePerPerson} × {participants} guests</span>
                  <span className="font-semibold">${totalPriceUSD}</span>
                </div>
                <div className="flex justify-between">
                  <span>Permits, insurance & equipment</span>
                  <span className="text-emerald-700 font-semibold">Included</span>
                </div>
                <div className="pt-3 border-t border-stone-200 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-stone-900">Total Price</span>
                  <PriceDisplay amountUSD={totalPriceUSD} size="lg" />
                </div>
              </div>

              {/* Action Button */}
              {bookingConfirmed ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-sm font-bold text-emerald-900">Experience Booked!</p>
                  <p className="text-xs text-emerald-700">
                    Your digital ticket and meeting point voucher have been sent.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBookingConfirmed(false)}
                    className="mt-2 text-xs rounded-full"
                  >
                    Modify
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setBookingConfirmed(true)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-amber-900/10 text-sm"
                >
                  Book Experience Now
                </Button>
              )}

              <p className="text-[11px] text-stone-400 text-center">
                🔒 Free cancellation up to 24 hours prior to departure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
