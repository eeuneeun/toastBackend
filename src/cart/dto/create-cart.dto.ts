import { CreateCartMenuDto } from 'src/cart-menu/dto/create-cart-menu.dto';

export class CreateCartDto {
  customerId: string;
  createdAt: Date;
  cartMenus: CreateCartMenuDto[];
}

export class CreateAddDto {
  customerId: string;
  menuId: number;
  quantity: number;
}
