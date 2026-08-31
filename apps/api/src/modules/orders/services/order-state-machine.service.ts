import { Injectable, BadRequestException } from '@nestjs/common';
import { OrderStatus } from '@enterprise/types';

@Injectable()
export class OrderStateMachineService {
  private allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.PENDING]: [OrderStatus.PAYMENT_PROCESSING, OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
    [OrderStatus.PAYMENT_PROCESSING]: [OrderStatus.CONFIRMED, OrderStatus.FAILED, OrderStatus.CANCELLED],
    [OrderStatus.CONFIRMED]: [OrderStatus.PROCESSING, OrderStatus.FULFILLING, OrderStatus.CANCELLED],
    [OrderStatus.PROCESSING]: [OrderStatus.FULFILLING, OrderStatus.CANCELLED],
    [OrderStatus.FULFILLING]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
    [OrderStatus.SHIPPED]: [OrderStatus.OUT_FOR_DELIVERY, OrderStatus.DELIVERED, OrderStatus.RETURNED],
    [OrderStatus.OUT_FOR_DELIVERY]: [OrderStatus.DELIVERED, OrderStatus.RETURNED],
    [OrderStatus.DELIVERED]: [OrderStatus.REFUND_REQUESTED, OrderStatus.RETURNED],
    [OrderStatus.REFUND_REQUESTED]: [OrderStatus.REFUNDED, OrderStatus.CONFIRMED],
    [OrderStatus.CANCELLED]: [],
    [OrderStatus.REFUNDED]: [],
    [OrderStatus.RETURNED]: [OrderStatus.REFUNDED],
    [OrderStatus.FAILED]: [OrderStatus.PENDING, OrderStatus.CANCELLED],
  };

  async transition(
    orderId: string,
    currentStatus: OrderStatus,
    targetStatus: OrderStatus,
    reason?: string,
  ): Promise<boolean> {
    const allowed = this.allowedTransitions[currentStatus] || [];
    if (!allowed.includes(targetStatus)) {
      throw new BadRequestException(
        `Invalid order status transition from '${currentStatus}' to '${targetStatus}'.`
      );
    }
    console.log(`[OrderStateMachine] Order ${orderId}: ${currentStatus} -> ${targetStatus} (${reason || 'Standard progression'})`);
    return true;
  }
}
