import { Injectable } from '@nestjs/common';
import { CreateReviewDto, ReviewItemDto } from '@enterprise/types';
import { RatingAggregatorService } from './rating-aggregator.service';
import { ReviewModerationService } from './review-moderation.service';

@Injectable()
export class ReviewsService {
  private reviews: (ReviewItemDto & { productId: string; userId: string })[] = [
    {
      id: 'rev-1',
      productId: 'prod-aurora-headphones',
      userId: 'usr-customer-john',
      rating: 5,
      title: 'Remarkable soundstage and ANC performance',
      comment: 'The noise cancellation completely blocks out subway chatter and airplane engine drone. Beryllium drivers reproduce crisp instrument separation.',
      authorName: 'John Doe',
      isVerified: true,
      helpfulCount: 42,
      createdAt: '2026-08-20T14:30:00Z',
    },
    {
      id: 'rev-2',
      productId: 'prod-aurora-headphones',
      userId: 'usr-customer-sarah',
      rating: 5,
      title: 'Comfortable for 10+ hour listening sessions',
      comment: 'Super light headband weight distribution. Battery holds up to the advertised 40 hours easily.',
      authorName: 'Sarah C.',
      isVerified: true,
      helpfulCount: 18,
      createdAt: '2026-08-22T09:15:00Z',
    }
  ];

  constructor(
    private readonly ratingAggregator: RatingAggregatorService,
    private readonly moderationService: ReviewModerationService,
  ) {}

  async getReviewsForProduct(productId: string): Promise<ReviewItemDto[]> {
    return this.reviews.filter(r => r.productId === productId);
  }

  async createReview(userId: string, authorName: string, dto: CreateReviewDto): Promise<ReviewItemDto> {
    this.moderationService.checkSpam(dto.comment);

    const newReview = {
      id: `rev-${Date.now()}`,
      productId: dto.productId,
      userId,
      rating: dto.rating,
      title: dto.title,
      comment: dto.comment,
      authorName,
      isVerified: true,
      helpfulCount: 0,
      createdAt: new Date().toISOString(),
    };

    this.reviews.unshift(newReview);
    return newReview;
  }
}
