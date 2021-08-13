import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Music } from '../../musics/entities/music.entity';

@Entity()
export class File {
  @PrimaryColumn()
  name: string;

  @OneToOne((type) => Music, music => music.file)
  music?: Music;
}
