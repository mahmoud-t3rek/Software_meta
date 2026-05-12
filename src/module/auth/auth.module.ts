import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Post, User, UserRepository } from '../../DB';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from '../../common/utils/Token';
import { JwtService } from '@nestjs/jwt';
import { Token } from '../../DB/models/token.model';
import { TokenRepository } from '../../DB/repository/token.repository';

@Module({
  imports:[ TypeOrmModule.forFeature([User,Post,Token])],
  controllers: [AuthController],
  providers: [AuthService,UserRepository,TokenService,JwtService,TokenRepository],
})
export class AuthModule {}
