import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Post, User, UserRepository } from '../../DB';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from '../../common/utils/Token';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[ TypeOrmModule.forFeature([User,Post])],
  controllers: [AuthController],
  providers: [AuthService,UserRepository,TokenService,JwtService],
})
export class AuthModule {}
