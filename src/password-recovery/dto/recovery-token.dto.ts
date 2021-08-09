import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class RecoveryTokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Token which is received by email'
  })
  token: string;
}