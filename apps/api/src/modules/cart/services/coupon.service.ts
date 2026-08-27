import { Injectable, BadRequestException } from '@nestjs/common';
import { DiscountType } from '@enterprise/types';

export interface CouponData {
  code: string;
  type: DiscountType;
  value: number;
  minSpend?: number;
  maxDiscount?: number;
}

@Injectable()
export class CouponService {
  private coupons = new Map<string, CouponData>([
    ['WELCOME10', { code: 'WELCOME10', type: DiscountType.PERCENTAGE, value: 10, minSpend: 50, maxDiscount: 50 }],
    ['SAVE50', { code: 'SAVE50', type: DiscountType.FIXED_AMOUNT, value: 50, minSpend: 250 }],
    ['FREESHIP', { code: 'FREESHIP', type: DiscountType.FREE_SHIPPING, value: 0 }],
  ]);

  async validateCoupon(code: string): Promise<CouponData> {
    const coupon = this.coupons.get(code.toUpperCase());
    if (!coupon) {
      throw new BadRequestException(`Coupon code '${code}' is invalid or expired.`);
    }
    return coupon;
  }

  async calculateDiscount(code: string, subtotal: number): Promise<number> {
    const coupon = await this.validateCoupon(code);
    if (coupon.minSpend && subtotal < coupon.minSpend) {
      return 0;
    }

    if (coupon.type === DiscountType.PERCENTAGE) {
      const discount = (subtotal * coupon.value) / 100;
      return coupon.maxDiscount ? Math.min(discount, coupon.maxDiscount) : discount;
    } else if (coupon.type === DiscountType.FIXED_AMOUNT) {
      return Math.min(subtotal, coupon.value);
    }
    return 0;
  }
}
