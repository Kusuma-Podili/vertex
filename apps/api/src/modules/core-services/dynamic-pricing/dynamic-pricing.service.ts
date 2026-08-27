import { Injectable } from '@nestjs/common';
import { roundToTwoDecimals } from '@enterprise/utils';

export interface VolumeTier {
  minQuantity: number;
  discountPercentage: number;
}

@Injectable()
export class DynamicPricingEngineService {
  private defaultVolumeTiers: VolumeTier[] = [
    { minQuantity: 5, discountPercentage: 5 },
    { minQuantity: 10, discountPercentage: 10 },
    { minQuantity: 25, discountPercentage: 15 },
    { minQuantity: 50, discountPercentage: 20 },
    { minQuantity: 100, discountPercentage: 25 },
  ];

  calculateTieredPrice(unitBasePrice: number, quantity: number, customTiers?: VolumeTier[]) {
    const tiers = customTiers || this.defaultVolumeTiers;
    const sorted = [...tiers].sort((a, b) => b.minQuantity - a.minQuantity);
    const matchedTier = sorted.find(t => quantity >= t.minQuantity);

    const discountPercent = matchedTier ? matchedTier.discountPercentage : 0;
    const effectiveUnitPrice = roundToTwoDecimals(unitBasePrice * (1 - discountPercent / 100));
    const totalPrice = roundToTwoDecimals(effectiveUnitPrice * quantity);
    const totalSavings = roundToTwoDecimals((unitBasePrice * quantity) - totalPrice);

    return {
      baseUnitPrice: unitBasePrice,
      quantity,
      appliedDiscountPercentage: discountPercent,
      effectiveUnitPrice,
      totalPrice,
      totalSavings,
    };
  }
}
