import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { MusicsModule } from '../musics/musics.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist]), MusicsModule, UsersModule],
  controllers: [PlaylistsController],
  providers: [PlaylistsService]
})
export class PlaylistsModule {}
