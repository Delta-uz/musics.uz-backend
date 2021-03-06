import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { FilesModule } from '../files/files.module';
import { CategoriesModule } from '../categories/categories.module';
import { AuthorsModule } from '../authors/authors.module';
import { Like } from './entities/like.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Music, Like]),
    FilesModule,
    CategoriesModule,
    AuthorsModule
  ],
  controllers: [MusicsController],
  providers: [MusicsService],
  exports: [MusicsService]
})
export class MusicsModule {}
