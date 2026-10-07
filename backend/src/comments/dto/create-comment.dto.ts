import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  authorName: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsString()
  @IsEmail()
  authorEmail: string;

  @ApiProperty({ example: 'Great article!' })
  @IsString()
  content: string;

  @ApiProperty({ example: 'cl1234567890' })
  @IsString()
  postId: string;

  @ApiPropertyOptional({ example: 'cl0987654321' })
  @IsOptional()
  @IsString()
  parentId?: string;
}
