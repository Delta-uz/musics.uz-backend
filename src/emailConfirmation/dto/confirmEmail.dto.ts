import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class ConfirmEmailDto {
  @ApiProperty({
    description: 'Token which is received by email'
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}