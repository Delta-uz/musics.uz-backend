import { ApiProperty } from '@nestjs/swagger';

export class AddCategoryDto {
  @ApiProperty({
    description: 'Id of the category'
  })
  categoryId: number
};