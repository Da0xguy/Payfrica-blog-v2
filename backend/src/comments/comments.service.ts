import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto & { postId?: string }) {
    const data: any = {
      authorName: createCommentDto.authorName,
      authorEmail: createCommentDto.authorEmail,
      content: createCommentDto.content,
    };

    if (createCommentDto.postId) {
      data.post = { connect: { id: createCommentDto.postId } };
    }

    if ((createCommentDto as any).parentId) {
      data.parent = { connect: { id: (createCommentDto as any).parentId } };
    }

    return this.prisma.comment.create({
      data,
      include: {
        replies: true,
        parent: true,
      },
    });
  }

  async findAll(pagination?: { skip: number; limit: number }) {
    const comments = await this.prisma.comment.findMany({
      include: {
        replies: true,
        parent: true,
        post: true,
      },
      skip: pagination?.skip || 0,
      take: pagination?.limit || 10,
    });

    const total = await this.prisma.comment.count();

    return {
      data: comments,
      meta: {
        total,
        page: pagination ? Math.floor(pagination.skip / pagination.limit) + 1 : 1,
        limit: pagination?.limit || 10,
        totalPages: Math.ceil(total / (pagination?.limit || 10)),
      },
    };
  }

  async findByPost(postSlug: string) {
    const post = await this.prisma.post.findUnique({ where: { slug: postSlug } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.prisma.comment.findMany({
      where: {
        postId: post.id,
        parentId: null,
      },
      include: {
        replies: {
          orderBy: { date: 'asc' },
        },
      },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: {
        replies: true,
        parent: true,
        post: true,
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  async remove(id: string) {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
