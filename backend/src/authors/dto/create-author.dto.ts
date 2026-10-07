import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: '/uploads/avatar.jpg' })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  role: string;

  @ApiProperty({ example: 'Software developer and tech writer' })
  @IsString()
  bio: string;

  @ApiPropertyOptional({ example: 'https://twitter.com/johndoe' })
  @IsOptional()
  @IsString()
  twitter?: string;

  @ApiPropertyOptional({ example: 'https://linkedin.com/in/johndoe' })
  @IsOptional()
  @IsString()
  linkedin?: string;
}
