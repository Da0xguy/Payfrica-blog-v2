import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Pagination } from '../common/decorators/pagination.decorator';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ type: CreatePostDto })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts with pagination and filters' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'author', required: false })
  @ApiQuery({ name: 'tag', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'dateFrom', required: false })
  @ApiQuery({ name: 'dateTo', required: false })
  @ApiQuery({ name: 'isPublished', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(
    @Query('category') category?: string, 
    @Query('author') author?: string, 
    @Query('tag') tag?: string,
    @Query('search') search?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('isPublished') isPublished?: string,
    @Pagination() pagination?: { skip: number; limit: number }
  ) {
    return this.postsService.findAll(
      { 
        category, 
        author, 
        tag, 
        search, 
        dateFrom, 
        dateTo, 
        isPublished: isPublished === 'true' ? true : isPublished === 'false' ? false : undefined 
      }, 
      pagination
    );
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a single post by slug' })
  @ApiParam({ name: 'slug', description: 'Post slug' })
  findOne(@Param('slug') slug: string) {
    return this.postsService.findOne(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a post' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiBody({ type: UpdatePostDto })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a post' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }

  @Post(':id/clap')
  @ApiOperation({ summary: 'Increment clap count for a post' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  incrementClaps(@Param('id') id: string) {
    return this.postsService.incrementClaps(id);
  }

  @Patch(':id/publish')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle publish status of a post' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  togglePublish(@Param('id') id: string) {
    return this.postsService.togglePublish(id);
  }
}
