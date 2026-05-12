import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostsController } from './post.controller';
import { Post, PostRepository, User, UserRepository } from '../../DB';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from '../../common/utils/Token';
import { JwtService } from '@nestjs/jwt';3
import { TokenRepository } from '../../DB/repository/token.repository';
import { Token } from '../../DB/models/token.model';

@Module({
  imports:[TypeOrmModule.forFeature([Post,User,Token])],
  controllers: [PostsController],
  providers: [PostService,PostRepository,TokenService,JwtService,TokenRepository,UserRepository],
})
export class PostModule {}
