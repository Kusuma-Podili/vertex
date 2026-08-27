import { Controller, Post, Body, Headers, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from './services/payments.service';
import { WebhookDispatcherService } from './services/webhook-dispatcher.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaymentMethod } from '@enterprise/types';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly webhookDispatcher: WebhookDispatcherService,
  ) {}

  @Post('create-intent')
  @UseGuards(JwtAuthGuard)
  async createPaymentIntent(
    @Body() body: { orderId: string; paymentMethod: PaymentMethod; amount: number; currency?: string }
  ) {
    return this.paymentsService.createIntent(body.orderId, body.paymentMethod, body.amount, body.currency || 'USD');
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Body() rawPayload: any,
    @Headers('stripe-signature') stripeSig: string,
    @Headers('paypal-transmission-sig') paypalSig: string,
  ) {
    const signature = stripeSig || paypalSig || 'mock-sig';
    return this.webhookDispatcher.processWebhook(rawPayload, signature);
  }
}
