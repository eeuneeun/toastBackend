import { CreateOrderMenuDto } from 'src/order-menu/dto/create-order-menu.dto';

export class CreateOrderDto {
  customerId: string;
  storeId: number;
  totalPrice: number;
  cartMenus: CreateOrderMenuDto[];
}
