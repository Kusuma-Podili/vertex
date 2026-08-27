import { z } from 'zod';

export const AddToCartSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid(),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

export type AddToCartDto = z.infer<typeof AddToCartSchema>;

export const UpdateCartItemSchema = z.object({
  itemId: z.string().uuid(),
  quantity: z.number().int().min(0, 'Quantity cannot be negative'),
});

export type UpdateCartItemDto = z.infer<typeof UpdateCartItemSchema>;

export interface CartSummaryDto {
  cartId: string;
  items: {
    itemId: string;
    productId: string;
    variantId: string;
    title: string;
    variantName: string;
    sku: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
  }[];
  itemCount: number;
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  estimatedShipping: number;
  grandTotal: number;
  appliedCoupon?: string;
}
