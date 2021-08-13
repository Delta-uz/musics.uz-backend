import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
    private readonly configService: ConfigService
  ) {}

  async create(createFileDto: CreateFileDto): Promise<File> {
    const file: File = this.fileRepository.create(createFileDto);
    return this.fileRepository.save(file);
  }

  async findAll(): Promise<File[]> {
    return this.fileRepository.find();
}

  async findOne(filename: string): Promise<File> {
    const file: File = await this.fileRepository.findOne(filename);
    if(file) {
      return file;
    }
    throw new NotFoundException();
  }

  async remove(filename: string) {
    const result: DeleteResult = await this.fileRepository.delete(filename)
    if(!result.affected) {
      throw new NotFoundException();
    }
  }
}
