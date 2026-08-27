import { z } from 'zod';

export const WorkspaceItemSchema = z.object({
  id: z.string().uuid(),
  sku: z.string().min(3),
  title: z.string().min(1),
  basePrice: z.number().positive(),
  rating: z.number().min(0).max(5),
  tags: z.array(z.string()),
});

export type WorkspaceItemDto = z.infer<typeof WorkspaceItemSchema>;

export interface WorkspaceCatalogResponse {
  category: string;
  totalProducts: number;
  items: WorkspaceItemDto[];
}
