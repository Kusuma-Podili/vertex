import { Injectable } from '@nestjs/common';

export interface ProductCoOccurrence {
  productIdA: string;
  productIdB: string;
  coOccurrenceScore: number;
}

@Injectable()
export class RecommendationMatrixService {
  private coOccurrenceMatrix = new Map<string, Map<string, number>>();

  recordOrderCoPurchase(productIds: string[]) {
    for (let i = 0; i < productIds.length; i++) {
      for (let j = 0; j < productIds.length; j++) {
        if (i !== j) {
          const a = productIds[i];
          const b = productIds[j];
          if (!this.coOccurrenceMatrix.has(a)) {
            this.coOccurrenceMatrix.set(a, new Map<string, number>());
          }
          const mapA = this.coOccurrenceMatrix.get(a)!;
          mapA.set(b, (mapA.get(b) || 0) + 1);
        }
      }
    }
  }

  getTopFrequentlyBoughtTogether(productId: string, limit = 4): string[] {
    const associations = this.coOccurrenceMatrix.get(productId);
    if (!associations) return [];

    return Array.from(associations.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(entry => entry[0]);
  }
}
