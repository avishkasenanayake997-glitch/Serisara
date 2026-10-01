import { z } from 'zod';

export const createInquirySchema = z.object({
  inquiryType: z.enum(['general', 'destination', 'accommodation', 'experience']).default('general'),
  relatedId: z.string().uuid().optional(),
  name: z.string().min(2, 'Name is required').max(255),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().max(20).optional(),
  subject: z.string().min(3, 'Subject is required').max(255),
  message: z.string().min(10, 'Message must be at least 10 characters').max(3000),
});

export const updateInquiryStatusSchema = z.object({
  status: z.enum(['new', 'read', 'replied', 'closed']),
  adminNotes: z.string().max(1000).optional(),
});

export const inquiryQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
  status: z.enum(['new', 'read', 'replied', 'closed']).optional(),
  inquiryType: z.enum(['general', 'destination', 'accommodation', 'experience']).optional(),
});

export type CreateInquiryInput = z.infer<typeof createInquirySchema>;
export type UpdateInquiryStatusInput = z.infer<typeof updateInquiryStatusSchema>;
export type InquiryQueryParams = z.infer<typeof inquiryQuerySchema>;
