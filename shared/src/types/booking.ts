// ============================================================
// Booking Types
// ============================================================

export type BookingType = 'accommodation' | 'experience';
export type BookingStatus =
  | 'pending_payment'
  | 'confirmed'
  | 'cancelled'
  | 'refunded'
  | 'completed';

export type Currency = 'USD' | 'LKR';

export interface Booking {
  id: string;
  user_id: string;
  booking_type: BookingType;
  bookable_id: string;
  room_type_id: string | null;
  check_in_date: string | null;
  check_out_date: string | null;
  booking_date: string | null;
  guest_count: number;
  total_amount: number;
  currency: Currency;
  status: BookingStatus;
  stripe_payment_intent_id: string | null;
  special_requests: string | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  confirmed_at: string | null;
  cancelled_at: string | null;
  cancellation_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  booking_id: string;
  stripe_payment_intent_id: string;
  amount: number;
  currency: Currency;
  status: string;
  stripe_receipt_url: string | null;
  created_at: string;
}
