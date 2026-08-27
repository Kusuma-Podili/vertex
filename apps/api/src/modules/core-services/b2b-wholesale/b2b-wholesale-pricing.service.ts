import { Injectable, NotFoundException } from '@nestjs/common';
import { roundToTwoDecimals } from '@enterprise/utils';

export interface B2BAccountProfile {
  companyId: string;
  companyName: string;
  taxExemptionNumber?: string;
  creditLimitUsd: number;
  availableCreditUsd: number;
  paymentTerms: 'NET_30' | 'NET_60' | 'IMMEDIATE';
  customPriceTierMultiplier: number; // e.g. 0.80 for 20% discount off MSRP
  isVerifiedWholesale: boolean;
}

export interface B2BQuoteRequest {
  companyId: string;
  items: { sku: string; basePrice: number; quantity: number }[];
  shippingDestination: { country: string; state: string };
}

@Injectable()
export class B2BWholesalePricingService {
  private accounts = new Map<string, B2BAccountProfile>([
    ['corp-001', {
      companyId: 'corp-001',
      companyName: 'Cyberdyne Advanced Audio Systems Inc.',
      taxExemptionNumber: 'TAX-EX-CA-99201',
      creditLimitUsd: 150000.00,
      availableCreditUsd: 142000.00,
      paymentTerms: 'NET_30',
      customPriceTierMultiplier: 0.78, // 22% corporate discount
      isVerifiedWholesale: true,
    }],
    ['corp-002', {
      companyId: 'corp-002',
      companyName: 'Neural Research Workstations LLC',
      taxExemptionNumber: 'TAX-EX-TX-44119',
      creditLimitUsd: 250000.00,
      availableCreditUsd: 250000.00,
      paymentTerms: 'NET_60',
      customPriceTierMultiplier: 0.75, // 25% corporate discount
      isVerifiedWholesale: true,
    }],
  ]);

  async generateWholesaleQuote(request: B2BQuoteRequest) {
    const account = this.accounts.get(request.companyId);
    if (!account) {
      throw new NotFoundException(`B2B Corporate Account '${request.companyId}' not found.`);
    }

    const calculatedItems = request.items.map(item => {
      let volumeDiscountBonus = 0;
      if (item.quantity >= 100) volumeDiscountBonus = 0.05;
      else if (item.quantity >= 50) volumeDiscountBonus = 0.03;
      else if (item.quantity >= 20) volumeDiscountBonus = 0.01;

      const finalMultiplier = Math.max(0.50, account.customPriceTierMultiplier - volumeDiscountBonus);
      const negotiatedUnitPrice = roundToTwoDecimals(item.basePrice * finalMultiplier);
      const lineTotal = roundToTwoDecimals(negotiatedUnitPrice * item.quantity);
      const msrpTotal = roundToTwoDecimals(item.basePrice * item.quantity);

      return {
        sku: item.sku,
        quantity: item.quantity,
        msrpUnitPrice: item.basePrice,
        negotiatedUnitPrice,
        lineTotal,
        totalSavings: roundToTwoDecimals(msrpTotal - lineTotal),
      };
    });

    const subtotal = calculatedItems.reduce((acc, i) => acc + i.lineTotal, 0);
    const msrpSubtotal = calculatedItems.reduce((acc, i) => acc + (i.msrpUnitPrice * i.quantity), 0);
    const estimatedFreight = subtotal > 5000 ? 0.0 : 150.0;
    const isTaxExempt = !!account.taxExemptionNumber;
    const taxAmount = isTaxExempt ? 0.0 : roundToTwoDecimals(subtotal * 0.0825);
    const grandTotal = roundToTwoDecimals(subtotal + estimatedFreight + taxAmount);

    return {
      quoteId: `QT-${Date.now()}`,
      companyId: account.companyId,
      companyName: account.companyName,
      paymentTerms: account.paymentTerms,
      isTaxExempt,
      taxExemptionCertificate: account.taxExemptionNumber,
      items: calculatedItems,
      msrpSubtotal,
      negotiatedSubtotal: subtotal,
      totalCorporateSavings: roundToTwoDecimals(msrpSubtotal - subtotal),
      estimatedFreight,
      taxAmount,
      grandTotal,
      validUntil: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
    };
  }
}
