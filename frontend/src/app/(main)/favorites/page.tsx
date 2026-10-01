'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SAMPLE_DESTINATIONS, SAMPLE_ACCOMMODATIONS, SAMPLE_EXPERIENCES } from '../../../lib/data/sample-data';
import { ListingCard } from '../../../components/shared/listing-card';
import { Button } from '../../../components/ui';
import { Heart, Compass, ArrowRight } from 'lucide-react';

export default function FavoritesPage() {
  const [favoriteDestinations, setFavoriteDestinations] = useState(SAMPLE_DESTINATIONS.slice(0, 2));
  const [favoriteStays, setFavoriteStays] = useState(SAMPLE_ACCOMMODATIONS.slice(0, 1));
  const [favoriteExperiences, setFavoriteExperiences] = useState(SAMPLE_EXPERIENCES.slice(0, 1));

  const totalFavorites = favoriteDestinations.length + favoriteStays.length + favoriteExperiences.length;

  return (
    <div className="bg-stone-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight flex items-center gap-3">
            <span>Saved Favorites</span>
            <span className="text-xs bg-rose-100 text-rose-700 font-bold px-2.5 py-0.5 rounded-full">
              {totalFavorites}
            </span>
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Your curated wishlist of ancient landmarks, luxury hideaways, and island safaris.
          </p>
        </div>

        {totalFavorites > 0 ? (
          <div className="space-y-10">
            {/* Destinations */}
            {favoriteDestinations.length > 0 && (
              <div>
                <h2 className="text-base font-bold text-stone-900 mb-4">Saved Destinations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteDestinations.map((d) => (
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

            {/* Stays */}
            {favoriteStays.length > 0 && (
              <div>
                <h2 className="text-base font-bold text-stone-900 mb-4">Saved Accommodations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteStays.map((a) => (
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

            {/* Experiences */}
            {favoriteExperiences.length > 0 && (
              <div>
                <h2 className="text-base font-bold text-stone-900 mb-4">Saved Experiences</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteExperiences.map((e) => (
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
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 max-w-md mx-auto">
            <Heart className="w-12 h-12 text-rose-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-900">Your wishlist is currently empty</h3>
            <p className="text-xs text-stone-500 mt-1 mb-6">
              Click the heart icon on any landmark, villa, or experience to save it here for later.
            </p>
            <Link href="/destinations">
              <Button variant="primary" className="rounded-full px-6 text-xs bg-emerald-600 hover:bg-emerald-700">
                Explore Destinations
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
