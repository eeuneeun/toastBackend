import { CreateCartMenuDto } from 'src/cart-menu/dto/create-cart-menu.dto';

export class CreateCartDto {
  customerId: string;

  createdAt: Date;

  cartMenus: CreateCartMenuDto[];
}
