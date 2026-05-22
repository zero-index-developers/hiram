import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string()
    .email({ message: 'Invalid email address' })
    .refine(
      (email) => email.endsWith('@iskolar.pup.edu.ph') || email.endsWith('@pup.edu.ph'),
      { message: 'Must be a valid Studentor faculty email (@iskolar.pup.edu.ph or @pup.edu.ph)' }
    ),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export const registerSchema = z.object({
  studentId: z.string()
    .min(5, { message: 'Student ID is required' })
    .regex(/^\d{4}-\d{5}-MN-\d$/, { message: 'Student ID must match standard PUP format (e.g. 2021-12345-MN-0)' }),
  email: z.string()
    .email({ message: 'Invalid email address' })
    .refine(
      (email) => email.endsWith('@iskolar.pup.edu.ph') || email.endsWith('@pup.edu.ph'),
      { message: 'Must be a valid Studentemail (@iskolar.pup.edu.ph)' }
    ),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  course: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
