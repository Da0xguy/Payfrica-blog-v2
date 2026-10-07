import { Controller, Post, Body, UseGuards, Request, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { RefreshTokenService } from './refresh-token.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({ schema: { type: 'object', properties: { refreshToken: { type: 'string', example: 'abc123...' } } } })
  async refresh(@Body() dto: { refreshToken: string }) {
    return this.refreshTokenService.refreshAccessToken(dto.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout and revoke refresh token' })
  @ApiBody({ schema: { type: 'object', properties: { refreshToken: { type: 'string', example: 'abc123...' } } } })
  async logout(@Body() dto: { refreshToken: string }) {
    return this.refreshTokenService.revokeRefreshToken(dto.refreshToken);
  }

  @Delete('revoke-all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Revoke all refresh tokens for user' })
  async revokeAll(@Request() req: any) {
    return this.refreshTokenService.revokeAllUserTokens(req.user.id);
  }
}
