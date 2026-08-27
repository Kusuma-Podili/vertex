import { z } from 'zod';

export const ProductFilterSchema = z.object({
  search: z.string().optional(),
  categoryId: z.string().optional(),
  categorySlug: z.string().optional(),
  brandId: z.string().optional(),
  minPrice: z.number().nonnegative().optional(),
  maxPrice: z.number().nonnegative().optional(),
  tags: z.array(z.string()).optional(),
  inStockOnly: z.boolean().optional(),
  sortBy: z.enum(['price_asc', 'price_desc', 'rating_desc', 'newest', 'relevance']).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

export type ProductFilterDto = z.infer<typeof ProductFilterSchema>;

export interface ProductVariantDto {
  id: string;
  sku: string;
  name: string;
  priceOffset: number;
  weightKg: number;
  option1Name?: string;
  option1Value?: string;
  option2Name?: string;
  option2Value?: string;
  quantityAvailable: number;
}

export interface ProductDetailDto {
  id: string;
  title: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  basePrice: number;
  compareAtPrice?: number;
  currency: string;
  ratingAverage: number;
  reviewCount: number;
  isFeatured: boolean;
  category: { id: string; name: string; slug: string };
  brand?: { id: string; name: string; slug: string };
  images: { id: string; url: string; altText?: string; isPrimary: boolean }[];
  variants: ProductVariantDto[];
  attributes: { key: string; value: string; group?: string }[];
  tags: string[];
}
