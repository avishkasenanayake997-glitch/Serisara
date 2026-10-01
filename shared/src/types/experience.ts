// ============================================================
// Experience Types
// ============================================================

export type ExperienceDifficulty = 'easy' | 'moderate' | 'challenging' | 'extreme';
export type ExperienceStatus = 'draft' | 'published' | 'archived';

export interface Experience {
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
  duration_hours: number | null;
  difficulty: ExperienceDifficulty | null;
  price_per_person: number;
  min_participants: number;
  max_participants: number | null;
  included_items: string | null;
  what_to_bring: string | null;
  schedule: string | null;
  featured_image_url: string | null;
  avg_rating: number;
  review_count: number;
  status: ExperienceStatus;
  is_featured: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  // Joined relations
  category?: import('./destination').Category;
  region?: import('./destination').Region;
  images?: import('./destination').ListingImage[];
}
