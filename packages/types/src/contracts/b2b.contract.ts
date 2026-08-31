import { z } from 'zod';

export const B2BWholesaleContractSchema = z.object({
  contractId: z.string().uuid(),
  corporateAccountId: z.string().uuid(),
  effectiveDate: z.string().datetime(),
  expirationDate: z.string().datetime(),
  minimumAnnualCommitmentUsd: z.number().positive(),
  customDiscountTier: z.number().min(0).max(100),
  netPaymentTerms: z.enum(['NET_30', 'NET_60', 'NET_90']),
  authorizedSignerName: z.string().min(2),
  authorizedSignerTitle: z.string().min(2),
});

export type B2BWholesaleContractDto = z.infer<typeof B2BWholesaleContractSchema>;
