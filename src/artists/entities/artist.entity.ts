import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Music } from '../../musics/entities/music.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Music, music => music.author)
  musics: Music[];
}
