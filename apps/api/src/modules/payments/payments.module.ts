import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './services/payments.service';
import { StripeGatewayService } from './services/stripe-gateway.service';
import { PaypalGatewayService } from './services/paypal-gateway.service';
import { WebhookDispatcherService } from './services/webhook-dispatcher.service';
import { RefundHandlerService } from './services/refund-handler.service';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    StripeGatewayService,
    PaypalGatewayService,
    WebhookDispatcherService,
    RefundHandlerService,
  ],
  exports: [PaymentsService, WebhookDispatcherService],
})
export class PaymentsModule {}
