import { CartMenu } from 'src/cart-menu/entities/cart-menu.entity';
import { OrderMenu } from 'src/order-menu/entities/order-menu.entity';

export class CreateMenuDto {
  category: string;
  name: string;
  desc: string;
  imgUrl: string;
  price: number;
  orderMenus: OrderMenu[];
  cartMenus: CartMenu[];
  create_at: Date;
}
