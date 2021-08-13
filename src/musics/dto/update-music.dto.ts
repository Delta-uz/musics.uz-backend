import { IsEmpty, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMusicDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  @ApiProperty({
    minLength: 3
  })
  name: string;

  @IsEmpty()
  file?: undefined;
}
