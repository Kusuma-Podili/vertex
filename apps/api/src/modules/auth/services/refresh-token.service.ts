import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class RefreshTokenService {
  async generateRefreshToken(userId: string): Promise<string> {
    const buffer = crypto.randomBytes(40);
    return `${userId}.${buffer.toString('hex')}`;
  }
}
