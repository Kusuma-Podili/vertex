import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './services/reviews.service';
import { RatingAggregatorService } from './services/rating-aggregator.service';
import { ReviewModerationService } from './services/review-moderation.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, RatingAggregatorService, ReviewModerationService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
