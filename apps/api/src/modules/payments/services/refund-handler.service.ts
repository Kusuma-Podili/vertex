import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class RefundHandlerService {
  async processRefund(paymentId: string, amount: number, reason: string) {
    return {
      refundId: `ref_${crypto.randomBytes(10).toString('hex')}`,
      paymentId,
      amount,
      reason,
      status: 'SUCCEEDED',
      processedAt: new Date().toISOString(),
    };
  }
}
