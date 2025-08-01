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

  async createCart(dto: CreateCartDto): Promise<Cart> {
    const cart = this.cartRepo.create(dto);
    return this.cartRepo.save(cart);
  }

  async addMenuToCart(
    cartId: number,
    menuId: number,
    quantity: number,
    totalPrice: number,
  ) {
    const cart = await this.cartRepo.findOneBy({ id: cartId });
    const menu = await this.menuRepo.findOneBy({ id: menuId });

    if (!cart || !menu) throw new NotFoundException('Cart or Menu not found');

    const cartMenu = this.cartMenuRepo.create({
      cart,
      menu,
      quantity,
      totalPrice,
    });
    return this.cartMenuRepo.save(cartMenu);
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
