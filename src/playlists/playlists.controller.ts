import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { MusicDto } from './dto/music.dto';

@Controller('playlists')
@UseGuards(JwtAuthenticationGuard)
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  create(@Req() request: RequestWithUser, @Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsService.create(createPlaylistDto, request.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistsService.findOne(+id);
  }

  @Get(':id/music')
  getMusics(@Param('id') id: string) {
    return this.playlistsService.getMusics(+id);
  }

  @Post(':id/music')
  addMusic(@Param('id') id: string, @Body() musicDto: MusicDto) {
    return this.playlistsService.addMusic(+id, +musicDto.music);
  }

  @Delete(':id/music')
  removeMusic(@Param('id') id: string, @Body() musicDto:MusicDto) {
    return this.playlistsService.removeMusic(+id, +musicDto.music);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistsService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistsService.remove(+id);
  }
}
