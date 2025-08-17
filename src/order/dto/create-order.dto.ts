import { CreateOrderMenuDto } from 'src/order-menu/dto/create-order-menu.dto';

export class CreateOrderDto {
  paymentInfo: {
    storeId: number;
    totalPrice: number;
    paymentMethod: string;

    customerId: string;
    customerName: string;
    customerPhone: string;
    deliveryMethod: string;
    deliveryAddress: string;

    status: string;
    updatedAt: Date;
    createdAt: Date;
  };
  cartMenus: CreateOrderMenuDto[];
}
