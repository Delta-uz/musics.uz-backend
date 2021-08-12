import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from '../../files/entities/file.entity';
import { Category } from '../../categories/entities/category.entity';
import { Artist } from '../../artists/entities/artist.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @OneToOne((type) => File, file => file.music, {
    eager: true
  })
  @JoinColumn()
  public file: File

  @ManyToMany((type) => Category, (category: Category) => category.musics)
  @JoinTable()
  public categories: Category[]

  @ManyToOne((type) => Artist, artist => artist.musics)
  public author: Artist;
}
