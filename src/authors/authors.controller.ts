import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import JwtAuthenticationGuard from '../authentication/guards/jwt-authentication.guard';
import { AdminGuard } from '../authentication/guards/admin.guard';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly artistsService: AuthorsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard, AdminGuard)
  @ApiUnauthorizedResponse({
    description: 'You must be authenticated to access this source'
  })
  @ApiForbiddenResponse({
    description: 'Only admins can access this source'
  })
  @ApiCreatedResponse({
    description: 'New artist has been created successfully'
  })
  @ApiBadRequestResponse({
    description: 'Data does not match the schema'
  })
  create(@Body() createArtistDto: CreateAuthorDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Artist have been found and returned'
  })
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Artist has been found and returned'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find artist with that id'
  })
  findOne(@Param('id') id: string) {
    return this.artistsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard, AdminGuard)
  @ApiUnauthorizedResponse({
    description: 'You must be authenticated to access this source'
  })
  @ApiForbiddenResponse({
    description: 'Only admins can access this source'
  })
  @ApiOkResponse({
    description: 'Artist has been updated successfully'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find artist with that id'
  })
  @ApiBadRequestResponse({
    description: 'Data does not match the schema'
  })
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateAuthorDto) {
    return this.artistsService.update(+id, updateArtistDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard, AdminGuard)
  @ApiUnauthorizedResponse({
    description: 'You must be authenticated to access this source'
  })
  @ApiForbiddenResponse({
    description: 'Only admins can access this source'
  })
  @ApiOkResponse({
    description: 'Artist has been deleted successfully'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find artist with that id'
  })
  remove(@Param('id') id: string) {
    return this.artistsService.remove(+id);
  }
}
