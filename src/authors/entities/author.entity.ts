import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Music } from '../../musics/entities/music.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image?: string;

  @ManyToMany(type => Music, music => music.authors)
  musics: Music[];
}
