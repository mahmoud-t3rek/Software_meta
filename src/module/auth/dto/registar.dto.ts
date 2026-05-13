import { ApiProperty } from '@nestjs/swagger';
import {IsEmail,IsNotEmpty,IsString,MinLength,MaxLength,IsStrongPassword} from 'class-validator';
import { IsMatch } from '../../../common/decorators/confirmPass.decrator';

export class UserRegistarDto {
  
  @ApiProperty({
    example: 'Mahmoud Tarek',
    description: 'User full name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: 'mahmoud@gmail.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;


  @ApiProperty({ example: 'StrongP@ss1' })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'StrongP@ss1' })
  @IsNotEmpty()
  @IsString()
  @IsMatch(['password'])
  confirmPassword: string;
}