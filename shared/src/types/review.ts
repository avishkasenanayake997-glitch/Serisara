// ============================================================
// Review Types
// ============================================================

export type ReviewableType = 'destination' | 'accommodation' | 'experience';
export type ReviewStatus = 'published' | 'hidden' | 'flagged';

export interface Review {
  id: string;
  user_id: string;
  reviewable_type: ReviewableType;
  reviewable_id: string;
  rating: number;
  title: string | null;
  content: string | null;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
  // Joined relations
  user?: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
}
