import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class RefreshTokenService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async generateRefreshToken(userId: string) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await this.prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });

    return token;
  }

  async refreshAccessToken(refreshTokenString: string) {
    const token = await this.prisma.refreshToken.findUnique({
      where: { token: refreshTokenString },
      include: { user: true },
    });

    if (!token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (token.expiresAt < new Date()) {
      await this.prisma.refreshToken.delete({ where: { id: token.id } });
      throw new UnauthorizedException('Refresh token has expired');
    }

    const payload = { sub: token.user.id, email: token.user.email };
    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
  }

  async revokeRefreshToken(refreshTokenString: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { token: refreshTokenString },
    });

    return { message: 'Refresh token revoked' };
  }

  async revokeAllUserTokens(userId: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });

    return { message: 'All refresh tokens revoked' };
  }
}
