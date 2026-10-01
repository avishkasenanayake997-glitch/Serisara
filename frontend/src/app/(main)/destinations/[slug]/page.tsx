'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SAMPLE_DESTINATIONS, SAMPLE_ACCOMMODATIONS, SAMPLE_EXPERIENCES, DestinationItem } from '../../../../lib/data/sample-data';
import { StarRating } from '../../../../components/shared/star-rating';
import { ReviewCard } from '../../../../components/shared/review-card';
import { ListingCard } from '../../../../components/shared/listing-card';
import { Badge, Button } from '../../../../components/ui';
import {
  MapPin,
  Clock,
  Ticket,
  Calendar,
  Compass,
  Heart,
  Share2,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Sparkles,
  Send,
  Building2,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DestinationDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const destination: DestinationItem | undefined = SAMPLE_DESTINATIONS.find(
    (item) => item.slug === slug
  );

  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [userReviews, setUserReviews] = useState<Array<{ id: string; authorName: string; rating: number; title: string; content: string; date: string; isVerified: boolean }>>([
    {
      id: 'rev-01',
      authorName: 'Eleanor Vance',
      rating: 5,
      title: 'An unforgettable dawn hike with breathtaking panoramic views',
      content:
        'Climbing to the summit before the tropical sun reached midday peak was the highlight of our 2-week journey across Sri Lanka. The ancient frescoes are still remarkably vibrant!',
      date: 'Visited March 2026',
      isVerified: true,
    },
    {
      id: 'rev-02',
      authorName: 'David & Maya',
      rating: 5,
      title: 'Rich historical marvel and magnificent royal engineering',
      content:
        'The water gardens at the base and the sheer sheer scale of the rock citadel are mind-blowing. Ensure you bring plenty of water and wear good grip shoes.',
      date: 'Visited February 2026',
      isVerified: true,
    },
  ]);

  if (!destination) {
    return (
      <div className="min-h-screen bg-stone-50 py-24 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        <Compass className="w-16 h-16 text-emerald-600 mb-4 animate-spin" />
        <h1 className="text-3xl font-black text-stone-900">Destination Not Found</h1>
        <p className="mt-2 text-stone-500 max-w-md">
          We couldn&apos;t find the destination you were searching for. It may have moved or been updated.
        </p>
        <Link href="/destinations" className="mt-6">
          <Button variant="primary" className="rounded-full px-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Destinations
          </Button>
        </Link>
      </div>
    );
  }

  const gallery = [destination.featuredImageUrl, ...(destination.galleryImages || [])];

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setUserReviews([
      {
        id: `rev-${Date.now()}`,
        authorName: 'You (Verified Traveler)',
        rating: reviewRating,
        title: 'Visitor Review',
        content: reviewText.trim(),
        date: 'Just now',
        isVerified: true,
      },
      ...userReviews,
    ]);
    setReviewText('');
  };

  // Recommendations: stays and experiences nearby
  const nearbyStays = SAMPLE_ACCOMMODATIONS.slice(0, 2);
  const nearbyExperiences = SAMPLE_EXPERIENCES.slice(0, 2);

  return (
    <div className="bg-stone-50 min-h-screen pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs font-semibold text-stone-500">
          <div className="flex items-center gap-2 truncate">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/destinations" className="hover:text-emerald-700 transition-colors">
              Destinations
            </Link>
            <span>/</span>
            <span className="text-stone-900 truncate">{destination.name}</span>
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
              <Badge variant="primary" className="bg-emerald-100 text-emerald-800 border-emerald-200 font-bold text-xs">
                {destination.category}
              </Badge>
              {destination.isFeatured && (
                <Badge variant="accent" className="bg-amber-500 text-white border-transparent font-bold text-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Featured Landmark
                </Badge>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              {destination.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-stone-600">
              <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{destination.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={destination.avgRating} reviewCount={destination.reviewCount} size="md" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/trips">
              <Button variant="primary" className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-5 shadow-lg shadow-emerald-900/10">
                <Calendar className="w-4 h-4 mr-2" />
                Add to My Trip Plan
              </Button>
            </Link>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 rounded-3xl overflow-hidden shadow-xl mb-10">
          <div className="relative aspect-[16/10] lg:col-span-3 w-full bg-stone-200 overflow-hidden">
            <Image
              src={gallery[activeGalleryIndex] || destination.featuredImageUrl}
              alt={destination.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 75vw"
              className="object-cover transition-all duration-300"
            />
          </div>
          <div className="hidden lg:flex flex-col gap-3">
            {gallery.slice(0, 3).map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveGalleryIndex(idx)}
                className={`relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 transition-all ${
                  activeGalleryIndex === idx
                    ? 'border-emerald-600 ring-2 ring-emerald-500/40'
                    : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <Image src={img} alt={`${destination.name} photo ${idx + 1}`} fill sizes="25vw" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* At A Glance Fact Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Best Season</span>
              <p className="text-sm font-bold text-stone-900 mt-0.5">{destination.bestTimeToVisit}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Entry Pass</span>
              <p className="text-sm font-bold text-stone-900 mt-0.5">{destination.entryFee}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Hours</span>
              <p className="text-sm font-bold text-stone-900 mt-0.5">{destination.openingHours}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Coordinates</span>
              <p className="text-sm font-bold text-stone-900 mt-0.5">
                {destination.latitude.toFixed(4)}° N, {destination.longitude.toFixed(4)}° E
              </p>
            </div>
          </div>
        </div>

        {/* Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview Section */}
            <section className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm">
              <h2 className="text-2xl font-black text-stone-900 tracking-tight mb-4">
                About {destination.name}
              </h2>
              <p className="text-stone-600 leading-relaxed text-base whitespace-pre-line">
                {destination.description}
              </p>

              {/* Tags */}
              <div className="mt-6 pt-6 border-t border-stone-100 flex flex-wrap gap-2">
                {destination.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Practical Guidelines */}
            <section className="bg-emerald-50/60 rounded-3xl p-8 border border-emerald-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-black text-emerald-950">Essential Visitor Guidelines</h3>
              </div>
              <p className="text-emerald-900/80 text-sm leading-relaxed mb-4">
                {destination.practicalInfo}
              </p>
              <div className="space-y-2 text-xs font-medium text-emerald-900">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Licensed government guides available at the main ticket office.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Strictly zero single-use plastic policy observed on site.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Drone flight requires prior Civil Aviation Authority approval.</span>
                </div>
              </div>
            </section>

            {/* Traveler Reviews Section */}
            <section className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black text-stone-900">Traveler Reviews</h3>
                  <p className="text-xs text-stone-500 mt-1">Verified community experiences & tips</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black text-stone-900">{destination.avgRating}</span>
                  <div className="text-xs text-stone-400">
                    <div>/ 5.0</div>
                    <div>{userReviews.length} reviews</div>
                  </div>
                </div>
              </div>

              {/* Add Review Form */}
              <form onSubmit={handleAddReview} className="mb-8 p-5 rounded-2xl bg-stone-50 border border-stone-200">
                <h4 className="text-sm font-bold text-stone-800 mb-3">Share Your Experience</h4>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-stone-600">Your Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className={`text-lg transition-transform hover:scale-110 ${
                          star <= reviewRating ? 'text-amber-400' : 'text-stone-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share practical tips, favorite spots, and memorable moments..."
                  rows={3}
                  className="w-full p-3 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <div className="mt-3 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-5"
                  >
                    <Send className="w-3.5 h-3.5 mr-1.5" />
                    Submit Review
                  </Button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-4">
                {userReviews.map((rev) => (
                  <ReviewCard
                    key={rev.id}
                    id={rev.id}
                    authorName={rev.authorName}
                    rating={rev.rating}
                    title={rev.title}
                    content={rev.content}
                    date={rev.date}
                    isVerified={rev.isVerified}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Quick Trip Planner Action Card */}
            <div className="bg-gradient-to-br from-emerald-900 to-teal-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
              <Badge variant="accent" className="bg-amber-400 text-stone-900 font-bold text-[10px] mb-3">
                INTELLIGENT PLANNER
              </Badge>
              <h3 className="text-xl font-bold text-white leading-snug">
                Include in your custom Sri Lanka itinerary
              </h3>
              <p className="text-emerald-100 text-xs mt-2 leading-relaxed">
                Add {destination.name} to your multi-day trip planner with automated travel route calculations and vehicle options.
              </p>
              <Link href="/trips" className="block mt-6">
                <Button className="w-full bg-white hover:bg-stone-100 text-emerald-900 font-bold rounded-2xl py-3 text-sm">
                  Add to Trip Planner
                </Button>
              </Link>
            </div>

            {/* Tourist Police 24/7 Helpline */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Sri Lanka Tourist Police</h4>
                  <p className="text-xs text-stone-500">24/7 National Emergency Hotline</p>
                </div>
              </div>
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3 text-center">
                <span className="text-xs text-amber-800 font-semibold block">Dial Official Helpline</span>
                <span className="text-2xl font-black text-amber-900 tracking-wider">1912</span>
              </div>
            </div>

            {/* Recommended Stays Nearby */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>Stays In This Region</span>
                </h4>
                <Link href="/accommodations" className="text-xs text-emerald-700 font-bold hover:underline">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {nearbyStays.map((stay) => (
                  <ListingCard
                    key={stay.id}
                    id={stay.id}
                    type="accommodation"
                    title={stay.name}
                    slug={stay.slug}
                    imageUrl={stay.featuredImageUrl}
                    category={stay.type}
                    region={stay.region}
                    rating={stay.avgRating}
                    reviewCount={stay.reviewCount}
                    price={stay.priceMin}
                    pricePer="night"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
