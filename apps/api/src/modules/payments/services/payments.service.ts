import { Injectable } from '@nestjs/common';
import { PaymentMethod, PaymentIntentDto } from '@enterprise/types';
import { StripeGatewayService } from './stripe-gateway.service';
import { PaypalGatewayService } from './paypal-gateway.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly stripeGateway: StripeGatewayService,
    private readonly paypalGateway: PaypalGatewayService,
  ) {}

  async createIntent(
    orderId: string,
    method: PaymentMethod,
    amount: number,
    currency: string
  ): Promise<PaymentIntentDto> {
    if (method === PaymentMethod.PAYPAL) {
      return this.paypalGateway.createOrder(orderId, amount, currency);
    }
    return this.stripeGateway.createPaymentIntent(orderId, amount, currency);
  }
}
