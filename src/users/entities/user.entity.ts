import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Playlist } from '../../playlists/entities/playlist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({ default: false })
  public isEmailConfirmed: boolean;

  @OneToMany((type) => Playlist, playlist => playlist.owner)
  public playlists: Playlist[]
}
