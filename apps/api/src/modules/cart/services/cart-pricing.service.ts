import { Injectable } from '@nestjs/common';
import { CartSummaryDto } from '@enterprise/types';
import { InternalCartItem } from './cart.service';
import { CouponService } from './coupon.service';
import { calculateJurisdictionTax } from '@enterprise/utils';

@Injectable()
export class CartPricingService {
  constructor(private readonly couponService: CouponService) {}

  async calculateCartTotals(
    cartId: string,
    items: InternalCartItem[],
    couponCode?: string,
  ): Promise<CartSummaryDto> {
    const mappedItems = items.map(item => ({
      ...item,
      totalPrice: Math.round(item.unitPrice * item.quantity * 100) / 100,
    }));

    const subtotal = mappedItems.reduce((acc, i) => acc + i.totalPrice, 0);
    let discountTotal = 0;

    if (couponCode) {
      discountTotal = await this.couponService.calculateDiscount(couponCode, subtotal);
    }

    const discountedSubtotal = Math.max(0, subtotal - discountTotal);
    const taxTotal = calculateJurisdictionTax(discountedSubtotal, 'US', 'CA');
    const estimatedShipping = subtotal > 100 || subtotal === 0 ? 0 : 15.00;
    const grandTotal = Math.round((discountedSubtotal + taxTotal + estimatedShipping) * 100) / 100;

    return {
      cartId,
      items: mappedItems,
      itemCount: items.reduce((acc, i) => acc + i.quantity, 0),
      subtotal: Math.round(subtotal * 100) / 100,
      discountTotal: Math.round(discountTotal * 100) / 100,
      taxTotal: Math.round(taxTotal * 100) / 100,
      estimatedShipping,
      grandTotal,
      appliedCoupon: couponCode,
    };
  }
}
