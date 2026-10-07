import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../common/services/email.service';
import * as crypto from 'crypto';

@Injectable()
export class EmailVerificationService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async sendVerificationEmail(userId: string, email: string) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 86400000); // 24 hours

    await this.prisma.emailVerificationToken.upsert({
      where: { userId },
      create: {
        token,
        userId,
        expiresAt,
      },
      update: {
        token,
        expiresAt,
      },
    });

    await this.emailService.sendVerificationEmail(email, token);

    return { message: 'Verification email sent' };
  }

  async verifyEmail(token: string) {
    const verificationToken = await this.prisma.emailVerificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verificationToken) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    if (verificationToken.expiresAt < new Date()) {
      await this.prisma.emailVerificationToken.delete({ where: { id: verificationToken.id } });
      throw new BadRequestException('Verification token has expired');
    }

    await this.prisma.user.update({
      where: { id: verificationToken.userId },
      data: { isEmailVerified: true },
    });

    await this.prisma.emailVerificationToken.delete({ where: { id: verificationToken.id } });

    return { message: 'Email verified successfully' };
  }
}
