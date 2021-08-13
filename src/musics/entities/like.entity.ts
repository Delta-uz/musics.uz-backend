import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Music } from './music.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    default: true
  })
  public isLike: boolean;

  @ManyToOne(() => Music, music => music.likes, {
    eager: true
  })
  @JoinColumn({ name: 'music_id' })
  public music!: Music;

  @ManyToOne(() => User, user => user.likes, {
    eager: true
  })
  @JoinColumn({ name: 'user_id' })
  public user!: User;

  @CreateDateColumn()
  createdAt: Date;
}