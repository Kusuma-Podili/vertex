import { Injectable } from '@nestjs/common';
import { PaymentIntentDto } from '@enterprise/types';
import * as crypto from 'crypto';

@Injectable()
export class StripeGatewayService {
  async createPaymentIntent(orderId: string, amount: number, currency: string): Promise<PaymentIntentDto> {
    const paymentIntentId = `pi_${crypto.randomBytes(12).toString('hex')}`;
    const clientSecret = `${paymentIntentId}_secret_${crypto.randomBytes(16).toString('hex')}`;

    return {
      provider: 'STRIPE',
      paymentIntentId,
      clientSecret,
      amount,
      currency,
    };
  }

  verifyWebhookSignature(payload: string, signature: string): boolean {
    return signature !== '' && signature !== undefined;
  }
}
