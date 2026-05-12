import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'My First Post',
    description: 'Title of the post',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @ApiProperty({
    example: 'This is the content of my post...',
    description: 'Content of the post',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  content: string;
}