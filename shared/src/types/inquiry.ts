// ============================================================
// Inquiry Types
// ============================================================

export type InquiryType = 'general' | 'destination' | 'accommodation' | 'experience';
export type InquiryStatus = 'new' | 'read' | 'replied' | 'closed';

export interface Inquiry {
  id: string;
  user_id: string | null;
  inquiry_type: InquiryType;
  related_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: InquiryStatus;
  admin_notes: string | null;
  replied_at: string | null;
  created_at: string;
}
