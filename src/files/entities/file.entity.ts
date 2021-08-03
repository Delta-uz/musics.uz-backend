import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryColumn()
  filename: string;

  @Column({ unique: true })
  filepath: string;
}
