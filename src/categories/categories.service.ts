import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoriesRepository: Repository<Category>
  ) {}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  findOne(id: number): Promise<Category> {
    const category = this.categoriesRepository.findOne(id, { relations: ['musics'] });
    if(category) {
      return category;
    }
    throw new NotFoundException();
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const result: UpdateResult = await this.categoriesRepository.update(id, updateCategoryDto);
    if (result.affected) {
      return this.findOne(id);
    }
    throw new NotFoundException();
  }

  async remove(id: number) {
    const result: DeleteResult = await this.categoriesRepository.delete(id);
    if(!result.affected) {
      throw new NotFoundException();
    }
  }
}
