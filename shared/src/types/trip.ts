// ============================================================
// Trip / Itinerary Types
// ============================================================

export type TripStatus = 'planning' | 'active' | 'completed';
export type TripItemType = 'destination' | 'accommodation' | 'experience';

export interface Trip {
  id: string;
  user_id: string;
  title: string;
  start_date: string | null;
  end_date: string | null;
  notes: string | null;
  status: TripStatus;
  created_at: string;
  updated_at: string;
  // Joined relations
  items?: TripItem[];
}

export interface TripItem {
  id: string;
  trip_id: string;
  day_number: number;
  item_type: TripItemType;
  item_id: string;
  sort_order: number;
  notes: string | null;
  created_at: string;
  // Joined — the actual destination/accommodation/experience
  item_details?: {
    name: string;
    slug: string;
    featured_image_url: string | null;
  };
}
