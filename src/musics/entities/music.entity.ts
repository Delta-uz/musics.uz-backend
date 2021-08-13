import {
  Column, CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from '../../files/entities/file.entity';
import { Category } from '../../categories/entities/category.entity';
import { Author } from '../../authors/entities/author.entity';
import { Like } from './like.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToOne((type) => File, file => file.music, {
    eager: true
  })
  @JoinColumn()
  public file: File

  @Column({
    nullable: true
  })
  public image?: string;

  @Column({
    default: 0
  })
  public likes_count: number;

  @Column({
    default: 0
  })
  public listens_count: number;

  @ManyToMany(type => Category, category => category.musics)
  @JoinTable()
  public categories: Category[];

  @ManyToMany((type) => Author, (author: Author) => author.musics)
  @JoinTable()
  public authors: Author[];

  @OneToMany(() => Like, like => like.music)
  public likes: Like[]

  @CreateDateColumn()
  upload_date: Date;
}
