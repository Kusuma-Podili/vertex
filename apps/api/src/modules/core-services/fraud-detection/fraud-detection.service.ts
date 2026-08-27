import { Injectable } from '@nestjs/common';

export interface OrderFraudRiskAssessment {
  score: number; // 0 to 100
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'BLOCKED';
  reasons: string[];
  recommendedAction: 'APPROVE' | 'MANUAL_REVIEW' | 'REJECT';
}

@Injectable()
export class FraudDetectionService {
  private highRiskCountries = ['KP', 'IR', 'SY'];
  private velocityTracker = new Map<string, number[]>();

  async assessRisk(
    userId: string,
    orderAmount: number,
    ipAddress: string,
    countryCode: string,
    cardCountryCode: string
  ): Promise<OrderFraudRiskAssessment> {
    let score = 0;
    const reasons: string[] = [];

    // 1. Check IP Velocity (Orders placed in last 10 minutes)
    const now = Date.now();
    const timestamps = this.velocityTracker.get(ipAddress) || [];
    const recentAttempts = timestamps.filter(t => now - t < 10 * 60 * 1000);
    recentAttempts.push(now);
    this.velocityTracker.set(ipAddress, recentAttempts);

    if (recentAttempts.length > 5) {
      score += 45;
      reasons.push('High transaction velocity from client IP address');
    }

    // 2. Country Mismatch
    if (countryCode !== cardCountryCode) {
      score += 25;
      reasons.push('Billing address country does not match card issuing country');
    }

    // 3. High-Risk Destination
    if (this.highRiskCountries.includes(countryCode.toUpperCase())) {
      score += 60;
      reasons.push('Order destination matches sanctioned high-risk territory');
    }

    // 4. Large Transaction Volume
    if (orderAmount > 5000) {
      score += 20;
      reasons.push('High monetary transaction volume requires secondary verification');
    }

    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'BLOCKED' = 'LOW';
    let action: 'APPROVE' | 'MANUAL_REVIEW' | 'REJECT' = 'APPROVE';

    if (score >= 70) {
      riskLevel = 'BLOCKED';
      action = 'REJECT';
    } else if (score >= 40) {
      riskLevel = 'HIGH';
      action = 'MANUAL_REVIEW';
    } else if (score >= 20) {
      riskLevel = 'MEDIUM';
      action = 'MANUAL_REVIEW';
    }

    return {
      score,
      riskLevel,
      reasons,
      recommendedAction: action,
    };
  }
}
