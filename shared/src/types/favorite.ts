// ============================================================
// Favorite Types
// ============================================================

export type FavoritableType = 'destination' | 'accommodation' | 'experience';

export interface Favorite {
  id: string;
  user_id: string;
  favoritable_type: FavoritableType;
  favoritable_id: string;
  created_at: string;
}
