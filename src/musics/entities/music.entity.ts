import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { File } from '../../files/entities/file.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @OneToOne((type) => File, {
    eager: true
  })
  @JoinColumn()
  public file: File

  @ManyToMany((type) => Category, (category: Category) => category.musics)
  @JoinTable()
  public categories: Category[]
}
