import React from 'react';
import { cn } from '../../utils/cn';

interface PriceDisplayProps {
  amountUSD: number;
  per?: string; // e.g. "night", "person"
  showLKR?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Approximate conversion rate for dual currency display (1 USD = 305 LKR)
const USD_TO_LKR = 305;

export function PriceDisplay({
  amountUSD,
  per,
  showLKR = true,
  className,
  size = 'md',
}: PriceDisplayProps) {
  const lkrAmount = Math.round(amountUSD * USD_TO_LKR).toLocaleString();

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-baseline gap-1">
        <span className={cn('font-black text-stone-900 tracking-tight', sizeClasses[size])}>
          ${amountUSD.toFixed(0)}
        </span>
        {per && <span className="text-xs text-stone-500 font-medium">/ {per}</span>}
      </div>

      {showLKR && (
        <span className="text-[11px] text-stone-400 font-medium tracking-tight">
          ≈ LKR {lkrAmount}
        </span>
      )}
    </div>
  );
}
