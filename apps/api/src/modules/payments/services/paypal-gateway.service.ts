import { Injectable } from '@nestjs/common';
import { PaymentIntentDto } from '@enterprise/types';
import * as crypto from 'crypto';

@Injectable()
export class PaypalGatewayService {
  async createOrder(orderId: string, amount: number, currency: string): Promise<PaymentIntentDto> {
    const paymentIntentId = `PAYPAL-ORD-${crypto.randomBytes(8).toString('hex').toUpperCase()}`;
    return {
      provider: 'PAYPAL',
      paymentIntentId,
      clientSecret: `token_${crypto.randomBytes(16).toString('hex')}`,
      amount,
      currency,
    };
  }
}
