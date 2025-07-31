import { OrderMenu } from 'src/order-menu/entities/order-menu.entity';

export class CreateOrderDto {
  customerId: string;
  createdAt: Date;
  orderMenus: OrderMenu[];
}
