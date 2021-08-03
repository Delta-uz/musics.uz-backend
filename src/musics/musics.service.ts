import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FilesService } from '../files/files.service';

@Injectable()
export class MusicsService {
  constructor(
    @InjectRepository(Music)
    private readonly musicsRepository: Repository<Music>,
    private readonly filesService: FilesService
  ) {}

  async create(createMusicDto: CreateMusicDto): Promise<Music> {
    const file = await this.filesService.findOne(createMusicDto.filename);
    const music = await this.musicsRepository.create({
      title: createMusicDto.title,
      file
    });
    return await this.musicsRepository.save(music);
  }

  async findAll(): Promise<Music[]> {
    return await this.musicsRepository.find();
  }

  async findOne(id: number): Promise<Music> {
    const music: Music = await this.musicsRepository.findOne(id);
    if(music) {
      return music;
    }
    throw new NotFoundException();
  }

  async update(id: number, { title }: UpdateMusicDto): Promise<Music> {
    const result = await this.musicsRepository.update(id,{ title });
    if(result.affected) {
      return await this.findOne(id);
    }
    throw new NotFoundException();
  }

  async remove(id: number) {
    const result = await this.musicsRepository.delete(id);
    if(!result.affected) {
      throw new NotFoundException();
    }
  }
}
