import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './auth';
export interface IreceivedMessage {
  from: number;
  to: number;
  message: string;
  isViewed: boolean;
  type: string;
}

@Entity()
export class Message<T = string> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  from: number;

  @Column({ type: 'varchar' })
  to: number;

  @Column({ type: 'text' })
  time: T;

  @Column({ type: 'boolean' })
  isViewed: boolean;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'text' })
  message: string;
}
