// ============================================================
// Destination & Experience Categories
// ============================================================

export const CATEGORIES = [
  // Destination categories
  { name: 'Beach', slug: 'beach', type: 'both' as const, icon: 'palmtree' },
  { name: 'Temple', slug: 'temple', type: 'destination' as const, icon: 'landmark' },
  { name: 'Wildlife', slug: 'wildlife', type: 'both' as const, icon: 'bird' },
  { name: 'Heritage', slug: 'heritage', type: 'destination' as const, icon: 'castle' },
  { name: 'Mountain', slug: 'mountain', type: 'destination' as const, icon: 'mountain' },
  { name: 'Waterfall', slug: 'waterfall', type: 'destination' as const, icon: 'droplets' },
  { name: 'Lake', slug: 'lake', type: 'destination' as const, icon: 'waves' },
  { name: 'National Park', slug: 'national-park', type: 'both' as const, icon: 'trees' },
  { name: 'Garden', slug: 'garden', type: 'destination' as const, icon: 'flower' },
  { name: 'Museum', slug: 'museum', type: 'destination' as const, icon: 'building-2' },
  { name: 'City', slug: 'city', type: 'destination' as const, icon: 'building' },
  // Experience categories
  { name: 'Adventure', slug: 'adventure', type: 'experience' as const, icon: 'compass' },
  { name: 'Cultural', slug: 'cultural', type: 'experience' as const, icon: 'music' },
  { name: 'Water Sports', slug: 'water-sports', type: 'experience' as const, icon: 'sailboat' },
  { name: 'Hiking & Trekking', slug: 'hiking-trekking', type: 'experience' as const, icon: 'footprints' },
  { name: 'Safari', slug: 'safari', type: 'experience' as const, icon: 'binoculars' },
  { name: 'Food & Cooking', slug: 'food-cooking', type: 'experience' as const, icon: 'chef-hat' },
  { name: 'Wellness & Spa', slug: 'wellness-spa', type: 'experience' as const, icon: 'heart' },
  { name: 'Photography', slug: 'photography', type: 'experience' as const, icon: 'camera' },
  { name: 'Whale Watching', slug: 'whale-watching', type: 'experience' as const, icon: 'fish' },
  { name: 'Train Journey', slug: 'train-journey', type: 'experience' as const, icon: 'train-front' },
  { name: 'Tea Plantation', slug: 'tea-plantation', type: 'both' as const, icon: 'leaf' },
] as const;
