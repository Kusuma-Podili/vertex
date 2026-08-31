import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, OrderDetailDto, OrderStatus } from '@enterprise/types';
import { generateOrderNumber } from '@enterprise/utils';
import { OrderStateMachineService } from './order-state-machine.service';
import { InvoiceService } from './invoice.service';

@Injectable()
export class OrdersService {
  private orders: OrderDetailDto[] = [
    {
      id: 'ord-001',
      orderNumber: 'ORD-9824-AX7',
      status: OrderStatus.CONFIRMED,
      currency: 'USD',
      subtotal: 349.99,
      shippingFee: 0.0,
      taxAmount: 32.37,
      discountAmount: 0.0,
      totalAmount: 382.36,
      placedAt: new Date().toISOString(),
      items: [
        {
          id: 'oi-1',
          productId: 'prod-aurora-headphones',
          variantId: 'var-1',
          name: 'Aurora Pro ANC Wireless Headphones - Midnight Black',
          sku: 'AURORA-BLK',
          unitPrice: 349.99,
          quantity: 1,
          totalPrice: 349.99,
        }
      ],
      shippingAddress: {
        recipient: 'John Doe',
        streetLine1: '742 Evergreen Terrace',
        city: 'Springfield',
        state: 'OR',
        postalCode: '97477',
        countryCode: 'US',
        phoneNumber: '+1-555-0101',
      },
      tracking: {
        carrier: 'FedEx Express',
        trackingNumber: 'FDX-99882211',
        status: 'In Transit',
        estimatedDelivery: 'Tomorrow, by 4:30 PM',
      }
    }
  ];

  constructor(
    private readonly stateMachine: OrderStateMachineService,
    private readonly invoiceService: InvoiceService,
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto): Promise<OrderDetailDto> {
    const orderNumber = generateOrderNumber();
    const order: OrderDetailDto = {
      id: `ord-${Date.now()}`,
      orderNumber,
      status: OrderStatus.PENDING,
      currency: 'USD',
      subtotal: 349.99,
      shippingFee: 0.0,
      taxAmount: 32.37,
      discountAmount: dto.couponCode ? 35.00 : 0.0,
      totalAmount: dto.couponCode ? 347.36 : 382.36,
      customerNotes: dto.customerNotes,
      placedAt: new Date().toISOString(),
      items: [
        {
          id: `oi-${Date.now()}`,
          productId: 'prod-aurora-headphones',
          variantId: 'var-1',
          name: 'Aurora Pro ANC Wireless Headphones - Midnight Black',
          sku: 'AURORA-BLK',
          unitPrice: 349.99,
          quantity: 1,
          totalPrice: 349.99,
        }
      ],
      shippingAddress: {
        recipient: 'John Doe',
        streetLine1: '742 Evergreen Terrace',
        city: 'Springfield',
        state: 'OR',
        postalCode: '97477',
        countryCode: 'US',
        phoneNumber: '+1-555-0101',
      },
    };

    this.orders.push(order);
    await this.stateMachine.transition(order.id, OrderStatus.PENDING, OrderStatus.CONFIRMED, 'Payment captured');
    await this.invoiceService.generateInvoice(order);

    return order;
  }

  async getUserOrders(userId: string): Promise<OrderDetailDto[]> {
    return this.orders;
  }

  async getOrderDetail(userId: string, orderId: string): Promise<OrderDetailDto> {
    const order = this.orders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (!order) throw new NotFoundException(`Order '${orderId}' not found.`);
    return order;
  }
}
