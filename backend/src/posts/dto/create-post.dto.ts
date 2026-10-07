import { IsString, IsBoolean, IsArray, IsOptional, IsDateString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { IsSlug } from '../../common/decorators/custom-validators.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'My First Blog Post', minLength: 5, maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: 'my-first-blog-post' })
  @IsString()
  @IsNotEmpty()
  @IsSlug()
  slug: string;

  @ApiProperty({ example: 'An introduction to my blog', minLength: 10, maxLength: 500 })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  excerpt: string;

  @ApiProperty({ example: 'This is the full content of the blog post...' })
  @IsString()
  @IsNotEmpty()
  @MinLength(50)
  content: string;

  @ApiPropertyOptional({ example: '/uploads/image.jpg' })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiProperty({ example: 'technology' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiPropertyOptional({ example: '2024-01-01' })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiProperty({ example: '5 min read' })
  @IsString()
  @IsNotEmpty()
  readTime: string;

  @ApiProperty({ example: ['javascript', 'nestjs'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional({ example: '2024-01-01' })
  @IsOptional()
  @IsDateString()
  scheduledDate?: Date;
}
