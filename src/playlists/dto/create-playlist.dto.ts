import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the playlist'
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Cover image of the playlist'
  })
  image?: string;
}
