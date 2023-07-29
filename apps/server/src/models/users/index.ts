import * as z from 'zod';
import {WithId} from 'mongodb';

import {db} from '@loaders/index';

export const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  phone: z.string().min(8).max(12),
  password: z.string().max(30),
  role: z.enum(['ADMIN', 'USER']),
  userType: z.enum(['RENTER', 'OWNER']),
  status: z.enum(['DELETED', 'ACTIVE', 'BLOCKED']).default('ACTIVE'),
  timestamp: z
    .object({
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
    })
    .refine(data => {
      if (!data.createdAt) {
        data.createdAt = new Date();
      }
      // Always update `updatedAt` to the current date
      data.updatedAt = new Date();

      return data;
    })
    .optional(),
});

export type User = z.infer<typeof userSchema>;
export type UserWithId = WithId<User>;
export const Users = db.collection<User>('users');
