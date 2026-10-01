import { z } from 'zod';

export const createDestinationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  shortDescription: z.string().max(500).optional(),
  categoryId: z.string().uuid('Invalid category ID').optional(),
  regionId: z.string().uuid('Invalid region ID').optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  address: z.string().max(255).optional(),
  bestTimeToVisit: z.string().max(255).optional(),
  entryFee: z.string().max(255).optional(),
  openingHours: z.string().max(255).optional(),
  practicalInfo: z.string().optional(),
  featuredImageUrl: z.string().url().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  isFeatured: z.boolean().default(false),
  galleryImages: z.array(z.string().url()).optional(),
});

export const updateDestinationSchema = createDestinationSchema.partial();

export const destinationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
  search: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  regionId: z.string().uuid().optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  isFeatured: z.coerce.boolean().optional(),
  sortBy: z.enum(['rating', 'newest', 'name']).default('newest'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type CreateDestinationInput = z.infer<typeof createDestinationSchema>;
export type UpdateDestinationInput = z.infer<typeof updateDestinationSchema>;
export type DestinationQueryParams = z.infer<typeof destinationQuerySchema>;
