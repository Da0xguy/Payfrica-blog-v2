import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    // Find category and author by slug/name
    const category = await this.prisma.category.findUnique({
      where: { slug: createPostDto.category },
    });
    const author = await this.prisma.author.findUnique({
      where: { name: createPostDto.author },
    });

    if (!category || !author) {
      throw new NotFoundException('Category or author not found');
    }

    const { category: cat, author: auth, date, ...postData } = createPostDto;

    // Convert date string to Date object if provided
    let parsedDate: Date | undefined;
    if (date) {
      parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        parsedDate = new Date(); // Fallback to current date if invalid
      }
    }

    return this.prisma.post.create({
      data: {
        ...postData,
        categoryId: category.id,
        authorId: author.id,
        date: parsedDate,
      },
      include: {
        author: true,
        category: true,
      },
    });
  }

  async findAll(filters?: { category?: string; author?: string; tag?: string; search?: string; dateFrom?: string; dateTo?: string; isPublished?: boolean }, pagination?: { skip: number; limit: number }) {
    const where: any = {};
    
    if (filters?.category) {
      where.category = { slug: filters.category };
    }
    
    if (filters?.author) {
      where.author = { name: filters.author };
    }
    
    if (filters?.tag) {
      where.tags = { has: filters.tag };
    }

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { excerpt: { contains: filters.search, mode: 'insensitive' } },
        { content: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters?.dateFrom || filters?.dateTo) {
      where.date = {};
      if (filters.dateFrom) {
        where.date.gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        where.date.lte = new Date(filters.dateTo);
      }
    }

    if (filters?.isPublished !== undefined) {
      where.isPublished = filters.isPublished;
    }

    const posts = await this.prisma.post.findMany({
      where,
      include: {
        author: true,
        category: true,
      },
      orderBy: { date: 'desc' },
      skip: pagination?.skip || 0,
      take: pagination?.limit || 10,
    });

    const total = await this.prisma.post.count({ where });

    // Transform to return category as slug string and author as name string
    const transformedPosts = posts.map(post => ({
      ...post,
      category: post.category.slug,
      author: post.author.name,
    }));

    return {
      data: transformedPosts,
      meta: {
        total,
        page: pagination ? Math.floor(pagination.skip / pagination.limit) + 1 : 1,
        limit: pagination?.limit || 10,
        totalPages: Math.ceil(total / (pagination?.limit || 10)),
      },
    };
  }

  async findOne(slug: string) {
    const post = await this.prisma.post.findUnique({
      where: { slug },
      include: {
        author: true,
        category: true,
        comments: {
          where: { parentId: null },
          include: {
            replies: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Increment view count
    await this.prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });

    // Transform to return category as slug string and author as name string
    return {
      ...post,
      category: post.category.slug,
      author: post.author.name,
    };
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const data: any = { ...updatePostDto };

    // Handle category string to ID conversion
    if (updatePostDto.category) {
      const category = await this.prisma.category.findUnique({
        where: { slug: updatePostDto.category },
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      delete data.category;
      data.categoryId = category.id;
    }

    // Handle author string to ID conversion
    if (updatePostDto.author) {
      const author = await this.prisma.author.findUnique({
        where: { name: updatePostDto.author },
      });
      if (!author) {
        throw new NotFoundException('Author not found');
      }
      delete data.author;
      data.authorId = author.id;
    }

    const post = await this.prisma.post.update({
      where: { id },
      data,
      include: {
        author: true,
        category: true,
      },
    });

    // Transform to return category as slug string and author as name string
    return {
      ...post,
      category: post.category.slug,
      author: post.author.name,
    };
  }

  async remove(id: string) {
    return this.prisma.post.delete({
      where: { id },
    });
  }

  async incrementClaps(id: string) {
    return this.prisma.post.update({
      where: { id },
      data: { claps: { increment: 1 } },
    });
  }

  async togglePublish(id: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.prisma.post.update({
      where: { id },
      data: { isPublished: !post.isPublished },
    });
  }
}
