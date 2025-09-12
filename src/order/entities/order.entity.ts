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
  storeId: number;

  @Column()
  totalPrice: number;

  @Column()
  paymentMethod: string;

  @Column()
  customerId: string;

  @Column()
  customerName: string;

  @Column()
  customerPhone: string;

  @Column()
  deliveryMethod: string;

  @Column()
  deliveryAddress: string;

  @Column()
  status: string;

  // @CreateDateColumn({
  //   type: 'datetime',
  //   default: () => 'CURRENT_TIMESTAMP',
  //   onUpdate: 'CURRENT_TIMESTAMP',
  // })
  // updatedAt: Date;

  // @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  // createdAt: Date;

  @OneToMany(() => OrderMenu, (orderMenu) => orderMenu.order, {
    cascade: true,
    eager: true, // 필요시 자동 로딩
  })
  orderMenus: OrderMenu[];
}
