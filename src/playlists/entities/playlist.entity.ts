import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Music } from '../../musics/entities/music.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Music)
  @JoinTable()
  public musics: Music[];

  @ManyToOne(() => User, user => user.playlists)
  public owner: User;
}
