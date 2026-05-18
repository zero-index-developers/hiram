import { z } from 'zod';

export const itemCategorySchema = z.enum(['ACADEMICS', 'ELECTRONICS', 'CREATIVE', 'ORGANIZATION', 'OTHERS']);
export const itemConditionSchema = z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR']);

export const createItemSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }).max(100),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }).max(1000),
  category: itemCategorySchema,
  condition: itemConditionSchema,
  imageUrls: z.array(z.string().url()).min(1, { message: 'At least one item image is required' }),
});

export const updateItemSchema = createItemSchema.partial().extend({
  isAvailable: z.boolean().optional(),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
