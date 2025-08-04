import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { Menu } from 'src/menu/entities/menu.entity';
import { CartMenu } from 'src/cart-menu/entities/cart-menu.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,
    @InjectRepository(Menu)
    private menuRepo: Repository<Menu>,
    @InjectRepository(CartMenu)
    private cartMenuRepo: Repository<CartMenu>,
  ) {}

  async createCart(createCartDto: CreateCartDto): Promise<Cart> {
    console.log('createCartDto', createCartDto);
    const cart = this.cartRepo.create({
      customerId: createCartDto.customerId,
      cartMenus: await Promise.all(
        createCartDto.cartMenus.map(async (cm) => {
          const menu = await this.menuRepo.findOneByOrFail({ id: cm.menuId });
          return this.cartMenuRepo.create({
            menu,
            quantity: cm.quantity,
          });
        }),
      ),
    });

    return this.cartRepo.save(cart);
  }

  async getCartWithMenus(cartId: number) {
    return this.cartRepo.findOne({
      where: { id: cartId },
      relations: ['cartMenus', 'cartMenus.menu'],
    });
  }

  async removeMenuFromCart(cartMenuId: number) {
    return this.cartMenuRepo.delete(cartMenuId);
  }

  async deleteCart(cartId: number) {
    return this.cartRepo.delete(cartId); // cascade 설정 덕분에 cartMenus도 같이 삭제됨
  }
}
