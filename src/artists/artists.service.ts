import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { Music } from '../musics/entities/music.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>
  ) {
  }

  create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistRepository.create(createArtistDto);
    return this.artistRepository.save(artist);
  }

  findAll(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  async findOne(id: number): Promise<Artist> {
    const artist = await this.artistRepository.findOne(id, { relations: ['musics'] });
    if(artist) {
      return artist;
    }
    throw new NotFoundException('Unable to find that artist');
  }

  async update(id: number, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.artistRepository.findOne(id);
    if (!artist) {
      throw new NotFoundException('Unable to find that artist');
    }
    const result = await this.artistRepository.update(id, updateArtistDto);
    if(result.affected) {
      return await this.artistRepository.findOne(id);
    }
    throw new BadRequestException()
  }

  async remove(id: number): Promise<void> {
    const result = await this.artistRepository.delete(id);
    if(!result.affected) {
      throw new NotFoundException('Unable to find that artist');
    }
  }
}
