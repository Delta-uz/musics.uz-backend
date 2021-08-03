import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}