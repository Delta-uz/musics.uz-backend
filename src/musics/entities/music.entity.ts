import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { File } from '../../files/entities/file.entity';

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
}
