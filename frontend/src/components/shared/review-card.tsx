import React from 'react';
import { StarRating } from './star-rating';
import { Badge } from '../ui';
import { CheckCircle2 } from 'lucide-react';

export interface ReviewCardProps {
  id: string;
  authorName: string;
  authorAvatar?: string | null;
  rating: number;
  date: string;
  title?: string | null;
  content?: string | null;
  isVerified?: boolean;
}

export function ReviewCard({
  authorName,
  authorAvatar,
  rating,
  date,
  title,
  content,
  isVerified = true,
}: ReviewCardProps) {
  return (
    <div className="p-6 rounded-2xl border border-stone-200/80 bg-white shadow-sm space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm border border-emerald-200 overflow-hidden shrink-0">
            {authorAvatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={authorAvatar} alt={authorName} className="w-full h-full object-cover" />
            ) : (
              authorName.charAt(0) || 'U'
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-stone-900">{authorName}</h4>
              {isVerified && (
                <Badge variant="primary" className="text-[10px] px-1.5 py-0 flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Verified Guest</span>
                </Badge>
              )}
            </div>
            <p className="text-xs text-stone-400">{date}</p>
          </div>
        </div>

        <StarRating rating={rating} size="sm" showScore={false} />
      </div>

      {title && (
        <h5 className="text-sm font-bold text-stone-900 leading-snug">{title}</h5>
      )}

      {content && (
        <p className="text-xs text-stone-600 leading-relaxed">{content}</p>
      )}
    </div>
  );
}
