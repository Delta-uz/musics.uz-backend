import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Title of the category'
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
