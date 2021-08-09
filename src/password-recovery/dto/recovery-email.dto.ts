import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class RecoveryEmailDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email which should be recovered'
  })
  email: string;
}