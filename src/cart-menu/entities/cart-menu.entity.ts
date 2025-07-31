import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { Cart } from 'src/cart/entities/cart.entity';
@Entity()
export class CartMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: string;

  @ManyToOne(() => Cart, (cart) => cart.cartMenus, { onDelete: 'CASCADE' })
  cart: Cart;

  @ManyToOne(() => Menu, (menu) => menu.orderMenus, { eager: true })
  menu: Menu;

  @Column('int')
  quantity: number;

  @Column('int')
  totalPrice: number;
}
