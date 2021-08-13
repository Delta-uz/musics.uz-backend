import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Music } from '../../musics/entities/music.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image?: string;

  @ManyToMany((type) => Music)
  @JoinTable()
  public musics: Music[];

  @ManyToOne((type) => User, user => user.playlists)
  public user: User;

  @CreateDateColumn()
  createdAt: Date;
}
