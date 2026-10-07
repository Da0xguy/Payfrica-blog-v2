import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto) {
    return this.prisma.author.create({
      data: createAuthorDto,
    });
  }

  async findAll(pagination?: { skip: number; limit: number }) {
    const authors = await this.prisma.author.findMany({
      skip: pagination?.skip || 0,
      take: pagination?.limit || 10,
    });

    const total = await this.prisma.author.count();

    return {
      data: authors,
      meta: {
        total,
        page: pagination ? Math.floor(pagination.skip / pagination.limit) + 1 : 1,
        limit: pagination?.limit || 10,
        totalPages: Math.ceil(total / (pagination?.limit || 10)),
      },
    };
  }

  async findOne(name: string) {
    const author = await this.prisma.author.findUnique({
      where: { name },
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    return this.prisma.author.update({
      where: { id },
      data: updateAuthorDto,
    });
  }

  async remove(id: string) {
    return this.prisma.author.delete({
      where: { id },
    });
  }
}
