import { z } from 'zod';
import { OrderStatus, PaymentMethod } from './enums';

export const CreateOrderSchema = z.object({
  shippingAddressId: z.string().uuid(),
  billingAddressId: z.string().uuid(),
  paymentMethod: z.nativeEnum(PaymentMethod),
  customerNotes: z.string().max(500).optional(),
  couponCode: z.string().optional(),
});

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;

export interface OrderDetailDto {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  currency: string;
  subtotal: number;
  shippingFee: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  customerNotes?: string;
  placedAt: string;
  items: {
    id: string;
    productId: string;
    variantId: string;
    name: string;
    sku: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
  }[];
  shippingAddress: {
    recipient: string;
    streetLine1: string;
    streetLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    countryCode: string;
    phoneNumber: string;
  };
  tracking?: {
    carrier: string;
    trackingNumber: string;
    status: string;
    estimatedDelivery?: string;
  };
}
