import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsletterDto {
  @ApiProperty({ example: 'subscriber@example.com' })
  @IsEmail()
  email: string;
}
