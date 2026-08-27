import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { RegisterDto, LoginDto, AuthTokens, UserRole } from '@enterprise/types';
import { UsersService } from '../users/users.service';
import { RefreshTokenService } from './services/refresh-token.service';
import { SessionService } from './services/session.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly sessionService: SessionService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('An account with this email address already exists.');
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = this.hashPassword(dto.password, salt);

    const user = await this.usersService.create({
      email: dto.email.toLowerCase().trim(),
      passwordHash: `${salt}:${passwordHash}`,
      firstName: dto.firstName.trim(),
      lastName: dto.lastName.trim(),
      phoneNumber: dto.phoneNumber,
      role: UserRole.CUSTOMER,
    });

    return {
      success: true,
      message: 'User registered successfully. Please verify your email.',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async login(dto: LoginDto, ipAddress: string, userAgent: string): Promise<AuthTokens> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid email or password credentials.');
    }

    const [salt, storedHash] = user.passwordHash.split(':');
    const computedHash = this.hashPassword(dto.password, salt);
    if (computedHash !== storedHash) {
      throw new UnauthorizedException('Invalid email or password credentials.');
    }

    const accessToken = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    const refreshToken = await this.refreshTokenService.generateRefreshToken(user.id);
    await this.sessionService.createSession(user.id, accessToken, refreshToken, ipAddress, userAgent);

    return {
      accessToken,
      refreshToken,
      expiresIn: 3600, // 1 hour
      tokenType: 'Bearer',
    };
  }

  async refreshToken(token: string) {
    const session = await this.sessionService.findSessionByRefreshToken(token);
    if (!session || new Date() > session.expiresAt) {
      throw new UnauthorizedException('Refresh token is expired or invalid.');
    }

    const user = await this.usersService.findById(session.userId);
    if (!user) {
      throw new UnauthorizedException('User account no longer exists.');
    }

    const newAccessToken = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    return {
      accessToken: newAccessToken,
      expiresIn: 3600,
      tokenType: 'Bearer',
    };
  }

  async logout(userId: string, token: string) {
    await this.sessionService.invalidateSession(token);
    return { success: true, message: 'Logged out successfully.' };
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }

  private hashPassword(password: string, salt: string): string {
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  }

  private generateToken(payload: any): string {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const body = Buffer.from(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url');
    const signature = crypto.createHmac('sha256', 'enterprise-super-secret-key-2026').update(`${header}.${body}`).digest('base64url');
    return `${header}.${body}.${signature}`;
  }
}
