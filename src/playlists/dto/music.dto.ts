import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MusicDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id of the new music'
  })
  music: number
}