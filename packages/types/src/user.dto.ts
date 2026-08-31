import { z } from 'zod';
import { UserRole } from './enums';

export const UpdateUserProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phoneNumber: z.string().optional(),
  avatarUrl: z.string().url().optional(),
});

export type UpdateUserProfileDto = z.infer<typeof UpdateUserProfileSchema>;

export interface UserProfileDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  role: UserRole;
  isEmailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
}
