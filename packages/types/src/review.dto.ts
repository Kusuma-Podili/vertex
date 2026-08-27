import { z } from 'zod';

export const CreateReviewSchema = z.object({
  productId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(3).max(100),
  comment: z.string().min(10).max(2000),
});

export type CreateReviewDto = z.infer<typeof CreateReviewSchema>;

export interface ReviewItemDto {
  id: string;
  rating: number;
  title: string;
  comment: string;
  authorName: string;
  isVerified: boolean;
  helpfulCount: number;
  createdAt: string;
}
