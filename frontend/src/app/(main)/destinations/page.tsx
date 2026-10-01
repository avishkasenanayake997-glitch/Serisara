'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SAMPLE_DESTINATIONS, DestinationItem } from '../../../lib/data/sample-data';
import { ListingCard } from '../../../components/shared/listing-card';
import { Input, Button, Badge } from '../../../components/ui';
import { Search, MapPin, Sparkles, Filter, X, Landmark, Compass } from 'lucide-react';

const REGIONS = [
  { label: 'All Regions', value: 'all' },
  { label: 'Central Province', value: 'central-province' },
  { label: 'Southern Province', value: 'southern-province' },
  { label: 'Uva Province', value: 'uva-province' },
  { label: 'Western Province', value: 'western-province' },
];

const CATEGORIES = [
  { label: 'All Categories', value: 'all' },
  { label: 'UNESCO Heritage', value: 'heritage' },
  { label: 'Wildlife & Safari', value: 'wildlife' },
  { label: 'Highlands & Mountains', value: 'mountain' },
  { label: 'Beaches & Ocean', value: 'beach' },
  { label: 'Sacred Temples', value: 'temple' },
];

function DestinationsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialRegion = searchParams.get('region') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');

  const filteredDestinations = useMemo(() => {
    return SAMPLE_DESTINATIONS.filter((item: DestinationItem) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRegion =
        selectedRegion === 'all' || item.regionSlug === selectedRegion;

      const matchesCategory =
        selectedCategory === 'all' || item.categorySlug === selectedCategory;

      return matchesSearch && matchesRegion && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.avgRating - a.avgRating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [searchQuery, selectedRegion, selectedCategory, sortBy]);

  const activeFiltersCount =
    (selectedRegion !== 'all' ? 1 : 0) +
    (selectedCategory !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedCategory('all');
    setSortBy('rating');
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-24">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <Badge
            variant="accent"
            className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30 backdrop-blur-md px-3.5 py-1 text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            Discover Sri Lanka
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Timeless Wonders of the Wonder of Asia
          </h1>
          <p className="mt-4 text-stone-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            From 2,500-year-old rock fortresses and misty highland tea valleys to untamed leopard sanctuaries and turquoise ocean bays.
          </p>

          {/* Quick Stats Pill */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-stone-300">
            <div className="flex items-center gap-2 bg-stone-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-stone-700">
              <Landmark className="w-4 h-4 text-emerald-400" />
              <span><strong className="text-white">8</strong> UNESCO World Heritage Sites</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-stone-700">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span><strong className="text-white">26</strong> National Parks</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-stone-700">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span><strong className="text-white">1,340 km</strong> Golden Coastline</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Search & Filter Controls Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-stone-200/80">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ancient cities, national parks, beaches..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider whitespace-nowrap">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'reviews' | 'name')}
                className="bg-stone-50 border border-stone-200 text-stone-800 text-sm font-semibold rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
              >
                <option value="rating">Top Rated (4.9+)</option>
                <option value="reviews">Most Reviewed</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="mt-5 pt-5 border-t border-stone-100 flex flex-col md:flex-row md:items-center gap-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0">
              Categories:
            </span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Region Filter Chips */}
          <div className="mt-3 flex flex-col md:flex-row md:items-center gap-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0">
              Regions:
            </span>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((reg) => {
                const isSelected = selectedRegion === reg.value;
                return (
                  <button
                    key={reg.value}
                    type="button"
                    onClick={() => setSelectedRegion(reg.value)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-teal-700 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {reg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filter Clear Bar */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>
                Found <strong className="text-emerald-700">{filteredDestinations.length}</strong> matching destinations
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Results Grid */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-stone-900 tracking-tight flex items-center gap-2">
              <span>Destinations</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                {filteredDestinations.length}
              </span>
            </h2>
          </div>

          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((dest) => (
                <ListingCard
                  key={dest.id}
                  id={dest.id}
                  type="destination"
                  title={dest.name}
                  slug={dest.slug}
                  imageUrl={dest.featuredImageUrl}
                  category={dest.category}
                  region={dest.region}
                  rating={dest.avgRating}
                  reviewCount={dest.reviewCount}
                  isFeatured={dest.isFeatured}
                  badge={dest.tags[0]}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300 p-8">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">No destinations match your filters</h3>
              <p className="text-stone-500 text-sm mt-1 max-w-md mx-auto">
                Try searching for something else or reset your region and category filters to discover more wonders.
              </p>
              <Button
                variant="primary"
                onClick={resetFilters}
                className="mt-6 rounded-full px-6 bg-emerald-600 hover:bg-emerald-700"
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
        </div>
      }
    >
      <DestinationsContent />
    </Suspense>
  );
}
