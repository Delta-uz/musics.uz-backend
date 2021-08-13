import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FilesService } from '../files/files.service';
import { CategoriesService } from '../categories/categories.service';
import { AddCategoryDto } from './dto/add-category.dto';
import { AuthorsService } from '../authors/authors.service';
import { Like } from './entities/like.entity';
import { LikeDto } from './dto/like.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MusicsService {
  constructor(
    @InjectRepository(Music)
    private readonly musicsRepository: Repository<Music>,
    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>,
    private readonly filesService: FilesService,
    private readonly categoriesService: CategoriesService,
    private readonly authorsService: AuthorsService
  ) {}

  async create(createMusicDto: CreateMusicDto): Promise<Music> {
    const file = await this.filesService.findOne(createMusicDto.file);
    let authors = [];
    for (let id of createMusicDto.authors) {
      const author = await this.authorsService.findOne(id);
      authors.push(author);
    }
    const music = await this.musicsRepository.create({
      ...createMusicDto,
      authors,
      file
    });
    return await this.musicsRepository.save(music);
  }

  async findAll(): Promise<Music[]> {
    return await this.musicsRepository.find({ relations: ['authors'] });
  }

  async findOne(id: number): Promise<Music> {
    const music: Music = await this.musicsRepository.findOne(id, { relations: ['categories', 'authors'] });
    if(music) {
      return music;
    }
    throw new NotFoundException();
  }

  async update(id: number, { name }: UpdateMusicDto): Promise<Music> {
    const result = await this.musicsRepository.update(id,{ name });
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

  async addCategory(id: number, addCategoryDto: AddCategoryDto): Promise<Music> {
    const music = await this.findOne(id);
    const category = await this.categoriesService.findOne(addCategoryDto.categoryId);
    music.categories.push(category);
    await this.musicsRepository.save(music);
    return music;
  }

  async likeMusic(id: number, user: User, likeDto: LikeDto): Promise<Like> {
    const music = await this.findOne(id);
    const like = await this.likesRepository.create({
      ...likeDto,
      music,
      user
    });
    return this.likesRepository.save(like);
  }

  async allLikes(id: number) {
    const music = await this.musicsRepository.findOne(id, { relations: ['likes'] });
    if(music) {
      music.likes.forEach((like) => like.user.password = undefined);
      return music.likes;
    }
    throw new NotFoundException();
  }
}
