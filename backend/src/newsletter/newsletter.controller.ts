import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { NewsletterService } from './newsletter.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  @ApiOperation({ summary: 'Subscribe to newsletter' })
  @ApiBody({ schema: { type: 'object', properties: { email: { type: 'string', example: 'subscriber@example.com' } } } })
  subscribe(@Body() dto: { email: string }) {
    return this.newsletterService.subscribe(dto.email);
  }

  @Post('unsubscribe')
  @ApiOperation({ summary: 'Unsubscribe from newsletter' })
  @ApiBody({ schema: { type: 'object', properties: { email: { type: 'string', example: 'subscriber@example.com' } } } })
  unsubscribe(@Body() dto: { email: string }) {
    return this.newsletterService.unsubscribe(dto.email);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a newsletter entry' })
  @ApiBody({ type: CreateNewsletterDto })
  create(@Body() createNewsletterDto: CreateNewsletterDto) {
    return this.newsletterService.create(createNewsletterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all newsletter subscribers' })
  findAll() {
    return this.newsletterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single newsletter subscriber by ID' })
  @ApiParam({ name: 'id', description: 'Subscriber ID' })
  findOne(@Param('id') id: string) {
    return this.newsletterService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a newsletter subscriber' })
  @ApiParam({ name: 'id', description: 'Subscriber ID' })
  @ApiBody({ type: UpdateNewsletterDto })
  update(@Param('id') id: string, @Body() updateNewsletterDto: UpdateNewsletterDto) {
    return this.newsletterService.update(id, updateNewsletterDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a newsletter subscriber' })
  @ApiParam({ name: 'id', description: 'Subscriber ID' })
  remove(@Param('id') id: string) {
    return this.newsletterService.remove(id);
  }
}
