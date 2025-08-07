import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Menu } from 'src/menu/entities/menu.entity';
@Entity()
export class OrderMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderMenus, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Menu, (menu) => menu.orderMenus, { eager: true })
  menu: Menu;

  @Column('int')
  quantity: number;

  @Column('int')
  totalPrice?: number;
}
