// ============================================================
// Accommodation Types
// ============================================================

export type AccommodationType =
  | 'hotel'
  | 'villa'
  | 'homestay'
  | 'resort'
  | 'guesthouse'
  | 'hostel';

export type AccommodationStatus = 'draft' | 'published' | 'archived';

export interface Accommodation {
  id: string;
  name: string;
  slug: string;
  type: AccommodationType;
  description: string;
  short_description: string | null;
  region_id: string;
  latitude: number | null;
  longitude: number | null;
  address: string;
  contact_email: string | null;
  contact_phone: string | null;
  website_url: string | null;
  price_min: number | null;
  price_max: number | null;
  star_rating: number | null;
  check_in_time: string | null;
  check_out_time: string | null;
  featured_image_url: string | null;
  avg_rating: number;
  review_count: number;
  status: AccommodationStatus;
  is_featured: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  // Joined relations
  region?: import('./destination').Region;
  images?: import('./destination').ListingImage[];
  amenities?: Amenity[];
  room_types?: RoomType[];
}

export interface Amenity {
  id: string;
  name: string;
  icon: string | null;
  category: string | null;
}

export interface RoomType {
  id: string;
  accommodation_id: string;
  name: string;
  description: string | null;
  price_per_night: number;
  max_guests: number;
  total_rooms: number;
  image_url: string | null;
  created_at: string;
}
