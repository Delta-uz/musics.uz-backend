import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { Like } from '../../musics/entities/like.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true, nullable: true, default: null })
  public email?: string;

  @Column({ unique: true, nullable: true, default: null })
  public phone?: string;

  @Column()
  public fullName: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({ default: false })
  public isAdmin?: boolean;

  @Column({ default: false })
  public isEmailConfirmed?: boolean;

  @OneToMany((type) => Playlist, playlist => playlist.user)
  public playlists: Playlist[]

  @OneToMany((type) => Like, like => like.user)
  public likes: Like[];

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase()
  }
}
