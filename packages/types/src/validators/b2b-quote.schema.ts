import { z } from 'zod';

export const B2BQuoteItemSchema = z.object({
  sku: z.string().min(3).max(50),
  quantity: z.number().int().min(1).max(10000),
  basePrice: z.number().positive(),
  customNotes: z.string().max(500).optional(),
});

export const B2BQuoteRequestSchema = z.object({
  companyId: z.string().uuid(),
  companyName: z.string().min(2).max(200),
  taxExemptionNumber: z.string().optional(),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(7).max(20),
  items: z.array(B2BQuoteItemSchema).min(1),
  shippingDestination: z.object({
    streetLine1: z.string().min(3),
    streetLine2: z.string().optional(),
    city: z.string().min(2),
    state: z.string().min(2),
    postalCode: z.string().min(3),
    countryCode: z.string().length(2),
  }),
  requestedPaymentTerms: z.enum(['NET_30', 'NET_60', 'IMMEDIATE']).default('NET_30'),
});

export type B2BQuoteRequestDto = z.infer<typeof B2BQuoteRequestSchema>;
