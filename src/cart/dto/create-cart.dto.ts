import { CartMenu } from 'src/cart-menu/entities/cart-menu.entity';

export class CreateCartDto {
  customerId: string;

  createdAt: Date;

  cartMenus: CartMenu[];
}
