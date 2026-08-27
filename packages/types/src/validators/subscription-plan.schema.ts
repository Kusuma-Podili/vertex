import { z } from 'zod';

export const CreateSubscriptionPlanSchema = z.object({
  name: z.string().min(3).max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().max(1000),
  billingInterval: z.enum(['MONTHLY', 'QUARTERLY', 'ANNUAL']),
  priceUsd: z.number().positive(),
  trialPeriodDays: z.number().int().nonnegative().default(0),
  features: z.array(z.string()).min(1),
  hardwareWarrantyTier: z.enum(['STANDARD', 'TIER_1_EXECUTIVE', 'ENTERPRISE_LIFETIME']),
  isActive: z.boolean().default(true),
});

export type CreateSubscriptionPlanDto = z.infer<typeof CreateSubscriptionPlanSchema>;
