import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class RecoveryPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of the user'
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description: 'New password',
    minLength: 8
  })
  password: string;
}