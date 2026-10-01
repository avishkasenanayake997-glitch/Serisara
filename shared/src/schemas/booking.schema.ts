import { z } from 'zod';

export const createBookingSchema = z.object({
  bookingType: z.enum(['accommodation', 'experience']),
  bookableId: z.string().uuid('Invalid bookable ID'),
  roomTypeId: z.string().uuid('Invalid room type ID').optional(),
  checkInDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD').optional(),
  checkOutDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD').optional(),
  bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD').optional(),
  guestCount: z.number().int().positive().default(1),
  specialRequests: z.string().max(1000).optional(),
  contactName: z.string().min(2, 'Name is required').max(255),
  contactEmail: z.string().email('Valid email is required'),
  contactPhone: z.string().max(20).optional(),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(['pending_payment', 'confirmed', 'cancelled', 'refunded', 'completed']),
  cancellationReason: z.string().max(500).optional(),
});

export const bookingQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
  status: z.enum(['pending_payment', 'confirmed', 'cancelled', 'refunded', 'completed']).optional(),
  bookingType: z.enum(['accommodation', 'experience']).optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingStatusInput = z.infer<typeof updateBookingStatusSchema>;
export type BookingQueryParams = z.infer<typeof bookingQuerySchema>;
