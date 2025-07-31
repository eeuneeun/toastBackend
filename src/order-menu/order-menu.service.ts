import { Injectable } from '@nestjs/common';
import { CreateOrderMenuDto } from './dto/create-order-menu.dto';
import { UpdateOrderMenuDto } from './dto/update-order-menu.dto';

@Injectable()
export class OrderMenuService {
  create(createOrderMenuDto: CreateOrderMenuDto) {
    return 'This action adds a new orderMenu';
  }

  findAll() {
    return `This action returns all orderMenu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderMenu`;
  }

  update(id: number, updateOrderMenuDto: UpdateOrderMenuDto) {
    return `This action updates a #${id} orderMenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderMenu`;
  }
}
