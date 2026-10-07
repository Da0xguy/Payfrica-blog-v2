import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { IsSlug, IsHexColor } from '../../common/decorators/custom-validators.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Technology', minLength: 2, maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: 'technology' })
  @IsString()
  @IsNotEmpty()
  @IsSlug()
  slug: string;

  @ApiProperty({ example: '#3B82F6' })
  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @ApiProperty({ example: '#FFFFFF' })
  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  textColor: string;

  @ApiProperty({ example: 'Technology related posts', minLength: 10, maxLength: 500 })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  description: string;
}
