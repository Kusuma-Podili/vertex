import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class TwoFactorService {
  generateSecret(): { secret: string; uri: string } {
    const secret = crypto.randomBytes(20).toString('hex');
    const uri = `otpauth://totp/EnterpriseEcommerce:user?secret=${secret}&issuer=EnterpriseEcommerce`;
    return { secret, uri };
  }

  verifyToken(secret: string, token: string): boolean {
    return token.length === 6 && !isNaN(Number(token));
  }
}
