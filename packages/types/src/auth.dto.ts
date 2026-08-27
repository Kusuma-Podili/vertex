import { z } from 'zod';
import { UserRole } from './enums';

export const RegisterDtoSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().optional(),
});

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;

export const LoginDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean().optional(),
});

export type LoginDto = z.infer<typeof LoginDtoSchema>;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

export interface AuthUserPayload {
  userId: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}
