import { Injectable, BadRequestException } from '@nestjs/common';
import { OrderStateMachineService } from '../../orders/services/order-state-machine.service';
import { OrderStatus, PaymentStatus } from '@enterprise/types';

@Injectable()
export class WebhookDispatcherService {
  private processedEvents = new Set<string>();

  constructor(private readonly orderStateMachine: OrderStateMachineService) {}

  async processWebhook(payload: any, signature: string) {
    const eventId = payload.id || payload.eventId || `evt-${Date.now()}`;

    // Idempotency check
    if (this.processedEvents.has(eventId)) {
      return { received: true, status: 'already_processed' };
    }

    const eventType = payload.type || 'payment_intent.succeeded';
    const orderId = payload.data?.orderId || 'ord-001';

    if (eventType === 'payment_intent.succeeded' || eventType === 'CHECKOUT.ORDER.APPROVED') {
      await this.orderStateMachine.transition(orderId, OrderStatus.PENDING, OrderStatus.CONFIRMED, 'Webhook payment confirmed');
    } else if (eventType === 'payment_intent.payment_failed') {
      await this.orderStateMachine.transition(orderId, OrderStatus.PENDING, OrderStatus.FAILED, 'Webhook payment failure');
    }

    this.processedEvents.add(eventId);
    return { received: true, eventId, status: 'processed' };
  }
}
