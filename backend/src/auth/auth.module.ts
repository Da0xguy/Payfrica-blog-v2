import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PasswordResetService } from './password-reset.service';
import { EmailVerificationService } from './email-verification.service';
import { RefreshTokenService } from './refresh-token.service';
import { PasswordResetController } from './password-reset.controller';
import { EmailVerificationController } from './email-verification.controller';
import { RefreshTokenController } from './refresh-token.controller';
import { EmailService } from '../common/services/email.service';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'your-jwt-secret-key-change-this-in-production',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController, PasswordResetController, EmailVerificationController, RefreshTokenController],
  providers: [AuthService, JwtStrategy, LocalStrategy, PasswordResetService, EmailVerificationService, RefreshTokenService, EmailService],
  exports: [AuthService],
})
export class AuthModule {}
