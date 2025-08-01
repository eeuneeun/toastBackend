import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: '익명' })
  nickname: string;

  @Column()
  favorite: string[]; //StoreId
}
