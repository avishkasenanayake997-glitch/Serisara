import { z } from 'zod';

export const createTripSchema = z.object({
  title: z.string().min(2, 'Trip title is required').max(255),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD').optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD').optional(),
  notes: z.string().max(2000).optional(),
});

export const updateTripSchema = createTripSchema.partial().extend({
  status: z.enum(['planning', 'active', 'completed']).optional(),
});

export const addTripItemSchema = z.object({
  dayNumber: z.number().int().positive('Day number must be positive'),
  itemType: z.enum(['destination', 'accommodation', 'experience']),
  itemId: z.string().uuid('Invalid item ID'),
  sortOrder: z.number().int().nonnegative().default(0),
  notes: z.string().max(500).optional(),
});

export const updateTripItemSchema = z.object({
  dayNumber: z.number().int().positive().optional(),
  sortOrder: z.number().int().nonnegative().optional(),
  notes: z.string().max(500).optional(),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
export type UpdateTripInput = z.infer<typeof updateTripSchema>;
export type AddTripItemInput = z.infer<typeof addTripItemSchema>;
export type UpdateTripItemInput = z.infer<typeof updateTripItemSchema>;
