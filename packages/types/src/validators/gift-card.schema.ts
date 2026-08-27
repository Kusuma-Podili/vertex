import { z } from 'zod';

export const IssueGiftCardSchema = z.object({
  amountUsd: z.number().min(10).max(5000),
  recipientEmail: z.string().email(),
  recipientName: z.string().min(1).max(100),
  senderName: z.string().min(1).max(100),
  personalMessage: z.string().max(500).optional(),
  deliveryDate: z.string().datetime().optional(),
});

export type IssueGiftCardDto = z.infer<typeof IssueGiftCardSchema>;
