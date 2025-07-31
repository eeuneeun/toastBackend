import { Injectable } from '@nestjs/common';
import { CreateCartMenuDto } from './dto/create-cart-menu.dto';
import { UpdateCartMenuDto } from './dto/update-cart-menu.dto';

@Injectable()
export class CartMenuService {
  create(createCartMenuDto: CreateCartMenuDto) {
    return 'This action adds a new cartMenu';
  }

  findAll() {
    return `This action returns all cartMenu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartMenu`;
  }

  update(id: number, updateCartMenuDto: UpdateCartMenuDto) {
    return `This action updates a #${id} cartMenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartMenu`;
  }
}
