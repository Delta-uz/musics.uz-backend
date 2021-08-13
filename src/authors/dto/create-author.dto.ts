import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Full name of the artist'
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Image of the author'
  })
  image?: string;
}
