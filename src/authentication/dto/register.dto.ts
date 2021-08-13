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