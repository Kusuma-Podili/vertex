import { z } from 'zod';

export const ComputingItemSchema = z.object({
  id: z.string().uuid(),
  sku: z.string().min(3),
  title: z.string().min(1),
  basePrice: z.number().positive(),
  rating: z.number().min(0).max(5),
  tags: z.array(z.string()),
});

export type ComputingItemDto = z.infer<typeof ComputingItemSchema>;

export interface ComputingCatalogResponse {
  category: string;
  totalProducts: number;
  items: ComputingItemDto[];
}
