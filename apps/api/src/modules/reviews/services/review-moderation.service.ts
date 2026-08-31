import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ReviewModerationService {
  private bannedKeywords = ['viagra', 'casino', 'free money', 'crypto scam'];

  checkSpam(content: string): boolean {
    const lower = content.toLowerCase();
    for (const kw of this.bannedKeywords) {
      if (lower.includes(kw)) {
        throw new BadRequestException('Review failed automated moderation filters.');
      }
    }
    return true;
  }
}
