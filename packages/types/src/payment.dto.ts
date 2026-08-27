import { PaymentMethod, PaymentStatus } from './enums';

export interface PaymentIntentDto {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  provider: 'STRIPE' | 'PAYPAL' | 'MOCK';
}

export interface PaymentWebhookPayload {
  eventId: string;
  type: string;
  provider: string;
  data: {
    transactionId: string;
    orderId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    failureReason?: string;
  };
  signature: string;
  timestamp: number;
}
