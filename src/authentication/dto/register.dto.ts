import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Registration email (required if phone is not set)'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Registration phone (required if email is not set)'
  })
  @IsEmail()
  phone: string;

  @ApiProperty({
    description: "User's full name"
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Registration password'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}