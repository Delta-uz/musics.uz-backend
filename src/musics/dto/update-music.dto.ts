import { IsEmpty, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateMusicDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @IsOptional()
  title: string;

  @IsEmpty()
  file?: undefined;
}
