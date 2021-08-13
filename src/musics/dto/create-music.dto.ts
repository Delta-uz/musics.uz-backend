import { IsArray, IsNotEmpty, IsNumber, IsNumberString, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMusicDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    minLength: 3,
    description: 'New music title'
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'filename of the uploaded music'
  })
  file: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: "Array of authors' ID"
  })
  authors: number[];
}
