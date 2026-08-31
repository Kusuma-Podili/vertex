import { Injectable } from '@nestjs/common';

@Injectable()
export class RatingAggregatorService {
  calculateAggregate(ratings: number[]): { average: number; count: number } {
    if (ratings.length === 0) return { average: 0, count: 0 };
    const sum = ratings.reduce((acc, r) => acc + r, 0);
    return {
      average: Math.round((sum / ratings.length) * 100) / 100,
      count: ratings.length,
    };
  }
}
