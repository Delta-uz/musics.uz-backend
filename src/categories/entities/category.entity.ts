import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Music } from '../../musics/entities/music.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany((type) => Music, (music: Music) => music.categories)
  musics: Music[]
}
