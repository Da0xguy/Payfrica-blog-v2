import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { EmailVerificationService } from './email-verification.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class EmailVerificationController {
  constructor(private readonly emailVerificationService: EmailVerificationService) {}

  @Post('send-verification-email')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send email verification' })
  async sendVerificationEmail(@Request() req: any) {
    return this.emailVerificationService.sendVerificationEmail(req.user.id, req.user.email);
  }

  @Post('verify-email')
  @ApiOperation({ summary: 'Verify email with token' })
  @ApiBody({ schema: { type: 'object', properties: { token: { type: 'string', example: 'abc123...' } } } })
  async verifyEmail(@Body() dto: { token: string }) {
    return this.emailVerificationService.verifyEmail(dto.token);
  }
}
