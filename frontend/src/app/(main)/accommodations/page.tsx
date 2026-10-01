'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SAMPLE_ACCOMMODATIONS, AccommodationItem } from '../../../lib/data/sample-data';
import { ListingCard } from '../../../components/shared/listing-card';
import { Badge, Button } from '../../../components/ui';
import { Search, Building2, ShieldCheck, Sparkles, Filter, X, CheckCircle2, Waves, Trees } from 'lucide-react';

const ACCOMMODATION_TYPES = [
  { label: 'All Stays', value: 'all' },
  { label: 'Boutique Hotels', value: 'hotel' },
  { label: 'Tea & Eco Resorts', value: 'resort' },
  { label: 'Private Beach Villas', value: 'villa' },
  { label: 'Heritage Homestays', value: 'homestay' },
];

const REGIONS = [
  { label: 'All Regions', value: 'all' },
  { label: 'Southern Coast', value: 'southern-province' },
  { label: 'Central Highlands', value: 'central-province' },
  { label: 'Ella & Uva Valley', value: 'uva-province' },
];

function AccommodationsContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'all';
  const initialRegion = searchParams.get('region') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc'>('rating');

  const filteredAccommodations = useMemo(() => {
    return SAMPLE_ACCOMMODATIONS.filter((item: AccommodationItem) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.amenities.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType =
        selectedType === 'all' || item.type === selectedType;

      const matchesRegion =
        selectedRegion === 'all' || item.regionSlug === selectedRegion;

      return matchesSearch && matchesType && matchesRegion;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.avgRating - a.avgRating;
      if (sortBy === 'price-asc') return a.priceMin - b.priceMin;
      if (sortBy === 'price-desc') return b.priceMin - a.priceMin;
      return 0;
    });
  }, [searchQuery, selectedType, selectedRegion, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedRegion('all');
    setSortBy('rating');
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-24">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <Badge
            variant="accent"
            className="mb-4 bg-teal-500/20 text-teal-300 border-teal-500/30 backdrop-blur-md px-3.5 py-1 text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5" />
            Curated Sri Lankan Hospitality
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Handpicked Luxury Stays & Eco Retreats
          </h1>
          <p className="mt-4 text-stone-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            From oceanfront colonial boutique hotels and hillside tea chalets to private beachfront villas with personal chefs.
          </p>

          {/* Guarantees Row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-stone-300">
            <div className="flex items-center gap-2 bg-stone-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-stone-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SLTDA Certified Properties</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-stone-700">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Dual USD & LKR Live Rates</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-stone-700">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Best Rate Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Filters Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-stone-200/80">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by hotel name, villa, amenities (e.g. pool, spa, ocean view)..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
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
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'price-asc' | 'price-desc')}
                className="bg-stone-50 border border-stone-200 text-stone-800 text-sm font-semibold rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
              >
                <option value="rating">Top Rated Stays</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Type Filter Chips */}
          <div className="mt-5 pt-5 border-t border-stone-100 flex flex-col md:flex-row md:items-center gap-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0">
              Stay Type:
            </span>
            <div className="flex flex-wrap gap-2">
              {ACCOMMODATION_TYPES.map((type) => {
                const isSelected = selectedType === type.value;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setSelectedType(type.value)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-teal-700 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Region Filter Chips */}
          <div className="mt-3 flex flex-col md:flex-row md:items-center gap-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0">
              Region:
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
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {reg.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-stone-900 tracking-tight flex items-center gap-2">
              <span>Accommodations</span>
              <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full">
                {filteredAccommodations.length}
              </span>
            </h2>
          </div>

          {filteredAccommodations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccommodations.map((stay) => (
                <ListingCard
                  key={stay.id}
                  id={stay.id}
                  type="accommodation"
                  title={stay.name}
                  slug={stay.slug}
                  imageUrl={stay.featuredImageUrl}
                  category={stay.type.toUpperCase()}
                  region={stay.region}
                  rating={stay.avgRating}
                  reviewCount={stay.reviewCount}
                  price={stay.priceMin}
                  pricePer="night"
                  isFeatured={stay.isFeatured}
                  badge={`${stay.starRating}★ Luxury`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300 p-8">
              <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">No accommodations found</h3>
              <p className="text-stone-500 text-sm mt-1 max-w-md mx-auto">
                Try loosening your filters or resetting your stay type selection.
              </p>
              <Button
                variant="primary"
                onClick={resetFilters}
                className="mt-6 rounded-full px-6 bg-teal-600 hover:bg-teal-700"
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

export default function AccommodationsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
        </div>
      }
    >
      <AccommodationsContent />
    </Suspense>
  );
}
