import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  UserRegistarDto } from './dto/registar.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Email already exists / Validation error' })
  async register(@Body() body: UserRegistarDto) {
    return this.authService.Registar(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'login  user' })
  @ApiResponse({ status: 201, description: 'login successfully' })
  @ApiResponse({ status: 400, description: 'Email already exists / Validation error' })
  async login(@Body() body: LoginUserDto) {
    return this.authService.Login(body);
  }


  

}
