'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SAMPLE_ACCOMMODATIONS, AccommodationItem } from '../../../../lib/data/sample-data';
import { StarRating } from '../../../../components/shared/star-rating';
import { PriceDisplay } from '../../../../components/shared/price-display';
import { Badge, Button } from '../../../../components/ui';
import {
  MapPin,
  Building2,
  Wifi,
  Waves,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  Heart,
  Share2,
  ArrowLeft,
  Coffee,
  Car,
  Utensils,
  Check,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function AccommodationDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const accommodation: AccommodationItem | undefined = SAMPLE_ACCOMMODATIONS.find(
    (item) => item.slug === slug
  );

  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [nights, setNights] = useState(3);
  const [guestsCount, setGuestsCount] = useState(2);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!accommodation) {
    return (
      <div className="min-h-screen bg-stone-50 py-24 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        <Building2 className="w-16 h-16 text-teal-600 mb-4 animate-bounce" />
        <h1 className="text-3xl font-black text-stone-900">Accommodation Not Found</h1>
        <p className="mt-2 text-stone-500 max-w-md">
          The property you are looking for is not listed or has been modified.
        </p>
        <Link href="/accommodations" className="mt-6">
          <Button variant="primary" className="rounded-full px-6 bg-teal-600 hover:bg-teal-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Accommodations
          </Button>
        </Link>
      </div>
    );
  }

  const gallery = [accommodation.featuredImageUrl, ...(accommodation.galleryImages || [])];
  const selectedRoom = accommodation.roomTypes[selectedRoomIndex] || accommodation.roomTypes[0];
  const totalCostUSD = (selectedRoom ? selectedRoom.pricePerNight : accommodation.priceMin) * nights;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleBooking = () => {
    setBookingConfirmed(true);
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs font-semibold text-stone-500">
          <div className="flex items-center gap-2 truncate">
            <Link href="/" className="hover:text-teal-700 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/accommodations" className="hover:text-teal-700 transition-colors">
              Accommodations
            </Link>
            <span>/</span>
            <span className="text-stone-900 truncate">{accommodation.name}</span>
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
              <Badge variant="primary" className="bg-teal-100 text-teal-800 border-teal-200 font-bold text-xs uppercase">
                {accommodation.type}
              </Badge>
              <span className="text-amber-500 text-xs font-bold flex items-center">
                {'★'.repeat(accommodation.starRating)} {accommodation.starRating}-Star Luxury
              </span>
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                SLTDA Verified
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              {accommodation.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-stone-600">
              <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{accommodation.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={accommodation.avgRating} reviewCount={accommodation.reviewCount} size="md" />
              </div>
            </div>
          </div>

          <div className="flex items-baseline gap-2 bg-white px-5 py-3 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-xs text-stone-500 font-semibold">From</span>
            <PriceDisplay amountUSD={accommodation.priceMin} per="night" size="lg" />
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 rounded-3xl overflow-hidden shadow-xl mb-10">
          <div className="relative aspect-[16/10] lg:col-span-3 w-full bg-stone-200 overflow-hidden">
            <Image
              src={gallery[activeGalleryIndex] || accommodation.featuredImageUrl}
              alt={accommodation.name}
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
                    ? 'border-teal-600 ring-2 ring-teal-500/40'
                    : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <Image src={img} alt={`${accommodation.name} photo ${idx + 1}`} fill sizes="25vw" className="object-cover" />
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
                About this Property
              </h2>
              <p className="text-stone-600 leading-relaxed text-base whitespace-pre-line">
                {accommodation.description}
              </p>
            </section>

            {/* Amenities Grid */}
            <section className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm">
              <h3 className="text-xl font-black text-stone-900 tracking-tight mb-6">
                Featured Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {accommodation.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70"
                  >
                    <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-stone-800">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Room Types Showcase */}
            <section className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm">
              <h3 className="text-xl font-black text-stone-900 tracking-tight mb-2">
                Available Room Suites & Chalets
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Select your preferred room to calculate exact reservation rates.
              </p>

              <div className="space-y-4">
                {accommodation.roomTypes.map((room, idx) => {
                  const isSelected = selectedRoomIndex === idx;
                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoomIndex(idx)}
                      className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/30 shadow-md'
                          : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                      }`}
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-stone-900">{room.name}</h4>
                          {isSelected && (
                            <span className="bg-teal-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Check className="w-3 h-3" /> Selected
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed max-w-lg">
                          {room.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-stone-500 pt-1">
                          <span className="flex items-center gap-1 font-semibold text-stone-700">
                            <Users className="w-3.5 h-3.5 text-teal-600" /> Up to {room.maxGuests} Guests
                          </span>
                          <span className="text-emerald-700 font-semibold">
                            ✓ Free breakfast included
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <PriceDisplay amountUSD={room.pricePerNight} per="night" size="md" />
                        <button
                          type="button"
                          className={`mt-2 text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                            isSelected
                              ? 'bg-teal-700 text-white'
                              : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          {isSelected ? 'Room Selected' : 'Choose Room'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Policies Section */}
            <section className="bg-stone-100/70 rounded-3xl p-6 border border-stone-200">
              <h4 className="text-sm font-bold text-stone-900 mb-3">Hotel & Check-in Policies</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
                <div>
                  <strong className="block text-stone-800">Check-in:</strong> 2:00 PM – 10:00 PM
                </div>
                <div>
                  <strong className="block text-stone-800">Check-out:</strong> By 11:00 AM
                </div>
                <div>
                  <strong className="block text-stone-800">Cancellation:</strong> Free up to 48h before check-in
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Booking Widget Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-28 bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xl space-y-6">
              <div className="flex items-baseline justify-between border-b border-stone-100 pb-4">
                <div>
                  <span className="text-xs text-stone-400 font-medium block">Room rate</span>
                  <PriceDisplay amountUSD={selectedRoom.pricePerNight} per="night" size="md" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700">★ 4.9 Superhost</span>
                </div>
              </div>

              {/* Nights & Guests Controls */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1.5">
                    Stay Duration (Nights)
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setNights(Math.max(1, nights - 1))}
                      className="w-9 h-9 rounded-xl border border-stone-300 flex items-center justify-center text-stone-700 font-bold hover:bg-stone-50"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-black text-stone-900">{nights} Nights</span>
                    <button
                      type="button"
                      onClick={() => setNights(nights + 1)}
                      className="w-9 h-9 rounded-xl border border-stone-300 flex items-center justify-center text-stone-700 font-bold hover:bg-stone-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1.5">
                    Number of Guests
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                      className="w-9 h-9 rounded-xl border border-stone-300 flex items-center justify-center text-stone-700 font-bold hover:bg-stone-50"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-black text-stone-900">{guestsCount} Guests</span>
                    <button
                      type="button"
                      onClick={() => setGuestsCount(Math.min(selectedRoom.maxGuests, guestsCount + 1))}
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
                  <span>${selectedRoom.pricePerNight} × {nights} nights</span>
                  <span className="font-semibold">${selectedRoom.pricePerNight * nights}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tourism service charge & tax</span>
                  <span className="text-emerald-700 font-semibold">Included</span>
                </div>
                <div className="pt-3 border-t border-stone-200 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-stone-900">Total Price</span>
                  <PriceDisplay amountUSD={totalCostUSD} size="lg" />
                </div>
              </div>

              {/* Action Button */}
              {bookingConfirmed ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-sm font-bold text-emerald-900">Reservation Request Received!</p>
                  <p className="text-xs text-emerald-700">
                    A confirmation email and WhatsApp voucher have been dispatched.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBookingConfirmed(false)}
                    className="mt-2 text-xs rounded-full"
                  >
                    Modify Booking
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleBooking}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-teal-900/10 text-sm"
                >
                  Confirm & Reserve Room
                </Button>
              )}

              <p className="text-[11px] text-stone-400 text-center">
                🔒 You won&apos;t be charged yet. Instant confirmation upon verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
