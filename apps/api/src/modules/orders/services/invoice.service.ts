import { Injectable } from '@nestjs/common';
import { OrderDetailDto } from '@enterprise/types';

@Injectable()
export class InvoiceService {
  async generateInvoice(order: OrderDetailDto) {
    const invoiceNumber = `INV-${order.orderNumber}`;
    return {
      invoiceNumber,
      orderId: order.id,
      pdfUrl: `https://enterprise-ecommerce.internal/invoices/${invoiceNumber}.pdf`,
      issuedAt: new Date().toISOString(),
    };
  }
}
