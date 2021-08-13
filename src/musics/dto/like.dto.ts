import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LikeDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Type of the like. True means like. False means dislike. Default true'
  })
  isLike?: true;
}