import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
// import { Post as PostInterface } from './interfaces/post.interface';
import type { Post as PostInterface } from './interfaces/post.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  // 1. Put the specific static route FIRST
  @Get('search') // The leading slash is optional here, but works fine.
  getASinglePostUsingQuery(
    @Query('username') username: string,
  ): PostInterface | string {
    // console.log('single post username---', username);
    return this.postsService.getASinglePostUsingQuery(username);
  }

  // 2. Put the general parameterized route AFTER
  @Get(':id')
  getASinglePost(@Param('id', ParseIntPipe) id: number) {
    // console.log('single post id---', id);
    return this.postsService.getASinglePost(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createPost(
    @Body() postData: Omit<PostInterface, 'id' | 'createdAt' | 'updatedAt'>,
  ): PostInterface | void {
    return this.postsService.createPost(postData);
  }

  @Patch(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    postData: Partial<Omit<PostInterface, 'id' | 'createdAt' | 'updatedAt'>>,
  ): PostInterface | string {
    return this.postsService.updatePost(id, postData);
  }

  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number): PostInterface | string {
    return this.postsService.deletePost(id);
  }
}
