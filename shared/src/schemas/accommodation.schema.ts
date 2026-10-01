import { z } from 'zod';

export const createAccommodationSchema = z.object({
  name: z.string().min(2).max(255),
  type: z.enum(['hotel', 'villa', 'homestay', 'resort', 'guesthouse', 'hostel']),
  description: z.string().min(20),
  shortDescription: z.string().max(500).optional(),
  regionId: z.string().uuid().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  address: z.string().min(3),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  websiteUrl: z.string().url().optional(),
  priceMin: z.number().nonnegative().optional(),
  priceMax: z.number().nonnegative().optional(),
  starRating: z.number().int().min(1).max(5).optional(),
  checkInTime: z.string().optional(),
  checkOutTime: z.string().optional(),
  featuredImageUrl: z.string().url().optional(),
  amenityIds: z.array(z.string().uuid()).optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  isFeatured: z.boolean().default(false),
});

export const updateAccommodationSchema = createAccommodationSchema.partial();

export const createRoomTypeSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  pricePerNight: z.number().positive('Price must be greater than 0'),
  maxGuests: z.number().int().positive().default(2),
  totalRooms: z.number().int().positive().default(1),
  imageUrl: z.string().url().optional(),
});

export const updateRoomTypeSchema = createRoomTypeSchema.partial();

export const accommodationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
  search: z.string().optional(),
  type: z.enum(['hotel', 'villa', 'homestay', 'resort', 'guesthouse', 'hostel']).optional(),
  regionId: z.string().uuid().optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  starRating: z.coerce.number().int().min(1).max(5).optional(),
  amenityIds: z.union([z.string(), z.array(z.string())]).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  isFeatured: z.coerce.boolean().optional(),
  sortBy: z.enum(['rating', 'price_asc', 'price_desc', 'newest', 'name']).default('newest'),
});

export type CreateAccommodationInput = z.infer<typeof createAccommodationSchema>;
export type UpdateAccommodationInput = z.infer<typeof updateAccommodationSchema>;
export type CreateRoomTypeInput = z.infer<typeof createRoomTypeSchema>;
export type UpdateRoomTypeInput = z.infer<typeof updateRoomTypeSchema>;
export type AccommodationQueryParams = z.infer<typeof accommodationQuerySchema>;
