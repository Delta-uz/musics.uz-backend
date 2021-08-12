import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Registration email'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User's name"
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "User's surname"
  })
  @IsString()
  @IsOptional()
  surname?: string;

  @ApiProperty({
    description: 'Registration password'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}