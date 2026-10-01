// ============================================================
// Destination Types
// ============================================================

export type DestinationStatus = 'draft' | 'published' | 'archived';

export interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string | null;
  category_id: string;
  region_id: string;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  best_time_to_visit: string | null;
  entry_fee: string | null;
  opening_hours: string | null;
  practical_info: string | null;
  featured_image_url: string | null;
  avg_rating: number;
  review_count: number;
  status: DestinationStatus;
  is_featured: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  // Joined relations
  category?: Category;
  region?: Region;
  images?: ListingImage[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: 'destination' | 'experience' | 'both';
  icon: string | null;
  created_at: string;
}

export interface Region {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  created_at: string;
}

export interface ListingImage {
  id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
}
