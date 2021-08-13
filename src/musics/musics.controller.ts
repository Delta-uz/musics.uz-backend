import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile, BadRequestException, Put, Request,
} from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import JwtAuthenticationGuard from '../authentication/guards/jwt-authentication.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AddCategoryDto } from './dto/add-category.dto';
import {
  ApiBadRequestResponse, ApiCookieAuth,
  ApiCreatedResponse, ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdminGuard } from '../authentication/guards/admin.guard';
import { LikeDto } from './dto/like.dto';
import RequestWithUser from '../authentication/requestWithUser.interface';

@ApiTags('musics')
@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard, AdminGuard)
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({
    description: 'User must be authenticated'
  })
  @ApiForbiddenResponse({
    description: 'You do not have permission to access this source'
  })
  @ApiCreatedResponse({
    description: 'The music has been successfully created.'
  })
  @ApiBadRequestResponse({
    description: `Request data doesn't match the schema`
  })
  create(@Body() createMusicDto: CreateMusicDto) {
    return this.musicsService.create(createMusicDto);
  }

  @Get()
  @ApiOkResponse()
  findAll() {
    return this.musicsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Music has been found'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find music with that id'
  })
  findOne(@Param('id') id: string) {
    return this.musicsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard, AdminGuard)
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({
    description: 'User must be authenticated'
  })
  @ApiForbiddenResponse({
    description: 'You do not have permission to access this source'
  })
  @ApiOkResponse({
    description: 'Music has been updated successfully'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find music with that id'
  })
  @ApiBadRequestResponse({
    description: `Update data doesn't match the schema`
  })
  update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicsService.update(+id, updateMusicDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard, AdminGuard)
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({
    description: 'User must be authenticated'
  })
  @ApiForbiddenResponse({
    description: 'You do not have permission to access this source'
  })
  @ApiOkResponse({
    description: `Music has been deleted`
  })
  @ApiNotFoundResponse({
    description: `Unable to find music with that id`
  })
  remove(@Param('id') id: string) {
    return this.musicsService.remove(+id);
  }

  @Post(':id/category')
  @UseGuards(JwtAuthenticationGuard, AdminGuard)
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({
    description: 'User must be authenticated'
  })
  @ApiForbiddenResponse({
    description: 'You do not have permission to access this source'
  })
  @ApiOkResponse({
    description: 'The category has been successfully added.'
  })
  @ApiNotFoundResponse({
    description: `Unable to find category or music with that id`
  })
  addCategory(@Param('id') id: string, @Body() addCategoryDto: AddCategoryDto) {
    return this.musicsService.addCategory(+id, addCategoryDto);
  }

  @Post(':id/likes')
  @UseGuards(JwtAuthenticationGuard)
  likeMusic(@Param('id') id: string, @Body() likeDto: LikeDto, @Request() request: RequestWithUser) {
    return this.musicsService.likeMusic(+id, request.user, likeDto);
  }

  @Get(':id/likes')
  getLikes(@Param('id') id: string) {
    return this.musicsService.allLikes(+id);
  }
}
