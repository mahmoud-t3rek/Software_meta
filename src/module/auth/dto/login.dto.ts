import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";


export class LoginUserDto{
    
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
}