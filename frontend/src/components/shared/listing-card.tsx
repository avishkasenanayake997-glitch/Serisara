'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Heart, Sparkles } from 'lucide-react';
import { StarRating } from './star-rating';
import { PriceDisplay } from './price-display';
import { Badge } from '../ui';
import { cn } from '../../utils/cn';

export interface ListingCardProps {
  id: string;
  type: 'destination' | 'accommodation' | 'experience';
  title: string;
  slug: string;
  imageUrl?: string | null;
  category?: string;
  region?: string;
  rating?: number;
  reviewCount?: number;
  price?: number;
  pricePer?: string;
  badge?: string;
  isFeatured?: boolean;
  className?: string;
}

export function ListingCard({
  type,
  title,
  slug,
  imageUrl,
  category,
  region,
  rating = 0,
  reviewCount = 0,
  price,
  pricePer,
  badge,
  isFeatured = false,
  className,
}: ListingCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const href = `/${type === 'destination' ? 'destinations' : type === 'accommodation' ? 'accommodations' : 'experiences'}/${slug}`;

  // Fallback placeholder image if none provided
  const displayImage =
    imageUrl ||
    'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80';

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-3xl border border-stone-200/80 bg-white shadow-sm hover:shadow-xl hover:border-emerald-200/80 transition-all duration-300 overflow-hidden',
        className
      )}
    >
      {/* Image Thumbnail Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <Link href={href} className="block w-full h-full">
          <Image
            src={displayImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 pointer-events-none">
          {category && (
            <Badge variant="primary" className="bg-white/90 text-stone-900 border-white/60 shadow-sm backdrop-blur-md font-semibold text-[11px]">
              {category}
            </Badge>
          )}
          {isFeatured && (
            <Badge variant="accent" className="bg-amber-500 text-white border-transparent shadow-sm flex items-center gap-1 font-bold text-[10px]">
              <Sparkles className="w-3 h-3" />
              <span>FEATURED</span>
            </Badge>
          )}
          {badge && (
            <Badge variant="secondary" className="bg-stone-900/80 text-white border-transparent backdrop-blur-md text-[10px]">
              {badge}
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorited(!isFavorited);
          }}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-white/60 flex items-center justify-center text-stone-600 hover:text-rose-500 shadow-md transition-all active:scale-90"
        >
          <Heart
            className={cn(
              'w-4 h-4 transition-colors',
              isFavorited && 'fill-rose-500 text-rose-500'
            )}
          />
        </button>
      </div>

      {/* Content Details */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        {/* Region */}
        {region && (
          <div className="flex items-center gap-1.5 text-xs text-stone-400 font-medium">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{region}</span>
          </div>
        )}

        {/* Title */}
        <Link href={href} className="block group-hover:text-emerald-700 transition-colors">
          <h3 className="text-base font-bold text-stone-900 line-clamp-1 leading-snug">
            {title}
          </h3>
        </Link>

        {/* Rating and Price Row */}
        <div className="mt-auto pt-3 border-t border-stone-100 flex items-center justify-between">
          <StarRating rating={rating} reviewCount={reviewCount} size="sm" />

          {price !== undefined ? (
            <PriceDisplay amountUSD={price} per={pricePer} size="sm" />
          ) : (
            <span className="text-xs font-bold text-emerald-700 hover:underline">
              Explore →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
