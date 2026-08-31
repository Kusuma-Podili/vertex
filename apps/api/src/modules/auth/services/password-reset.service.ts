import { Injectable, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class PasswordResetService {
  private resetTokens = new Map<string, { userId: string; expiresAt: Date }>();

  async requestPasswordReset(email: string): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    this.resetTokens.set(token, {
      userId: email,
      expiresAt: new Date(Date.now() + 3600 * 1000), // 1 hour
    });
    return token;
  }

  async verifyResetToken(token: string): Promise<string> {
    const entry = this.resetTokens.get(token);
    if (!entry || new Date() > entry.expiresAt) {
      throw new NotFoundException('Password reset token is invalid or expired.');
    }
    return entry.userId;
  }
}
