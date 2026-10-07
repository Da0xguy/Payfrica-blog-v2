import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsletterService {
  constructor(private prisma: PrismaService) {}

  async subscribe(email: string) {
    try {
      return await this.prisma.newsletterSubscriber.create({
        data: { email },
      });
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new ConflictException('Email already subscribed');
      }
      throw e;
    }
  }

  async unsubscribe(email: string) {
    const subscriber = await this.prisma.newsletterSubscriber.findUnique({
      where: { email },
    });
    if (!subscriber) {
      throw new NotFoundException('Email not found in newsletter');
    }
    return this.prisma.newsletterSubscriber.delete({
      where: { email },
    });
  }

  async create(createNewsletterDto: CreateNewsletterDto) {
    return this.prisma.newsletterSubscriber.create({
      data: createNewsletterDto,
    });
  }

  async findAll() {
    return this.prisma.newsletterSubscriber.findMany();
  }

  async findOne(id: string) {
    const subscriber = await this.prisma.newsletterSubscriber.findUnique({
      where: { id },
    });

    if (!subscriber) {
      throw new NotFoundException('Newsletter subscriber not found');
    }

    return subscriber;
  }

  async update(id: string, updateNewsletterDto: UpdateNewsletterDto) {
    return this.prisma.newsletterSubscriber.update({
      where: { id },
      data: updateNewsletterDto,
    });
  }

  async remove(id: string) {
    return this.prisma.newsletterSubscriber.delete({
      where: { id },
    });
  }
}
