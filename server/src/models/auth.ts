import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message';

export const secret = 'AbataIIITaLa';

export interface RegisterDTO {
  username: string;
  password: string;
  lastOnline: string;
}

export interface UserDTO {
  id: number;
  login: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  userId: number;

  @Column({ type: 'varchar', unique: true, length: 20 })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'text' })
  lastOnline: string;

  @ManyToMany(() => Message)
  @JoinTable()
  messages: Message[];
}
