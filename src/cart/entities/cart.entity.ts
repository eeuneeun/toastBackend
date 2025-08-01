import { CartMenu } from 'src/cart-menu/entities/cart-menu.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => CartMenu, (cm) => cm.cart, {
    cascade: true,
    eager: true, // 필요시 자동 로딩
  })
  cartMenus: CartMenu[];
}
