import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiBadRequestResponse, ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({
    description: 'User must be authenticated'
  })
  @ApiCreatedResponse({
    description: 'New category has been added successfully'
  })
  @ApiBadRequestResponse({
    description: `Data doesn't match the schema`
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Categories have been found and returned'
  })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Category has been found and returned'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find that category'
  })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({
    description: 'User must be authenticated'
  })
  @ApiOkResponse({
    description: 'Category has been updated'
  })
  @ApiBadRequestResponse({
    description: 'Data does not match the schema'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find that category'
  })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({
    description: 'User must be authenticated'
  })
  @ApiOkResponse({
    description: 'Category has been deleted'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find that category'
  })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
