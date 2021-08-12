import { IsNotEmpty, IsNumber, IsNumberString, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMusicDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    minLength: 3,
    description: 'New music title'
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'filename of the uploaded music'
  })
  filename: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID of the author artist'
  })
  author: number;
}
