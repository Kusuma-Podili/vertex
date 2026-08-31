import { z } from 'zod';

export const KeyboardsItemSchema = z.object({
  id: z.string().uuid(),
  sku: z.string().min(3),
  title: z.string().min(1),
  basePrice: z.number().positive(),
  rating: z.number().min(0).max(5),
  tags: z.array(z.string()),
});

export type KeyboardsItemDto = z.infer<typeof KeyboardsItemSchema>;

export interface KeyboardsCatalogResponse {
  category: string;
  totalProducts: number;
  items: KeyboardsItemDto[];
}
