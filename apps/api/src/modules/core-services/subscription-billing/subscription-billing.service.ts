import { Injectable, NotFoundException } from '@nestjs/common';
import { roundToTwoDecimals } from '@enterprise/utils';

export interface SubscriptionPlan {
  planId: string;
  name: string;
  billingInterval: 'MONTHLY' | 'ANNUAL';
  priceUsd: number;
  features: string[];
  hardwareWarrantyTier: string;
}

export interface CustomerSubscription {
  subscriptionId: string;
  userId: string;
  planId: string;
  status: 'ACTIVE' | 'PAST_DUE' | 'CANCELLED';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  autoRenew: boolean;
  paymentMethodToken: string;
}

@Injectable()
export class SubscriptionBillingService {
  private plans: SubscriptionPlan[] = [
    {
      planId: 'plan-studio-care-monthly',
      name: 'AURA Studio Care Precision Warranty & Telemetry',
      billingInterval: 'MONTHLY',
      priceUsd: 29.99,
      features: ['24/7 Direct Engineering Concierge', 'Zero-Deductible Accidental Hardware Replacement', 'Free Annual Transducer Recalibration'],
      hardwareWarrantyTier: 'TIER_1_EXECUTIVE',
    },
    {
      planId: 'plan-studio-care-annual',
      name: 'AURA Studio Care Precision Warranty (Annual Prepaid)',
      billingInterval: 'ANNUAL',
      priceUsd: 299.00,
      features: ['All Monthly Features', 'Free Expedited Air Freight on Replacements', 'VIP Beta Hardware Access'],
      hardwareWarrantyTier: 'TIER_1_EXECUTIVE',
    },
  ];

  async getPlans(): Promise<SubscriptionPlan[]> {
    return this.plans;
  }

  async createSubscription(userId: string, planId: string, paymentMethodToken: string): Promise<CustomerSubscription> {
    const plan = this.plans.find(p => p.planId === planId);
    if (!plan) throw new NotFoundException(`Plan '${planId}' does not exist.`);

    const now = new Date();
    const periodEnd = new Date(now);
    if (plan.billingInterval === 'ANNUAL') {
      periodEnd.setFullYear(now.getFullYear() + 1);
    } else {
      periodEnd.setMonth(now.getMonth() + 1);
    }

    const sub: CustomerSubscription = {
      subscriptionId: `sub-${Date.now()}`,
      userId,
      planId,
      status: 'ACTIVE',
      currentPeriodStart: now.toISOString(),
      currentPeriodEnd: periodEnd.toISOString(),
      autoRenew: true,
      paymentMethodToken,
    };

    return sub;
  }
}
