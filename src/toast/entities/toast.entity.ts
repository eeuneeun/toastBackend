import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Toast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  toastName: string;

  @Column()
  imgUrl: string;

  @Column()
  desc: string;

  @Column({ default: 3000 })
  price: number;

  @Column()
  writeTime: string;
}
