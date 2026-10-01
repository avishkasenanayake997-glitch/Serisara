'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SAMPLE_DESTINATIONS, SAMPLE_ACCOMMODATIONS, SAMPLE_EXPERIENCES } from '../../../lib/data/sample-data';
import { ListingCard } from '../../../components/shared/listing-card';
import { Badge, Button } from '../../../components/ui';
import { Search, X, Compass, Building2, Sparkles, Filter } from 'lucide-react';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'destinations' | 'accommodations' | 'experiences'>('all');

  const matchingDestinations = useMemo(() => {
    if (!query.trim()) return SAMPLE_DESTINATIONS;
    return SAMPLE_DESTINATIONS.filter(
      (d) =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
        d.region.toLowerCase().includes(query.toLowerCase()) ||
        d.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  const matchingAccommodations = useMemo(() => {
    if (!query.trim()) return SAMPLE_ACCOMMODATIONS;
    return SAMPLE_ACCOMMODATIONS.filter(
      (a) =>
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
        a.region.toLowerCase().includes(query.toLowerCase()) ||
        a.amenities.some((am) => am.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  const matchingExperiences = useMemo(() => {
    if (!query.trim()) return SAMPLE_EXPERIENCES;
    return SAMPLE_EXPERIENCES.filter(
      (e) =>
        e.name.toLowerCase().includes(query.toLowerCase()) ||
        e.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
        e.region.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const totalResults =
    matchingDestinations.length + matchingAccommodations.length + matchingExperiences.length;

  return (
    <div className="bg-stone-50 min-h-screen pb-24">
      {/* Search Header Banner */}
      <section className="bg-white border-b border-stone-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-black text-stone-900 tracking-tight mb-4">
            Search Serisara
          </h1>

          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keyword, ancient landmark, hotel, tea plantation, safari..."
              className="w-full pl-14 pr-12 py-4 rounded-3xl bg-stone-100/80 border border-stone-300/80 text-base text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-inner"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All Results ({totalResults})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('destinations')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'destinations'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Destinations ({matchingDestinations.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('accommodations')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'accommodations'
                  ? 'bg-teal-700 text-white shadow-md'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Stays ({matchingAccommodations.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('experiences')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'experiences'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Adventures ({matchingExperiences.length})
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Destinations Group */}
        {(activeTab === 'all' || activeTab === 'destinations') && matchingDestinations.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-black text-stone-900 tracking-tight mb-6 flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" />
              <span>Destinations ({matchingDestinations.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingDestinations.map((d) => (
                <ListingCard
                  key={d.id}
                  id={d.id}
                  type="destination"
                  title={d.name}
                  slug={d.slug}
                  imageUrl={d.featuredImageUrl}
                  category={d.category}
                  region={d.region}
                  rating={d.avgRating}
                  reviewCount={d.reviewCount}
                />
              ))}
            </div>
          </div>
        )}

        {/* Accommodations Group */}
        {(activeTab === 'all' || activeTab === 'accommodations') && matchingAccommodations.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-black text-stone-900 tracking-tight mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-teal-600" />
              <span>Accommodations ({matchingAccommodations.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingAccommodations.map((a) => (
                <ListingCard
                  key={a.id}
                  id={a.id}
                  type="accommodation"
                  title={a.name}
                  slug={a.slug}
                  imageUrl={a.featuredImageUrl}
                  category={a.type.toUpperCase()}
                  region={a.region}
                  rating={a.avgRating}
                  reviewCount={a.reviewCount}
                  price={a.priceMin}
                  pricePer="night"
                />
              ))}
            </div>
          </div>
        )}

        {/* Experiences Group */}
        {(activeTab === 'all' || activeTab === 'experiences') && matchingExperiences.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-black text-stone-900 tracking-tight mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Experiences ({matchingExperiences.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingExperiences.map((e) => (
                <ListingCard
                  key={e.id}
                  id={e.id}
                  type="experience"
                  title={e.name}
                  slug={e.slug}
                  imageUrl={e.featuredImageUrl}
                  category={e.category}
                  region={e.region}
                  rating={e.avgRating}
                  reviewCount={e.reviewCount}
                  price={e.pricePerPerson}
                  pricePer="person"
                  badge={`${e.durationHours} Hours`}
                />
              ))}
            </div>
          </div>
        )}

        {totalResults === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 max-w-lg mx-auto">
            <Search className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-900">No matching results</h3>
            <p className="text-xs text-stone-500 mt-1">
              We couldn&apos;t find any destinations, stays, or experiences matching &quot;{query}&quot;. Try broader terms.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600" />
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
