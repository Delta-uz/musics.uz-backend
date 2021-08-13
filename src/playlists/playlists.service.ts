import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { MusicsService } from '../musics/musics.service';
import { Music } from '../musics/entities/music.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist) private readonly playlistsRepository: Repository<Playlist>,
    private readonly musicsService: MusicsService,
    private readonly usersService: UsersService
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto, user: User): Promise<Playlist> {
    // const owner = await this.usersService.getByEmail(user.email)
    const newPlaylist = this.playlistsRepository.create({
      user,
      ...createPlaylistDto
    });
    return this.playlistsRepository.save(newPlaylist);
  }

  async findOne(id: number) {
    const playlist = await this.playlistsRepository.findOne(id, { relations: ['user'] });
    if (playlist) {
      playlist.user.password = undefined;
      return playlist;
    }
    throw new NotFoundException();
  }

  async getMusics(id: number): Promise<Music[]> {
    const playlist = await this.playlistsRepository.findOne(id, { relations: ['musics'] });
    if(playlist) {
      return playlist.musics;
    }
    throw new NotFoundException();
  }

  async addMusic(id: number, musicId: number): Promise<Playlist> {
    const playlist: Playlist = await this.playlistsRepository.findOne(id, { relations: ['musics'] });
    const music: Music = await this.musicsService.findOne(musicId);
    if (music && playlist) {
      // playlist.musics = playlist.musics || [];
      if(!playlist.musics.some(music => music.id === musicId)) {
        playlist.musics.push(music);
        return this.playlistsRepository.save(playlist);
      } else {
        return playlist;
      }
    }
    throw new NotFoundException();
  }

  async removeMusic(id: number, musicId: number): Promise<Playlist> {
    const playlist: Playlist = await this.playlistsRepository.findOne(id, { relations: ['musics'] });
    if (playlist) {
      playlist.musics = playlist.musics.filter(music => music.id !== musicId);
      return this.playlistsRepository.save(playlist);
    }
    throw new NotFoundException();
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto): Promise<Playlist> {
    const result: UpdateResult = await this.playlistsRepository.update(id, { name: updatePlaylistDto.name });
    if(result.affected) {
      const playlist = await this.playlistsRepository.findOne(id, { relations: ['owner'] });
      playlist.user.password = undefined;
      return playlist;
    }
    throw new NotFoundException();
  }

  async remove(id: number): Promise<void> {
    const result: DeleteResult = await this.playlistsRepository.delete(id);
    if(!result.affected) {
      throw new NotFoundException();
    }
  }
}
