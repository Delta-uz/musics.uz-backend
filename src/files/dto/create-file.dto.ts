import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({
    required: false,
    description: 'Automatically generated unique filename'
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
