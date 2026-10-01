import { z } from 'zod';

export const createReviewSchema = z.object({
  reviewableType: z.enum(['destination', 'accommodation', 'experience']),
  reviewableId: z.string().uuid('Invalid entity ID'),
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  title: z.string().max(255).optional(),
  content: z.string().min(10, 'Review must be at least 10 characters').max(2000),
});

export const updateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  title: z.string().max(255).optional(),
  content: z.string().min(10).max(2000).optional(),
});

export const updateReviewStatusSchema = z.object({
  status: z.enum(['published', 'hidden', 'flagged']),
});

export const reviewQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
  reviewableType: z.enum(['destination', 'accommodation', 'experience']).optional(),
  reviewableId: z.string().uuid().optional(),
  status: z.enum(['published', 'hidden', 'flagged']).optional(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
export type UpdateReviewStatusInput = z.infer<typeof updateReviewStatusSchema>;
export type ReviewQueryParams = z.infer<typeof reviewQuerySchema>;
