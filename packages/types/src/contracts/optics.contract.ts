import { z } from 'zod';

export const OpticsItemSchema = z.object({
  id: z.string().uuid(),
  sku: z.string().min(3),
  title: z.string().min(1),
  basePrice: z.number().positive(),
  rating: z.number().min(0).max(5),
  tags: z.array(z.string()),
});

export type OpticsItemDto = z.infer<typeof OpticsItemSchema>;

export interface OpticsCatalogResponse {
  category: string;
  totalProducts: number;
  items: OpticsItemDto[];
}
