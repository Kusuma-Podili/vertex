import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenService } from './services/refresh-token.service';
import { PasswordResetService } from './services/password-reset.service';
import { TwoFactorService } from './services/two-factor.service';
import { SessionService } from './services/session.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshTokenService,
    PasswordResetService,
    TwoFactorService,
    SessionService,
  ],
  exports: [AuthService, SessionService],
})
export class AuthModule {}
