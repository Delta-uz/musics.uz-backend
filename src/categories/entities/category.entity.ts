import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Music } from '../../musics/entities/music.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image?: string;

  @ManyToMany(type => Music, music => music.categories)
  musics: Music[];
}
