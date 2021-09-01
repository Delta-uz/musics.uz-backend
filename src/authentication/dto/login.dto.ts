import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email of the user (required if phone is not set)'
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'Phone number of the user (requried if email is not set)'
  })
  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'Password of the user',
    minLength: 8
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}