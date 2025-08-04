import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Menu } from '../../menu/entities/menu.entity';
import { Cart } from '../../cart/entities/cart.entity';
@Entity()
export class CartMenu {
  /* This TypeScript code defines an entity called `CartMenu` using TypeORM decorators. Here's what
  each part of the code is doing: */
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.cartMenus, { onDelete: 'CASCADE' })
  cart: Cart;

  @ManyToOne(() => Menu, (menu) => menu.cartMenus)
  menu: Menu;

  @Column('int')
  quantity: number;
}
