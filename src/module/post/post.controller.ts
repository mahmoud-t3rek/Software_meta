import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

import { PostService } from './post.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { CreatePostDto } from './dto/createpost.dto';
import type { IAuth } from '../../common/interface/token.interface';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}


  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all blog posts (public)' })
  @ApiResponse({ status: 200, description: 'List of all posts' })
  async getAllPosts() {
    return this.postService.getPosts();
  }


  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new post (auth required)' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  async createPost(
    @Body() body: CreatePostDto,
   @Req() req: IAuth
  ) {
  
    return this.postService.createPost(body, req.Credentiales.user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a post (owner only)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePostDto,
    @Req() req: IAuth,
  ) {
    
    return this.postService.updatePost(id, body, req.Credentiales.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a post (owner only)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
  async deletePost(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: IAuth,
  ) {
  
    return this.postService.RemovePost(id, req.Credentiales.user);
  }
}