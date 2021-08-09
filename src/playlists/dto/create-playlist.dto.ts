import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Title of the new playlist'
  })
  title: string;
}
