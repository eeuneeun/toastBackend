import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
@Entity()
export class OrderMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderMenus, { onDelete: 'CASCADE' })
  order: Order;

  @Column()
  menuId: number;

  @Column('int')
  quantity: number;

  @Column('int')
  totalPrice?: number;
}
