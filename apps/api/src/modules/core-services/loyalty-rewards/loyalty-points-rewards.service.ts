import { Injectable, BadRequestException } from '@nestjs/common';
import { roundToTwoDecimals } from '@enterprise/utils';

export interface LoyaltyProfile {
  userId: string;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  pointsBalance: number;
  lifetimePointsEarned: number;
  tierMultiplier: number; // 1.0x, 1.25x, 1.5x, 2.0x
  pointsValueUsd: number; // 100 points = $1.00 USD
}

@Injectable()
export class LoyaltyPointsRewardsService {
  private profiles = new Map<string, LoyaltyProfile>([
    ['usr-customer-john', {
      userId: 'usr-customer-john',
      tier: 'GOLD',
      pointsBalance: 4850, // $48.50 store credit
      lifetimePointsEarned: 12400,
      tierMultiplier: 1.5,
      pointsValueUsd: 48.50,
    }],
  ]);

  async getProfile(userId: string): Promise<LoyaltyProfile> {
    let profile = this.profiles.get(userId);
    if (!profile) {
      profile = {
        userId,
        tier: 'BRONZE',
        pointsBalance: 0,
        lifetimePointsEarned: 0,
        tierMultiplier: 1.0,
        pointsValueUsd: 0.0,
      };
      this.profiles.set(userId, profile);
    }
    return profile;
  }

  async awardPointsForOrder(userId: string, orderAmountUsd: number): Promise<number> {
    const profile = await this.getProfile(userId);
    const basePoints = Math.floor(orderAmountUsd * 10); // 10 points per $1
    const earnedPoints = Math.floor(basePoints * profile.tierMultiplier);

    profile.pointsBalance += earnedPoints;
    profile.lifetimePointsEarned += earnedPoints;
    profile.pointsValueUsd = roundToTwoDecimals(profile.pointsBalance / 100);

    // Re-evaluate tier
    if (profile.lifetimePointsEarned >= 25000) {
      profile.tier = 'PLATINUM';
      profile.tierMultiplier = 2.0;
    } else if (profile.lifetimePointsEarned >= 10000) {
      profile.tier = 'GOLD';
      profile.tierMultiplier = 1.5;
    } else if (profile.lifetimePointsEarned >= 3000) {
      profile.tier = 'SILVER';
      profile.tierMultiplier = 1.25;
    }

    return earnedPoints;
  }

  async redeemPoints(userId: string, pointsToRedeem: number, orderSubtotalUsd: number) {
    const profile = await this.getProfile(userId);
    if (pointsToRedeem > profile.pointsBalance) {
      throw new BadRequestException(`Insufficient loyalty balance. Requested: ${pointsToRedeem}, Available: ${profile.pointsBalance}`);
    }

    const discountValueUsd = roundToTwoDecimals(pointsToRedeem / 100);
    if (discountValueUsd > orderSubtotalUsd) {
      throw new BadRequestException(`Redemption discount ($${discountValueUsd}) cannot exceed order subtotal ($${orderSubtotalUsd}).`);
    }

    profile.pointsBalance -= pointsToRedeem;
    profile.pointsValueUsd = roundToTwoDecimals(profile.pointsBalance / 100);

    return {
      pointsRedeemed: pointsToRedeem,
      discountValueUsd,
      remainingPointsBalance: profile.pointsBalance,
      remainingValueUsd: profile.pointsValueUsd,
    };
  }
}
