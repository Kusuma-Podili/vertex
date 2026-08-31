import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendOrderConfirmationEmail(to: string, orderNumber: string, total: number) {
    console.log(`[EmailService] Sent Order Confirmation to ${to} for order ${orderNumber} ($${total})`);
    return true;
  }

  async sendShippingUpdateEmail(to: string, orderNumber: string, trackingNumber: string) {
    console.log(`[EmailService] Sent Shipping Tracking to ${to} for order ${orderNumber} (${trackingNumber})`);
    return true;
  }
}
