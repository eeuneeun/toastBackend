import { Cart } from 'src/cart/entities/cart.entity';
import { Menu } from 'src/menu/entities/menu.entity';

export class CreateCartMenuDto {
  customerId: string;
  cart: Cart;
  menu: Menu;
  quantity: number;
  totalPrice: number;
}
