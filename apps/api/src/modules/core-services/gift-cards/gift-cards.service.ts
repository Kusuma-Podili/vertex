import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';
import { roundToTwoDecimals } from '@enterprise/utils';

export interface GiftCardRecord {
  code: string;
  initialBalanceUsd: number;
  currentBalanceUsd: number;
  currency: string;
  recipientEmail: string;
  senderName: string;
  personalMessage?: string;
  isActive: boolean;
  issuedAt: string;
  expiresAt: string;
}

@Injectable()
export class GiftCardsService {
  private cards = new Map<string, GiftCardRecord>();

  async issueCard(initialBalanceUsd: number, recipientEmail: string, senderName: string, message?: string): Promise<GiftCardRecord> {
    const code = this.generateGiftCardCode();
    const card: GiftCardRecord = {
      code,
      initialBalanceUsd,
      currentBalanceUsd: initialBalanceUsd,
      currency: 'USD',
      recipientEmail,
      senderName,
      personalMessage: message,
      isActive: true,
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 5 * 365 * 24 * 3600 * 1000).toISOString(), // 5-year expiry
    };

    this.cards.set(code, card);
    return card;
  }

  async redeemCard(code: string, amountToDeduct: number) {
    const card = this.cards.get(code.toUpperCase().trim());
    if (!card || !card.isActive) {
      throw new NotFoundException('Gift card code is invalid or deactivated.');
    }
    if (card.currentBalanceUsd < amountToDeduct) {
      throw new BadRequestException(`Insufficient gift card balance. Remaining: $${card.currentBalanceUsd}`);
    }

    card.currentBalanceUsd = roundToTwoDecimals(card.currentBalanceUsd - amountToDeduct);
    return {
      code: card.code,
      amountDeducted: amountToDeduct,
      remainingBalance: card.currentBalanceUsd,
    };
  }

  private generateGiftCardCode(): string {
    const p1 = crypto.randomBytes(2).toString('hex').toUpperCase();
    const p2 = crypto.randomBytes(2).toString('hex').toUpperCase();
    const p3 = crypto.randomBytes(2).toString('hex').toUpperCase();
    const p4 = crypto.randomBytes(2).toString('hex').toUpperCase();
    return `AURA-${p1}-${p2}-${p3}-${p4}`;
  }
}
