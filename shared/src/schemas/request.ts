import { z } from 'zod';

export const requestTypeSchema = z.enum(['BORROW', 'TRADE']);

export const borrowRequestSchema = z.object({
  itemId: z.string().min(1, { message: 'Item ID is required' }),
  type: requestTypeSchema,
  message: z.string().max(500).optional(),
  returnDate: z.string()
    .transform((str) => new Date(str))
    .refine((date) => date > new Date(), { message: 'Return date must be in the future' })
    .optional()
    .nullable(),
}).refine((data) => {
  if (data.type === 'BORROW' && !data.returnDate) {
    return false;
  }
  return true;
}, {
  message: 'Return date is required for borrow requests',
  path: ['returnDate']
});

export type BorrowRequestInput = z.infer<typeof borrowRequestSchema>;
