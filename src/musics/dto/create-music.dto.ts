import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { File } from '../../files/entities/file.entity';

export class CreateMusicDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  filename: string;
}
