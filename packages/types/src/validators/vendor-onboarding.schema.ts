import { z } from 'zod';

export const VendorOnboardingSchema = z.object({
  storeName: z.string().min(3).max(100),
  storeSlug: z.string().regex(/^[a-z0-9-]+$/),
  businessLegalName: z.string().min(2).max(200),
  taxId: z.string().min(5).max(50),
  incorporationCountry: z.string().length(2),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(7).max(20),
  bankAccountDetails: z.object({
    bankName: z.string().min(2),
    routingNumber: z.string().min(6),
    accountNumber: z.string().min(6),
    accountHolderName: z.string().min(2),
    iban: z.string().optional(),
    swiftBic: z.string().optional(),
  }),
  expectedAnnualVolumeUsd: z.number().positive(),
  categoriesHandled: z.array(z.string()).min(1),
});

export type VendorOnboardingDto = z.infer<typeof VendorOnboardingSchema>;
