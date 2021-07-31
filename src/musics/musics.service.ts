import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class MusicsService {
  constructor(
    @InjectRepository(Music)
    private readonly musicsRepository: Repository<Music>
  ) {}

  create(createMusicDto: CreateMusicDto): Promise<Music> {
    const music = this.musicsRepository.create(createMusicDto);
    return this.musicsRepository.save(music);
  }

  findAll(): Promise<Music[]> {
    return this.musicsRepository.find();
  }

  findOne(id: number): Promise<Music> {
    return this.musicsRepository.findOne(id);
  }

  update(id: number, updateMusicDto: UpdateMusicDto): Promise<UpdateResult> {
    return this.musicsRepository.update(id, updateMusicDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.musicsRepository.delete(id);
  }
}
