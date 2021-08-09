import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { MusicDto } from './dto/music.dto';
import {
  ApiBadRequestResponse, ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('playlists')
@ApiCookieAuth()
@ApiUnauthorizedResponse({
  description: 'User must be authenticated'
})
@Controller('playlists')
@UseGuards(JwtAuthenticationGuard)
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Playlist has been created successfully'
  })
  @ApiBadRequestResponse({
    description: 'Data does not match the schema'
  })
  create(@Req() request: RequestWithUser, @Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsService.create(createPlaylistDto, request.user);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Playlist has been found and returned'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find that playlist'
  })
  findOne(@Param('id') id: string) {
    return this.playlistsService.findOne(+id);
  }

  @Get(':id/music')
  @ApiOkResponse({
    description: 'Playlist has been found and musics returned'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find that playlist'
  })
  getMusics(@Param('id') id: string) {
    return this.playlistsService.getMusics(+id);
  }

  @Post(':id/music')
  @ApiCreatedResponse({
    description: 'Music has been added successfully to the playlist'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find that playlist'
  })
  @ApiBadRequestResponse({
    description: 'Data does not match the schema'
  })
  addMusic(@Param('id') id: string, @Body() musicDto: MusicDto) {
    return this.playlistsService.addMusic(+id, +musicDto.music);
  }

  @Delete(':id/music')
  @ApiOkResponse({
    description: 'Music has been removed from the playlist'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find that playlist'
  })
  removeMusic(@Param('id') id: string, @Body() musicDto:MusicDto) {
    return this.playlistsService.removeMusic(+id, +musicDto.music);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Playlist has been updated'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find that playlist'
  })
  @ApiBadRequestResponse({
    description: 'Data does not match the schema'
  })
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistsService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Playlist has been deleted'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find that playlist'
  })
  remove(@Param('id') id: string) {
    return this.playlistsService.remove(+id);
  }
}
