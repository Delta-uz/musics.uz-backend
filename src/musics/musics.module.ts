import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Music]), FilesModule],
  controllers: [MusicsController],
  providers: [MusicsService],
  exports: [MusicsService]
})
export class MusicsModule {}
