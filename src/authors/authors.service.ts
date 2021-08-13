import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly artistRepository: Repository<Author>
  ) {
  }

  create(createArtistDto: CreateAuthorDto): Promise<Author> {
    const artist = this.artistRepository.create(createArtistDto);
    return this.artistRepository.save(artist);
  }

  findAll(): Promise<Author[]> {
    return this.artistRepository.find();
  }

  async findOne(id: number): Promise<Author> {
    const artist = await this.artistRepository.findOne(id, { relations: ['musics'] });
    if(artist) {
      return artist;
    }
    throw new NotFoundException('Unable to find that artist');
  }

  async update(id: number, updateArtistDto: UpdateAuthorDto): Promise<Author> {
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
