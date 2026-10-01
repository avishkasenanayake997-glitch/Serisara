'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SAMPLE_EXPERIENCES, ExperienceItem } from '../../../lib/data/sample-data';
import { ListingCard } from '../../../components/shared/listing-card';
import { Badge, Button } from '../../../components/ui';
import { Search, Sparkles, Clock, Compass, X, ShieldCheck, Award } from 'lucide-react';

const CATEGORIES = [
  { label: 'All Experiences', value: 'all' },
  { label: 'Whale & Marine Safaris', value: 'whale-watching' },
  { label: 'Tea & Plantation Journeys', value: 'tea-plantation' },
  { label: 'Wildlife & Tracking', value: 'wildlife' },
];

const DIFFICULTIES = [
  { label: 'All Levels', value: 'all' },
  { label: 'Gentle & Easy', value: 'easy' },
  { label: 'Moderate Adventure', value: 'moderate' },
  { label: 'Challenging', value: 'challenging' },
];

function ExperiencesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'duration'>('rating');

  const filteredExperiences = useMemo(() => {
    return SAMPLE_EXPERIENCES.filter((item: ExperienceItem) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.region.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || item.categorySlug === selectedCategory;

      const matchesDifficulty =
        selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.avgRating - a.avgRating;
      if (sortBy === 'price-asc') return a.pricePerPerson - b.pricePerPerson;
      if (sortBy === 'duration') return b.durationHours - a.durationHours;
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSortBy('rating');
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-24">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <Badge
            variant="accent"
            className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30 backdrop-blur-md px-3.5 py-1 text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Certified Sri Lankan Adventures
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Authentic Island Adventures & Cultural Encounters
          </h1>
          <p className="mt-4 text-stone-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Led by accredited naturalists, tea masters, and local conservationists. Small groups, verified safety, and unforgettable memories.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-stone-300">
            <div className="flex items-center gap-2 bg-stone-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-stone-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified Professional Guides</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-stone-700">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Flexible Daily Departures</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-stone-700">
              <Award className="w-4 h-4 text-teal-400" />
              <span>Safety & Equipment Guarantee</span>
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
                placeholder="Search whale expeditions, tea factory tours, safaris..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
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
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'price-asc' | 'duration')}
                className="bg-stone-50 border border-stone-200 text-stone-800 text-sm font-semibold rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all cursor-pointer"
              >
                <option value="rating">Top Rated Adventures</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="duration">Longest Duration</option>
              </select>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="mt-5 pt-5 border-t border-stone-100 flex flex-col md:flex-row md:items-center gap-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0">
              Activity:
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
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty Filter Chips */}
          <div className="mt-3 flex flex-col md:flex-row md:items-center gap-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0">
              Difficulty:
            </span>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map((diff) => {
                const isSelected = selectedDifficulty === diff.value;
                return (
                  <button
                    key={diff.value}
                    type="button"
                    onClick={() => setSelectedDifficulty(diff.value)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {diff.label}
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
              <span>Experiences & Guided Tours</span>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
                {filteredExperiences.length}
              </span>
            </h2>
          </div>

          {filteredExperiences.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperiences.map((exp) => (
                <ListingCard
                  key={exp.id}
                  id={exp.id}
                  type="experience"
                  title={exp.name}
                  slug={exp.slug}
                  imageUrl={exp.featuredImageUrl}
                  category={exp.category}
                  region={exp.region}
                  rating={exp.avgRating}
                  reviewCount={exp.reviewCount}
                  price={exp.pricePerPerson}
                  pricePer="person"
                  isFeatured={exp.isFeatured}
                  badge={`${exp.durationHours} Hours`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300 p-8">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">No experiences found</h3>
              <p className="text-stone-500 text-sm mt-1 max-w-md mx-auto">
                Try resetting your filters to explore more island adventures.
              </p>
              <Button
                variant="primary"
                onClick={resetFilters}
                className="mt-6 rounded-full px-6 bg-amber-600 hover:bg-amber-700"
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

export default function ExperiencesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" />
        </div>
      }
    >
      <ExperiencesContent />
    </Suspense>
  );
}
