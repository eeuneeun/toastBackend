import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { OrderMenu } from 'src/order-menu/entities/order-menu.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: string;

  @Column()
  storeId: number;

  @Column()
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => OrderMenu, (orderMenu) => orderMenu.order, {
    cascade: true,
    eager: true, // 필요시 자동 로딩
  })
  orderMenus: OrderMenu[];
}
