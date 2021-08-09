import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Music } from '../../musics/entities/music.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany((type) => Music)
  @JoinTable()
  public musics: Music[];

  @ManyToOne((type) => User, user => user.playlists)
  public owner: User;
}
