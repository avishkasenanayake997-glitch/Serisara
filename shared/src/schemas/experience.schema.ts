import { z } from 'zod';

export const createExperienceSchema = z.object({
  name: z.string().min(2).max(255),
  description: z.string().min(20),
  shortDescription: z.string().max(500).optional(),
  categoryId: z.string().uuid().optional(),
  regionId: z.string().uuid().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  address: z.string().optional(),
  durationHours: z.number().positive().optional(),
  difficulty: z.enum(['easy', 'moderate', 'challenging', 'extreme']).optional(),
  pricePerPerson: z.number().nonnegative(),
  minParticipants: z.number().int().positive().default(1),
  maxParticipants: z.number().int().positive().optional(),
  includedItems: z.string().optional(),
  whatToBring: z.string().optional(),
  schedule: z.string().optional(),
  featuredImageUrl: z.string().url().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  isFeatured: z.boolean().default(false),
  galleryImages: z.array(z.string().url()).optional(),
});

export const updateExperienceSchema = createExperienceSchema.partial();

export const experienceQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
  search: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  regionId: z.string().uuid().optional(),
  difficulty: z.enum(['easy', 'moderate', 'challenging', 'extreme']).optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  isFeatured: z.coerce.boolean().optional(),
  sortBy: z.enum(['rating', 'price_asc', 'price_desc', 'newest', 'name']).default('newest'),
});

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;
export type ExperienceQueryParams = z.infer<typeof experienceQuerySchema>;
