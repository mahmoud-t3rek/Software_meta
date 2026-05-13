import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './createpost.dto';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {}

export class IdParamDto {
    @ApiProperty({
        example:"1",
    description:"id param to check"
    })
  @Type(() => Number)
  @IsInt()
  id: number;
}