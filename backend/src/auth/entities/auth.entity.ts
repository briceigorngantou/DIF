import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { timestampEntites } from './../../generics/timestampEntites';

@Entity('auth')
export class AuthEntity extends timestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  salt: string;

  @Column({ unique: true })
  password: string;
}
