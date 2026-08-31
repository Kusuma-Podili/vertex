import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or malformed Authorization header.');
    }

    const token = authHeader.split(' ')[1];
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format');

      const expectedSig = crypto.createHmac('sha256', 'enterprise-super-secret-key-2026').update(`${parts[0]}.${parts[1]}`).digest('base64url');
      if (expectedSig !== parts[2]) {
        throw new UnauthorizedException('Invalid JWT signature.');
      }

      const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf-8'));
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        throw new UnauthorizedException('JWT token has expired.');
      }

      request.user = payload;
      request.token = token;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token credentials.');
    }
  }
}
