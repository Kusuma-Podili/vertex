import { z } from 'zod';

export const PowerItemSchema = z.object({
  id: z.string().uuid(),
  sku: z.string().min(3),
  title: z.string().min(1),
  basePrice: z.number().positive(),
  rating: z.number().min(0).max(5),
  tags: z.array(z.string()),
});

export type PowerItemDto = z.infer<typeof PowerItemSchema>;

export interface PowerCatalogResponse {
  category: string;
  totalProducts: number;
  items: PowerItemDto[];
}
