import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class RecoveryPasswordDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}