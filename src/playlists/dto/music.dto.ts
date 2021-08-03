import { IsNotEmpty, IsNumber } from 'class-validator';

export class MusicDto {
  @IsNumber()
  @IsNotEmpty()
  music: number
}